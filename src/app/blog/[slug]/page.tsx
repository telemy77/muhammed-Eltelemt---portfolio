import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPostsData } from "@/data/blog";
import ArticleContent from "@/components/blog/ArticleContent";

/* ─── static params ─── */
export async function generateStaticParams() {
  return blogPostsData
    .filter((p) => p.status === "published")
    .map((post) => ({ slug: post.slug }));
}

/* ─── metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/* ─── page ─── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related: other published posts, excluding current, limited to 2
  const relatedPosts = blogPostsData
    .filter((p) => p.status === "published" && p.id !== post.id)
    .slice(0, 2);

  return <ArticleContent post={post} relatedPosts={relatedPosts} />;
}
