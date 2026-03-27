import { getPhotoFiles } from "@/lib/content";
import { PhotoGallery } from "@/components/photo-gallery";
import { CameraSprite } from "@/components/camera-sprite";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photos by Mark Babin.",
  alternates: { canonical: "/photos" },
};

export default function PhotosPage() {
  const photos = getPhotoFiles();

  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2">
      <div className="flex justify-center my-10">
        <CameraSprite />
      </div>
      <div className="mt-12 px-48">
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
}
