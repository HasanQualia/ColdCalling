"use client";

import Link from "next/link";
import { categories } from "@/lib/articles";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { IconPhone } from "./Icons";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-200/50 bg-charcoal-50/50 backdrop-blur-sm dark:border-charcoal-800/50 dark:bg-charcoal-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          <StaggerItem effect="slide-up">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fire-500/10 text-fire-500">
                <IconPhone className="h-4 w-4" />
              </div>
              <span className="font-heading text-lg font-bold text-charcoal-900 dark:text-white">
                Cold Calling Wiki
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-400">
              Your complete guide to mastering cold calling. Expert tips, scripts, and strategies.
            </p>
          </StaggerItem>

          <StaggerItem effect="slide-up">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300">
              Categories
            </h4>
            <ul className="mt-3 space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-charcoal-400 transition-colors hover:text-fire-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem effect="slide-up">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300">
              Popular
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/article/openers" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  Cold Call Openers
                </Link>
              </li>
              <li>
                <Link href="/article/sales-objections" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  Handling Objections
                </Link>
              </li>
              <li>
                <Link href="/article/call-structure" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  Call Structure
                </Link>
              </li>
              <li>
                <Link href="/article/the-pitch" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  The Pitch
                </Link>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem effect="slide-up">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-charcoal-500 dark:text-charcoal-300">
              Follow
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://www.linkedin.com/in/underdogsales/" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCZMxBf2bL-p3J6wW9eWC2oQ" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/underdogsales/" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@underdogsales" target="_blank" rel="noopener noreferrer" className="text-sm text-charcoal-400 transition-colors hover:text-fire-400">
                  TikTok
                </a>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        <div className="mt-10 border-t border-charcoal-200 pt-6 text-center text-xs text-charcoal-400 dark:border-charcoal-800 dark:text-charcoal-500">
          Cold Calling Wiki — Built by{" "}
          <a
            href="https://www.underdogsales.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fire-500 hover:text-fire-400"
          >
            Underdog Sales
          </a>
        </div>
      </div>
    </footer>
  );
}
