import fs from "fs";
import path from "path";
import { PhotoGallery } from "@/components/photo-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos by Mark Babin.",
};

function getPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .map((f) => `/photos/${f}`);
}

export default function PhotosPage() {
  const photos = getPhotos();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Photos</h1>
      <PhotoGallery photos={photos} />
    </div>
  );
}
