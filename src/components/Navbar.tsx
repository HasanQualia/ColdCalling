"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";
import { categories } from "@/lib/articles";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevScrolled = useRef(false);

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          if (isScrolled !== prevScrolled.current) {
            prevScrolled.current = isScrolled;
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "/" && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [searchOpen]);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
          scrolled ? "border-navy-100 shadow-sm" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-50 lg:hidden"
              aria-label="Open navigation"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="https://cdn.prod.website-files.com/690b1090d92ceadd368ab122/690b29fd719b235787ea75f8_DIV%20(2).svg"
                alt="Cold Calling Wiki"
                className="h-7 w-7"
              />
              <span className="font-heading text-lg font-bold text-navy-900">
                Cold Calling Wiki
              </span>
            </Link>
          </div>

          {/* Center: category links (desktop) */}
          <div className="hidden items-center gap-1 lg:flex">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="rounded-md px-3 py-1.5 text-sm text-navy-600 transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/#categories"
              className="rounded-md px-3 py-1.5 text-sm text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700"
            >
              All...
            </Link>
          </div>

          {/* Right: search + CTA */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50/50 px-3 py-1.5 text-sm text-navy-500 transition-colors hover:border-navy-200 hover:text-navy-700"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded bg-navy-100 px-1.5 py-0.5 text-xs text-navy-400 sm:inline">/</kbd>
            </button>

            <a
              href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gold-500 px-4 py-1.5 text-sm font-semibold text-navy-950 transition-all hover:bg-gold-400 hover:shadow-md hover:shadow-gold-500/20"
            >
              Academy
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="sidebar-overlay fixed inset-0 bg-navy-950/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="sidebar-panel fixed inset-y-0 left-0 z-10 w-72 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-navy-100 px-5">
              <span className="font-heading text-lg font-bold text-navy-900">Navigate</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-500 hover:bg-navy-50"
                aria-label="Close navigation"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-navy-700 hover:text-gold-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>

              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-400">
                Categories
              </p>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900"
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-navy-100 pt-4">
                <a
                  href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSidebarOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400"
                >
                  Join the Academy
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
