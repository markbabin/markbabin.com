import { getPhotoFiles } from "@/lib/content";
import { PhotoGallery } from "@/components/photo-gallery";
import { FlickerHeading } from "@/components/flicker-heading";
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
      <div className="flex justify-center mb-6">
        <FlickerHeading text="G A L L E R Y" className="text-5xl font-bold uppercase w-full text-center" style={{ fontFamily: "var(--font-oswald)", letterSpacing: "1em" }} />
      </div>
      <div className="mt-48 px-48">
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
}
