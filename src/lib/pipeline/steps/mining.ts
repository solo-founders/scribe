import type { ContentItemInsert } from "../types";

/**
 * Parse the markdown output from the content mining step.
 * Extracts quotes, clip suggestions, blog topics, and additional opportunities.
 */
export function parseMiningOutput(output: string): ContentItemInsert[] {
  const items: ContentItemInsert[] = [];

  // Extract key quotes (each ### Quote block)
  const quotesSection = output.match(
    /## Key Quotes\s*\n([\s\S]*?)(?=\n## Video Clip|\n## Blog-Worthy|\n## Additional|\n---|\n<promise>|$)/i
  );
  if (quotesSection) {
    const quoteBlocks = quotesSection[1].split(/\n### Quote \d+/i).filter(Boolean);
    quoteBlocks.forEach((block, i) => {
      const text = extractField(block, "Text");
      const speaker = extractField(block, "Speaker");
      const timestamp = extractField(block, "Timestamp");
      const category = extractField(block, "Category");
      const bestFor = extractField(block, "Best for");

      if (text) {
        items.push({
          type: "quote",
          phase: "mining",
          title: `${category || "Quote"} — ${speaker || "Guest"}`,
          body: text.replace(/^[""]|[""]$/g, ""),
          metadata: {
            speaker: speaker || null,
            timestamp: timestamp || null,
            category: category || null,
            best_platform: bestFor || null,
          },
          sortOrder: i,
        });
      }
    });
  }

  // Extract video clip suggestions
  const clipsSection = output.match(
    /## Video Clip Suggestions\s*\n([\s\S]*?)(?=\n## Blog-Worthy|\n## Additional|\n---|\n<promise>|$)/i
  );
  if (clipsSection) {
    const clipBlocks = clipsSection[1].split(/\n### Clip \d+/i).filter(Boolean);
    clipBlocks.forEach((block, i) => {
      const title = block.match(/^:\s*(.+)/m)?.[1]?.trim();
      const start = extractField(block, "Start");
      const end = extractField(block, "End");
      const duration = extractField(block, "Duration");
      const hook = extractField(block, "Hook");
      const summary = extractField(block, "Summary");
      const bestFor = extractField(block, "Best for");

      items.push({
        type: "clip_suggestion",
        phase: "mining",
        title: title || hook || `Clip ${i + 1}`,
        body: summary || block.trim(),
        metadata: {
          start_time: start || null,
          end_time: end || null,
          duration: duration || null,
          hook: hook || null,
          best_platform: bestFor || null,
        },
        sortOrder: 100 + i,
      });
    });
  }

  // Extract blog-worthy topics
  const topicsSection = output.match(
    /## Blog-Worthy Topics\s*\n([\s\S]*?)(?=\n## Additional|\n---|\n<promise>|$)/i
  );
  if (topicsSection) {
    const topicBlocks = topicsSection[1].split(/\n### Topic \d+/i).filter(Boolean);
    topicBlocks.forEach((block, i) => {
      const title = block.match(/^:\s*(.+)/m)?.[1]?.trim();
      const discussed = extractField(block, "Discussed at");
      const angle = extractField(block, "Angle");
      const audience = extractField(block, "Target audience");
      const keyPoints = extractListItems(block, "Key points");

      items.push({
        type: "blog_topic",
        phase: "mining",
        title: title || `Blog Topic ${i + 1}`,
        body: [
          angle ? `**Angle:** ${angle}` : "",
          keyPoints.length
            ? `**Key Points:**\n${keyPoints.map((p) => `- ${p}`).join("\n")}`
            : "",
          audience ? `**Target Audience:** ${audience}` : "",
        ]
          .filter(Boolean)
          .join("\n\n"),
        metadata: {
          timestamp_range: discussed || null,
          angle: angle || null,
        },
        sortOrder: 200 + i,
      });
    });
  }

  // Extract additional content opportunities as a single item
  const additionalSection = output.match(
    /## Additional Content Opportunities\s*\n([\s\S]*?)(?=\n---|\n<promise>|$)/i
  );
  if (additionalSection) {
    items.push({
      type: "additional_opportunities",
      phase: "mining",
      title: "Additional Content Opportunities",
      body: cleanPromiseTags(additionalSection[1].trim()),
      sortOrder: 300,
    });
  }

  if (items.length === 0) {
    items.push({
      type: "mining_raw",
      phase: "mining",
      title: "Content Map",
      body: cleanPromiseTags(output),
      sortOrder: 0,
    });
  }

  return items;
}

function extractField(block: string, fieldName: string): string | null {
  const match = block.match(
    new RegExp(`\\*\\*${fieldName}\\*\\*:\\s*(.+)`, "i")
  );
  return match ? match[1].trim() : null;
}

function extractListItems(block: string, fieldName: string): string[] {
  const match = block.match(
    new RegExp(`\\*\\*${fieldName}\\*\\*:\\s*\\n([\\s\\S]*?)(?=\\n\\*\\*|$)`, "i")
  );
  if (!match) return [];
  return match[1]
    .split("\n")
    .filter((l) => l.trim().startsWith("-"))
    .map((l) => l.replace(/^\s*-\s*/, "").trim());
}

function cleanPromiseTags(text: string): string {
  return text.replace(/<promise>[\s\S]*?<\/promise>/g, "").trim();
}
