"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { getCategoryIcon } from "./Icons";
import { DocsLayout } from "./DocsLayout";

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
  const CategoryIcon = categorySlug ? getCategoryIcon(categorySlug) : null;

  return (
    <DocsLayout currentSlug={slug} currentCategory={categorySlug}>
      {/* Breadcrumbs */}
      <nav className="mb-5 flex items-center gap-2 text-sm text-navy-400">
        <Link href="/" className="transition-colors hover:text-gold-600">
          Home
        </Link>
        <span className="text-navy-200">/</span>
        {categorySlug && categoryName && (
          <>
            <Link
              href={`/category/${categorySlug}`}
              className="transition-colors hover:text-gold-600"
            >
              {categoryName}
            </Link>
            <span className="text-navy-200">/</span>
          </>
        )}
        <span className="text-navy-600">{title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8 border-b border-navy-100 pb-6">
        {categorySlug && categoryName && (
          <Link
            href={`/category/${categorySlug}`}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-navy-100 bg-navy-50 px-2.5 py-0.5 text-xs text-navy-600 transition-colors hover:border-gold-300 hover:bg-gold-50 hover:text-gold-700"
          >
            {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
            {categoryName}
          </Link>
        )}
        <h1 className="font-heading text-3xl font-extrabold leading-tight text-navy-950 sm:text-4xl">
          {title}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-navy-400">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min read
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="article-content mb-10">
        {content}
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-navy-100 bg-warm p-8 text-center">
        <h3 className="font-heading text-xl font-bold text-navy-900">
          Want to level up your cold calling?
        </h3>
        <p className="mt-2 text-navy-500">
          Join 300K+ followers and get trained by Giulio Segantini.
        </p>
        <a
          href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 font-heading font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:shadow-md hover:shadow-gold-500/20"
        >
          Check out the Academy
        </a>
      </div>
    </DocsLayout>
  );
}
