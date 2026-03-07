# Roadmap: ColdCalling Wiki

## Overview

The ColdCalling Wiki redesign transforms 28 scraped articles into a modern, bold, and energetic knowledge base. We build in 5 phases: establish content foundation with static generation, add navigation and discovery, implement search and content enhancements, polish with distinctive design, and optimize for SEO and accessibility. Each phase delivers a functional, verifiable capability that builds toward the complete wiki experience.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Content Foundation** - Static content generation and core routing
- [ ] **Phase 2: Navigation & Discovery** - Browsable categories and homepage
- [ ] **Phase 3: Search & Content Enhancement** - Full-text search and rich content features
- [ ] **Phase 4: Design System & Polish** - Bold/energetic visual design with animations
- [ ] **Phase 5: SEO & Optimization** - Production-ready with full SEO and accessibility

## Phase Details

### Phase 1: Content Foundation
**Goal**: All 28 wiki articles render as fast, SEO-ready static HTML pages
**Depends on**: Nothing (first phase)
**Requirements**: CONT-01, CONT-02
**Success Criteria** (what must be TRUE):
  1. User can visit any of 28 article URLs and see clean, readable content rendered from markdown
  2. User sees accurate reading time estimate at top of every article
  3. Build process generates 28 static HTML pages (verified with `npm run build`)
  4. All article content displays with proper UTF-8 encoding (no mojibake characters)
**Plans**: TBD

Plans:
- [ ] 01-01: TBD
- [ ] 01-02: TBD
- [ ] 01-03: TBD

---

### Phase 2: Navigation & Discovery
**Goal**: Users can browse all articles through categories, homepage, and breadcrumbs
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-05
**Success Criteria** (what must be TRUE):
  1. User visits homepage and sees bold hero section with 6 category cards showing article counts
  2. User clicks a category card and sees all articles in that category listed
  3. User sees breadcrumbs on every article page showing their location (e.g., Home > Techniques > Openers)
  4. User can navigate to previous/next article within the same category from article page
  5. User can reach any of 28 articles through homepage → category → article path
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

---

### Phase 3: Search & Content Enhancement
**Goal**: Users can search all content and see enhanced reading features
**Depends on**: Phase 1
**Requirements**: SRCH-01, SRCH-02, SRCH-03, NAV-04, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. User can search from any page and see matching results with text snippets
  2. User clicks search result and lands on correct article with search term highlighted
  3. User scrolls through article and sees sticky table of contents with current section highlighted
  4. User sees callout boxes (tips, warnings) visually distinct from body text
  5. User can click "copy" button on cold call scripts and paste into their notes
  6. User sees 3-5 related article suggestions at bottom of every article
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

---

### Phase 4: Design System & Polish
**Goal**: Wiki displays bold, energetic design with smooth animations
**Depends on**: Phase 3 (can run parallel after Phase 1)
**Requirements**: DESGN-01, DESGN-02, DESGN-03, DESGN-04, DESGN-05, DESGN-06, DESGN-07
**Success Criteria** (what must be TRUE):
  1. User sees high-contrast, bold colors and strong visual energy throughout the site
  2. User sees distinctive typography (Space Grotesk headings, DM Sans body, not Inter/Arial)
  3. User scrolls homepage and sees category cards animate in with staggered timing
  4. User scrolls article and sees reading progress bar at top showing percentage complete
  5. User sees layered backgrounds and subtle gradients on key sections
  6. User hovers interactive elements and sees smooth CSS transitions
  7. User visits site on mobile (320px), tablet, and desktop and sees proper responsive layout
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD
- [ ] 04-03: TBD

---

### Phase 5: SEO & Optimization
**Goal**: Wiki is production-ready with full SEO, accessibility, and performance optimization
**Depends on**: Phases 1-4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. User shares article on social media and sees correct title, description, and image in preview
  2. User searches Google and finds wiki articles with unique titles and descriptions (no duplicates)
  3. Google Search Console shows Article schema detected on all 28 pages (JSON-LD structured data)
  4. Sitemap.xml exists at root with all 28 article URLs and homepage
  5. Robots.txt allows crawling of all content pages
  6. User navigates with keyboard only and can access all content (skip-to-content link, focus indicators)
  7. Lighthouse accessibility score is 95+ and no critical axe DevTools violations
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5
(Phase 3 and Phase 4 can run in parallel after Phase 1 completes)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Content Foundation | 0/TBD | Not started | - |
| 2. Navigation & Discovery | 0/TBD | Not started | - |
| 3. Search & Content Enhancement | 0/TBD | Not started | - |
| 4. Design System & Polish | 0/TBD | Not started | - |
| 5. SEO & Optimization | 0/TBD | Not started | - |

---

**Roadmap created:** 2026-03-07
**Last updated:** 2026-03-07
