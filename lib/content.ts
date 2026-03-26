import data from "./content-generated.json";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  html: string;
  rating?: number;
  topic?: string;
}

const writing: Post[] = data.writing;
const photos: Post[] = data.photos;
const photoFiles: string[] = data.photoFiles;

export function getWritingPosts(): Post[] {
  return writing;
}

export function getPhotos(): Post[] {
  return photos;
}

export function getPost(
  section: "writing" | "photos",
  slug: string
): Post | undefined {
  const posts = section === "writing" ? writing : photos;
  return posts.find((p) => p.slug === slug);
}

export function getPhotoFiles(): string[] {
  return photoFiles;
}
