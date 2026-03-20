import { getWritingPosts } from "@/lib/content";
import { WritingPage } from "@/components/writing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description: "Articles by Mark Babin.",
};

export default function Page() {
  const posts = getWritingPosts();
  return <WritingPage posts={posts} />;
}
