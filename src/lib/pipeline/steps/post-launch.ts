import type { ContentItemInsert } from "../types";

/**
 * Parse post-launch content markdown output.
 * Extracts derivative blog posts, social calendar, quote cards, and cross-promotion.
 */
export function parsePostLaunchOutput(output: string): ContentItemInsert[] {
  const items: ContentItemInsert[] = [];

  // Extract derivative blog posts
  const blogSection = output.match(
    /# Derivative Blog Posts[^\n]*\n([\s\S]*?)(?=\n# Social Media Calendar|\n# Quote Cards|\n<promise>|$)/i
  );
  if (blogSection) {
    const blogBlocks = blogSection[1].split(/\n---\s*\n/).filter(Boolean);
    blogBlocks.forEach((block, i) => {
      const titleMatch =
        block.match(/## Blog Post \d+:\s*(.+)/i) || block.match(/## (.+)/);
      const keywordMatch = block.match(/\*\*Target keyword\*\*:\s*(.+)/i);
      const title = titleMatch ? titleMatch[1].trim() : `Blog Post ${i + 1}`;

      items.push({
        type: "derivative_blog",
        phase: "post_launch",
        title,
        body: cleanPromiseTags(block.trim()),
        metadata: {
          target_keyword: keywordMatch ? keywordMatch[1].trim() : null,
        },
        sortOrder: i,
      });
    });
  }

  // Extract social calendar
  const calendarSection = output.match(
    /# Social Media Calendar[^\n]*\n([\s\S]*?)(?=\n# Quote Cards|\n# Cross-Promotion|\n<promise>|$)/i
  );
  if (calendarSection) {
    const dayBlocks = calendarSection[1].split(/\n### Day /);
    dayBlocks.forEach((block) => {
      if (!block.trim()) return;
      const dayMatch = block.match(/^(\d+)/);
      if (!dayMatch) return;

      const day = parseInt(dayMatch[1]);
      const podcastPost = block.match(
        /\*\*Podcast Account\*\*:\s*(.+?)(?:\s*[—–-]\s*\[?(Educational|Inspirational|Promotional)\]?)?$/im
      );
      const personalPost = block.match(
        /\*\*Personal Account\*\*:\s*(.+?)(?:\s*[—–-]\s*\[?(Educational|Inspirational|Promotional)\]?)?$/im
      );

      const category =
        podcastPost?.[2] || personalPost?.[2] || "Educational";

      const bodyParts: string[] = [];
      if (podcastPost) bodyParts.push(`**Brand:** ${podcastPost[1].trim()}`);
      if (personalPost)
        bodyParts.push(`**Personal:** ${personalPost[1].trim()}`);

      if (bodyParts.length > 0) {
        items.push({
          type: "social_calendar_entry",
          phase: "post_launch",
          title: `Day ${day} — ${category}`,
          body: bodyParts.join("\n\n"),
          metadata: { day, content_category: category },
          sortOrder: 100 + day,
        });
      }
    });
  }

  // Extract quote cards
  const quoteSection = output.match(
    /# Quote Cards[^\n]*\n([\s\S]*?)(?=\n# Cross-Promotion|\n<promise>|$)/i
  );
  if (quoteSection) {
    const cardBlocks = quoteSection[1].split(/\n## Card \d+/i).filter(Boolean);
    cardBlocks.forEach((block, i) => {
      const quote = block.match(/\*\*Quote\*\*:\s*[""]?(.+?)[""]?\s*$/im);
      const attribution = block.match(/\*\*Attribution\*\*:\s*(.+)/i);
      const visual = block.match(/\*\*Visual\*\*:\s*(.+)/i);
      const bestFor = block.match(/\*\*Best for\*\*:\s*(.+)/i);

      items.push({
        type: "quote_card_text",
        phase: "post_launch",
        title: `Quote Card: ${attribution ? attribution[1].trim() : "Guest"}`,
        body: quote ? quote[1].trim() : cleanPromiseTags(block.trim()),
        metadata: {
          attribution: attribution ? attribution[1].trim() : null,
          visual_style: visual ? visual[1].trim() : null,
          best_platform: bestFor ? bestFor[1].trim() : null,
        },
        sortOrder: 200 + i,
      });
    });
  }

  // Extract cross-promotion
  const crossPromoSection = output.match(
    /# Cross-Promotion[^\n]*\n([\s\S]*?)(?=\n<promise>|$)/i
  );
  if (crossPromoSection) {
    items.push({
      type: "cross_promo",
      phase: "post_launch",
      title: "Cross-Promotion Strategy",
      body: cleanPromiseTags(crossPromoSection[1].trim()),
      sortOrder: 300,
    });
  }

  if (items.length === 0) {
    items.push({
      type: "post_launch_raw",
      phase: "post_launch",
      title: "Post-Launch Content",
      body: cleanPromiseTags(output),
      sortOrder: 0,
    });
  }

  return items;
}

function cleanPromiseTags(text: string): string {
  return text.replace(/<promise>[\s\S]*?<\/promise>/g, "").trim();
}
