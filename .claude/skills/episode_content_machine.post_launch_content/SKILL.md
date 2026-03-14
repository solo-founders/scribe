---
name: episode_content_machine.post_launch_content
description: "Create derivative blog posts on specific topics, 2-week social media drip calendar, quote card text, and cross-promotion ideas"user-invocable: false---

# episode_content_machine.post_launch_content

**Step 5/5** in **episode_content_machine** workflow

> Transform Solo Founders Podcast episodes into comprehensive multi-platform content

## Prerequisites (Verify First)

Before proceeding, confirm these steps are complete:
- `/episode_content_machine.transcript_and_foundation`
- `/episode_content_machine.content_mining`

## Instructions

**Goal**: Create derivative blog posts on specific topics, 2-week social media drip calendar, quote card text, and cross-promotion ideas

# Post-Launch Repurposing

## Objective

Create a full post-launch content package: derivative blog posts on specific topics from the episode, a 2-week social media drip calendar, quote card text for visual content, and cross-promotion ideas to maximize the episode's long-tail value.

## Task

Using the transcript, content map, and episode foundation, produce all the content needed to keep the episode working for you over the 2 weeks following launch. Follow the 40/40/20 rule: 40% educational, 40% inspirational, 20% promotional.

### Process

1. **Read the inputs**
   - Read `episodes/[episode_name]/transcript.md` for full conversation detail
   - Read `episodes/[episode_name]/content_map.md` for topics, quotes, and opportunities
   - Read `episodes/[episode_name]/episode_foundation.md` for context

2. **Write derivative blog posts**
   - Using the blog-worthy topics from the content map, write 2+ standalone blog posts
   - Each should be 600-1,000 words
   - They should stand alone — a reader shouldn't need to have listened to the episode
   - Reference the episode as a source ("In a recent conversation on the Solo Founders Podcast...")
   - Include a CTA to listen to the full episode at the end
   - Optimize for SEO with the topic as the primary keyword target

3. **Create the social media drip calendar**
   - Plan 14 days of content across both X accounts
   - Mix content types following the 40/40/20 rule:
     - **Educational (40%)**: Frameworks, processes, how-to insights from the episode
     - **Inspirational (40%)**: Quotes, founder stories, motivational moments
     - **Promotional (20%)**: Direct "listen to the episode" CTAs
   - Vary the format: text posts, quote graphics (reference cards from below), threads, questions to engage the audience
   - Schedule 1-2 posts per day across both accounts
   - Include specific post copy for each entry

4. **Write quote card content**
   - Select 8+ of the best quotes from the content map
   - For each quote card, provide:
     - The exact quote text
     - Attribution (guest name)
     - Suggested visual treatment (background color/style, font weight)
     - Which platform it's best suited for
   - Format quotes for visual readability (line breaks, emphasis)

5. **Develop cross-promotion ideas**
   - Suggest ways to reference this episode in future content
   - Identify other creators/communities who might find this episode valuable
   - Suggest newsletter cross-promotion opportunities
   - Identify podcast directories or curators to pitch
   - Suggest ways to repurpose for the host's personal website

## Output Format

### episodes/[episode_name]/post_launch/derivative_blog_posts.md

**Structure**:
```markdown
# Derivative Blog Posts: Episode [number]

---

## Blog Post 1: [Title]

**Target keyword**: [SEO keyword]
**Word count target**: 600-1,000 words

[Full blog post text]

*This insight comes from a conversation with [Guest Name] on the Solo Founders Podcast. [Listen to the full episode →](link)*

---

## Blog Post 2: [Title]

**Target keyword**: [SEO keyword]
**Word count target**: 600-1,000 words

[Full blog post text]

*This insight comes from a conversation with [Guest Name] on the Solo Founders Podcast. [Listen to the full episode →](link)*
```

### episodes/[episode_name]/post_launch/social_calendar.md

**Structure**:
```markdown
# Social Media Calendar: Episode [number] — [Guest Name]
## 14-Day Post-Launch Drip

### Day 1 (Launch +1)
**Podcast Account**: [Post copy] — [Type: Educational/Inspirational/Promotional]
**Personal Account**: [Post copy] — [Type]

### Day 2
**Podcast Account**: [Post copy] — [Type]
**Personal Account**: [Post copy] — [Type]

...

### Day 14
**Podcast Account**: [Post copy] — [Type]
**Personal Account**: [Post copy] — [Type]

---

## Content Mix Summary
- Educational posts: [count] ([percentage]%)
- Inspirational posts: [count] ([percentage]%)
- Promotional posts: [count] ([percentage]%)
```

### episodes/[episode_name]/post_launch/quote_cards.md

**Structure**:
```markdown
# Quote Cards: Episode [number] — [Guest Name]

## Card 1
**Quote**: "[Quote text formatted for visual readability]"
**Attribution**: — [Guest Name], Solo Founders Podcast
**Visual**: [Suggested background/style — e.g., "Dark background, bold white text, accent color"]
**Best for**: [Instagram / X / LinkedIn / Newsletter]

## Card 2
...

[8+ cards total]
```

### episodes/[episode_name]/post_launch/cross_promotion.md

**Structure**:
```markdown
# Cross-Promotion Ideas: Episode [number] — [Guest Name]

## Backlink Opportunities
- [Idea 1: e.g., "Reference in future episode about [topic]"]
- [Idea 2]

## Community Sharing
- [Community 1: e.g., "Post in [Slack/Discord community] — relevant because [reason]"]
- [Community 2]

## Creator Collaborations
- [Creator 1: Why they'd be interested in sharing this episode]

## Newsletter Swaps
- [Newsletter 1: Audience overlap and pitch angle]

## Podcast Directory / Curator Pitches
- [Directory/Curator 1: Why this episode fits their criteria]

## Personal Website Integration
- [Idea for how to feature on host's personal site]
```

## Quality Criteria

- At least 2 derivative blog posts on distinct topics (600-1,000 words each)
- Blog posts stand alone and don't require listening to the episode
- Social calendar covers all 14 days with specific post copy
- Calendar follows 40/40/20 rule (educational/inspirational/promotional)
- Content is varied enough to avoid repetition across the 2-week drip
- At least 8 quote cards with text, attribution, and visual suggestions
- Cross-promotion ideas are specific and actionable (not generic)
- All content references back to the episode
- When all criteria are met, include `<promise>Quality Criteria Met</promise>` in your response

## Context

This is Step 5 of 5 in the Episode Content Machine. Post-launch content is what turns a single episode into weeks of sustained engagement. David Senra generates 10-15 posts per episode; this step aims for even more by creating blog posts, a full social calendar, visual content, and promotion strategies. The "moving parade" principle applies here — not every follower saw the launch day posts, so continued promotion reaches new audience members over time.


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
- `episodes/[episode_name]/post_launch/derivative_blog_posts.md`
- `episodes/[episode_name]/post_launch/social_calendar.md`
- `episodes/[episode_name]/post_launch/quote_cards.md`
- `episodes/[episode_name]/post_launch/cross_promotion.md`

## Guardrails

- Do NOT skip prerequisite verification if this step has dependencies
- Do NOT produce partial outputs; complete all required outputs before finishing
- Do NOT proceed without required inputs; ask the user if any are missing
- Do NOT modify files outside the scope of this step's defined outputs

## On Completion

1. Verify outputs are created
2. Inform user: "Step 5/5 complete, outputs: episodes/[episode_name]/post_launch/derivative_blog_posts.md, episodes/[episode_name]/post_launch/social_calendar.md, episodes/[episode_name]/post_launch/quote_cards.md, episodes/[episode_name]/post_launch/cross_promotion.md"
3. **Workflow complete**: All steps finished. Consider creating a PR to merge the work branch.

---

**Reference files**: `.deepwork/jobs/episode_content_machine/job.yml`, `.deepwork/jobs/episode_content_machine/steps/post_launch_content.md`