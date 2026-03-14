import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { db } from "@/lib/db";
import { episodes, transcripts, pipelineRuns, contentItems } from "@/lib/db/schema";
import { parseFoundationOutput } from "@/lib/pipeline/steps/foundation";
import { parseMiningOutput } from "@/lib/pipeline/steps/mining";
import { parsePreLaunchOutput } from "@/lib/pipeline/steps/pre-launch";
import { parseLaunchOutput } from "@/lib/pipeline/steps/launch";
import { parsePostLaunchOutput } from "@/lib/pipeline/steps/post-launch";

/**
 * Import past episodes from a local directory into the database.
 * This seeds the editorial memory so new episodes can learn from past ones.
 */
export async function POST(request: NextRequest) {
  const { sourceDir } = await request.json();

  if (!sourceDir) {
    return NextResponse.json(
      { error: "sourceDir is required" },
      { status: 400 }
    );
  }

  const imported: string[] = [];
  const errors: string[] = [];

  // Discover episode directories
  const { readdir } = await import("fs/promises");
  const entries = await readdir(join(sourceDir, "episodes"), {
    withFileTypes: true,
  });

  const episodeDirs = entries
    .filter((e) => e.isDirectory() && e.name.startsWith("ep"))
    .map((e) => e.name);

  for (const epDir of episodeDirs) {
    try {
      const epPath = join(sourceDir, "episodes", epDir);

      // Read foundation to get episode metadata
      const foundationText = await readFileSafe(
        join(epPath, "episode_foundation.md")
      );
      if (!foundationText) {
        errors.push(`${epDir}: no episode_foundation.md`);
        continue;
      }

      // Extract title and guest from the foundation
      const titleMatch = foundationText.match(/^# Episode \d+:\s*(.+)/m);
      const guestName = titleMatch ? titleMatch[1].trim() : epDir;

      // Pick the first suggested title or derive from directory name
      const suggestedTitle = foundationText.match(
        /## Suggested Titles\s*\n\d+\.\s*(.+)/
      );
      const title = suggestedTitle
        ? suggestedTitle[1].trim()
        : `Episode: ${guestName}`;

      // Read transcript
      const transcriptText = await readFileSafe(
        join(epPath, "transcript.md")
      );

      // Create episode
      const [episode] = await db
        .insert(episodes)
        .values({
          title,
          guestName,
          status: "completed",
        })
        .returning();

      // Create transcript if it exists
      if (transcriptText) {
        await db.insert(transcripts).values({
          episodeId: episode.id,
          fullText: transcriptText,
        });
      }

      // Create a completed pipeline run
      const [run] = await db
        .insert(pipelineRuns)
        .values({
          episodeId: episode.id,
          status: "completed",
          currentStep: 5,
          startedAt: new Date(),
          completedAt: new Date(),
        })
        .returning();

      // Import all content phases
      const phases = [
        {
          phase: "foundation",
          files: [{ path: "episode_foundation.md", content: foundationText }],
          parser: parseFoundationOutput,
        },
        {
          phase: "mining",
          files: [
            {
              path: "content_map.md",
              content: await readFileSafe(join(epPath, "content_map.md")),
            },
          ],
          parser: parseMiningOutput,
        },
        {
          phase: "pre_launch",
          files: [
            {
              path: "pre_launch/x_posts.md",
              content: await readFileSafe(
                join(epPath, "pre_launch", "x_posts.md")
              ),
            },
            {
              path: "pre_launch/newsletter_teaser.md",
              content: await readFileSafe(
                join(epPath, "pre_launch", "newsletter_teaser.md")
              ),
            },
          ],
          parser: parsePreLaunchOutput,
        },
        {
          phase: "launch",
          files: [
            {
              path: "launch/blog_post.md",
              content: await readFileSafe(
                join(epPath, "launch", "blog_post.md")
              ),
            },
            {
              path: "launch/newsletter.md",
              content: await readFileSafe(
                join(epPath, "launch", "newsletter.md")
              ),
            },
            {
              path: "launch/x_posts.md",
              content: await readFileSafe(
                join(epPath, "launch", "x_posts.md")
              ),
            },
            {
              path: "launch/platform_descriptions.md",
              content: await readFileSafe(
                join(epPath, "launch", "platform_descriptions.md")
              ),
            },
          ],
          parser: parseLaunchOutput,
        },
        {
          phase: "post_launch",
          files: [
            {
              path: "post_launch/derivative_blog_posts.md",
              content: await readFileSafe(
                join(epPath, "post_launch", "derivative_blog_posts.md")
              ),
            },
            {
              path: "post_launch/social_calendar.md",
              content: await readFileSafe(
                join(epPath, "post_launch", "social_calendar.md")
              ),
            },
            {
              path: "post_launch/quote_cards.md",
              content: await readFileSafe(
                join(epPath, "post_launch", "quote_cards.md")
              ),
            },
            {
              path: "post_launch/cross_promotion.md",
              content: await readFileSafe(
                join(epPath, "post_launch", "cross_promotion.md")
              ),
            },
          ],
          parser: parsePostLaunchOutput,
        },
      ];

      for (const { phase, files, parser } of phases) {
        // Combine all files for the phase into one text block
        const combined = files
          .filter((f) => f.content)
          .map((f) => f.content)
          .join("\n\n---\n\n");

        if (!combined) continue;

        // Try to parse with the structured parser
        let items = parser(combined);

        // If parser couldn't extract structure, store as raw
        if (items.length === 0) {
          items = [
            {
              type: `${phase}_raw`,
              phase: phase as "foundation" | "mining" | "pre_launch" | "launch" | "post_launch",
              title: `${phase.replace(/_/g, " ")} content`,
              body: combined,
              sortOrder: 0,
            },
          ];
        }

        // Insert all items
        await db.insert(contentItems).values(
          items.map((item) => ({
            episodeId: episode.id,
            runId: run.id,
            type: item.type,
            phase: item.phase,
            title: item.title ?? null,
            body: item.body,
            metadata: item.metadata ?? null,
            sortOrder: item.sortOrder ?? 0,
          }))
        );
      }

      imported.push(`${epDir} → "${title}" (${guestName})`);
    } catch (err) {
      errors.push(
        `${epDir}: ${err instanceof Error ? err.message : "unknown error"}`
      );
    }
  }

  return NextResponse.json({ imported, errors });
}

async function readFileSafe(path: string): Promise<string | null> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return null;
  }
}
