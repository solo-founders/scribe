---
name: episode_content_machine
description: "Transform Solo Founders Podcast episodes into comprehensive multi-platform content"
---

# episode_content_machine

**Multi-step workflow**: Transform Solo Founders Podcast episodes into comprehensive multi-platform content

> **CRITICAL**: Always invoke steps using the Skill tool. Never copy/paste step instructions directly.

A systematic workflow for maximizing the value of each Solo Founders Podcast episode.
Takes a raw audio file and produces a complete content package spanning pre-launch,
launch day, and post-launch phases across all platforms (YouTube, podcast platforms,
X/Twitter, Beehiiv newsletter, Ghost blog, personal website).

Inspired by the promotional approaches of Dialectic (Jackson Dahl), Sourcery (Molly O'Shea),
and Founders (David Senra), this workflow follows the principle of using every part of
the podcast — turning one high-fidelity recording into 20+ pieces of content.

The workflow produces:
- Full transcript and episode foundation (title, description, guest bio, show notes)
- Content map with key quotes, video clip timestamps, and topic segments
- Pre-launch teaser content for X and newsletter
- Launch day blog post, newsletter edition, social posts, and platform descriptions
- Post-launch derivative blog posts, social media drip calendar, quote cards, and cross-promotion ideas

Designed for the Solo Founders Podcast team. All outputs are drafts for human review
before publishing. The podcast has ~10K X followers (plus ~25K on the host's personal account)
and ~9K newsletter subscribers on Beehiiv.


## Available Steps

1. **transcript_and_foundation** - Generate transcript from audio and create episode metadata including title, description, guest bio, and show notes
2. **content_mining** - Analyze transcript to extract key quotes, video clip timestamps, topic segments, and blog-worthy moments (requires: transcript_and_foundation)
3. **pre_launch_content** - Create teaser content for X (both podcast and personal accounts), newsletter teaser, and behind-the-scenes content for the days before episode launch (requires: transcript_and_foundation, content_mining)
4. **launch_content** - Create full blog post for Ghost, newsletter edition for Beehiiv, launch social posts for X, and episode descriptions for YouTube and podcast platforms (requires: transcript_and_foundation, content_mining)
5. **post_launch_content** - Create derivative blog posts on specific topics, 2-week social media drip calendar, quote card text, and cross-promotion ideas (requires: transcript_and_foundation, content_mining)

## Execution Instructions

### Step 1: Analyze Intent

Parse any text following `/episode_content_machine` to determine user intent:
- "transcript_and_foundation" or related terms → start at `episode_content_machine.transcript_and_foundation`
- "content_mining" or related terms → start at `episode_content_machine.content_mining`
- "pre_launch_content" or related terms → start at `episode_content_machine.pre_launch_content`
- "launch_content" or related terms → start at `episode_content_machine.launch_content`
- "post_launch_content" or related terms → start at `episode_content_machine.post_launch_content`

### Step 2: Invoke Starting Step

Use the Skill tool to invoke the identified starting step:
```
Skill tool: episode_content_machine.transcript_and_foundation
```

### Step 3: Continue Workflow Automatically

After each step completes:
1. Check if there's a next step in the sequence
2. Invoke the next step using the Skill tool
3. Repeat until workflow is complete or user intervenes

### Handling Ambiguous Intent

If user intent is unclear, use AskUserQuestion to clarify:
- Present available steps as numbered options
- Let user select the starting point

## Guardrails

- Do NOT copy/paste step instructions directly; always use the Skill tool to invoke steps
- Do NOT skip steps in the workflow unless the user explicitly requests it
- Do NOT proceed to the next step if the current step's outputs are incomplete
- Do NOT make assumptions about user intent; ask for clarification when ambiguous

## Context Files

- Job definition: `.deepwork/jobs/episode_content_machine/job.yml`