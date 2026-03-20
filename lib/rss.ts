import { getWritingPosts, getPhotos, type Post } from "./content";

const SITE_URL = "https://markbabin.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function postToItem(post: Post, section: string): string {
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/${section}/${post.slug}</link>
      <guid>${SITE_URL}/${section}/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
}

export function generateRssFeed(): string {
  const writing = getWritingPosts().map((p) => postToItem(p, "writing"));
  const reviews = getPhotos().map((p) => postToItem(p, "photos"));

  const items = [...writing, ...reviews].join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mark Babin</title>
    <link>${SITE_URL}</link>
    <description>Articles and photos by Mark Babin</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}
