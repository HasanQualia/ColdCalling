"use client";

import Link from "next/link";
import { categories } from "@/lib/articles";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://cdn.prod.website-files.com/690b1090d92ceadd368ab122/690b29fd719b235787ea75f8_DIV%20(2).svg"
                alt="Cold Calling Wiki"
                className="h-7 w-7"
              />
              <span className="font-heading text-lg font-bold text-navy-900">
                Cold Calling Wiki
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">
              Your complete guide to mastering cold calling. Expert tips, scripts, and strategies.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-navy-400">
              Categories
            </h4>
            <ul className="mt-3 space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-navy-500 transition-colors hover:text-gold-600"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-navy-400">
              Popular
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/article/openers" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  Cold Call Openers
                </Link>
              </li>
              <li>
                <Link href="/article/sales-objections" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  Handling Objections
                </Link>
              </li>
              <li>
                <Link href="/article/call-structure" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  Call Structure
                </Link>
              </li>
              <li>
                <Link href="/article/the-pitch" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  The Pitch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-navy-400">
              Follow
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://www.linkedin.com/in/underdogsales/" target="_blank" rel="noopener noreferrer" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCZMxBf2bL-p3J6wW9eWC2oQ" target="_blank" rel="noopener noreferrer" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/underdogsales/" target="_blank" rel="noopener noreferrer" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@underdogsales" target="_blank" rel="noopener noreferrer" className="text-sm text-navy-500 transition-colors hover:text-gold-600">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-100 pt-6 text-center text-xs text-navy-400">
          Cold Calling Wiki — Built by{" "}
          <a
            href="https://www.underdogsales.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-600 hover:text-gold-500"
          >
            Underdog Sales
          </a>
        </div>
      </div>
    </footer>
  );
}
