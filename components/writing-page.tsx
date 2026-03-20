"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PostList } from "./post-list";
import type { Post } from "@/lib/content";

const TOPICS = ["Music", "Dev", "Everything else"] as const;

export function WritingPage({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic");
  const [active, setActive] = useState<string>(
    TOPICS.includes(topicParam as any) ? topicParam! : TOPICS[0]
  );

  useEffect(() => {
    if (topicParam && TOPICS.includes(topicParam as any)) {
      setActive(topicParam);
    }
  }, [topicParam]);

  const filtered = posts.filter((p) => p.topic === active);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl italic font-bold tracking-tight" style={{ fontFamily: "var(--font-playfair)" }}>Rants</h1>
      <div className="flex items-center gap-4">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setActive(topic)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              active === topic
                ? "bg-[#e8855c] text-black font-medium"
                : "text-zinc-500 dark:text-zinc-400 hover:text-[#e8855c] dark:hover:text-[#e8855c]"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
      <PostList posts={filtered} basePath="/writing" />
    </div>
  );
}
