# Architecture Research: Static Wiki with Next.js App Router

**Project:** coldcallingwiki.com redesign
**Researched:** 2026-03-07
**Confidence:** MEDIUM (based on Next.js 16 App Router patterns from training data)

## Executive Summary

Static markdown-based wikis in Next.js App Router follow a **content-as-data** pattern: markdown files live in a dedicated content directory, get parsed at build time into structured data, and feed into dynamic routes that generate static pages via `generateStaticParams`.

**Key architectural decision:** Build-time content processing (fast runtime) vs runtime processing (flexible but slower). For a 28-article wiki, **full build-time processing** is optimal.

## Components

### 1. Content Layer (File System)
```
/content
  /docs
    getting-started.md
    cold-calling-scripts.md
    objection-handling.md
  /categories
    basics.md
    advanced.md
    scripts.md
```

**Purpose:** Single source of truth for all content
**Boundaries:** Pure markdown + frontmatter, no logic

### 2. Content Processing Layer (Build-time utilities)
```
/lib/content
  parser.ts       # Read markdown files, extract frontmatter
  transformer.ts  # Process content (MDX, syntax highlighting, etc.)
  loader.ts       # Query interface (getArticle, getCategories, etc.)
```

**Purpose:** Transform markdown into structured data
**Boundaries:** Pure functions, runs at build time only

### 3. Route Layer (App Router)
```
/app
  /docs/[slug]
    page.tsx              # Article page
    layout.tsx            # Article-specific layout
  /category/[category]
    page.tsx              # Category listing
  /(marketing)
    page.tsx              # Homepage
    layout.tsx            # Marketing layout
  /search
    page.tsx              # Search interface
```

**Purpose:** URL structure and page generation
**Boundaries:** Consumes content loader, exports generateStaticParams

### 4. Component Layer (React)
```
/components
  /article
    ArticleContent.tsx    # Rendered markdown content
    ArticleHeader.tsx     # Title, meta, breadcrumbs
    TableOfContents.tsx   # Auto-generated from headings
  /navigation
    CategoryNav.tsx       # Category sidebar
    SearchBar.tsx         # Client-side search
  /layouts
    WikiLayout.tsx        # Wiki-specific chrome
```

**Purpose:** Reusable UI components
**Boundaries:** Presentation only, receives processed content as props

## Data Flow

### Build Time (Next.js build process)

```
1. Content Discovery
   └─> lib/content/loader.ts reads /content directory
       └─> Returns array of all markdown file paths

2. Frontmatter Extraction
   └─> parser.ts reads each file
       └─> Extracts YAML frontmatter (title, category, date, etc.)
       └─> Returns { frontmatter, content }

3. Content Transformation
   └─> transformer.ts processes markdown
       └─> MDX compilation (if using MDX)
       └─> Syntax highlighting (Shiki/Prism)
       └─> Heading extraction (for TOC)
       └─> Returns { html, headings, metadata }

4. Static Params Generation
   └─> app/docs/[slug]/page.tsx exports generateStaticParams()
       └─> Calls loader.getAllArticleSlugs()
       └─> Returns [{ slug: 'getting-started' }, { slug: 'scripts' }, ...]

5. Page Pre-rendering
   └─> For each slug, Next.js calls page component
       └─> Component calls loader.getArticle(slug)
       └─> Returns pre-processed content
       └─> Next.js renders to static HTML
```

### Runtime (User request)

```
User visits /docs/cold-calling-scripts
  └─> Next.js serves pre-rendered HTML (instant)
  └─> React hydrates (interactive)
  └─> Client-side search loads (if applicable)
```

## Route Structure

### Recommended URL Patterns

```
/                           # Homepage (marketing)
/docs                       # All articles index
/docs/[slug]                # Individual article
/category/[category]        # Category-filtered articles
/search                     # Search interface (client-side)
/search?q=objections        # Search results
```

### Alternative Patterns Considered

**Nested docs:** `/docs/basics/getting-started`
- Pro: Clear hierarchy in URL
- Con: Requires nested folder structure, harder to reorganize
- **Verdict:** Avoid for 28 articles, use flat structure with categories

**Numbered slugs:** `/docs/1-getting-started`
- Pro: Enforces ordering
- Con: Brittle if order changes
- **Verdict:** Use frontmatter `order` field instead

### File Structure Mapping

```
content/docs/cold-calling-scripts.md
  → /docs/cold-calling-scripts

frontmatter.category: "basics"
  → /category/basics (lists all "basics" articles)
```

## Component Architecture

### Layout Hierarchy

```
app/layout.tsx (root)
  └─> Global styles, fonts, metadata
  └─> Analytics scripts

app/docs/layout.tsx (wiki section)
  └─> Sidebar navigation
  └─> Breadcrumbs
  └─> Search bar
  └─> Category filters

app/docs/[slug]/page.tsx (article)
  └─> ArticleHeader
  └─> TableOfContents
  └─> ArticleContent (rendered markdown)
  └─> RelatedArticles
```

### Component Responsibilities

| Component | Type | Data Source | Responsibility |
|-----------|------|-------------|----------------|
| WikiLayout | Server | loader.getCategories() | Navigation chrome |
| ArticlePage | Server | loader.getArticle(slug) | Orchestrate article rendering |
| ArticleContent | Server | Processed HTML | Render markdown safely |
| TableOfContents | Client | Extracted headings | Scrollspy navigation |
| SearchBar | Client | Browser localStorage + fuzzy search | Client-side filtering |
| CategoryNav | Server | Category metadata | Category links |

### Server vs Client Components

**Server Components (default):**
- ArticlePage
- ArticleContent
- CategoryNav
- RelatedArticles

**Client Components (interactive):**
- TableOfContents (scroll tracking)
- SearchBar (user input)
- ThemeToggle (state management)

## Static Generation Strategy

### generateStaticParams Implementation

```typescript
// app/docs/[slug]/page.tsx
import { getAllArticles } from '@/lib/content/loader'

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  return <ArticleContent article={article} />
}
```

### Category Pages

```typescript
// app/category/[category]/page.tsx
export async function generateStaticParams() {
  const categories = await getAllCategories()

  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const articles = await getArticlesByCategory(category)

  return <ArticleList articles={articles} category={category} />
}
```

### Metadata Generation

```typescript
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  return {
    title: `${article.title} | Cold Calling Wiki`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  }
}
```

## Content Processing Pipeline

### 1. Parser (lib/content/parser.ts)

```typescript
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

export async function parseMarkdownFile(filepath: string) {
  const fileContents = await fs.readFile(filepath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    frontmatter: data as Frontmatter,
    content,
    slug: path.basename(filepath, '.md'),
  }
}
```

**Dependencies:**
- `gray-matter` for frontmatter extraction
- Node.js `fs` (server-only)

### 2. Transformer (lib/content/transformer.ts)

```typescript
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

export async function transformMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, { theme: 'nord' })
    .use(rehypeStringify)
    .process(content)

  return {
    html: result.toString(),
    headings: extractHeadings(result), // For TOC
  }
}
```

**Dependencies:**
- `unified` + `remark`/`rehype` ecosystem
- `@shikijs/rehype` for syntax highlighting (modern, faster than Prism)

### 3. Loader (lib/content/loader.ts)

```typescript
import { cache } from 'react'
import { parseMarkdownFile, transformMarkdown } from './parser'

// Cache prevents re-parsing during build
export const getArticle = cache(async (slug: string) => {
  const filepath = path.join(process.cwd(), 'content/docs', `${slug}.md`)
  const { frontmatter, content } = await parseMarkdownFile(filepath)
  const { html, headings } = await transformMarkdown(content)

  return {
    ...frontmatter,
    slug,
    html,
    headings,
  }
})

export const getAllArticles = cache(async () => {
  const docsDir = path.join(process.cwd(), 'content/docs')
  const files = await fs.readdir(docsDir)

  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '')
      return getArticle(slug)
    })
  )

  return articles.sort((a, b) => a.order - b.order)
})
```

**Key pattern:** Use React's `cache()` to memoize during build time.

## Build Order

### Dependency Chain

```
1. Content Files (*.md)
   ↓
2. Parser (extract frontmatter)
   ↓
3. Transformer (markdown → HTML)
   ↓
4. Loader (query interface)
   ↓
5. generateStaticParams (discover all routes)
   ↓
6. Page Components (render with data)
   ↓
7. Static HTML (output)
```

### Build-time vs Runtime

| Concern | Build-time | Runtime |
|---------|-----------|---------|
| Read markdown files | YES | NO (FS not available) |
| Parse frontmatter | YES | NO |
| Transform markdown to HTML | YES | NO |
| Syntax highlighting | YES | NO (expensive) |
| Generate TOC | YES | NO |
| Search index | YES (pre-compute) | NO (use pre-built index) |
| Filtering/sorting | YES (pre-compute) | Client (from pre-built data) |

**Decision:** Process everything at build time, export minimal JSON for client-side search.

## Patterns to Follow

### Pattern 1: Colocated Frontmatter
**What:** Metadata lives in the markdown file, not separate config
**When:** Always for article-level metadata
**Example:**
```markdown
---
title: "Cold Calling Scripts That Work"
category: "scripts"
order: 5
excerpt: "Proven scripts for different industries"
date: "2026-01-15"
---

# Cold Calling Scripts That Work
```

### Pattern 2: Type-safe Content Schema
**What:** Define TypeScript types for frontmatter
**When:** Always
**Example:**
```typescript
export interface ArticleFrontmatter {
  title: string
  category: string
  order: number
  excerpt: string
  date: string
  tags?: string[]
}
```

### Pattern 3: React Cache for Build Optimization
**What:** Wrap loaders in `cache()` to prevent re-parsing
**When:** All content loaders
**Example:**
```typescript
import { cache } from 'react'

export const getArticle = cache(async (slug: string) => {
  // Expensive parsing only happens once per slug
})
```

### Pattern 4: Search Index Pre-computation
**What:** Generate search index at build time, ship to client
**When:** For client-side search
**Example:**
```typescript
// scripts/generate-search-index.ts
const articles = await getAllArticles()
const index = articles.map(a => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  content: a.content.slice(0, 500), // Truncate
}))

await fs.writeFile('public/search-index.json', JSON.stringify(index))
```

Client loads `/search-index.json` and uses Fuse.js for fuzzy search.

### Pattern 5: Incremental Static Regeneration (ISR) — Optional
**What:** Regenerate pages on-demand after deploy
**When:** If content updates post-deploy (unlikely for 28-article wiki)
**Example:**
```typescript
export const revalidate = 3600 // Revalidate every hour
```

**Verdict:** NOT needed for this project (content updates = new deploy).

## Anti-Patterns to Avoid

### Anti-Pattern 1: Runtime Markdown Processing
**What:** Parsing markdown on every request
**Why bad:** Slow, expensive, defeats static generation
**Instead:** Process at build time, serve static HTML

### Anti-Pattern 2: Client Components for Static Content
**What:** Using `'use client'` for article content
**Why bad:** Larger bundles, slower hydration
**Instead:** Server Components for static content, Client only for interactive parts (search, TOC scrollspy)

### Anti-Pattern 3: Fetching Content from API
**What:** `/api/articles/[slug]` endpoint that reads markdown
**Why bad:** Adds latency, defeats static generation
**Instead:** Direct filesystem access in server components

### Anti-Pattern 4: Single Monolithic Loader
**What:** One `getContent()` function that returns everything
**Why bad:** Loads unnecessary data, slow builds
**Instead:** Granular loaders (`getArticle`, `getCategories`, `getRelated`)

### Anti-Pattern 5: Manual Slug Management
**What:** Hardcoding slug lists
**Why bad:** Breaks when content added
**Instead:** Auto-discover from filesystem in `generateStaticParams`

## Scalability Considerations

| Concern | At 28 articles | At 100 articles | At 1000 articles |
|---------|---------------|-----------------|------------------|
| Build time | <30s | <2min | Consider partial builds |
| Search | Client-side OK | Client-side OK | Server-side search (Algolia) |
| Categories | Flat structure | Nested OK | Taxonomy required |
| TOC generation | Per-article | Per-article | Per-article (same) |
| Related articles | Compute at build | Compute at build | Pre-compute similarity scores |

**Current project:** 28 articles → all patterns above work perfectly.

## Recommended Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 App Router | React Server Components, static generation |
| Content | Markdown (.md) | Simple, portable, version-controllable |
| Frontmatter | gray-matter | Standard, well-maintained |
| Markdown → HTML | unified + remark + rehype | Flexible, plugin ecosystem |
| Syntax highlighting | Shiki | Modern, faster than Prism, better themes |
| Search | Fuse.js (client-side) | Fuzzy search, no backend needed |
| TOC generation | remark-toc or custom | Extract headings during transform |
| Styling | Tailwind CSS | Fast development, consistent design system |

## File Structure Example

```
coldcallingwiki/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Homepage
│   ├── docs/
│   │   ├── layout.tsx                # Wiki layout (sidebar, breadcrumbs)
│   │   ├── page.tsx                  # Docs index (all articles)
│   │   └── [slug]/
│   │       └── page.tsx              # Individual article
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx              # Category listing
│   └── search/
│       └── page.tsx                  # Search interface
├── content/
│   └── docs/
│       ├── getting-started.md
│       ├── cold-calling-scripts.md
│       └── ... (28 articles)
├── lib/
│   └── content/
│       ├── parser.ts                 # gray-matter + fs
│       ├── transformer.ts            # unified + remark/rehype
│       └── loader.ts                 # getArticle, getAllArticles
├── components/
│   ├── article/
│   │   ├── ArticleContent.tsx
│   │   ├── ArticleHeader.tsx
│   │   └── TableOfContents.tsx
│   └── navigation/
│       ├── CategoryNav.tsx
│       └── SearchBar.tsx
├── public/
│   └── search-index.json             # Generated at build
└── scripts/
    └── generate-search-index.ts      # Build-time script
```

## Implementation Sequence

For coldcallingwiki.com redesign, build in this order:

### Phase 1: Content Foundation
1. Create `/content/docs` directory
2. Migrate 28 articles to markdown with frontmatter
3. Build `lib/content/parser.ts` (gray-matter)
4. Build `lib/content/transformer.ts` (unified pipeline)
5. Build `lib/content/loader.ts` (query functions)

### Phase 2: Core Routes
6. Build `app/docs/[slug]/page.tsx` with `generateStaticParams`
7. Test static generation (`npm run build` → verify .html files)
8. Build `app/docs/layout.tsx` (sidebar, breadcrumbs)

### Phase 3: Navigation & Discovery
9. Build `app/category/[category]/page.tsx`
10. Build category navigation component
11. Build article index page (`app/docs/page.tsx`)

### Phase 4: Search & Polish
12. Generate search index (build script)
13. Build client-side search component
14. Build Table of Contents component
15. Add related articles logic

### Phase 5: Design & Optimization
16. Apply bold/energetic design system
17. Optimize fonts, animations
18. Add metadata/SEO
19. Performance audit

## Open Questions

1. **MDX vs Markdown:** If interactivity needed in articles (embed React components), use MDX. For pure content, stick with markdown.
   - **Recommendation:** Start with markdown, migrate to MDX only if needed.

2. **Draft articles:** How to handle unpublished content?
   - **Pattern:** Add `draft: true` to frontmatter, filter in loader.

3. **Versioning:** Track article update history?
   - **Pattern:** Git history is sufficient for 28 articles. For user-facing "Last updated" dates, use frontmatter.

4. **Multi-language:** Future i18n support?
   - **Pattern:** Not needed now, but if added: `/content/en/docs`, `/content/es/docs` structure.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Route structure | HIGH | Standard Next.js App Router pattern |
| Component architecture | HIGH | Server/Client split well-established |
| Content pipeline | HIGH | unified ecosystem is industry standard |
| Build strategy | HIGH | generateStaticParams is core Next.js feature |
| Search approach | MEDIUM | Multiple valid approaches (client vs server) |
| Scalability | MEDIUM | Based on typical project growth, not tested at 1000+ articles |

**Overall confidence:** HIGH for 28-article static wiki with Next.js 16 App Router.

## Sources

- Next.js App Router documentation (training data through January 2025)
- unified/remark/rehype ecosystem documentation
- Standard patterns for static site generators (Gatsby, Astro, Nextra as reference)
- React 19 Server Components patterns

**Note:** This research is based on training data (Next.js 16 patterns available through January 2025). For latest Next.js updates or breaking changes after that date, verify with official Next.js documentation.
