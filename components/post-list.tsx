import Link from "next/link";
import type { Post } from "@/lib/content";

interface PostListProps {
  posts: Post[];
  basePath: string;
  showRating?: boolean;
}

export function PostList({ posts, basePath, showRating }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">Nothing here yet.</p>
    );
  }

  return (
    <ul className="space-y-5">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`${basePath}/${post.slug}`}
            className="group flex items-baseline justify-between gap-4"
          >
            <span
              className="text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-[#e8855c] dark:group-hover:text-[#e8855c] transition-colors font-bold uppercase tracking-wider"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {post.title}
              {showRating && post.rating !== undefined && (
                <span className="ml-2 text-sm text-zinc-400 dark:text-zinc-500">
                  {post.rating}/10
                </span>
              )}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 shrink-0 tabular-nums">
              {formatDate(post.date)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
