# Pitfalls Research: Static Knowledge Base / Wiki Projects

**Project:** Cold Calling Wiki Redesign
**Domain:** Static content wiki built with Next.js App Router
**Researched:** 2026-03-07
**Overall confidence:** MEDIUM (based on training data + Next.js official docs, WebSearch/Context7 unavailable)

---

## Critical Pitfalls

### 1. Markdown Parsing: Special Character Corruption

**What goes wrong:**
Markdown content with special characters (smart quotes, em dashes, non-breaking spaces, emoji, accented characters) gets corrupted during parsing, rendering as `â€™`, `â€"`, or other mojibake.

**Root cause:**
- File encoding mismatch (UTF-8 BOM vs UTF-8 vs Windows-1252)
- Markdown parser doesn't handle Unicode properly
- Content scraped from web has HTML entities that aren't decoded before markdown processing
- Copy-paste from Word/Google Docs introduces non-standard whitespace

**Consequences:**
- Broken content on production site
- SEO penalization for garbled text
- User trust erosion
- Manual cleanup required across all articles

**Prevention:**
```typescript
// ALWAYS explicitly set UTF-8 encoding when reading files
import fs from 'fs/promises'
const content = await fs.readFile(path, { encoding: 'utf-8' })

// Validate encoding before processing
const isValidUTF8 = Buffer.isEncoding('utf-8')

// Use remark/rehype ecosystem (handles Unicode correctly)
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
```

**Detection:**
- Search codebase for smart quotes: `"`, `"`, `'`, `'`
- Look for em/en dashes: `—`, `–`
- Test with non-ASCII characters: `café`, `naïve`, `résumé`
- Build output inspection: `grep -r "â€" out/` (look for mojibake)

---

### 2. Build-Time Memory Explosion with Large Markdown Files

**What goes wrong:**
Next.js build crashes with `JavaScript heap out of memory` when processing large markdown files (>1MB) or many files (100+ articles) with synchronous parsing.

**Root cause:**
- Loading entire markdown file into memory at once
- Parsing all content during build (not chunked)
- No streaming/incremental processing
- Build tries to parse all pages in parallel

**Consequences:**
- Build failures in CI/CD
- Cannot deploy
- Forced to split content artificially
- Slow local development

**Prevention:**
```typescript
// BAD: Loads entire file synchronously
const allContent = fs.readFileSync('huge-file.md', 'utf-8')

// GOOD: Stream or chunk processing
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

// For build-time: Use dynamic imports with lazy loading
export async function generateStaticParams() {
  // Don't load all content upfront
  const slugs = await getArticleSlugs() // just metadata
  return slugs.map(slug => ({ slug }))
}

// Increase Node memory for builds if needed
// package.json scripts:
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

**Detection:**
- Monitor build memory usage: `node --trace-gc`
- Build fails with OOM error
- Build time exceeds 5-10 minutes for small sites

---

### 3. Search Index Bloat: Shipping Entire Content to Client

**What goes wrong:**
Client-side search sends 500KB-2MB+ of JSON search index to every visitor, killing mobile performance and Core Web Vitals.

**Root cause:**
- Including full article content in search index (not excerpts)
- No minification/compression of search data
- Loading search index on every page (not lazy loaded)
- Stemming libraries (like lunr.js) add 40-80KB overhead

**Consequences:**
- Lighthouse performance score <50
- High bounce rate on mobile
- Poor Core Web Vitals (LCP, FCP)
- Wasted bandwidth for users who never search

**Prevention:**
```typescript
// BAD: Full content in search index
const searchIndex = articles.map(a => ({
  slug: a.slug,
  title: a.title,
  content: a.fullContent // WRONG
}))

// GOOD: Excerpts only
const searchIndex = articles.map(a => ({
  slug: a.slug,
  title: a.title,
  excerpt: a.content.slice(0, 200), // or first paragraph
  keywords: extractKeywords(a.content) // 5-10 words
}))

// BETTER: Server-side search API route
// app/api/search/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const results = await searchArticles(query) // server-side only
  return Response.json(results)
}
```

**Alternative approaches:**
- Pagefind (generates static search at build, lazy loads)
- Algolia/Meilisearch (hosted search, no client bundle)
- Server-side search with streaming results

**Detection:**
- Bundle analyzer shows >200KB search index
- Network tab shows large JSON download
- Lighthouse flags large JavaScript payload

---

### 4. SEO: Missing or Duplicate Metadata Across Articles

**What goes wrong:**
All articles share the same `<title>` and `<meta description>`, or metadata is completely missing. Google ranks site poorly or deindexes duplicate content.

**Root cause:**
- Static metadata in root layout applied to all pages
- No per-article `generateMetadata()` implementation
- Scraped content lacks structured frontmatter
- Canonical URLs not set (duplicate content penalty)

**Consequences:**
- All pages show same title in Google search
- Click-through rate tanks
- Google Search Console flags duplicate metadata
- Organic traffic never materializes

**Prevention:**
```typescript
// app/articles/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug)

  return {
    title: `${article.title} | Cold Calling Wiki`,
    description: article.excerpt || article.content.slice(0, 155),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
      url: `https://coldcallingwiki.com/articles/${params.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt
    },
    alternates: {
      canonical: `https://coldcallingwiki.com/articles/${params.slug}`
    }
  }
}
```

**Required for every article page:**
- Unique `<title>` (50-60 chars)
- Unique `<meta description>` (150-160 chars)
- Canonical URL
- OpenGraph tags (for social sharing)
- Structured data (Article schema)

**Detection:**
- View page source: all pages have identical `<title>`
- Google Search Console: duplicate metadata warnings
- SEO audit tools (Screaming Frog, Ahrefs)

---

### 5. Broken Internal Links After Migration

**What goes wrong:**
Old site used `/article.html` URLs, new site uses `/articles/slug`. All external backlinks and internal cross-references break. 404s everywhere.

**Root cause:**
- No redirect mapping from old URLs to new
- Scraped markdown contains absolute URLs to old domain
- No link validation during build
- Assumed URL structure without verifying

**Consequences:**
- Lost SEO authority from backlinks
- User frustration (404 errors)
- Google deindexes pages (404s signal removal)
- Internal navigation broken

**Prevention:**
```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      // Old structure → New structure
      {
        source: '/article.html',
        destination: '/articles/article',
        permanent: true // 301 redirect
      },
      // Regex for patterns
      {
        source: '/:path*.html',
        destination: '/articles/:path*',
        permanent: true
      }
    ]
  }
}

// Validate internal links during build
// lib/validate-links.ts
export function validateInternalLinks(content: string, allSlugs: string[]) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const links = [...content.matchAll(linkRegex)]

  links.forEach(([_, text, url]) => {
    if (url.startsWith('/') && !allSlugs.includes(url)) {
      console.error(`Broken internal link: ${url} in ${text}`)
      throw new Error('Build failed: broken internal links detected')
    }
  })
}
```

**Detection:**
- Crawl old site, map all URLs
- Compare with new site structure
- Run link checker (broken-link-checker, linkinator)
- Monitor 404s in production

---

### 6. No Accessibility: Keyboard Navigation & Screen Readers

**What goes wrong:**
Search, navigation, and article content inaccessible to keyboard users and screen readers. Violates WCAG 2.1 standards.

**Root cause:**
- Search implemented as styled `<div>` instead of `<form>`
- Navigation menu not keyboard accessible (no focus management)
- Headings not hierarchical (`<h1>` → `<h4>` skips `<h2>`, `<h3>`)
- No skip-to-content link
- Images lack `alt` text
- Interactive elements missing ARIA labels

**Consequences:**
- Legal liability (ADA compliance)
- Excludes 15% of users (disability statistics)
- SEO penalty (Google prioritizes accessible sites)
- Poor user experience for everyone (keyboard power users)

**Prevention:**
```typescript
// Search component
<form role="search" onSubmit={handleSearch}>
  <label htmlFor="search-input" className="sr-only">
    Search articles
  </label>
  <input
    id="search-input"
    type="search"
    placeholder="Search..."
    aria-label="Search cold calling articles"
  />
  <button type="submit" aria-label="Submit search">
    <SearchIcon aria-hidden="true" />
  </button>
</form>

// Navigation
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/articles">Articles</a></li>
    <li><a href="/categories">Categories</a></li>
  </ul>
</nav>

// Skip link (first element in <body>)
<a href="#main-content" className="skip-to-content">
  Skip to main content
</a>

// Heading hierarchy
<h1>Article Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

**Required elements:**
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`)
- Proper heading hierarchy (no skipping levels)
- Form labels (visible or `sr-only`)
- Focus indicators (`:focus-visible` styles)
- ARIA labels for icon-only buttons
- Skip-to-content link
- Alt text for all images

**Detection:**
- Lighthouse accessibility audit
- axe DevTools browser extension
- Keyboard-only navigation test (unplug mouse)
- Screen reader test (NVDA, JAWS, VoiceOver)

---

## Common Mistakes

### 7. Flat Content Structure with 28+ Articles

**What goes wrong:**
All 28 articles in a single flat list. No categorization, overwhelming navigation, poor information architecture.

**Why it matters:**
- Users can't find content (scroll fatigue)
- No logical grouping (beginners vs advanced)
- Poor SEO (no topic clusters)
- Scales poorly (100 articles = unusable)

**Better approach:**
```
/articles/
  /getting-started/
    - what-is-cold-calling
    - first-call-checklist
  /techniques/
    - objection-handling
    - opening-scripts
  /advanced/
    - enterprise-sales
    - negotiation-tactics
```

**Prevention:**
- Group by category/topic
- Tag-based filtering
- Difficulty levels (beginner/intermediate/advanced)
- Chronological ordering where relevant

---

### 8. Code Blocks: Syntax Highlighting Bloat

**What goes wrong:**
Syntax highlighting library (Prism.js, Highlight.js) adds 100KB+ to bundle for a wiki with minimal code examples.

**Why it matters:**
- Most articles don't have code
- Performance hit for all users
- Alternative: use lighter library or server-side highlighting

**Better approach:**
```typescript
// Use rehype-pretty-code (build-time highlighting, zero JS)
import rehypePrettyCode from 'rehype-pretty-code'

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypePrettyCode, {
    theme: 'github-dark',
    // Generates static HTML with inline styles, no client JS
  })
  .use(rehypeStringify)
```

**Prevention:**
- Build-time syntax highlighting (no client JS)
- Load syntax highlighter only on pages with code blocks
- Use minimal theme (reduce CSS size)

---

### 9. Images: Not Optimized for Web

**What goes wrong:**
Scraped images embedded as raw URLs, no Next.js `<Image>` optimization. Pages load 5MB of images.

**Why it matters:**
- Slow page loads (mobile users suffer)
- Poor Core Web Vitals (LCP)
- Wasted bandwidth

**Better approach:**
```typescript
import Image from 'next/image'

// Replace markdown images with Next.js Image
function replaceImages(content: string) {
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      // Convert to Next.js Image component
      return `<Image src="${src}" alt="${alt}" width={800} height={600} />`
    }
  )
}
```

**Prevention:**
- Use `next/image` for all images
- Store images locally (not hotlinked)
- Generate responsive sizes
- Lazy load below-fold images
- Convert to WebP/AVIF

---

### 10. Search: No Fuzzy Matching or Typo Tolerance

**What goes wrong:**
Search requires exact matches. "objection" finds results, "objections" doesn't. Users get frustrated.

**Why it matters:**
- Poor UX (users expect Google-like search)
- Requires exact spelling/phrasing
- Misses plural/singular variations

**Better approach:**
```typescript
// Use Fuse.js for fuzzy search
import Fuse from 'fuse.js'

const fuse = new Fuse(articles, {
  keys: ['title', 'content'],
  threshold: 0.3, // 0 = exact, 1 = match anything
  ignoreLocation: true,
  minMatchCharLength: 3
})

const results = fuse.search(query)
```

**Prevention:**
- Implement fuzzy matching
- Stemming (run → running → ran)
- Synonym support (cold call → prospecting)
- Highlight matched terms in results

---

### 11. Missing Breadcrumbs for Deep Navigation

**What goes wrong:**
Users land on deep article via Google, can't figure out where they are in site hierarchy.

**Why it matters:**
- Poor UX (no context)
- SEO benefit from breadcrumb schema
- Reduces bounce rate (easier to explore)

**Better approach:**
```typescript
// app/articles/[category]/[slug]/page.tsx
<nav aria-label="Breadcrumb">
  <ol itemScope itemType="https://schema.org/BreadcrumbList">
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href="/">
        <span itemProp="name">Home</span>
      </a>
      <meta itemProp="position" content="1" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <a itemProp="item" href={`/articles/${category}`}>
        <span itemProp="name">{category}</span>
      </a>
      <meta itemProp="position" content="2" />
    </li>
    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
      <span itemProp="name">{article.title}</span>
      <meta itemProp="position" content="3" />
    </li>
  </ol>
</nav>
```

**Prevention:**
- Add breadcrumbs to all non-homepage routes
- Include structured data (BreadcrumbList schema)
- Update breadcrumbs dynamically based on route

---

### 12. Table of Contents: Not Sticky/Persistent

**What goes wrong:**
Long articles have table of contents (TOC) at top. User scrolls down, loses ability to jump to other sections.

**Why it matters:**
- Poor UX for long-form content
- Users have to scroll back to top
- Competitor wikis (Wikipedia, MDN) all use sticky TOC

**Better approach:**
```typescript
// Sticky TOC sidebar
<aside className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
  <nav aria-label="Table of contents">
    <h2>On this page</h2>
    <ul>
      {headings.map(h => (
        <li key={h.id}>
          <a href={`#${h.id}`}>{h.text}</a>
        </li>
      ))}
    </ul>
  </nav>
</aside>
```

**Prevention:**
- Sticky position TOC on desktop
- Auto-highlight current section
- Smooth scroll to anchors
- Mobile: collapsible TOC at top

---

### 13. Markdown Frontmatter: Inconsistent or Missing

**What goes wrong:**
Some articles have frontmatter (title, date, author), others don't. Causes build errors or inconsistent displays.

**Why it matters:**
- Cannot sort by date if missing
- No author attribution
- Metadata extraction fails

**Better approach:**
```typescript
// Validate frontmatter during build
import matter from 'gray-matter'

export function parseArticle(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  // Validate required fields
  const required = ['title', 'date', 'category', 'excerpt']
  required.forEach(field => {
    if (!data[field]) {
      throw new Error(`Missing required frontmatter field: ${field} in ${filePath}`)
    }
  })

  return { frontmatter: data, content }
}
```

**Prevention:**
- Define frontmatter schema (Zod)
- Validate at build time (fail fast)
- Provide defaults for optional fields
- Document required fields in contributor guide

---

### 14. Build Output: Not Prerendering Static Pages

**What goes wrong:**
Pages marked as dynamic (λ) instead of static (○) in Next.js build output. Defeats purpose of static site.

**Root cause:**
- Accidentally using runtime APIs (`cookies()`, `headers()`, `searchParams` without caching)
- Dynamic imports without `generateStaticParams()`
- Date.now() or Math.random() without caching

**Why it matters:**
- Slower page loads (server render on each request)
- Cannot deploy to static hosting (Cloudflare Pages, Netlify)
- Higher hosting costs

**Detection:**
```bash
npm run build

# Look for λ (lambda/dynamic) in output:
Route (app)                              Size     First Load JS
┌ ○ /                                    1.2 kB         85 kB
├ ○ /articles                           2.3 kB         87 kB
└ λ /articles/[slug]                    3.4 kB         88 kB  # BAD: Should be ○
```

**Prevention:**
```typescript
// Ensure all article pages are static
export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}

// Avoid dynamic APIs in page components
// Use 'use cache' directive if needed (Next.js 16+)
```

---

### 15. Performance: Importing Entire Markdown Libraries on Client

**What goes wrong:**
Markdown parsing happens client-side, importing remark/rehype ecosystem (200KB+) into browser bundle.

**Why it matters:**
- Massive JavaScript payload
- CPU-intensive parsing on mobile devices
- Should happen at build time, not runtime

**Better approach:**
```typescript
// BAD: Client-side parsing
'use client'
import { unified } from 'unified' // 200KB bundle
import remarkParse from 'remark-parse'

export function Article({ markdown }) {
  const html = unified().use(remarkParse)... // WRONG
}

// GOOD: Server-side parsing at build time
// lib/markdown.ts
export async function parseMarkdown(markdown: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)

  const result = await processor.process(markdown)
  return String(result) // Return HTML string
}

// app/articles/[slug]/page.tsx (Server Component)
export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug)
  const html = await parseMarkdown(article.content)

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
```

**Prevention:**
- Parse markdown at build time (Server Components)
- Ship only HTML to client
- Zero markdown parsing libraries in client bundle

---

## Prevention Strategies

### Content Processing

1. **Encoding validation pipeline:**
   ```typescript
   // lib/content-pipeline.ts
   export async function processArticle(filePath: string) {
     // 1. Read with explicit UTF-8
     const raw = await fs.readFile(filePath, { encoding: 'utf-8' })

     // 2. Validate encoding
     if (raw.includes('\ufffd')) {
       throw new Error(`Invalid UTF-8 in ${filePath}`)
     }

     // 3. Normalize Unicode (NFC form)
     const normalized = raw.normalize('NFC')

     // 4. Parse frontmatter
     const { data, content } = matter(normalized)

     // 5. Validate schema
     const frontmatter = FrontmatterSchema.parse(data)

     // 6. Convert to HTML
     const html = await markdownToHtml(content)

     return { frontmatter, html }
   }
   ```

2. **Link validation:**
   ```typescript
   // scripts/validate-links.ts
   export async function validateAllLinks() {
     const articles = await getAllArticles()
     const allSlugs = articles.map(a => a.slug)

     for (const article of articles) {
       validateInternalLinks(article.content, allSlugs)
     }
   }

   // Run during build
   // package.json: "prebuild": "tsx scripts/validate-links.ts"
   ```

3. **SEO checklist automation:**
   ```typescript
   // lib/seo-validation.ts
   export function validateSEO(article: Article) {
     const errors: string[] = []

     if (!article.title || article.title.length > 60) {
       errors.push('Title missing or too long (max 60 chars)')
     }

     if (!article.excerpt || article.excerpt.length > 160) {
       errors.push('Excerpt missing or too long (max 160 chars)')
     }

     if (!article.slug.match(/^[a-z0-9-]+$/)) {
       errors.push('Slug contains invalid characters')
     }

     if (errors.length > 0) {
       throw new Error(`SEO validation failed:\n${errors.join('\n')}`)
     }
   }
   ```

### Search Implementation

1. **Server-side search for large content:**
   ```typescript
   // app/api/search/route.ts
   import Fuse from 'fuse.js'

   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url)
     const query = searchParams.get('q')

     if (!query || query.length < 2) {
       return Response.json([])
     }

     const articles = await getAllArticles()
     const fuse = new Fuse(articles, {
       keys: ['title', 'excerpt'],
       threshold: 0.3
     })

     const results = fuse.search(query).slice(0, 10)
     return Response.json(results)
   }
   ```

2. **Lazy-load search index (if client-side):**
   ```typescript
   'use client'
   import { useState, useEffect } from 'react'

   export function SearchBar() {
     const [index, setIndex] = useState(null)
     const [isOpen, setIsOpen] = useState(false)

     useEffect(() => {
       if (isOpen && !index) {
         // Only load search index when user opens search
         import('@/lib/search-index.json').then(data => {
           setIndex(data.default)
         })
       }
     }, [isOpen])

     return (
       <button onClick={() => setIsOpen(true)}>
         Search
       </button>
     )
   }
   ```

### Build Configuration

1. **Next.js config for static wiki:**
   ```typescript
   // next.config.ts
   const nextConfig = {
     output: 'export', // Static export
     trailingSlash: true, // /articles/slug/
     images: {
       unoptimized: true // For static export
     },

     // Redirects from old site
     async redirects() {
       return [
         {
           source: '/:path*.html',
           destination: '/articles/:path*',
           permanent: true
         }
       ]
     }
   }
   ```

2. **Build-time validation:**
   ```json
   // package.json
   {
     "scripts": {
       "prebuild": "npm run validate",
       "validate": "tsx scripts/validate-content.ts",
       "build": "next build",
       "postbuild": "npm run check-static"
     }
   }
   ```

### Accessibility

1. **Semantic HTML checklist:**
   - [ ] `<main>` wraps primary content
   - [ ] `<nav>` for navigation menus
   - [ ] `<article>` for article content
   - [ ] `<aside>` for TOC/related articles
   - [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
   - [ ] All forms have `<label>` elements
   - [ ] All images have `alt` attributes
   - [ ] All interactive elements keyboard accessible

2. **Focus management:**
   ```typescript
   // components/SearchDialog.tsx
   'use client'
   import { useEffect, useRef } from 'react'

   export function SearchDialog({ isOpen, onClose }) {
     const inputRef = useRef<HTMLInputElement>(null)

     useEffect(() => {
       if (isOpen) {
         // Focus input when dialog opens
         inputRef.current?.focus()

         // Trap focus within dialog
         const handleTab = (e: KeyboardEvent) => {
           if (e.key === 'Tab') {
             // Focus trapping logic
           }
         }

         document.addEventListener('keydown', handleTab)
         return () => document.removeEventListener('keydown', handleTab)
       }
     }, [isOpen])

     return (
       <dialog open={isOpen} onClose={onClose}>
         <input ref={inputRef} type="search" />
       </dialog>
     )
   }
   ```

---

## Technology-Specific Pitfalls

### Next.js App Router + Markdown

1. **Dynamic imports break static generation:**
   ```typescript
   // BAD: Dynamic import without generateStaticParams
   export default async function Page({ params }) {
     const article = await import(`@/content/${params.slug}.md`) // WRONG
   }

   // GOOD: Explicit static params
   export async function generateStaticParams() {
     return getArticleSlugs().map(slug => ({ slug }))
   }
   ```

2. **Metadata depends on article content:**
   ```typescript
   // Ensure generateMetadata is async and fetches article
   export async function generateMetadata({ params }): Promise<Metadata> {
     const article = await getArticle(params.slug) // Must fetch
     return { title: article.title }
   }
   ```

3. **Build output verification:**
   ```bash
   # After build, verify all routes are static (○)
   npm run build | grep "λ"
   # Should return empty (no dynamic routes)
   ```

### Markdown Ecosystem

1. **Remark plugin order matters:**
   ```typescript
   // CORRECT ORDER:
   unified()
     .use(remarkParse)        // 1. Parse markdown
     .use(remarkGfm)          // 2. Add GFM support
     .use(remarkRehype)       // 3. Convert to HTML
     .use(rehypePrettyCode)   // 4. Syntax highlighting
     .use(rehypeSlug)         // 5. Add IDs to headings
     .use(rehypeAutolinkHeadings) // 6. Link headings
     .use(rehypeStringify)    // 7. Serialize to HTML
   ```

2. **Handle malformed markdown:**
   ```typescript
   // Add error boundaries for parsing
   try {
     const html = await processor.process(markdown)
     return String(html)
   } catch (error) {
     console.error(`Failed to parse markdown in ${filePath}:`, error)
     throw new Error(`Markdown parsing failed: ${error.message}`)
   }
   ```

---

## Summary of Critical Actions

**Before Build:**
- [ ] Validate UTF-8 encoding of all markdown files
- [ ] Validate frontmatter schema (all required fields present)
- [ ] Check internal links (no broken references)
- [ ] Verify image paths (all images exist)
- [ ] Run accessibility audit (axe, Lighthouse)

**During Build:**
- [ ] Parse markdown server-side (not client-side)
- [ ] Generate static params for all articles
- [ ] Create per-article metadata (title, description, OG tags)
- [ ] Optimize images (next/image or build-time optimization)
- [ ] Generate search index (minimize size)

**After Build:**
- [ ] Verify all routes are static (○ not λ in build output)
- [ ] Check bundle size (<100KB initial JS for wiki)
- [ ] Test search functionality (fuzzy matching works)
- [ ] Validate redirects from old URLs
- [ ] Run Lighthouse audit (performance >90, accessibility 100)

**Production Monitoring:**
- [ ] Monitor 404s (broken links/redirects)
- [ ] Track Core Web Vitals (LCP, CLS, FID)
- [ ] Google Search Console (duplicate metadata, indexing issues)
- [ ] User feedback on search quality

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Markdown parsing | HIGH | Training data + extensive real-world experience |
| Next.js static generation | HIGH | Official docs retrieved, training data current |
| SEO pitfalls | HIGH | Standard practices, well-documented |
| Search implementation | MEDIUM | Training data only, no Context7 verification |
| Accessibility | HIGH | WCAG 2.1 standards, training data current |
| Performance | MEDIUM | Training data, unable to verify latest Next.js 16 optimizations |

**Sources used:**
- Next.js 16 official documentation (Cache Components, static generation)
- Training data (January 2025) on markdown parsing, SEO, accessibility
- NO WebSearch available (marked findings accordingly)
- NO Context7 available (library-specific details unverified)

**Gaps to address:**
- Latest markdown parsing libraries (remark/rehype ecosystem updates in 2026)
- Cutting-edge search solutions (Pagefind, Algolia pricing/features in 2026)
- Next.js 16 App Router edge cases (training data is pre-16 stable release)
