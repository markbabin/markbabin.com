"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = "mark babin";
const ACCENT = "#e8855c";
const I_INDEX = 8;

export function NeonTitle() {
  const [hovered, setHovered] = useState(false);
  const [letterColors, setLetterColors] = useState<string[]>(
    () => Array(TEXT.length).fill("")
  );
  const [bouncing, setBouncing] = useState(false);
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    intervalsRef.current = TEXT.split("").map((char, i) => {
      if (char === " ") return null!;

      const flicker = () => {
        const isGreen = Math.random() < 0.3;
        setLetterColors((prev) => {
          const next = [...prev];
          next[i] = isGreen ? ACCENT : "";
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
  }, []);

  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bouncing) return;
    setBouncing(true);
    setTimeout(() => setBouncing(false), 10000);
  };

  const getStyle = (i: number) => ({
    color: hovered ? ACCENT : letterColors[i] || undefined,
    textShadow:
      hovered || letterColors[i]
        ? `0 0 8px ${ACCENT}40, 0 0 20px ${ACCENT}20`
        : undefined,
  });

  return (
    <>
      <style>{`
        @keyframes dot-bounce {
          0% { transform: translateY(1px); }
          10% { transform: translateY(-0.6em); }
          20% { transform: translateY(1px); }
          30% { transform: translateY(-0.4em); }
          40% { transform: translateY(1px); }
          50% { transform: translateY(-0.25em); }
          60% { transform: translateY(1px); }
          70% { transform: translateY(-0.12em); }
          80% { transform: translateY(1px); }
          90% { transform: translateY(-0.05em); }
          100% { transform: translateY(1px); }
        }
      `}</style>
      <h1
        className="text-7xl font-extrabold tracking-tight cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {TEXT.split("").map((char, i) => {
          if (i === I_INDEX) {
            return (
              <span
                key={i}
                className="transition-colors duration-75 relative inline-block"
                style={getStyle(i)}
              >
                <span className="invisible">i</span>
                <span
                  className="absolute bottom-0 left-0 w-full text-center"
                  style={{ lineHeight: 1 }}
                >
                  ı
                </span>
                <span
                  onClick={handleDotClick}
                  className="absolute left-1/2 -translate-x-1/2 cursor-pointer z-10"
                  style={{
                    top: "calc(-0.3em - 20px)",
                    marginLeft: "1px",
                    fontSize: "0.8em",
                    lineHeight: 1,
                    animation: bouncing ? "dot-bounce 2s ease-in-out" : undefined,
                  }}
                >
                  .
                </span>
              </span>
            );
          }

          return (
            <span
              key={i}
              className="transition-colors duration-75"
              style={getStyle(i)}
            >
              {char}
            </span>
          );
        })}
      </h1>
    </>
  );
}
