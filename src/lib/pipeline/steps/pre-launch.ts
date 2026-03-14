import type { ContentItemInsert } from "../types";

/**
 * Parse pre-launch content markdown output.
 * Extracts X posts for podcast and personal accounts, plus newsletter teaser.
 */
export function parsePreLaunchOutput(output: string): ContentItemInsert[] {
  const items: ContentItemInsert[] = [];

  // Extract podcast account posts
  const podcastSection = output.match(
    /## Podcast Account[^\n]*\n([\s\S]*?)(?=\n## Personal Account|\n---\s*\n|\n# Newsletter|\n<promise>|$)/i
  );
  if (podcastSection) {
    const posts = extractPosts(podcastSection[1]);
    posts.forEach((post, i) => {
      items.push({
        type: "teaser_post",
        phase: "pre_launch",
        title: `Brand: ${post.label}`,
        body: post.text,
        metadata: { account: "brand", post_type: post.type },
        sortOrder: i,
      });
    });
  }

  // Extract personal account posts
  const personalSection = output.match(
    /## Personal Account[^\n]*\n([\s\S]*?)(?=\n---\s*\n|\n# Newsletter|\n<promise>|$)/i
  );
  if (personalSection) {
    const posts = extractPosts(personalSection[1]);
    posts.forEach((post, i) => {
      items.push({
        type: "teaser_post",
        phase: "pre_launch",
        title: `Personal: ${post.label}`,
        body: post.text,
        metadata: { account: "personal", post_type: post.type },
        sortOrder: 100 + i,
      });
    });
  }

  // Extract newsletter teaser
  const newsletterMatch = output.match(
    /(?:## Teaser Block|# Newsletter Teaser|## Newsletter Teaser)[^\n]*\n([\s\S]*?)(?=\n---|\n<promise>|$)/i
  );
  if (newsletterMatch) {
    items.push({
      type: "newsletter_teaser",
      phase: "pre_launch",
      title: "Newsletter Teaser",
      body: cleanPromiseTags(newsletterMatch[1].trim()),
      sortOrder: 200,
    });
  }

  if (items.length === 0) {
    items.push({
      type: "pre_launch_raw",
      phase: "pre_launch",
      title: "Pre-Launch Content",
      body: cleanPromiseTags(output),
      sortOrder: 0,
    });
  }

  return items;
}

interface ParsedPost {
  label: string;
  type: string;
  text: string;
}

function extractPosts(section: string): ParsedPost[] {
  const posts: ParsedPost[] = [];
  const blocks = section.split(/\n### /);

  for (const block of blocks) {
    if (!block.trim()) continue;
    const firstLine = block.split("\n")[0].trim();
    const rest = block.substring(block.indexOf("\n") + 1).trim();

    if (rest) {
      const typeMatch = firstLine.match(/[—–-]\s*(.+?)(?:\s*\(|$)/);
      posts.push({
        label: firstLine,
        type: typeMatch ? typeMatch[1].trim() : firstLine,
        text: cleanPromiseTags(rest),
      });
    }
  }

  return posts;
}

function cleanPromiseTags(text: string): string {
  return text.replace(/<promise>[\s\S]*?<\/promise>/g, "").trim();
}
