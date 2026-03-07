# Requirements: ColdCalling Wiki

**Defined:** 2026-03-07
**Core Value:** Users can quickly find and consume actionable cold calling knowledge through a well-organized, visually engaging wiki.

## v1 Requirements

### Content

- [ ] **CONT-01**: All 28 wiki articles render from markdown with clean typography
- [ ] **CONT-02**: Articles display estimated reading time
- [ ] **CONT-03**: Articles include callout boxes for tips, warnings, and key scripts
- [ ] **CONT-04**: Articles show copy-to-clipboard for cold call scripts and openers
- [ ] **CONT-05**: Articles display related articles suggestions at bottom

### Navigation

- [ ] **NAV-01**: Homepage with bold hero section and 6 category cards with article counts
- [ ] **NAV-02**: Category-based navigation organizing 28 articles into 6 groups
- [ ] **NAV-03**: Breadcrumbs showing current location on article pages
- [ ] **NAV-04**: Sticky table of contents per article (auto-generated from headings, highlights current section)
- [ ] **NAV-05**: Previous/Next article navigation within each category

### Search

- [ ] **SRCH-01**: Full-text search across all articles using Pagefind
- [ ] **SRCH-02**: Search results show matching text snippets
- [ ] **SRCH-03**: Search is accessible from every page

### Design

- [ ] **DESGN-01**: Bold, energetic visual design with high contrast and strong colors
- [ ] **DESGN-02**: Distinctive typography (Space Grotesk + DM Sans, not Inter/Arial)
- [ ] **DESGN-03**: Staggered entrance animations on scroll (Framer Motion)
- [ ] **DESGN-04**: Reading progress bar on article pages
- [ ] **DESGN-05**: Layered backgrounds and subtle gradients
- [ ] **DESGN-06**: CSS transitions on interactive elements
- [ ] **DESGN-07**: Fully responsive layout (mobile 320px, tablet, desktop)

### SEO

- [ ] **SEO-01**: Unique meta title and description for every page
- [ ] **SEO-02**: Open Graph and Twitter card tags for social sharing
- [ ] **SEO-03**: JSON-LD structured data (Article schema) on article pages
- [ ] **SEO-04**: Auto-generated sitemap.xml
- [ ] **SEO-05**: robots.txt configured correctly

## v2 Requirements

### Enhancements

- **ENH-01**: Bookmark/favorite articles (localStorage-based)
- **ENH-02**: Dark/light mode toggle
- **ENH-03**: Print-friendly article layouts
- **ENH-04**: Article difficulty/level indicators

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts / auth | Static content site, no user data needed |
| CMS / admin panel | Content baked from markdown, client contacts for updates |
| Comments | Adds moderation burden, no value for reference content |
| Wiki editing | Curated content, not collaborative |
| Newsletter signup | Not requested |
| Database / Supabase | No dynamic data |
| About / Contact pages | Just the wiki content |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONT-01 | Phase 1 | Pending |
| CONT-02 | Phase 1 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| NAV-04 | Phase 3 | Pending |
| NAV-05 | Phase 2 | Pending |
| SRCH-01 | Phase 3 | Pending |
| SRCH-02 | Phase 3 | Pending |
| SRCH-03 | Phase 3 | Pending |
| DESGN-01 | Phase 4 | Pending |
| DESGN-02 | Phase 4 | Pending |
| DESGN-03 | Phase 4 | Pending |
| DESGN-04 | Phase 4 | Pending |
| DESGN-05 | Phase 4 | Pending |
| DESGN-06 | Phase 4 | Pending |
| DESGN-07 | Phase 4 | Pending |
| SEO-01 | Phase 5 | Pending |
| SEO-02 | Phase 5 | Pending |
| SEO-03 | Phase 5 | Pending |
| SEO-04 | Phase 5 | Pending |
| SEO-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0

**Phase Distribution:**
- Phase 1 (Content Foundation): 2 requirements
- Phase 2 (Navigation & Discovery): 4 requirements
- Phase 3 (Search & Content Enhancement): 7 requirements
- Phase 4 (Design System & Polish): 7 requirements
- Phase 5 (SEO & Optimization): 5 requirements

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-07 after roadmap creation*
