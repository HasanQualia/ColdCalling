import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle, getRelatedArticles, categories } from "@/lib/articles";
import { ArticleRenderer } from "@/components/ArticleRenderer";
import { ReadingProgress } from "@/components/ReadingProgress";
import { AnimatedArticlePage } from "@/components/AnimatedArticlePage";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticle(slug);
    if (!article) return { title: "Not Found" };
    return {
      title: `${article.title} — Cold Calling Wiki`,
      description: article.excerpt,
      openGraph: {
        title: `${article.title} — Cold Calling Wiki`,
        description: article.excerpt,
        type: "article",
      },
    };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);
  const category = categories.find((c) => c.slug === article.category);

  return (
    <>
      <ReadingProgress />
      <AnimatedArticlePage
        title={article.title}
        readingTime={article.readingTime}
        slug={article.slug}
        categorySlug={category?.slug}
        categoryName={category?.name}
        content={<ArticleRenderer content={article.content} />}
        related={related.map((r) => ({
          slug: r.slug,
          title: r.title,
          readingTime: r.readingTime,
        }))}
      />
    </>
  );
}
