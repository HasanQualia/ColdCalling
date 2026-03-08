"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { categories, articles, getPrevNext } from "@/lib/articles";
import { getCategoryIcon, getArticleIcon } from "./Icons";

interface DocsLayoutProps {
  children: React.ReactNode;
  currentSlug?: string;
  currentCategory?: string;
}

function SidebarCategory({
  catSlug,
  catName,
  isActive,
  currentSlug,
  onLinkClick,
}: {
  catSlug: string;
  catName: string;
  isActive: boolean;
  currentSlug?: string;
  onLinkClick?: () => void;
}) {
  const catArticles = articles.filter((a) => a.category === catSlug);
  const [expanded, setExpanded] = useState(isActive);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isActive ? undefined : 0);
  const CatIcon = getCategoryIcon(catSlug);

  // Auto-expand when this category becomes active
  useEffect(() => {
    if (isActive && !expanded) setExpanded(true);
  }, [isActive, expanded]);

  useEffect(() => {
    if (!contentRef.current) return;
    if (expanded) {
      setHeight(contentRef.current.scrollHeight);
      // After transition, set to auto so it can grow dynamically
      const timer = setTimeout(() => setHeight(undefined), 250);
      return () => clearTimeout(timer);
    } else {
      // First set explicit height, then collapse to 0
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [expanded]);

  if (catArticles.length === 0) return null;

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ${
          isActive
            ? "bg-[#162D52]/[0.06] text-[#162D52]"
            : "text-navy-500 hover:bg-navy-50 hover:text-[#162D52]"
        }`}
      >
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all duration-200 ${
            isActive
              ? "bg-[#162D52] text-white shadow-sm"
              : "bg-navy-100/70 text-navy-500 group-hover:bg-[#162D52]/10 group-hover:text-[#162D52]"
          }`}
        >
          <CatIcon className="h-3.5 w-3.5" />
        </div>
        <span className="flex-1 text-[13px] font-bold uppercase tracking-wide">
          {catName}
        </span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-navy-300 transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[height] duration-250 ease-out"
        style={{ height: height !== undefined ? `${height}px` : "auto" }}
      >
        <ul className="ml-2 mt-1 space-y-0.5 border-l-2 border-navy-100 pl-2">
          {catArticles.map((article) => {
            const isArticleActive = article.slug === currentSlug;
            const ArtIcon = getArticleIcon(article.slug);
            return (
              <li key={article.slug}>
                <Link
                  href={`/article/${article.slug}`}
                  onClick={onLinkClick}
                  className={`group/item flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-all duration-150 ${
                    isArticleActive
                      ? "bg-gold-50 font-semibold text-[#162D52] shadow-[inset_2px_0_0_0] shadow-gold-500 -ml-[2px] pl-[12px]"
                      : "text-navy-600 hover:bg-[#162D52]/[0.04] hover:text-[#162D52]"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded transition-all duration-150 ${
                      isArticleActive
                        ? "bg-gold-100 text-gold-700"
                        : "bg-transparent text-navy-400 group-hover/item:bg-navy-100 group-hover/item:text-[#162D52]"
                    }`}
                  >
                    <ArtIcon className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate">{article.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function DocsLayout({ children, currentSlug, currentCategory }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { prev, next } = currentSlug ? getPrevNext(currentSlug) : { prev: null, next: null };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const sidebarContent = (
    <nav className="space-y-1.5">
      {categories.map((cat) => (
        <SidebarCategory
          key={cat.slug}
          catSlug={cat.slug}
          catName={cat.name}
          isActive={currentCategory === cat.slug}
          currentSlug={currentSlug}
          onLinkClick={() => setSidebarOpen(false)}
        />
      ))}
    </nav>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex gap-0 lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pr-2 pt-8">
            {sidebarContent}
          </div>
        </aside>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#162D52] text-white shadow-lg shadow-[#162D52]/25 transition-transform hover:scale-105 lg:hidden"
          aria-label="Open article navigation"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div
              className="fixed inset-0 bg-[#162D52]/25 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-10 w-80 overflow-y-auto bg-white p-4 shadow-xl">
              <div className="mb-4 flex items-center justify-between px-1">
                <span className="font-heading text-sm font-bold text-[#162D52]">All Articles</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-500 hover:bg-navy-50"
                  aria-label="Close"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 border-l border-navy-100 py-8 lg:pl-8">
          {children}

          {/* Prev / Next navigation */}
          {(prev || next) && (
            <div className="mt-12 flex items-stretch gap-4 border-t border-navy-100 pt-6">
              {prev ? (
                <Link
                  href={`/article/${prev.slug}`}
                  className="group flex flex-1 flex-col rounded-lg border border-navy-100 p-4 transition-all hover:border-gold-300 hover:bg-gold-50/50"
                >
                  <span className="text-xs text-navy-400">Previous</span>
                  <span className="mt-1 flex items-center gap-1.5 font-heading text-sm font-semibold text-[#162D52] group-hover:text-gold-700">
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link
                  href={`/article/${next.slug}`}
                  className="group flex flex-1 flex-col items-end rounded-lg border border-navy-100 p-4 text-right transition-all hover:border-gold-300 hover:bg-gold-50/50"
                >
                  <span className="text-xs text-navy-400">Next</span>
                  <span className="mt-1 flex items-center gap-1.5 font-heading text-sm font-semibold text-[#162D52] group-hover:text-gold-700">
                    {next.title}
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
