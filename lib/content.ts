import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  rating?: number;
  topic?: string;
}

const contentDir = path.join(process.cwd(), "content");

function getPosts(section: "writing" | "photos"): Post[] {
  const dir = path.join(contentDir, section);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
        content,
        ...(data.rating !== undefined ? { rating: data.rating } : {}),
        ...(data.topic ? { topic: data.topic } : {}),
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getWritingPosts(): Post[] {
  return getPosts("writing");
}

export function getPhotos(): Post[] {
  return getPosts("photos");
}

export function getPost(
  section: "writing" | "photos",
  slug: string
): Post | undefined {
  const posts = getPosts(section);
  return posts.find((p) => p.slug === slug);
}
