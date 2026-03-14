---
name: episode_content_machine.pre_launch_content
description: "Create teaser content for X (both podcast and personal accounts), newsletter teaser, and behind-the-scenes content for the days before episode launch"user-invocable: false---

# episode_content_machine.pre_launch_content

**Step 3/5** in **episode_content_machine** workflow

> Transform Solo Founders Podcast episodes into comprehensive multi-platform content

## Prerequisites (Verify First)

Before proceeding, confirm these steps are complete:
- `/episode_content_machine.transcript_and_foundation`
- `/episode_content_machine.content_mining`

## Instructions

**Goal**: Create teaser content for X (both podcast and personal accounts), newsletter teaser, and behind-the-scenes content for the days before episode launch

# Pre-Launch Content

## Objective

Create teaser content to build anticipation for the upcoming episode across X (both podcast and personal accounts) and the Beehiiv newsletter, designed for the days leading up to episode launch.

## Task

Using the content map and episode foundation, craft pre-launch promotional content that creates curiosity and anticipation without giving away the best insights. The goal is to get your audience excited to listen.

### Process

1. **Read the inputs**
   - Read `episodes/[episode_name]/content_map.md` for quotes, topics, and hooks
   - Read `episodes/[episode_name]/episode_foundation.md` for guest bio and episode context

2. **Create X teaser posts**
   - Write posts for the **podcast account** (~10K followers) and **personal account** (~25K followers)
   - Each account should have a different voice:
     - Podcast account: professional, focused on the episode and guest
     - Personal account: more conversational, "I just had an amazing conversation with..."
   - Create at least 3 teaser posts per account with different angles:
     - **Quote tease**: A compelling quote from the guest with a "More in the upcoming episode..." hook
     - **Topic hook**: Highlight a surprising or contrarian topic discussed, without the full answer
     - **Guest intro**: Introduce who the guest is and why the audience should care
   - Keep posts under 280 characters where possible; threads are okay for longer-form teasers
   - Include suggested posting schedule (e.g., "Post 3 days before launch", "Post 1 day before launch")

3. **Create newsletter teaser**
   - Write a short teaser section for the Beehiiv newsletter
   - Should be 3-5 sentences that create anticipation
   - Include the guest name and 1-2 topic hooks
   - End with "Coming [day]" or "Dropping this [day]"
   - This will be inserted into the regular newsletter, not sent as a standalone email

## Output Format

### episodes/[episode_name]/pre_launch/x_posts.md

**Structure**:
```markdown
# Pre-Launch X Posts: Episode [number] — [Guest Name]

## Podcast Account (@SoloFoundersPod)

### Post 1 — Quote Tease (3 days before launch)
[Post text]

### Post 2 — Topic Hook (2 days before launch)
[Post text]

### Post 3 — Guest Intro (1 day before launch)
[Post text]

---

## Personal Account (@[handle])

### Post 1 — Personal Take (3 days before launch)
[Post text]

### Post 2 — Behind the Scenes (2 days before launch)
[Post text]

### Post 3 — Anticipation Builder (1 day before launch)
[Post text]
```

### episodes/[episode_name]/pre_launch/newsletter_teaser.md

**Structure**:
```markdown
# Newsletter Teaser: Episode [number] — [Guest Name]

## Teaser Block (for insertion into regular newsletter)

[3-5 sentences building anticipation. Include guest name, 1-2 intriguing topic hooks, and when the episode drops.]
```

## Quality Criteria

- X posts include variants for both podcast and personal accounts
- At least 3 teaser posts per account with different angles
- Posts have a clear hook in the first line that stops the scroll
- No post gives away the best insight — creates curiosity, not summary
- Newsletter teaser is concise (3-5 sentences) and creates anticipation
- Suggested posting schedule is included
- Tone matches each platform (professional for podcast account, conversational for personal)
- When all criteria are met, include `<promise>Quality Criteria Met</promise>` in your response

## Context

This is Step 3 of 5 in the Episode Content Machine. Pre-launch content is about building anticipation. Think of it like a movie trailer — show enough to get people excited, but don't spoil the best moments. The Solo Founders Podcast has ~10K followers on the podcast X account and ~25K on the host's personal account, plus ~9K newsletter subscribers. The goal is to prime all three audiences so they're ready to listen on launch day.


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
- `episodes/[episode_name]/content_map.md` (from `content_mining`)
- `episodes/[episode_name]/episode_foundation.md` (from `transcript_and_foundation`)

## Work Branch

Use branch format: `deepwork/episode_content_machine-[instance]-YYYYMMDD`

- If on a matching work branch: continue using it
- If on main/master: create new branch with `git checkout -b deepwork/episode_content_machine-[instance]-$(date +%Y%m%d)`

## Outputs

**Required outputs**:
- `episodes/[episode_name]/pre_launch/x_posts.md`
- `episodes/[episode_name]/pre_launch/newsletter_teaser.md`

## Guardrails

- Do NOT skip prerequisite verification if this step has dependencies
- Do NOT produce partial outputs; complete all required outputs before finishing
- Do NOT proceed without required inputs; ask the user if any are missing
- Do NOT modify files outside the scope of this step's defined outputs

## On Completion

1. Verify outputs are created
2. Inform user: "Step 3/5 complete, outputs: episodes/[episode_name]/pre_launch/x_posts.md, episodes/[episode_name]/pre_launch/newsletter_teaser.md"
3. **Continue workflow**: Use Skill tool to invoke `/episode_content_machine.launch_content`

---

**Reference files**: `.deepwork/jobs/episode_content_machine/job.yml`, `.deepwork/jobs/episode_content_machine/steps/pre_launch_content.md`