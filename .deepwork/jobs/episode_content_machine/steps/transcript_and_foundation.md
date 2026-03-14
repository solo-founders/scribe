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
