"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = "mark babin";
const GREEN = "#8ACE00";

export function NeonTitle() {
  const [hovered, setHovered] = useState(false);
  const [letterColors, setLetterColors] = useState<string[]>(
    () => Array(TEXT.length).fill("")
  );
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Each letter gets its own independent flicker loop
    intervalsRef.current = TEXT.split("").map((char, i) => {
      if (char === " ") return null!;

      const flicker = () => {
        // Random chance to be green (30%) or normal
        const isGreen = Math.random() < 0.3;
        setLetterColors((prev) => {
          const next = [...prev];
          next[i] = isGreen ? GREEN : "";
          return next;
        });

        // Next flicker at a random interval (80ms–800ms) for irregular feel
        const delay = 80 + Math.random() * 720;
        intervalsRef.current[i] = setTimeout(flicker, delay);
      };

      // Stagger initial start so they don't all sync up
      const initialDelay = Math.random() * 1000;
      return setTimeout(flicker, initialDelay);
    });

    return () => {
      intervalsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <h1
      className="text-7xl font-extrabold tracking-tight cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {TEXT.split("").map((char, i) => (
        <span
          key={i}
          className="transition-colors duration-75"
          style={{
            color: hovered ? GREEN : letterColors[i] || undefined,
            textShadow:
              hovered || letterColors[i]
                ? `0 0 8px ${GREEN}40, 0 0 20px ${GREEN}20`
                : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
