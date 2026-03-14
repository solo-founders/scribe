# Scribe

Scribe turns a single podcast episode into 20+ pieces of ready-to-publish content across platforms — blog posts, newsletters, social media posts, platform descriptions, quote cards, and a 14-day social calendar.

Paste a transcript, hit run, and Scribe's 5-step AI pipeline handles the rest. Each new episode builds on your past editorial decisions, learning your tone and preferences over time.

## How it works

1. **Paste your transcript** and guest name
2. **Run the pipeline** — Scribe processes it through 5 phases automatically
3. **Review and curate** — browse generated content, select your favorites, edit inline
4. **Copy and publish** — one-click copy for each piece of content

The pipeline uses [DeepWork](https://github.com/Unsupervisedcom/deepwork)-style quality gates: each step validates its own output against strict criteria and retries if it doesn't meet the bar.

## Pipeline Phases

| Phase | What you get |
|-------|-------------|
| **Foundation** | 3 title options, episode description, guest bio, timestamped show notes, key topics |
| **Content Mining** | 10+ quotable moments with timestamps, 5+ video clip suggestions, 3+ blog-worthy topics |
| **Pre-Launch** | Teaser posts for brand + personal X accounts, newsletter teaser |
| **Launch** | Full blog post, newsletter with subject lines, launch day social posts, YouTube/Apple/Spotify descriptions |
| **Post-Launch** | Derivative blog posts, 14-day social media calendar, 8+ quote card texts, cross-promotion ideas |

## Editorial Memory

Scribe learns from your past episodes. When you select, edit, or curate content, those decisions inform future pipeline runs — so your voice and preferences carry forward with each episode.

## Setup

1. Create a [Neon](https://neon.tech) Postgres database (free tier works)
2. Create `.env.local`:
   ```
   DATABASE_URL=your_neon_connection_string
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```
3. Install and run:
   ```bash
   npm install
   npm run db:push
   npm run dev
   ```

## Tech Stack

- **Next.js 15** — App Router, TypeScript
- **Tailwind CSS + shadcn/ui** — UI components
- **Drizzle ORM + Neon Postgres** — database
- **Claude API** — content generation with quality validation
- **DeepWork** — rigorous prompt engineering framework
