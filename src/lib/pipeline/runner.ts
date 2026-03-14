import { db } from "@/lib/db";
import {
  pipelineRuns,
  contentItems,
  transcripts,
  episodes,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { executeStepWithValidation } from "@/lib/ai/client";
import {
  loadJob,
  loadStepInstructions,
  getQualityPrompt,
  type StepDefinition,
} from "@/lib/deepwork";
import { parseFoundationOutput } from "./steps/foundation";
import { parseMiningOutput } from "./steps/mining";
import { parsePreLaunchOutput } from "./steps/pre-launch";
import { parseLaunchOutput } from "./steps/launch";
import { parsePostLaunchOutput } from "./steps/post-launch";
import {
  buildEditorialMemory,
  buildEditorialSummary,
} from "./editorial-memory";
import type { ContentItemInsert, Phase } from "./types";

const JOB_NAME = "episode_content_machine";

// Map step IDs to pipeline phases for editorial memory lookup
const STEP_TO_PHASE: Record<string, Phase> = {
  transcript_and_foundation: "foundation",
  content_mining: "mining",
  pre_launch_content: "pre_launch",
  launch_content: "launch",
  post_launch_content: "post_launch",
};

const STEP_PARSERS: Record<string, (output: string) => ContentItemInsert[]> = {
  transcript_and_foundation: parseFoundationOutput,
  content_mining: parseMiningOutput,
  pre_launch_content: parsePreLaunchOutput,
  launch_content: parseLaunchOutput,
  post_launch_content: parsePostLaunchOutput,
};

export async function runPipeline(episodeId: string, runId: string) {
  try {
    await db
      .update(pipelineRuns)
      .set({ status: "running", startedAt: new Date(), currentStep: 1 })
      .where(eq(pipelineRuns.id, runId));

    const job = await loadJob(JOB_NAME);

    const [transcript] = await db
      .select()
      .from(transcripts)
      .where(eq(transcripts.episodeId, episodeId))
      .limit(1);

    const [episode] = await db
      .select()
      .from(episodes)
      .where(eq(episodes.id, episodeId))
      .limit(1);

    if (!transcript) throw new Error("No transcript found for episode");

    // Track raw step outputs for context passing between steps
    const stepOutputs: Record<string, string> = {};

    for (let i = 0; i < job.steps.length; i++) {
      const step = job.steps[i];

      await db
        .update(pipelineRuns)
        .set({ currentStep: i + 1 })
        .where(eq(pipelineRuns.id, runId));

      // Load the actual DeepWork step instruction markdown
      const instructions = await loadStepInstructions(
        JOB_NAME,
        step.instructions_file
      );

      // Build context from transcript + previous step outputs + editorial memory
      const phase = STEP_TO_PHASE[step.id];
      const editorialContext = phase
        ? step.id === "transcript_and_foundation" || step.id === "content_mining"
          ? await buildEditorialSummary(episodeId)
          : await buildEditorialMemory(episodeId, phase)
        : "";

      const context = buildContext(
        transcript.fullText,
        episode,
        step,
        stepOutputs,
        editorialContext
      );

      // Get quality validation prompt from after_agent hooks
      const qualityPrompt = getQualityPrompt(step);

      // Execute with DeepWork-style quality validation and retry
      const output = await executeStepWithValidation(
        instructions,
        context,
        qualityPrompt
      );

      // Store raw output for downstream steps
      stepOutputs[step.id] = output;

      // Parse markdown output into structured content items for the UI
      const parser = STEP_PARSERS[step.id];
      if (parser) {
        const items = parser(output);
        if (items.length > 0) {
          await insertItems(episodeId, runId, items);

          // After foundation step: update episode with generated title and bio
          if (step.id === "transcript_and_foundation") {
            const titleItem = items.find((i) => i.type === "title_option");
            const bioItem = items.find((i) => i.type === "guest_bio");
            const descItem = items.find((i) => i.type === "description");
            const updates: Record<string, unknown> = { updatedAt: new Date() };
            if (titleItem) updates.title = titleItem.body;
            if (bioItem) updates.guestBio = bioItem.body;
            if (descItem) updates.description = descItem.body;
            await db
              .update(episodes)
              .set(updates)
              .where(eq(episodes.id, episodeId));
          }
        }
      }
    }

    await db
      .update(pipelineRuns)
      .set({ status: "completed", completedAt: new Date() })
      .where(eq(pipelineRuns.id, runId));

    await db
      .update(episodes)
      .set({ status: "completed", updatedAt: new Date() })
      .where(eq(episodes.id, episodeId));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown pipeline error";
    await db
      .update(pipelineRuns)
      .set({ status: "failed", error: message })
      .where(eq(pipelineRuns.id, runId));
    await db
      .update(episodes)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(episodes.id, episodeId));
    throw error;
  }
}

function buildContext(
  transcriptText: string,
  episode: { title: string; guestName: string | null } | undefined,
  step: StepDefinition,
  stepOutputs: Record<string, string>,
  editorialContext: string
): string {
  const parts: string[] = [];

  if (episode?.guestName) {
    parts.push(`## Guest Name\n${episode.guestName}`);
  }
  if (episode?.title) {
    parts.push(`## Episode Title\n${episode.title}`);
  }

  // Add outputs from dependency steps
  for (const input of step.inputs) {
    if (input.from_step && stepOutputs[input.from_step]) {
      parts.push(
        `## Output from "${input.from_step}" step\n\n${stepOutputs[input.from_step]}`
      );
    }
  }

  // Add transcript for steps that need it
  // Step 1 always needs it; steps 4 and 5 reference it directly in their inputs
  const needsTranscript =
    step.id === "transcript_and_foundation" ||
    step.inputs.some(
      (i) => i.file?.includes("transcript.md")
    );

  if (needsTranscript) {
    parts.push(`## Full Transcript\n\n${transcriptText}`);
  }

  // Add editorial memory from past episodes
  if (editorialContext) {
    parts.push(editorialContext);
  }

  return parts.join("\n\n---\n\n");
}

async function insertItems(
  episodeId: string,
  runId: string,
  items: ContentItemInsert[]
) {
  if (items.length === 0) return;
  await db.insert(contentItems).values(
    items.map((item) => ({
      episodeId,
      runId,
      type: item.type,
      phase: item.phase,
      title: item.title ?? null,
      body: item.body,
      metadata: item.metadata ?? null,
      sortOrder: item.sortOrder ?? 0,
    }))
  );
}
