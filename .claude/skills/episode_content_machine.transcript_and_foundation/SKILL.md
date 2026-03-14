---
name: episode_content_machine.transcript_and_foundation
description: "Generate transcript from audio and create episode metadata including title, description, guest bio, and show notes"user-invocable: false---

# episode_content_machine.transcript_and_foundation

**Step 1/5** in **episode_content_machine** workflow

> Transform Solo Founders Podcast episodes into comprehensive multi-platform content


## Instructions

**Goal**: Generate transcript from audio and create episode metadata including title, description, guest bio, and show notes

# Transcript & Episode Foundation

## Objective

Generate a complete transcript from the podcast audio file and create the episode foundation document containing the title, description, guest bio, and show notes with timestamps.

## Task

Process the audio file to produce a high-quality transcript, then analyze the content to create all foundational episode metadata that subsequent steps will build on.

### Process

1. **Gather episode details**
   - Ask structured questions using the AskUserQuestion tool to collect:
     - Path to the audio file
     - Guest name
     - Episode number
   - If the user has already provided these, skip asking

2. **Generate the transcript**
   - Use the audio file to generate a full transcript
   - Format with speaker labels (e.g., "Host:" and "[Guest Name]:")
   - Include timestamps at regular intervals (every 2-3 minutes minimum)
   - Clean up filler words, false starts, and stutters for readability
   - Preserve the natural conversational tone — don't over-edit
   - Mark any unclear audio as [inaudible]

3. **Create the episode foundation**
   - Read through the full transcript
   - Draft 3 suggested episode titles (compelling, concise, SEO-friendly)
   - Write a 2-3 sentence episode description
   - Write a guest bio (3-4 sentences covering who they are, what they've built, why they're interesting)
   - Create show notes with timestamps for each major topic transition
   - List key topics covered in the episode

## Output Format

### episodes/[episode_name]/transcript.md

The episode name should be derived from the guest name and episode number (e.g., `ep01_jane_smith`).

**Structure**:
```markdown
# Solo Founders Podcast — Episode [number] Transcript
## Guest: [Guest Name]
## Recorded: [date if known]

---

[00:00:00] **Host:** [Opening remarks]

[00:00:45] **[Guest Name]:** [Response]

[00:02:15] **Host:** [Follow-up question]

...

[01:15:30] **Host:** [Closing remarks]
```

### episodes/[episode_name]/episode_foundation.md

**Structure**:
```markdown
# Episode [number]: [Guest Name]

## Suggested Titles
1. [Title option 1 — compelling, concise]
2. [Title option 2 — different angle]
3. [Title option 3 — SEO-optimized]

## Episode Description
[2-3 sentences that hook the listener and summarize the conversation's value]

## Guest Bio
[3-4 sentences: who they are, what they've built, what makes them a compelling solo founder]

## Show Notes
- [00:00:00] Introduction and guest background
- [00:03:15] [Topic 1 — brief description]
- [00:12:40] [Topic 2 — brief description]
- [00:25:00] [Topic 3 — brief description]
...

## Key Topics
- [Topic 1]
- [Topic 2]
- [Topic 3]
- [Topic 4]
```

## Quality Criteria

- Transcript is complete with no missing sections
- Speaker labels are consistent throughout
- Timestamps appear at least every 2-3 minutes
- Episode foundation includes 3 title options
- Description hooks the listener in the first sentence
- Guest bio is compelling and specific (not generic)
- Show notes have timestamps for every major topic shift
- All content is accurate to what was said in the episode
- When all criteria are met, include `<promise>Quality Criteria Met</promise>` in your response

## Context

This is Step 1 of 5 in the Episode Content Machine. Everything downstream depends on the quality of this transcript and foundation. The transcript feeds into content mining (quotes, clips, topics) and the foundation is used to generate all promotional content. Getting accurate timestamps is critical because they'll be used for video clip suggestions.


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

**User Parameters** - Gather from user before starting:
- **audio_file_path**: Path to the episode audio file (e.g., episodes/raw/ep01.mp3)
- **guest_name**: Name of the guest founder
- **episode_number**: Episode number (e.g., 01, 02)


## Work Branch

Use branch format: `deepwork/episode_content_machine-[instance]-YYYYMMDD`

- If on a matching work branch: continue using it
- If on main/master: create new branch with `git checkout -b deepwork/episode_content_machine-[instance]-$(date +%Y%m%d)`

## Outputs

**Required outputs**:
- `episodes/[episode_name]/transcript.md`
- `episodes/[episode_name]/episode_foundation.md`

## Guardrails

- Do NOT skip prerequisite verification if this step has dependencies
- Do NOT produce partial outputs; complete all required outputs before finishing
- Do NOT proceed without required inputs; ask the user if any are missing
- Do NOT modify files outside the scope of this step's defined outputs

## On Completion

1. Verify outputs are created
2. Inform user: "Step 1/5 complete, outputs: episodes/[episode_name]/transcript.md, episodes/[episode_name]/episode_foundation.md"
3. **Continue workflow**: Use Skill tool to invoke `/episode_content_machine.content_mining`

---

**Reference files**: `.deepwork/jobs/episode_content_machine/job.yml`, `.deepwork/jobs/episode_content_machine/steps/transcript_and_foundation.md`