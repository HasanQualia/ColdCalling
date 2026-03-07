"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { type ReactNode } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { getArticleIcon, getCategoryIcon } from "./Icons";

interface RelatedArticle {
  slug: string;
  title: string;
  readingTime: number;
}

interface AnimatedArticlePageProps {
  title: string;
  readingTime: number;
  slug: string;
  categorySlug?: string;
  categoryName?: string;
  content: ReactNode;
  related: RelatedArticle[];
}

export function AnimatedArticlePage({
  title,
  readingTime,
  slug,
  categorySlug,
  categoryName,
  content,
  related,
}: AnimatedArticlePageProps) {
  const ArticleIcon = getArticleIcon(slug);
  const CategoryIcon = categorySlug ? getCategoryIcon(categorySlug) : null;
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Breadcrumbs — fade in */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-8 flex items-center gap-2 text-sm text-charcoal-400 dark:text-charcoal-300"
      >
        <Link href="/" className="transition-colors hover:text-fire-400">
          Home
        </Link>
        <span>/</span>
        {categorySlug && categoryName && (
          <>
            <Link
              href={`/category/${categorySlug}`}
              className="transition-colors hover:text-fire-400"
            >
              {categoryName}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-charcoal-600 dark:text-charcoal-300">{title}</span>
      </motion.nav>

      {/* Header — staggered entrance */}
      <header className="mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 12 }}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-500/15 dark:text-fire-400"
        >
          <ArticleIcon className="h-7 w-7" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal-900 dark:text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex items-center gap-4 text-sm text-charcoal-400"
        >
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min read
          </span>
          {categorySlug && categoryName && (
            <Link
              href={`/category/${categorySlug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-fire-500/30 bg-fire-500/10 px-2.5 py-0.5 text-xs text-fire-500 transition-colors hover:bg-fire-500/20 dark:text-fire-400"
            >
              {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
              {categoryName}
            </Link>
          )}
        </motion.div>
      </header>

      {/* Content — slide up */}
      <ScrollReveal effect="slide" direction="up" duration={0.7}>
        <div className="rounded-2xl border border-charcoal-200/60 bg-white/50 p-6 backdrop-blur-sm dark:border-charcoal-500/40 dark:bg-charcoal-700/60 sm:p-8 lg:p-10">
          {content}
        </div>
      </ScrollReveal>

      {/* Related Articles — staggered cards */}
      {related.length > 0 && (
        <section className="mt-16">
          <ScrollReveal effect="blur">
            <h2 className="mb-6 font-heading text-xl font-bold text-charcoal-900 dark:text-white">
              Related Articles
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid gap-3 sm:grid-cols-3" stagger={0.1}>
            {related.map((rel) => {
              const RelIcon = getArticleIcon(rel.slug);
              return (
              <StaggerItem key={rel.slug} effect="flip">
                <Link
                  href={`/article/${rel.slug}`}
                  className="group block rounded-xl border border-charcoal-200/60 bg-white/50 p-4 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:bg-white/70 dark:border-charcoal-500/40 dark:bg-charcoal-700/60 dark:hover:bg-charcoal-800/60"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-charcoal-100 text-charcoal-500 transition-colors group-hover:bg-fire-500/10 group-hover:text-fire-500 dark:bg-charcoal-700 dark:text-charcoal-400 dark:group-hover:text-fire-400">
                    <RelIcon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-2 font-heading text-sm font-semibold text-charcoal-900 transition-colors group-hover:text-fire-500 dark:text-white dark:group-hover:text-fire-400">
                    {rel.title}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal-400 dark:text-charcoal-300">
                    {rel.readingTime} min read
                  </p>
                </Link>
              </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* CTA — scale in */}
      <ScrollReveal effect="scale" delay={0.1}>
        <div className="mt-16 rounded-2xl border border-charcoal-200/60 bg-gradient-to-r from-fire-50/50 to-white/50 p-8 text-center backdrop-blur-sm dark:border-charcoal-500/40 dark:from-fire-900/20 dark:to-charcoal-800/40">
          <h3 className="font-heading text-xl font-bold text-charcoal-900 dark:text-white">
            Want to level up your cold calling?
          </h3>
          <p className="mt-2 text-charcoal-400">
            Join 300K+ followers and get trained by Giulio Segantini.
          </p>
          <a
            href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fire-600 px-5 py-2.5 font-heading font-semibold text-white transition-all hover:bg-fire-500"
          >
            Check out the Academy
          </a>
        </div>
      </ScrollReveal>
    </article>
  );
}
