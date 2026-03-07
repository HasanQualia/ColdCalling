"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";
import { IconPhone } from "./Icons";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal-200/50 bg-white/70 backdrop-blur-xl dark:border-charcoal-800/50 dark:bg-charcoal-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fire-500/10 text-fire-500 transition-colors group-hover:bg-fire-500/20">
              <IconPhone className="h-4 w-4" />
            </div>
            <span className="font-heading text-lg font-bold text-charcoal-900 transition-colors group-hover:text-fire-500 dark:text-white dark:group-hover:text-volt sm:text-xl">
              Cold Calling Wiki
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-charcoal-200 bg-charcoal-50 px-3 py-1.5 text-sm text-charcoal-500 transition-all hover:border-fire-500 hover:text-charcoal-900 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-charcoal-400 dark:hover:text-white"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden rounded bg-charcoal-200 px-1.5 py-0.5 text-xs text-charcoal-500 dark:bg-charcoal-700 dark:text-charcoal-400 sm:inline">
                /
              </kbd>
            </button>

            <ThemeToggle />

            <Link
              href="/#categories"
              className="rounded-lg bg-fire-600 px-3 py-1.5 text-sm font-semibold text-white transition-all hover:bg-fire-500"
            >
              Browse
            </Link>
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
