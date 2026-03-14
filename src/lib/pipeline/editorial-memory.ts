import { db } from "@/lib/db";
import { episodes, contentItems } from "@/lib/db/schema";
import { eq, and, desc, ne } from "drizzle-orm";
import type { Phase } from "./types";

/**
 * Build editorial context from past completed episodes.
 *
 * This is the learning mechanism: each new pipeline run gets examples
 * of what "good" looks like from previous episodes, with emphasis on
 * content the user has selected or edited (editorial decisions).
 *
 * Returns a formatted string to inject into the prompt context.
 */
export async function buildEditorialMemory(
  currentEpisodeId: string,
  phase: Phase
): Promise<string> {
  // Get all completed episodes except the current one
  const pastEpisodes = await db
    .select()
    .from(episodes)
    .where(
      and(
        eq(episodes.status, "completed"),
        ne(episodes.id, currentEpisodeId)
      )
    )
    .orderBy(desc(episodes.createdAt))
    .limit(5); // Cap at 5 most recent to avoid token bloat

  if (pastEpisodes.length === 0) {
    return "";
  }

  const sections: string[] = [
    "## Editorial Reference: Past Episodes",
    "",
    "Below are examples from past episodes. Use these to match the established tone, style, and quality level. Pay special attention to items marked as [SELECTED] or [EDITED] — these represent explicit editorial decisions.",
    "",
  ];

  for (const ep of pastEpisodes) {
    // Get content items for this phase from the past episode
    const items = await db
      .select()
      .from(contentItems)
      .where(
        and(
          eq(contentItems.episodeId, ep.id),
          eq(contentItems.phase, phase)
        )
      )
      .orderBy(contentItems.sortOrder);

    if (items.length === 0) continue;

    sections.push(`### ${ep.title}${ep.guestName ? ` (Guest: ${ep.guestName})` : ""}`);
    sections.push("");

    for (const item of items) {
      const flags: string[] = [];
      if (item.isSelected) flags.push("[SELECTED]");
      if (item.isEdited) flags.push("[EDITED]");
      const flagStr = flags.length > 0 ? ` ${flags.join(" ")}` : "";

      // For large content (blog posts, newsletters), include a truncated version
      const body = item.body.length > 500
        ? item.body.substring(0, 500) + "..."
        : item.body;

      sections.push(
        `**${item.type}**${item.title ? ` — ${item.title}` : ""}${flagStr}`
      );
      sections.push(body);
      sections.push("");
    }

    sections.push("---");
    sections.push("");
  }

  return sections.join("\n");
}

/**
 * Build a concise editorial summary across all phases from past episodes.
 * Used for foundation and mining steps where phase-specific examples
 * aren't as useful as overall tone/style references.
 */
export async function buildEditorialSummary(
  currentEpisodeId: string
): Promise<string> {
  const pastEpisodes = await db
    .select()
    .from(episodes)
    .where(
      and(
        eq(episodes.status, "completed"),
        ne(episodes.id, currentEpisodeId)
      )
    )
    .orderBy(desc(episodes.createdAt))
    .limit(3);

  if (pastEpisodes.length === 0) {
    return "";
  }

  const sections: string[] = [
    "## Editorial Reference: Past Episodes",
    "",
    "Here are foundation summaries from past episodes. Match this tone and quality level.",
    "",
  ];

  for (const ep of pastEpisodes) {
    // Get just the foundation items for tone reference
    const foundationItems = await db
      .select()
      .from(contentItems)
      .where(
        and(
          eq(contentItems.episodeId, ep.id),
          eq(contentItems.phase, "foundation")
        )
      )
      .orderBy(contentItems.sortOrder);

    if (foundationItems.length === 0) continue;

    sections.push(`### ${ep.title}${ep.guestName ? ` (${ep.guestName})` : ""}`);
    sections.push("");

    for (const item of foundationItems) {
      const flags: string[] = [];
      if (item.isSelected) flags.push("[SELECTED]");
      if (item.isEdited) flags.push("[EDITED]");
      const flagStr = flags.length > 0 ? ` ${flags.join(" ")}` : "";

      sections.push(`**${item.type}**${flagStr}: ${item.body}`);
    }

    sections.push("");
  }

  return sections.join("\n");
}
