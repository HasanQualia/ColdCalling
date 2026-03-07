import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, getArticlesByCategory } from "@/lib/articles";
import { AnimatedCategoryPage } from "@/components/AnimatedCategoryPage";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const category = categories.find((c) => c.slug === slug);
    if (!category) return { title: "Not Found" };
    return {
      title: `${category.name} — Cold Calling Wiki`,
      description: category.description,
    };
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const categoryArticles = getArticlesByCategory(slug);

  return (
    <AnimatedCategoryPage
      categorySlug={category.slug}
      categoryName={category.name}
      categoryDescription={category.description}
      articles={categoryArticles.map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        readingTime: a.readingTime,
      }))}
    />
  );
}
