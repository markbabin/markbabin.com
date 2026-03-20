"use client";

import { useState } from "react";
import Link from "next/link";

const FRAME_COUNT = 5;
const FRAME_W = 128;
const FRAME_H = 48;
const FRAME_DURATION = 80; // ms per frame

export function SparkLink({
  href,
  className,
  style,
  external,
  children,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  external?: boolean;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  const Tag = external ? "a" : Link;
  const extraProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tag href={href} className={className} style={style} {...extraProps}>
        {children}
      </Tag>
      {hovered && (
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url(/orange_spark.png)",
            backgroundSize: `${FRAME_W * FRAME_COUNT}px ${FRAME_H}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            width: "100%",
            height: "100%",
            animation: `spark-play ${FRAME_COUNT * FRAME_DURATION}ms steps(${FRAME_COUNT}) infinite`,
          }}
        />
      )}
      <style>{`
        @keyframes spark-play {
          from { background-position-x: 0; }
          to { background-position-x: -${FRAME_W * FRAME_COUNT}px; }
        }
      `}</style>
    </span>
  );
}
