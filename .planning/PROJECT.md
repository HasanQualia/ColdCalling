# ColdCalling Wiki

## What This Is

A redesigned cold calling knowledge base website for a client. The site is built from scraped content from coldcallingwiki.com — 28 wiki articles covering everything from openers, objections, call structure, tonality, closing techniques, psychological principles, and more. The redesign delivers a modern, bold, and energetic frontend with search and navigation.

## Core Value

Users can quickly find and consume actionable cold calling knowledge through a well-organized, visually engaging wiki with fast search and intuitive navigation.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Display all 28 wiki articles from scraped markdown content
- [ ] Homepage with article overview/categories
- [ ] Search functionality across all articles
- [ ] Category-based navigation (openers, objections, closing, mindset, etc.)
- [ ] Individual article pages with clean reading experience
- [ ] Bold, energetic design with distinctive typography
- [ ] Staggered animations and CSS transitions
- [ ] Fully responsive (mobile, tablet, desktop)
- [ ] SEO-optimized metadata for all pages
- [ ] Fast static site (Next.js SSG)

### Out of Scope

- User accounts / authentication — static content site, no user data
- CMS / admin panel — content baked from markdown, client contacts for updates
- Comments / social features — not requested
- About / Contact pages — just the wiki content
- Database / Supabase — no dynamic data needed
- Dark mode — not requested

## Context

- Content source: `coldcallingwiki.md` (255KB, 28 articles scraped via Firecrawl)
- Client project — redesign of existing coldcallingwiki.com
- Static build — all content baked in at build time from markdown
- No backend needed — pure frontend static site
- Design direction: Bold + energetic — high contrast, strong colors, motivational energy
- Must follow Fawzi's frontend standards: distinctive fonts, sharp accents, layered backgrounds, no card grids, no blue-purple

## Constraints

- **Stack**: Next.js 16+, React 19, TypeScript, Tailwind v4, Vercel
- **Content**: Static from markdown — no CMS, no database
- **Design**: Bold/energetic aesthetic, distinctive fonts, staggered animations
- **Performance**: Static generation for fast load times
- **Deployment**: Vercel

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site (no Supabase) | No user data, no dynamic content — pure content site | — Pending |
| Content from markdown file | Client doesn't need CMS, bake content at build time | — Pending |
| Bold + energetic design | Client preference, high contrast and motivational energy | — Pending |
| Skip auth phases | No user accounts needed for content wiki | — Pending |

---
*Last updated: 2026-03-07 after initialization*
