"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";


export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevScrolled = useRef(false);

  useEffect(() => {
    let ticking = false;
    function handleScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
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

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <nav
          className="navbar-morph w-full backdrop-blur-xl"
          data-scrolled={scrolled}
        >
          <div className="navbar-inner flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2">
              <img
                src="https://cdn.prod.website-files.com/690b1090d92ceadd368ab122/690b29fd719b235787ea75f8_DIV%20(2).svg"
                alt="Cold Calling Wiki"
                className="h-8 w-8 rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-heading text-base font-bold text-charcoal-900 transition-colors duration-300 group-hover:text-fire-500 dark:text-white dark:group-hover:text-volt sm:text-lg">
                Cold Calling Wiki
              </span>
            </Link>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-charcoal-200 bg-charcoal-50 px-2.5 py-1.5 text-sm text-charcoal-500 transition-colors duration-300 hover:border-fire-500 hover:text-charcoal-900 dark:border-charcoal-700 dark:bg-charcoal-800 dark:text-charcoal-400 dark:hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden text-sm sm:inline">Search...</span>
                <kbd className="hidden rounded bg-charcoal-200 px-1.5 py-0.5 text-xs text-charcoal-500 dark:bg-charcoal-700 dark:text-charcoal-400 sm:inline">/</kbd>
              </button>

              <ThemeToggle />

              <Link
                href="/#categories"
                className="rounded-lg bg-fire-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-fire-500"
              >
                Browse
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
