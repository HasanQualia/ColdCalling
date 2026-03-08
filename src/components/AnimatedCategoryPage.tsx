"use client";

import Link from "next/link";
import { getCategoryIcon, getArticleIcon } from "./Icons";
import { DocsLayout } from "./DocsLayout";

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
    <DocsLayout currentCategory={categorySlug}>
      {/* Breadcrumbs */}
      <nav className="mb-5 flex items-center gap-2 text-sm text-navy-400">
        <Link href="/" className="transition-colors hover:text-gold-600">
          Home
        </Link>
        <span className="text-navy-200">/</span>
        <span className="text-navy-600">{categoryName}</span>
      </nav>

      {/* Header */}
      <header className="mb-8 border-b border-navy-100 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
          <CatIcon className="h-6 w-6" />
        </div>
        <h1 className="mt-3 font-heading text-3xl font-extrabold text-navy-950 sm:text-4xl">
          {categoryName}
        </h1>
        <p className="mt-2 text-lg text-navy-500">
          {categoryDescription}
        </p>
        <p className="mt-1 text-sm text-navy-400">
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </p>
      </header>

      {/* Articles */}
      <div className="space-y-2">
        {articles.map((article) => {
          const ArtIcon = getArticleIcon(article.slug);
          return (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex items-start gap-4 rounded-lg border border-navy-100 bg-white p-4 transition-all hover:border-gold-300 hover:shadow-sm sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-500 transition-colors group-hover:bg-gold-100 group-hover:text-gold-700">
                <ArtIcon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-base font-semibold text-navy-800 group-hover:text-gold-700 sm:text-lg">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-navy-400 line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="mt-1.5 inline-block text-xs text-navy-400">
                  {article.readingTime} min read
                </span>
              </div>
              <svg
                className="mt-2 h-5 w-5 shrink-0 text-navy-200 transition-transform group-hover:translate-x-1 group-hover:text-gold-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          );
        })}
      </div>

      {articles.length === 0 && (
        <div className="rounded-lg border border-navy-100 bg-warm p-12 text-center">
          <p className="text-navy-500">No articles in this category yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block text-gold-600 hover:text-gold-500"
          >
            Browse all articles
          </Link>
        </div>
      )}
    </DocsLayout>
  );
}
