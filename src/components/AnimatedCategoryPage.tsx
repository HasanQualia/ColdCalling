"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { getCategoryIcon, getArticleIcon } from "./Icons";

interface CategoryArticle {
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
}

interface AnimatedCategoryPageProps {
  categorySlug: string;
  categoryName: string;
  categoryDescription: string;
  articles: CategoryArticle[];
}

export function AnimatedCategoryPage({
  categorySlug,
  categoryName,
  categoryDescription,
  articles,
}: AnimatedCategoryPageProps) {
  const CatIcon = getCategoryIcon(categorySlug);
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Breadcrumbs — slide in from left */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="mb-8 flex items-center gap-2 text-sm text-charcoal-400 dark:text-charcoal-500"
      >
        <Link href="/" className="transition-colors hover:text-fire-400">
          Home
        </Link>
        <span>/</span>
        <span className="text-charcoal-600 dark:text-charcoal-300">{categoryName}</span>
      </motion.nav>

      {/* Header — staggered */}
      <header className="mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 12 }}
          className="flex h-14 w-14 items-center justify-center rounded-xl bg-fire-500/10 text-fire-500 dark:bg-fire-500/15 dark:text-fire-400"
        >
          <CatIcon className="h-7 w-7" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 font-heading text-3xl font-bold text-charcoal-900 dark:text-white sm:text-4xl"
        >
          {categoryName}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-lg text-charcoal-400"
        >
          {categoryDescription}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-2 text-sm text-charcoal-400 dark:text-charcoal-500"
        >
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </motion.p>
      </header>

      {/* Articles — staggered slide in from right */}
      <StaggerContainer className="space-y-3" stagger={0.08} delay={0.2}>
        {articles.map((article) => {
          const ArtIcon = getArticleIcon(article.slug);
          return (
          <StaggerItem key={article.slug} effect="slide-left">
            <Link
              href={`/article/${article.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-charcoal-200/60 bg-white/50 p-5 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:bg-white/70 dark:border-charcoal-700/50 dark:bg-charcoal-800/40 dark:hover:bg-charcoal-800/60"
            >
              <motion.div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-charcoal-100 text-charcoal-500 transition-colors group-hover:bg-fire-500/10 group-hover:text-fire-500 dark:bg-charcoal-700 dark:text-charcoal-400 dark:group-hover:text-fire-400"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
              >
                <ArtIcon className="h-5 w-5" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-lg font-semibold text-charcoal-900 transition-colors group-hover:text-fire-500 dark:text-white dark:group-hover:text-fire-400">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-charcoal-400 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="mt-2 inline-block text-xs text-charcoal-400 dark:text-charcoal-500">
                  {article.readingTime} min read
                </span>
              </div>
              <svg
                className="mt-2 h-5 w-5 shrink-0 text-charcoal-300 transition-all group-hover:translate-x-1 group-hover:text-fire-400 dark:text-charcoal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </StaggerItem>
          );
        })}
      </StaggerContainer>

      {articles.length === 0 && (
        <div className="rounded-xl border border-charcoal-200/60 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-charcoal-700/50 dark:bg-charcoal-800/40">
          <p className="text-charcoal-400">No articles in this category yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-fire-500 hover:text-fire-400"
          >
            Browse all articles
          </Link>
        </div>
      )}
    </div>
  );
}
