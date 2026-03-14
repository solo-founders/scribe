import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { episodes, transcripts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const allEpisodes = await db
    .select()
    .from(episodes)
    .orderBy(desc(episodes.createdAt));
  return NextResponse.json(allEpisodes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { projectName, guestName, episodeNumber, transcript } = body;

  if (!guestName || !transcript) {
    return NextResponse.json(
      { error: "Guest name and transcript are required" },
      { status: 400 }
    );
  }

  // Use project name or derive a working title from guest name
  // The pipeline's foundation step will generate proper title options
  const workingTitle = projectName || `Episode${episodeNumber ? ` ${episodeNumber}` : ""}: ${guestName}`;

  const [episode] = await db
    .insert(episodes)
    .values({
      title: workingTitle,
      guestName,
      description: episodeNumber ? `Episode ${episodeNumber}` : null,
      status: "draft",
    })
    .returning();

  await db.insert(transcripts).values({
    episodeId: episode.id,
    fullText: transcript,
  });

  return NextResponse.json(episode, { status: 201 });
}
