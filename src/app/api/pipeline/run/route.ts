import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pipelineRuns, episodes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { runPipeline } from "@/lib/pipeline/runner";

export async function POST(request: NextRequest) {
  const { episodeId } = await request.json();

  if (!episodeId) {
    return NextResponse.json(
      { error: "episodeId is required" },
      { status: 400 }
    );
  }

  // Check episode exists
  const [episode] = await db
    .select()
    .from(episodes)
    .where(eq(episodes.id, episodeId))
    .limit(1);

  if (!episode) {
    return NextResponse.json({ error: "Episode not found" }, { status: 404 });
  }

  // Create pipeline run
  const [run] = await db
    .insert(pipelineRuns)
    .values({
      episodeId,
      status: "pending",
    })
    .returning();

  // Update episode status
  await db
    .update(episodes)
    .set({ status: "processing", updatedAt: new Date() })
    .where(eq(episodes.id, episodeId));

  // Run pipeline in background (don't await - let it run)
  runPipeline(episodeId, run.id).catch((err) => {
    console.error("Pipeline failed:", err);
  });

  return NextResponse.json({ runId: run.id }, { status: 201 });
}
