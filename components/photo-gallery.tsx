"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const ACCENT = "#e8855c";

const PATTERNS: { colSpan: number; rowSpan: number }[] = [
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 1, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
];

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
      style={{ backgroundColor: `${ACCENT}F0` }}
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light cursor-pointer z-10 select-none"
        aria-label="Previous"
      >
        &lsaquo;
      </button>

      <div
        className="relative w-[70vw] h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[index]}
          alt=""
          fill
          sizes="70vw"
          className="object-contain rounded-lg"
        />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl font-light cursor-pointer z-10 select-none"
        aria-label="Next"
      >
        &rsaquo;
      </button>
    </div>,
    document.body
  );
}

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)),
    [photos.length]
  );
  const next = useCallback(
    () => setSelectedIndex((i) => (i !== null ? (i + 1) % photos.length : null)),
    [photos.length]
  );

  if (photos.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">Nothing here yet.</p>
    );
  }

  return (
    <>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "200px",
          gridAutoFlow: "dense",
        }}
      >
        {photos.map((src, i) => {
          const pattern = PATTERNS[i % PATTERNS.length];
          return (
            <button
              key={src}
              onClick={() => setSelectedIndex(i)}
              className="relative overflow-hidden rounded-md cursor-pointer"
              style={{
                gridColumn: `span ${pattern.colSpan}`,
                gridRow: `span ${pattern.rowSpan}`,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-200 hover:scale-105"
              />
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photos={photos}
          index={selectedIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
