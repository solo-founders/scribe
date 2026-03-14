import type { ContentItemInsert } from "../types";

/**
 * Parse the markdown output from the foundation step into content items.
 * The output follows the DeepWork template with sections for titles,
 * description, guest bio, show notes, and key topics.
 */
export function parseFoundationOutput(output: string): ContentItemInsert[] {
  const items: ContentItemInsert[] = [];

  // Extract title options (numbered list under "Suggested Titles")
  const titlesMatch = output.match(
    /## Suggested Titles\s*\n([\s\S]*?)(?=\n## |\n---|\n<promise>|$)/i
  );
  if (titlesMatch) {
    const titles = titlesMatch[1]
      .split("\n")
      .filter((l) => /^\d+\./.test(l.trim()))
      .map((l) => l.replace(/^\d+\.\s*/, "").trim());

    titles.forEach((title, i) => {
      items.push({
        type: "title_option",
        phase: "foundation",
        title: `Title Option ${i + 1}`,
        body: title,
        sortOrder: i,
      });
    });
  }

  // Extract episode description
  const descMatch = output.match(
    /## Episode Description\s*\n([\s\S]*?)(?=\n## |\n---|\n<promise>|$)/i
  );
  if (descMatch) {
    items.push({
      type: "description",
      phase: "foundation",
      title: "Episode Description",
      body: descMatch[1].trim(),
      sortOrder: 10,
    });
  }

  // Extract guest bio
  const bioMatch = output.match(
    /## Guest Bio\s*\n([\s\S]*?)(?=\n## |\n---|\n<promise>|$)/i
  );
  if (bioMatch) {
    items.push({
      type: "guest_bio",
      phase: "foundation",
      title: "Guest Bio",
      body: bioMatch[1].trim(),
      sortOrder: 11,
    });
  }

  // Extract show notes
  const notesMatch = output.match(
    /## Show Notes\s*\n([\s\S]*?)(?=\n## |\n---|\n<promise>|$)/i
  );
  if (notesMatch) {
    items.push({
      type: "show_notes",
      phase: "foundation",
      title: "Timestamped Show Notes",
      body: notesMatch[1].trim(),
      sortOrder: 12,
    });
  }

  // Extract key topics
  const topicsMatch = output.match(
    /## Key Topics\s*\n([\s\S]*?)(?=\n## |\n---|\n<promise>|$)/i
  );
  if (topicsMatch) {
    items.push({
      type: "key_topics",
      phase: "foundation",
      title: "Key Topics",
      body: topicsMatch[1].trim(),
      sortOrder: 13,
    });
  }

  // If parsing found nothing, store the whole output as a single item
  if (items.length === 0) {
    items.push({
      type: "foundation_raw",
      phase: "foundation",
      title: "Episode Foundation",
      body: cleanPromiseTags(output),
      sortOrder: 0,
    });
  }

  return items;
}

function cleanPromiseTags(text: string): string {
  return text.replace(/<promise>[\s\S]*?<\/promise>/g, "").trim();
}
