"use client";

import { useEffect, useRef, useState } from "react";

const GREEN = "#e8855c";

export function FlickerHeading({
  text,
  className = "",
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const [letterColors, setLetterColors] = useState<string[]>(() =>
    Array(text.length).fill("")
  );
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    intervalsRef.current = text.split("").map((char, i) => {
      if (char === " ") return null!;

      const flicker = () => {
        const isGreen = Math.random() < 0.3;
        setLetterColors((prev) => {
          const next = [...prev];
          next[i] = isGreen ? GREEN : "";
          return next;
        });

        const delay = 80 + Math.random() * 720;
        intervalsRef.current[i] = setTimeout(flicker, delay);
      };

      const initialDelay = Math.random() * 1000;
      return setTimeout(flicker, initialDelay);
    });

    return () => {
      intervalsRef.current.forEach((t) => clearTimeout(t));
    };
  }, [text]);

  return (
    <h1
      className={`tracking-tight cursor-default ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {text.split("").map((char, i) => (
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
