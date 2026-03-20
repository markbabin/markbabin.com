import { getPhotos, getPost } from "@/lib/content";
import { Prose } from "@/components/prose";
import { FlickerHeading } from "@/components/flicker-heading";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getPhotos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("photos", slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PhotoPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("photos", slug);
  if (!post) notFound();

  return (
    <article className="space-y-6">
      <header>
        <FlickerHeading text={post.title} className="text-3xl font-semibold" />
        <div className="mt-2 flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <span>
            {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.rating !== undefined && <span>&middot; {post.rating}/10</span>}
        </div>
      </header>
      <Prose content={post.content} />
    </article>
  );
}
