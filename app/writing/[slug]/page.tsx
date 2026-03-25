import { getWritingPosts, getPost } from "@/lib/content";
import { Prose } from "@/components/prose";
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
  return { title: post.title, description: post.description };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("writing", slug);
  if (!post) notFound();

  return (
    <>
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
        <Prose content={post.content} />
      </article>
      {slug === "revisiting-mario" && <RunningMario />}
    </>
  );
}
