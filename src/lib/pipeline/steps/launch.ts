import type { ContentItemInsert } from "../types";

/**
 * Parse launch day content markdown output.
 * The output contains blog post, newsletter, X posts, and platform descriptions.
 */
export function parseLaunchOutput(output: string): ContentItemInsert[] {
  const items: ContentItemInsert[] = [];

  // Extract blog post — look for the first major heading with Key Takeaways
  const blogMatch = output.match(
    /(# [^\n]+\n[\s\S]*?)(?=\n# Newsletter|\n# Launch Day X Posts|\n# Platform Descriptions|$)/i
  );
  if (blogMatch) {
    items.push({
      type: "blog_post",
      phase: "launch",
      title: "Blog Post",
      body: cleanPromiseTags(blogMatch[1].trim()),
      sortOrder: 0,
    });
  }

  // Extract newsletter
  const newsletterMatch = output.match(
    /# Newsletter[^\n]*\n([\s\S]*?)(?=\n# Launch Day X Posts|\n# Platform Descriptions|\n<promise>|$)/i
  );
  if (newsletterMatch) {
    const nlContent = newsletterMatch[1].trim();
    const subjectMatch = nlContent.match(
      /## Subject Line Options?\s*\n([\s\S]*?)(?=\n## )/i
    );
    const subjectLines = subjectMatch
      ? subjectMatch[1]
          .split("\n")
          .filter((l) => /^\d+\./.test(l.trim()))
          .map((l) => l.replace(/^\d+\.\s*/, "").trim())
      : [];

    items.push({
      type: "newsletter",
      phase: "launch",
      title: "Launch Newsletter",
      body: cleanPromiseTags(nlContent),
      metadata: subjectLines.length
        ? { subject_lines: subjectLines.join(" | ") }
        : undefined,
      sortOrder: 1,
    });
  }

  // Extract X posts
  const xPostsMatch = output.match(
    /# Launch Day X Posts[^\n]*\n([\s\S]*?)(?=\n# Platform Descriptions|\n<promise>|$)/i
  );
  if (xPostsMatch) {
    const xContent = xPostsMatch[1];
    const podcastSection = xContent.match(
      /## Podcast Account[^\n]*\n([\s\S]*?)(?=\n## Personal Account|$)/i
    );
    const personalSection = xContent.match(
      /## Personal Account[^\n]*\n([\s\S]*?)$/i
    );

    if (podcastSection) {
      extractXPosts(podcastSection[1]).forEach((post, i) => {
        items.push({
          type: post.isThread ? "social_thread" : "social_post",
          phase: "launch",
          title: `Brand: ${post.label}`,
          body: post.text,
          metadata: { account: "brand" },
          sortOrder: 10 + i,
        });
      });
    }

    if (personalSection) {
      extractXPosts(personalSection[1]).forEach((post, i) => {
        items.push({
          type: post.isThread ? "social_thread" : "social_post",
          phase: "launch",
          title: `Personal: ${post.label}`,
          body: post.text,
          metadata: { account: "personal" },
          sortOrder: 100 + i,
        });
      });
    }
  }

  // Extract platform descriptions
  const platformMatch = output.match(
    /# Platform Descriptions[^\n]*\n([\s\S]*?)(?=\n<promise>|$)/i
  );
  if (platformMatch) {
    const platContent = platformMatch[1];
    const ytMatch = platContent.match(
      /## YouTube Description\s*\n([\s\S]*?)(?=\n## Apple|$)/i
    );
    if (ytMatch) {
      items.push({
        type: "platform_description",
        phase: "launch",
        title: "YouTube Description",
        body: cleanPromiseTags(ytMatch[1].trim()),
        metadata: { platform: "youtube" },
        sortOrder: 200,
      });
    }

    const appleMatch = platContent.match(
      /## Apple Podcasts[^\n]*\n([\s\S]*?)(?=\n<promise>|$)/i
    );
    if (appleMatch) {
      items.push({
        type: "platform_description",
        phase: "launch",
        title: "Apple Podcasts / Spotify Description",
        body: cleanPromiseTags(appleMatch[1].trim()),
        metadata: { platform: "apple_spotify" },
        sortOrder: 201,
      });
    }
  }

  if (items.length === 0) {
    items.push({
      type: "launch_raw",
      phase: "launch",
      title: "Launch Content",
      body: cleanPromiseTags(output),
      sortOrder: 0,
    });
  }

  return items;
}

function extractXPosts(
  section: string
): { label: string; text: string; isThread: boolean }[] {
  const posts: { label: string; text: string; isThread: boolean }[] = [];
  const blocks = section.split(/\n### /);

  for (const block of blocks) {
    if (!block.trim()) continue;
    const firstLine = block.split("\n")[0].trim();
    const rest = block.substring(block.indexOf("\n") + 1).trim();
    if (!rest) continue;

    posts.push({
      label: firstLine,
      text: cleanPromiseTags(rest),
      isThread:
        firstLine.toLowerCase().includes("thread") ||
        rest.includes("**Tweet "),
    });
  }

  return posts;
}

function cleanPromiseTags(text: string): string {
  return text.replace(/<promise>[\s\S]*?<\/promise>/g, "").trim();
}
