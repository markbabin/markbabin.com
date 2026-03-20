"use client";

import { useState } from "react";
import { PostList } from "./post-list";
import type { Post } from "@/lib/content";

const TOPICS = ["Music", "Everything else"] as const;

export function WritingPage({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>(TOPICS[0]);

  const filtered = posts.filter((p) => p.topic === active);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <div className="flex items-center gap-4">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => setActive(topic)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              active === topic
                ? "bg-[#8ACE00] text-black font-medium"
                : "text-zinc-500 dark:text-zinc-400 hover:text-[#8ACE00] dark:hover:text-[#8ACE00]"
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
