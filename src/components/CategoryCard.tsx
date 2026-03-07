"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, rotateX: 15, y: 50, transformPerspective: 800 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, transformPerspective: 800 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-charcoal-200/60 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-fire-500/50 hover:bg-white/70 hover:shadow-lg hover:shadow-fire-500/10 dark:border-charcoal-700/50 dark:bg-charcoal-800/40 dark:hover:bg-charcoal-800/60"
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />

        <div className="relative">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-fire-500/10 text-fire-500 dark:bg-fire-500/15 dark:text-fire-400"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CategoryIcon className="h-5 w-5" />
          </motion.div>
          <h3 className="mt-3 font-heading text-xl font-bold text-charcoal-900 transition-colors group-hover:text-fire-500 dark:text-white dark:group-hover:text-fire-400">
            {category.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-charcoal-400">
            {category.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-fire-500">
              {articleCount} {articleCount === 1 ? "article" : "articles"}
            </span>
            <svg
              className="h-4 w-4 text-charcoal-400 transition-all group-hover:translate-x-1 group-hover:text-fire-400 dark:text-charcoal-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
