---
name: episode_content_machine.launch_content
description: "Create full blog post for Ghost, newsletter edition for Beehiiv, launch social posts for X, and episode descriptions for YouTube and podcast platforms"user-invocable: false---

# episode_content_machine.launch_content

**Step 4/5** in **episode_content_machine** workflow

> Transform Solo Founders Podcast episodes into comprehensive multi-platform content

## Prerequisites (Verify First)

Before proceeding, confirm these steps are complete:
- `/episode_content_machine.transcript_and_foundation`
- `/episode_content_machine.content_mining`

## Instructions

**Goal**: Create full blog post for Ghost, newsletter edition for Beehiiv, launch social posts for X, and episode descriptions for YouTube and podcast platforms

# Launch Day Content

## Objective

Create the full suite of launch day content: a comprehensive blog post for Ghost, a newsletter edition for Beehiiv, launch social posts for X, and tailored episode descriptions for YouTube and podcast platforms.

## Task

Using the transcript, content map, and episode foundation, produce all the content needed to make launch day impactful across every platform.

### Process

1. **Read the inputs**
   - Read `episodes/[episode_name]/transcript.md` for full conversation detail
   - Read `episodes/[episode_name]/content_map.md` for quotes, clips, and topics
   - Read `episodes/[episode_name]/episode_foundation.md` for title, bio, and show notes

2. **Write the blog post (Ghost)**
   - Use the chosen title (or suggest a final version based on the 3 options from Step 1)
   - Structure for SEO: H1 title, introduction, H2 sections for key topics, conclusion
   - Embed 3-5 of the best quotes as pull quotes
   - Include a "Key Takeaways" section at the top for skimmers
   - Add episode links (YouTube, Apple, Spotify) prominently
   - Include the guest bio
   - End with a CTA to subscribe to the podcast and newsletter
   - Aim for 1,000-1,500 words — substantial but not overwhelming

3. **Write the newsletter edition (Beehiiv)**
   - Compelling subject line (test with 2-3 options)
   - Brief personal intro from the host (2-3 sentences)
   - Episode summary with 3-5 key takeaways as bullet points
   - 1-2 embedded quotes
   - Clear CTA button: "Listen Now"
   - Links to all platforms
   - Keep it scannable — most people skim newsletters

4. **Write launch day X posts**
   - **Announcement post** (both accounts): "New episode is live" with key hook
   - **Quote posts** (2-3): Best quotes formatted for X with episode link
   - **Thread option**: A 4-6 tweet thread summarizing the episode's key insights
   - Include different content for podcast and personal accounts

5. **Write platform descriptions**
   - **YouTube description**: Include full timestamp chapters, guest bio, links to podcast's social accounts, and subscribe CTA
   - **Apple Podcasts / Spotify description**: Concise episode summary with key topics listed

## Output Format

### episodes/[episode_name]/launch/blog_post.md

**Structure**:
```markdown
# [Episode Title]

*Solo Founders Podcast — Episode [number] with [Guest Name]*

## Key Takeaways
- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]

**Listen**: [YouTube] | [Apple Podcasts] | [Spotify]

---

## Introduction
[2-3 paragraphs introducing the guest and what the conversation covers]

## [Topic Section 1 Title]
[Discussion of the topic with embedded quotes]

> "[Pull quote from guest]"

## [Topic Section 2 Title]
[Discussion of the topic with embedded quotes]

...

## About [Guest Name]
[Guest bio]

---

**Subscribe** to the Solo Founders Podcast on [YouTube], [Apple Podcasts], or [Spotify].
**Join** our newsletter for weekly insights from solo founders: [newsletter link]
```

### episodes/[episode_name]/launch/newsletter.md

**Structure**:
```markdown
# Newsletter: Episode [number] — [Guest Name]

## Subject Line Options
1. [Subject line option 1]
2. [Subject line option 2]
3. [Subject line option 3]

## Preview Text
[The snippet that shows in email previews — 40-90 characters]

## Body

[Personal intro from host — 2-3 sentences]

### This Week: [Episode Title]

[1-2 sentence hook]

**Key takeaways:**
- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]
- [Takeaway 4]
- [Takeaway 5]

> "[Best quote from the episode]"

[CTA: Listen Now — link to preferred platform]

Available on: YouTube | Apple Podcasts | Spotify
```

### episodes/[episode_name]/launch/x_posts.md

**Structure**:
```markdown
# Launch Day X Posts: Episode [number] — [Guest Name]

## Podcast Account (@SoloFoundersPod)

### Announcement Post
[Post text with episode link]

### Quote Post 1
[Post text]

### Quote Post 2
[Post text]

### Thread: [number] insights from [Guest Name]
**Tweet 1**: [Hook + context]
**Tweet 2**: [Insight 1]
**Tweet 3**: [Insight 2]
**Tweet 4**: [Insight 3]
**Tweet 5**: [CTA + episode link]

---

## Personal Account (@[handle])

### Announcement Post
[Post text — more personal tone]

### Quote Post
[Post text]

### Personal Reflection
[Post about what you learned from this conversation]
```

### episodes/[episode_name]/launch/platform_descriptions.md

**Structure**:
```markdown
# Platform Descriptions: Episode [number] — [Guest Name]

## YouTube Description

[Episode title]

[2-3 sentence description]

Chapters:
00:00 — Introduction
03:15 — [Topic 1]
12:40 — [Topic 2]
...

About [Guest Name]:
[Guest bio]

Subscribe to Solo Founders Podcast: [links]
Newsletter: [link]
Follow us: [social links]

## Apple Podcasts / Spotify Description

[Concise 2-3 sentence summary]

Topics covered:
- [Topic 1]
- [Topic 2]
- [Topic 3]

Guest: [Guest Name] — [one-line bio]
```

## Quality Criteria

- Blog post is 1,000-1,500 words with SEO-friendly structure (H1, H2s, key takeaways)
- Blog post includes 3-5 embedded pull quotes
- Newsletter has 3 subject line options and scannable format
- Newsletter key takeaways are specific and compelling (not vague)
- X posts include announcement, quote posts, and thread for both accounts
- YouTube description includes full timestamp chapters
- Apple/Spotify description is concise and highlights key topics
- All content includes links/placeholders for episode URLs
- Tone is consistent with each platform's norms
- When all criteria are met, include `<promise>Quality Criteria Met</promise>` in your response

## Context

This is Step 4 of 5 in the Episode Content Machine. Launch day is the highest-impact moment for each episode. The blog post serves as the SEO-optimized home for the episode content. The newsletter goes to ~9K subscribers who are primed to listen. The X posts create social buzz across ~35K combined followers. Platform descriptions ensure the episode is discoverable. Every piece should drive listeners to the episode.


### Job Context

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


## Required Inputs


**Files from Previous Steps** - Read these first:
- `episodes/[episode_name]/transcript.md` (from `transcript_and_foundation`)
- `episodes/[episode_name]/content_map.md` (from `content_mining`)
- `episodes/[episode_name]/episode_foundation.md` (from `transcript_and_foundation`)

## Work Branch

Use branch format: `deepwork/episode_content_machine-[instance]-YYYYMMDD`

- If on a matching work branch: continue using it
- If on main/master: create new branch with `git checkout -b deepwork/episode_content_machine-[instance]-$(date +%Y%m%d)`

## Outputs

**Required outputs**:
- `episodes/[episode_name]/launch/blog_post.md`
- `episodes/[episode_name]/launch/newsletter.md`
- `episodes/[episode_name]/launch/x_posts.md`
- `episodes/[episode_name]/launch/platform_descriptions.md`

## Guardrails

- Do NOT skip prerequisite verification if this step has dependencies
- Do NOT produce partial outputs; complete all required outputs before finishing
- Do NOT proceed without required inputs; ask the user if any are missing
- Do NOT modify files outside the scope of this step's defined outputs

## On Completion

1. Verify outputs are created
2. Inform user: "Step 4/5 complete, outputs: episodes/[episode_name]/launch/blog_post.md, episodes/[episode_name]/launch/newsletter.md, episodes/[episode_name]/launch/x_posts.md, episodes/[episode_name]/launch/platform_descriptions.md"
3. **Continue workflow**: Use Skill tool to invoke `/episode_content_machine.post_launch_content`

---

**Reference files**: `.deepwork/jobs/episode_content_machine/job.yml`, `.deepwork/jobs/episode_content_machine/steps/launch_content.md`