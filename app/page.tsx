import type { Metadata } from "next";
import { getPhotoFiles } from "@/lib/content";
import { NeonTitle } from "@/components/neon-title";
import { SparkLink } from "@/components/spark-link";
import { Screensaver } from "@/components/screensaver";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const photos = getPhotoFiles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mark Babin",
    url: "https://babinmark.com",
    description:
      "Music producer, game developer, photographer, and writer.",
    sameAs: [
      "https://github.com/markbabin",
      "https://www.instagram.com/belopidiko/",
      "https://bandcamp.com/trulsone",
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="sr-only">
        Mark Babin — music producer, game developer, photographer, and
        occasional writer sharing views on things that matter.
      </p>
      <div className="fixed bottom-8 right-8">
        <NeonTitle />
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-64 w-full">
        <SparkLink
          href="/writing"
          className="text-4xl italic font-bold transition-colors hover:text-[#e8855c]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rants
        </SparkLink>
        <SparkLink
          href="/photos"
          className="text-4xl font-bold uppercase tracking-wider transition-colors hover:text-[#e8855c]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Photos
        </SparkLink>
        <SparkLink
          href="https://bandcamp.com/trulsone"
          className="text-4xl font-bold transition-colors hover:text-[#e8855c]"
          style={{ fontFamily: "var(--font-bitcount-ink)" }}
          external
        >
          Music
        </SparkLink>
        <SparkLink
          href="/writing?topic=Dev"
          className="text-4xl font-bold transition-colors hover:text-[#e8855c]"
          style={{ fontFamily: "var(--font-source-code-pro)" }}
        >
          _dev
        </SparkLink>
      </div>
      <Screensaver photos={photos} />
    </div>
  );
}
