"use client";

import { useState } from "react";
import Image from "next/image";

const GREEN = "#e8855c";

export function PhotoGallery({ photos }: { photos: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (photos.length === 0) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">Nothing here yet.</p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((src) => (
          <button
            key={src}
            onClick={() => setSelected(src)}
            className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-200 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: `${GREEN}F0` }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-[70vw] h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selected}
              alt=""
              fill
              sizes="70vw"
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
