# Features Research

## Table Stakes
Features users expect from a knowledge-base / wiki site — must have or users leave.

### Navigation & Structure
- **Sidebar or top-level navigation** with categories — users need to orient themselves and browse by topic without relying solely on search
- **Breadcrumbs** showing current location — essential for deep content sites so users know where they are in the hierarchy
- **Table of contents** for long articles — auto-generated from headings, lets users jump to relevant sections
- **Previous/Next article navigation** — keeps users moving through content sequentially within a category
- **Category/topic grouping** — articles organized into logical groups (6 categories for 28 articles is ideal)

### Search
- **Full-text search** across all articles — the primary way power users find content; must be fast and accurate
- **Search suggestions/autocomplete** — show matching articles as user types for instant discovery
- **Highlighted search results** — show matching text snippets so users can evaluate relevance before clicking

### Content Experience
- **Clean, readable typography** — large body text (18px+), good line height (1.6+), comfortable line length (60-80 chars)
- **Estimated reading time** — sets expectations; calculated from word count at build time
- **Mobile-responsive layout** — majority of sales professionals browse on mobile between calls
- **Visual hierarchy with headings** — clear H2/H3 structure makes scanning easy for busy salespeople

### SEO & Sharing
- **Unique meta titles and descriptions** per page — each article needs its own SEO metadata
- **Open Graph tags** for social sharing — articles shared on LinkedIn/Twitter need proper previews
- **Structured data** (Article schema) — helps Google understand content type and show rich results
- **Clean URLs** (/articles/topic-name) — descriptive, SEO-friendly slugs

## Differentiators
Features that set a wiki apart — competitive advantage.

- **Related articles / "See also" suggestions** — keeps users engaged by surfacing relevant content they might miss
- **Reading progress bar** — visual indicator showing how far through an article the user has scrolled
- **Callout boxes** (tips, warnings, examples) — visually distinct blocks for key frameworks, scripts, and important notes
- **Interactive table of contents** — highlights current section as user scrolls, acts as persistent navigation
- **Quick-reference cards** — condensed key takeaways at top or bottom of articles for quick review
- **Copy-to-clipboard** for key scripts/openers — one-click copy for cold call scripts and templates
- **Bookmark articles** (localStorage-based) — let users save favorites without needing accounts
- **Category landing pages** — rich overview pages for each topic area with article previews

## Anti-Features
Things to deliberately NOT build for this project.

| Anti-Feature | Reason |
|-------------|--------|
| User accounts / login | Overkill for static reference content — adds complexity with no value |
| Comments section | Adds moderation burden, no value for curated reference content |
| Wiki editing | Not a collaborative wiki — this is curated, authoritative content |
| Forums / community | Out of scope, different product entirely |
| Newsletter signup | Not requested by client |
| Gamification | Badges, points, streaks — gimmicky for professional sales content |
| Complex filtering | 28 articles don't need advanced faceted search |
| Dark mode | Not requested, adds design complexity |

## Content Organization
How to organize the 28 cold calling articles effectively.

### Recommended Categories (derived from actual scraped content):

| # | Category | Articles | Description |
|---|----------|----------|-------------|
| 1 | **Getting Started** | Call Structure, Building the List, Time Management, Understanding KPIs | Foundation knowledge for new cold callers |
| 2 | **Mindset & Psychology** | Attitude, Call Reluctance, Psychological Principles, Emotional Prospecting | Mental preparation and psychological frameworks |
| 3 | **Call Techniques** | Openers, The Pitch, Tonality, Active Listening, Qualifying Questions | Core skills for the actual phone conversation |
| 4 | **Handling Responses** | Prospect Responses, Objections Wiki, Recruitment Objections, Disqualification | How to navigate what prospects say |
| 5 | **Closing & Follow-up** | Closing, Following Up, Dealing with Gatekeeper | Converting conversations to meetings |
| 6 | **Tools & Resources** | Tech Stack, Multi-Channel Cadence, Podcasts, Glossary, Sales Culture | Supporting tools and reference material |

### Organization Pattern
- **Homepage**: Bold hero + 6 category cards with article counts + featured/popular articles
- **Category pages**: Not separate pages — use homepage sections or sidebar navigation
- **Article pages**: Full content with sticky sidebar TOC + prev/next navigation + related articles
- **URL structure**: `/articles/[slug]` — flat, simple, SEO-friendly

### Content Flow Recommendation
Articles should suggest a learning path: Getting Started → Mindset → Techniques → Handling Responses → Closing → Tools. This creates a natural progression for users who want to learn systematically.

---
*Researched: 2026-03-07*
*Confidence: HIGH (domain-general knowledge-base patterns, well-established)*
