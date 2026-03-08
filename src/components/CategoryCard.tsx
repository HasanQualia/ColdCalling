"use client";

import Link from "next/link";
import { type Category, getArticlesByCategory } from "@/lib/articles";
import { getCategoryIcon } from "./Icons";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const articleCount = getArticlesByCategory(category.slug).length;
  const CategoryIcon = getCategoryIcon(category.slug);

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group rounded-xl border border-navy-100 bg-white p-5 transition-all hover:border-gold-300 hover:shadow-md hover:shadow-gold-100/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-100 group-hover:text-gold-700">
        <CategoryIcon className="h-5 w-5" />
      </div>
      <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 group-hover:text-gold-700">
        {category.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy-500">
        {category.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-gold-600">
          {articleCount} {articleCount === 1 ? "article" : "articles"}
        </span>
        <svg className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
