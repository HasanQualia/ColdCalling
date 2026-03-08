"use client";

import Link from "next/link";
import { categories, articles } from "@/lib/articles";
import { getArticleIcon, getCategoryIcon, IconPhone, IconTarget, IconFire, IconShield, IconSteps, IconLock, IconHandRaised } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* Hero — clean, Wikipedia-like */}
      <section className="border-b border-navy-100 bg-warm">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl flex-1">
              {/* Live badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-3.5 py-1.5 text-sm font-semibold text-gold-800">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
                </span>
                The #1 Cold Calling Resource
              </div>

              <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">
                Master the Art of{" "}
                <span className="text-gold-600">Cold Calling</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-navy-600 sm:text-xl">
                Expert techniques, battle-tested scripts, and psychological
                frameworks to turn cold calls into warm conversations.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="#categories"
                  className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-navy-800"
                >
                  Start Learning
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/article/call-structure"
                  className="inline-flex items-center gap-2 rounded-lg border border-navy-200 px-5 py-2.5 text-sm font-semibold text-navy-700 transition-all hover:border-navy-300 hover:bg-white"
                >
                  Beginner? Start Here
                </Link>
                <span className="ml-1 rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                  {articles.length} articles
                </span>
              </div>
            </div>

            {/* Giulio headshot */}
            <div className="flex shrink-0 justify-center md:justify-end">
              <div className="relative">
                <img
                  src="/giulio-headshot.webp"
                  alt="Giulio Segantini — Underdog Sales"
                  className="h-48 w-48 rounded-2xl object-cover shadow-lg sm:h-56 sm:w-56"
                />
                <div className="absolute -bottom-3 -right-3 rounded-lg bg-navy-900 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                  300K+ Followers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Problem Selector */}
      <section className="border-b border-navy-100">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <h2 className="mb-4 font-heading text-xs font-bold uppercase tracking-widest text-navy-400">
            Pick your biggest problem
          </h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { problem: "Fear of picking up the phone", link: "/article/sales-attitude", icon: IconHandRaised },
              { problem: "Less than 10% pick up rate", link: "/article/building-the-list", icon: IconTarget },
              { problem: "Prospects hang up at intro", link: "/article/openers", icon: IconPhone },
              { problem: "Pitch doesn't resonate", link: "/article/the-pitch", icon: IconFire },
              { problem: "Getting stuck on objections", link: "/article/sales-objections", icon: IconShield },
              { problem: "Can't convert to meetings", link: "/article/call-structure", icon: IconSteps },
              { problem: "Struggling with gatekeepers", link: "/article/gatekeeper", icon: IconLock },
              { problem: "Don't know where to start", link: "/article/call-structure", icon: IconSteps },
            ].map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.link}
                  className="flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 text-sm text-navy-700 transition-all hover:border-gold-400 hover:bg-gold-50"
                >
                  <ItemIcon className="h-4 w-4 shrink-0 text-gold-600" />
                  <span>{item.problem}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="border-b border-navy-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
            Browse by Category
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            {articles.length} articles organized into {categories.length} categories
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => {
              const CatIcon = getCategoryIcon(cat.slug);
              const count = articles.filter((a) => a.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group rounded-xl border border-navy-100 bg-white p-5 transition-all hover:border-gold-300 hover:shadow-md hover:shadow-gold-100/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-100 group-hover:text-gold-700">
                    <CatIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-bold text-navy-900 group-hover:text-gold-700">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-500">
                    {cat.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold-600">
                      {count} {count === 1 ? "article" : "articles"}
                    </span>
                    <svg className="h-4 w-4 text-navy-300 transition-transform group-hover:translate-x-1 group-hover:text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Articles — grouped by category */}
      <section className="bg-warm">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
            All Articles
          </h2>
          <p className="mt-2 text-sm text-navy-500">
            {articles.length} guides grouped by topic
          </p>

          <div className="mt-8 space-y-10">
            {categories.map((cat) => {
              const catArticles = articles.filter((a) => a.category === cat.slug);
              if (catArticles.length === 0) return null;
              const CatIcon = getCategoryIcon(cat.slug);
              return (
                <div key={cat.slug}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-white text-sm">
                      {cat.emoji}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-navy-900">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-navy-400">{catArticles.length} article{catArticles.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {catArticles.map((article) => {
                      const ArticleIcon = getArticleIcon(article.slug);
                      return (
                        <Link
                          key={article.slug}
                          href={`/article/${article.slug}`}
                          className="group flex items-center gap-3 rounded-lg border border-navy-100 bg-white px-4 py-3 transition-all hover:border-gold-300 hover:shadow-sm"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy-50 text-navy-500 transition-colors group-hover:bg-gold-100 group-hover:text-gold-700">
                            <ArticleIcon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-navy-800 group-hover:text-gold-700">
                              {article.title}
                            </h4>
                            <p className="mt-0.5 text-xs text-navy-400">
                              {article.readingTime} min read
                            </p>
                          </div>
                          <svg className="h-4 w-4 shrink-0 text-navy-200 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy-100 bg-navy-900">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Struggling with Cold Calling?
          </h2>
          <p className="mt-3 text-navy-300">
            Join 300K+ followers and get trained by Giulio Segantini.
          </p>
          <a
            href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 font-heading font-bold text-navy-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
          >
            Check out the Academy
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
