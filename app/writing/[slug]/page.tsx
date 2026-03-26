import { getWritingPosts, getPost } from "@/lib/content";
import { FlickerHeading } from "@/components/flicker-heading";
import { RunningMario } from "@/components/running-mario";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getWritingPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("writing", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://babinmark.com/writing/${slug}`,
      publishedTime: post.date,
      authors: ["Mark Babin"],
    },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("writing", slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Mark Babin",
      url: "https://babinmark.com",
    },
    url: `https://babinmark.com/writing/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-6">
        <header>
          <FlickerHeading text={post.title} className="text-3xl font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-oswald)" }} />
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>
        <article
          className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-zinc-900 dark:prose-a:text-zinc-100 prose-a:underline prose-a:underline-offset-2"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      {slug === "revisiting-mario" && <RunningMario />}
    </>
  );
}
