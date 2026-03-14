import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contentItems } from "@/lib/db/schema";
import { eq, and, asc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const episodeId = request.nextUrl.searchParams.get("episodeId");
  const phase = request.nextUrl.searchParams.get("phase");

  if (!episodeId) {
    return NextResponse.json(
      { error: "episodeId is required" },
      { status: 400 }
    );
  }

  const conditions = [eq(contentItems.episodeId, episodeId)];
  if (phase) {
    conditions.push(eq(contentItems.phase, phase));
  }

  const items = await db
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(asc(contentItems.sortOrder));

  return NextResponse.json(items);
}

export async function PATCH(request: NextRequest) {
  const { id, body, isSelected } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (body !== undefined) {
    updates.body = body;
    updates.isEdited = true;
  }
  if (isSelected !== undefined) {
    updates.isSelected = isSelected;
  }

  const [updated] = await db
    .update(contentItems)
    .set(updates)
    .where(eq(contentItems.id, id))
    .returning();

  return NextResponse.json(updated);
}
