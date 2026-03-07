"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { categories, articles } from "@/lib/articles";
import { getArticleIcon, IconPhone, IconTarget, IconFire, IconShield, IconSteps, IconLock, IconHandRaised } from "@/components/Icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-charcoal-50/30 dark:from-charcoal-900/60 dark:via-charcoal-900/40 dark:to-charcoal-800/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(249,115,22,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(200,255,0,0.05),transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 sm:pt-32">
          <div className="text-center">
            {/* Badge — blur in */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-fire-500/30 bg-fire-500/10 px-4 py-1.5 text-sm text-fire-500 dark:text-fire-400"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fire-500" />
              {articles.length} Expert Articles
            </motion.div>

            {/* Heading — slide up with spring */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 100, damping: 15 }}
              className="font-heading text-4xl font-bold leading-tight tracking-tight text-charcoal-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              Master the Art of
              <br />
              <span className="bg-gradient-to-r from-fire-400 via-fire-500 to-volt bg-clip-text text-transparent">
                Cold Calling
              </span>
            </motion.h1>

            {/* Subtitle — blur in with delay */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-500 dark:text-charcoal-300 sm:text-xl"
            >
              Expert techniques, battle-tested scripts, and psychological
              frameworks to turn cold calls into warm conversations.
            </motion.p>

            {/* CTA buttons — scale up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 150, damping: 18 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="#categories"
                className="group inline-flex items-center gap-2 rounded-xl bg-fire-600 px-6 py-3 font-heading font-semibold text-white transition-all hover:bg-fire-500 hover:shadow-lg hover:shadow-fire-500/25"
              >
                Start Learning
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/article/call-structure"
                className="inline-flex items-center gap-2 rounded-xl border border-charcoal-300 px-6 py-3 font-heading font-semibold text-charcoal-500 transition-all hover:border-charcoal-400 hover:text-charcoal-900 dark:border-charcoal-600 dark:text-charcoal-300 dark:hover:border-charcoal-500 dark:hover:text-white"
              >
                Beginner? Start Here
              </Link>
            </motion.div>
          </div>

          {/* Quick Problem Selector — staggered from alternating sides */}
          <ScrollReveal effect="blur" delay={0.1} className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-4 text-center font-heading text-sm font-bold uppercase tracking-widest text-charcoal-400">
              Pick your biggest problem
            </h2>
            <StaggerContainer className="grid gap-2 sm:grid-cols-2" stagger={0.06} delay={0.1}>
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
                  <StaggerItem key={i} effect={i % 2 === 0 ? "slide-right" : "slide-left"}>
                    <Link
                      href={item.link}
                      className="flex items-center gap-3 rounded-lg border border-charcoal-200/60 bg-white/40 px-4 py-3 text-sm text-charcoal-500 backdrop-blur-sm transition-all hover:border-fire-500/50 hover:bg-white/70 hover:text-charcoal-900 dark:border-charcoal-700/50 dark:bg-charcoal-800/40 dark:text-charcoal-300 dark:hover:bg-charcoal-800/70 dark:hover:text-white"
                    >
                      <ItemIcon className="h-4 w-4 shrink-0 text-fire-500 dark:text-fire-400" />
                      <span>{item.problem}</span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="relative bg-charcoal-50/50 py-20 dark:bg-charcoal-800/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal effect="blur" className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal-900 dark:text-white sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mt-3 text-charcoal-400">
              {articles.length} articles organized into {categories.length} categories
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.slug} category={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* All Articles — grouped by category */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal effect="blur" className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal-900 dark:text-white sm:text-4xl">
              All Articles
            </h2>
            <p className="mt-3 text-charcoal-400">
              {articles.length} guides grouped by topic
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {categories.map((cat) => {
              const catArticles = articles.filter((a) => a.category === cat.slug);
              if (catArticles.length === 0) return null;
              return (
                <ScrollReveal key={cat.slug} effect="blur" delay={0.05}>
                  {/* Category header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${cat.color} text-white text-lg`}>
                      {cat.emoji}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-charcoal-900 dark:text-white">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-charcoal-400">{catArticles.length} article{catArticles.length > 1 ? "s" : ""}</p>
                    </div>
                  </div>

                  {/* Articles list */}
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {catArticles.map((article) => {
                      const ArticleIcon = getArticleIcon(article.slug);
                      return (
                        <Link
                          key={article.slug}
                          href={`/article/${article.slug}`}
                          className="group flex items-center gap-3 rounded-lg border border-charcoal-200/50 bg-white/40 px-4 py-3 backdrop-blur-sm transition-all hover:border-fire-500/40 hover:bg-white/70 hover:shadow-sm dark:border-charcoal-700/40 dark:bg-charcoal-800/30 dark:hover:border-fire-500/30 dark:hover:bg-charcoal-800/60"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-charcoal-100/80 text-charcoal-400 transition-colors group-hover:bg-fire-500/10 group-hover:text-fire-500 dark:bg-charcoal-700/60 dark:text-charcoal-500 dark:group-hover:bg-fire-500/15 dark:group-hover:text-fire-400">
                            <ArticleIcon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-charcoal-800 transition-colors group-hover:text-fire-500 dark:text-charcoal-100 dark:group-hover:text-fire-400">
                              {article.title}
                            </h4>
                            <p className="mt-0.5 text-xs text-charcoal-400 dark:text-charcoal-500">
                              {article.readingTime} min read · {article.excerpt.slice(0, 60)}…
                            </p>
                          </div>
                          <svg className="h-4 w-4 shrink-0 text-charcoal-300 transition-transform group-hover:translate-x-0.5 group-hover:text-fire-500 dark:text-charcoal-600 dark:group-hover:text-fire-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-charcoal-200/50 bg-gradient-to-b from-charcoal-50/40 to-transparent py-20 dark:border-charcoal-800/50 dark:from-charcoal-800/30 dark:to-transparent">
        <ScrollReveal effect="scale" className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-3xl font-bold text-charcoal-900 dark:text-white">
            Struggling with Cold Calling?
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-lg text-charcoal-400"
          >
            Join 300K+ followers and get trained by Giulio Segantini.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 150, damping: 18 }}
          >
            <a
              href="https://www.underdogsales.com/individuals?utm_source=coldcallwiki"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-volt px-6 py-3 font-heading font-bold text-charcoal-900 transition-all hover:bg-volt-dark hover:shadow-lg hover:shadow-volt/25"
            >
              Check out the Academy
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </ScrollReveal>
      </section>
    </>
  );
}
