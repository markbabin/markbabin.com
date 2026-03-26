import type { MetadataRoute } from "next";
import { getWritingPosts, getPhotos } from "@/lib/content";

const SITE_URL = "https://babinmark.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const writing = getWritingPosts().map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const photos = getPhotos().map((post) => ({
    url: `${SITE_URL}/photos/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/photos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...writing,
    ...photos,
  ];
}
