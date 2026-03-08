"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { searchArticles, type Article } from "@/lib/articles";
import { getArticleIcon } from "./Icons";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length > 1) {
      setResults(searchArticles(value));
    } else {
      setResults([]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-navy-950/20 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-xl rounded-xl border border-navy-100 bg-white shadow-2xl">
        <div className="flex items-center gap-3 border-b border-navy-100 p-4">
          <svg className="h-5 w-5 text-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-lg text-navy-900 placeholder-navy-300 outline-none"
          />
          <kbd className="rounded bg-navy-50 px-2 py-0.5 text-xs text-navy-400">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((article) => {
              const ArticleIcon = getArticleIcon(article.slug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-navy-50"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-500">
                    <ArticleIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-heading font-semibold text-navy-900">{article.title}</p>
                    <p className="mt-0.5 truncate text-sm text-navy-400">{article.excerpt}</p>
                  </div>
                  <span className="mt-0.5 text-xs text-navy-400">{article.readingTime} min</span>
                </Link>
              );
            })}
          </div>
        )}

        {query.length > 1 && results.length === 0 && (
          <div className="p-8 text-center text-navy-400">
            No articles found for &ldquo;{query}&rdquo;
          </div>
        )}

        {query.length <= 1 && (
          <div className="p-6 text-center text-sm text-navy-400">
            Start typing to search across all articles
          </div>
        )}
      </div>
    </div>
  );
}
