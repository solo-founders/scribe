---
name: episode_content_machine.content_mining
description: "Analyze transcript to extract key quotes, video clip timestamps, topic segments, and blog-worthy moments"user-invocable: false---

# episode_content_machine.content_mining

**Step 2/5** in **episode_content_machine** workflow

> Transform Solo Founders Podcast episodes into comprehensive multi-platform content

## Prerequisites (Verify First)

Before proceeding, confirm these steps are complete:
- `/episode_content_machine.transcript_and_foundation`

## Instructions

**Goal**: Analyze transcript to extract key quotes, video clip timestamps, topic segments, and blog-worthy moments

# Content Mining

## Objective

Analyze the transcript and episode foundation to extract the raw material for all content creation: key quotes, video clip timestamp suggestions, topic segments suitable for blog posts, and other shareable moments.

## Task

Read the transcript and episode foundation, then systematically mine them for content opportunities. Think like a social media manager, blog editor, and video producer simultaneously.

### Process

1. **Read the inputs**
   - Read `episodes/[episode_name]/transcript.md` for the full conversation
   - Read `episodes/[episode_name]/episode_foundation.md` for topic context

2. **Extract key quotes**
   - Identify 10+ standalone quotes that are:
     - Insightful or surprising
     - Concise enough for a social post (under 280 characters ideally)
     - Self-contained (make sense without context)
     - Emotionally resonant or thought-provoking
   - Record the exact quote text and timestamp
   - Categorize each quote (inspirational, tactical, contrarian, funny)

3. **Identify video clip segments**
   - Find 5+ moments that work as standalone short-form clips (30-90 seconds)
   - Each clip should:
     - Have a clear beginning and end
     - Contain a complete thought or story
     - Be engaging out of context
   - Record start timestamp, end timestamp, and a suggested clip title
   - Note the hook (what grabs attention in the first 3 seconds)

4. **Map blog-worthy topic segments**
   - Identify 3+ topics discussed in depth that could become standalone blog posts
   - For each topic:
     - Timestamp range where it's discussed
     - Summary of the key points made
     - Potential blog post angle/title
     - Why this topic would resonate with the audience

5. **Note additional content opportunities**
   - Contrarian takes or hot takes
   - Personal stories from the guest
   - Practical frameworks or processes shared
   - Data points or statistics mentioned
   - Lessons from failures

## Output Format

### episodes/[episode_name]/content_map.md

**Structure**:
```markdown
# Content Map: Episode [number] — [Guest Name]

## Key Quotes

### Quote 1
- **Text**: "[exact quote]"
- **Speaker**: [Guest Name]
- **Timestamp**: [HH:MM:SS]
- **Category**: [inspirational / tactical / contrarian / funny]
- **Best for**: [X post / quote card / newsletter pull quote]

### Quote 2
...

[10+ quotes total]

## Video Clip Suggestions

### Clip 1: [Suggested Title]
- **Start**: [HH:MM:SS]
- **End**: [HH:MM:SS]
- **Duration**: [X seconds]
- **Hook**: [What grabs attention in the first 3 seconds]
- **Summary**: [1 sentence describing the clip content]
- **Best for**: [YouTube Shorts / Instagram Reels / X clip]

### Clip 2: [Suggested Title]
...

[5+ clips total]

## Blog-Worthy Topics

### Topic 1: [Potential Blog Title]
- **Discussed at**: [HH:MM:SS] — [HH:MM:SS]
- **Key points**:
  - [Point 1]
  - [Point 2]
  - [Point 3]
- **Angle**: [How to frame this as a standalone article]
- **Target audience**: [Who would find this most valuable]

### Topic 2: [Potential Blog Title]
...

[3+ topics total]

## Additional Content Opportunities

### Contrarian Takes
- [Take 1 with timestamp]

### Personal Stories
- [Story 1 with timestamp and brief description]

### Frameworks & Processes
- [Framework 1 with timestamp]

### Notable Data Points
- [Stat or data point with timestamp]
```

## Quality Criteria

- At least 10 key quotes identified with exact timestamps
- Quotes are genuinely compelling and shareable, not generic or obvious
- At least 5 video clip suggestions with start/end timestamps and titles
- Clip suggestions are self-contained moments that work without context
- Each clip has a clear hook identified
- At least 3 blog-worthy topics with angles and key points
- All timestamps are accurate and correspond to the transcript
- Content is categorized and labeled for easy use in later steps
- When all criteria are met, include `<promise>Quality Criteria Met</promise>` in your response

## Context

This is Step 2 of 5 in the Episode Content Machine. The content map is the central reference document that Steps 3, 4, and 5 all draw from. The quality of this mining directly determines the quality of all downstream content. David Senra generates 10-15 posts per episode from his content; industry best practice is turning one episode into 20+ pieces of content. This step creates the raw material to make that possible.


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
- `episodes/[episode_name]/episode_foundation.md` (from `transcript_and_foundation`)

## Work Branch

Use branch format: `deepwork/episode_content_machine-[instance]-YYYYMMDD`

- If on a matching work branch: continue using it
- If on main/master: create new branch with `git checkout -b deepwork/episode_content_machine-[instance]-$(date +%Y%m%d)`

## Outputs

**Required outputs**:
- `episodes/[episode_name]/content_map.md`

## Guardrails

- Do NOT skip prerequisite verification if this step has dependencies
- Do NOT produce partial outputs; complete all required outputs before finishing
- Do NOT proceed without required inputs; ask the user if any are missing
- Do NOT modify files outside the scope of this step's defined outputs

## On Completion

1. Verify outputs are created
2. Inform user: "Step 2/5 complete, outputs: episodes/[episode_name]/content_map.md"
3. **Continue workflow**: Use Skill tool to invoke `/episode_content_machine.pre_launch_content`

---

**Reference files**: `.deepwork/jobs/episode_content_machine/job.yml`, `.deepwork/jobs/episode_content_machine/steps/content_mining.md`