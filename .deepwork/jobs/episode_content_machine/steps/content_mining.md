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
