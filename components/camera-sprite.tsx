"use client";

import { useState, useCallback } from "react";

const FRAMES = 6;
const DISPLAY_W = 180;
const DISPLAY_H = 120;
const FRAME_DURATION = 40;
const MAX_SHOTS = 34;

export function CameraSprite() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [shots, setShots] = useState(0);

  const outOfFilm = shots >= MAX_SHOTS;

  const play = useCallback(() => {
    if (playing || outOfFilm) return;
    setPlaying(true);
    setShots((s) => s + 1);
    let f = 0;
    const interval = setInterval(() => {
      f++;
      if (f >= FRAMES) {
        clearInterval(interval);
        setFrame(0);
        setPlaying(false);
        return;
      }
      setFrame(f);
    }, FRAME_DURATION);
  }, [playing, outOfFilm]);

  return (
    <div className="flex flex-col items-center">
      <p
        className="mb-2 text-2xl"
        style={{
          fontFamily: "var(--font-jersey-10)",
          visibility: outOfFilm ? "visible" : "hidden",
        }}
      >
        out of film!
      </p>
      <button
        onClick={play}
        className="opacity-80 cursor-pointer overflow-hidden"
        style={{ width: DISPLAY_W, height: DISPLAY_H }}
        aria-label="Camera flash animation"
      >
        <div
          style={{
            width: DISPLAY_W * FRAMES,
            height: DISPLAY_H,
            backgroundImage: "url(/cameraflash.png)",
            backgroundSize: `${DISPLAY_W * FRAMES}px ${DISPLAY_H}px`,
            backgroundRepeat: "no-repeat",
            transform: `translateX(-${frame * DISPLAY_W}px)`,
          }}
        />
      </button>
    </div>
  );
}
