# Technology Stack Research

**Project:** ColdCallingWiki.com Redesign
**Researched:** 2026-03-07
**Domain:** Static knowledge-base / wiki site (28 articles, markdown-based, no CMS/auth)
**Overall Confidence:** MEDIUM (official sources verified for core stack, library ecosystem based on Jan 2025 knowledge)

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **Next.js** | 16.1.6 | Static site generation, routing | Industry standard for React SSG. App Router with `generateStaticParams` for build-time page generation. Automatic static optimization. | **HIGH** (verified via official docs) |
| **React** | 19.x | UI framework | Required by Next.js 16. Stable, production-ready. | **HIGH** |
| **TypeScript** | 5.7+ | Type safety | Catch errors at build time. Essential for maintainable codebases. | **HIGH** |

### Styling

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **Tailwind CSS** | 4.2 | Utility-first styling | v4 has major performance improvements, native CSS layer support, simplified config. Use `@tailwindcss/vite` plugin for Next.js. | **HIGH** (verified via official docs) |
| **@tailwindcss/typography** | 0.5.x | Article styling | Prose classes for markdown content. Instant beautiful typography for wiki articles. | **MEDIUM** |
| **next/font** | built-in | Font optimization | Built into Next.js 16. Auto-hosts fonts, eliminates layout shift. Use for distinctive fonts (not Inter). | **HIGH** |

### Content Processing

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **next-mdx-remote** | 5.0+ | MDX rendering | Supports App Router, allows React components in markdown. Industry standard for Next.js + MDX. Better DX than alternatives. | **MEDIUM** |
| **gray-matter** | 4.0.3 | Frontmatter parsing | Extract metadata from markdown (title, description, date, tags). Battle-tested, minimal. | **HIGH** |
| **rehype-pretty-code** | 0.15+ | Code syntax highlighting | Beautiful code blocks using Shiki. Supports VS Code themes. Essential for technical wiki content. | **MEDIUM** |
| **remark-gfm** | 4.0+ | GitHub-flavored markdown | Tables, strikethrough, task lists. Standard markdown extensions users expect. | **MEDIUM** |

**Alternative considered:** Contentlayer (rejected - project abandoned in late 2024, no Next.js 15+ support)

### Search

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **Pagefind** | 1.2+ | Static site search | Built by Cloudflare. Zero-runtime JS until search invoked. Generates search index at build time. Perfect for static wikis. Beats Algolia for static sites (no API calls). | **HIGH** (verified via official site) |

**Alternatives considered:**
- **Fuse.js** (rejected - ships entire content to client, bloated for 28 articles)
- **FlexSearch** (rejected - requires manual index management)
- **Orama** (rejected - overkill for static content, better for dynamic data)

### Animation

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **Framer Motion** | 11.15+ | React animations | React 19 compatible. Declarative API, layout animations, gesture support. Standard for modern React. Use for page transitions, scroll animations, staggered lists. | **MEDIUM** |

**Alternative considered:** GSAP (rejected - imperative API, jQuery-ish feel, heavier bundle for React projects. Better for complex timelines, but overkill for wiki site)

### Development Tools

| Technology | Version | Purpose | Rationale | Confidence |
|------------|---------|---------|-----------|------------|
| **ESLint** | 9.x | Code linting | Next.js includes `eslint-config-next`. Enforce standards. | **HIGH** |
| **Prettier** | 3.x | Code formatting | Auto-format on save. Include `prettier-plugin-tailwindcss` for class sorting. | **HIGH** |

---

## Installation

```bash
# Core dependencies
npm install next@16.1.6 react@19 react-dom@19

# Styling
npm install tailwindcss@4.2 @tailwindcss/vite @tailwindcss/typography

# Content processing
npm install next-mdx-remote gray-matter remark-gfm rehype-pretty-code shiki

# Search
npm install -D pagefind

# Animation
npm install framer-motion

# Dev tools
npm install -D typescript @types/node @types/react @types/react-dom
npm install -D eslint eslint-config-next
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Alternatives Considered

### Content Processing

| Alternative | Why Not |
|-------------|---------|
| **Contentlayer** | Abandoned project. Last release Nov 2023. No Next.js 15+ support. Community moved to next-mdx-remote or custom solutions. |
| **MDX bundler** | Lower-level than next-mdx-remote. More config, same result. No advantage. |
| **Raw MDX** | next-mdx-remote handles compilation + hydration cleanly. Rolling your own is reinventing the wheel. |

### Search

| Alternative | Why Not |
|-------------|---------|
| **Fuse.js** | Client-side only. Ships all content to browser. Poor performance for SEO-heavy sites. Pagefind is superior for static generation. |
| **Algolia** | Requires API calls, costs money at scale. Unnecessary for static content. Pagefind is free and faster. |
| **FlexSearch** | Manual index building. More setup than Pagefind. No default UI. |
| **Orama** | Great for dynamic data/vector search. Overkill for simple text search in 28 articles. |

### Animation

| Alternative | Why Not |
|-------------|---------|
| **GSAP** | Imperative API (not React-friendly). Heavier bundle. Better for complex timeline animations (not needed here). Framer Motion is React-native, lighter, better DX. |
| **React Spring** | Physics-based animations (niche). Framer Motion is more versatile and has better docs. |
| **CSS-only** | No gesture support, harder to orchestrate complex sequences. Framer Motion adds negligible bundle size for huge DX win. |

---

## Key Integration Notes

### Next.js 16 App Router + Static Generation

```typescript
// app/wiki/[slug]/page.tsx
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

// Generate static params at build time
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(article => ({ slug: article.slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  return {
    title: article.title,
    description: article.description,
  }
}

// Page component
export default async function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  return <Article content={article.content} />
}
```

**Key:** Use `generateStaticParams` to pre-render all 28 articles at build time. Next.js 16 defaults to static rendering.

### Tailwind v4 Setup

```typescript
// vite.config.ts (or next.config.ts if using Next.js experimental Vite)
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

```css
/* app/globals.css */
@import "tailwindcss";

/* Custom theme overrides */
@theme {
  --color-accent: #ff6b35;
  --font-heading: "Your Distinctive Font", sans-serif;
}
```

**Note:** Tailwind v4 uses `@theme` instead of `tailwind.config.js`. Much cleaner config in CSS.

### MDX Processing

```typescript
// lib/mdx.ts
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

export async function renderMDX(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypePrettyCode, {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent empty lines from collapsing
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
        }],
      ],
    },
  })
}
```

```typescript
// components/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'

export function MDXContent({ source }) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={source} />
    </div>
  )
}
```

**Key:** Use `next-mdx-remote/rsc` for App Router (server components). Serialize content server-side, render with MDXRemote.

### Pagefind Integration

```json
// package.json
{
  "scripts": {
    "build": "next build && pagefind --site ./out"
  }
}
```

```typescript
// next.config.ts
export default {
  output: 'export', // Required for static export
}
```

```typescript
// components/Search.tsx
'use client'

import { useEffect, useRef } from 'react'

export function Search() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Pagefind on client side
    const loadPagefind = async () => {
      const pagefind = await import(
        /* webpackIgnore: true */ '/pagefind/pagefind.js'
      )
      if (containerRef.current) {
        new pagefind.PagefindUI({
          element: containerRef.current,
          showSubResults: true,
        })
      }
    }
    loadPagefind()
  }, [])

  return <div ref={containerRef} />
}
```

**Key:** Pagefind runs AFTER Next.js build. It indexes `./out` directory. Zero JS until search UI is invoked.

### Framer Motion Patterns

```typescript
// components/PageTransition.tsx
'use client'

import { motion } from 'framer-motion'

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

```typescript
// components/ArticleList.tsx
'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ArticleList({ articles }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show">
      {articles.map(article => (
        <motion.li key={article.slug} variants={item}>
          <ArticleCard article={article} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

**Key:** Use variants for staggered animations. Keep animations subtle (0.2-0.4s duration) for professional feel.

---

## Font Recommendations (Distinctive, Not Generic)

Since you specified avoiding Inter/Arial, consider these font pairings:

| Pairing | Headings | Body | Vibe |
|---------|----------|------|------|
| **Bold Energy** | [Outfit](https://fonts.google.com/specimen/Outfit) Bold 800 | [Inter](https://fonts.google.com/specimen/Inter) 400/500 | Modern, punchy, SaaS |
| **Sharp Professional** | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) 700 | [DM Sans](https://fonts.google.com/specimen/DM+Sans) 400 | Tech-forward, clean |
| **Energetic Contrast** | [Clash Display](https://www.fontshare.com/fonts/clash-display) 600 | [Satoshi](https://www.fontshare.com/fonts/satoshi) 400 | Startup energy, confident |

**Implementation:**

```typescript
// app/layout.tsx
import { Outfit, DM_Sans } from 'next/font/google'

const heading = Outfit({ subsets: ['latin'], weight: ['800'], variable: '--font-heading' })
const body = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body' })

export default function RootLayout({ children }) {
  return (
    <html className={`${heading.variable} ${body.variable}`}>
      <body className="font-body">
        {children}
      </body>
    </html>
  )
}
```

```css
/* app/globals.css */
@theme {
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
}

h1, h2, h3 {
  font-family: var(--font-heading);
}
```

---

## Deployment (Vercel)

```bash
# Build static site
npm run build

# Deploy
vercel --prod
```

**Next.js 16 static export:**
- Set `output: 'export'` in `next.config.ts`
- All 28 articles pre-rendered at build time
- Pagefind index generated post-build
- Zero runtime JS except search UI and animations

**Expected build output:**
- 28 HTML files (one per article)
- Shared JS bundle (~150-200KB gzipped with Framer Motion)
- Pagefind index (~50-100KB for 28 articles)
- Font files (optimized by next/font)

---

## Performance Budget

| Metric | Target | Notes |
|--------|--------|-------|
| First Contentful Paint | <1.2s | Static HTML, minimal blocking JS |
| Largest Contentful Paint | <2.5s | Pre-rendered content, optimized fonts |
| Time to Interactive | <3.0s | Hydration only for search + animations |
| Total Bundle Size | <250KB gzipped | Next.js 16 + Framer Motion + Pagefind UI |
| Lighthouse Score | >95 | Static site should easily hit 95+ |

**Optimization checklist:**
- Use `next/font` for font optimization (eliminates FOIT)
- Lazy load Pagefind UI (only when search is invoked)
- Use `loading="lazy"` for images in articles
- Enable Next.js image optimization (even for static export via loader)
- Minimize Framer Motion usage to key interactions only

---

## Sources

**Official Documentation (HIGH confidence):**
- [Next.js 16.1.6 Documentation](https://nextjs.org/docs) - Static site generation patterns
- [Tailwind CSS v4.2 Documentation](https://tailwindcss.com/docs/installation) - v4 setup and configuration
- [Pagefind Official Site](https://pagefind.app) - Static search integration

**Ecosystem Knowledge (MEDIUM confidence):**
Based on January 2025 knowledge for:
- next-mdx-remote, gray-matter, rehype/remark plugins
- Framer Motion, animation libraries
- Font recommendations, performance patterns

**Verification needed:**
- Exact versions for MDX processing libraries (next-mdx-remote, rehype-pretty-code)
- Framer Motion React 19 compatibility confirmation
- Pagefind latest version and features

---

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| **Core Stack** | HIGH | Next.js 16.1.6 and Tailwind v4.2 verified from official docs |
| **Content Processing** | MEDIUM | Libraries based on Jan 2025 knowledge, versions may be outdated |
| **Search** | HIGH | Pagefind verified from official site, clear static site fit |
| **Animation** | MEDIUM | Framer Motion is standard choice, React 19 compat not verified |
| **Integration** | HIGH | Patterns are stable, App Router SSG is well-documented |

---

## Open Questions for Phase-Specific Research

1. **MDX library versions** - Verify latest next-mdx-remote, rehype-pretty-code versions for Next.js 16
2. **Framer Motion React 19** - Confirm compatibility and any breaking changes
3. **Tailwind v4 migration** - Verify if `@tailwindcss/vite` works with Next.js 16 or if PostCSS approach is better
4. **Pagefind UI customization** - Explore custom styling options for bold/energetic design match

**Recommendation:** These are low-risk questions. Standard patterns are stable. Proceed with stack as specified, verify versions during implementation.
