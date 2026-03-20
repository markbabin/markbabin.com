"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";


const ACCENT = "#e8855c";
const IDLE_TIMEOUT = 30000;
const CYCLE_INTERVAL = 4000;

export function Screensaver({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const startTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (photos.length > 0) {
          activeRef.current = true;
          setIndex(0);
          setFade(true);
          setActive(true);
        }
      }, IDLE_TIMEOUT);
    };

    const handleActivity = () => {
      if (activeRef.current) {
        activeRef.current = false;
        setActive(false);
        if (cycleRef.current) clearInterval(cycleRef.current);
      }
      startTimer();
    };

    startTimer();

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((e) => window.addEventListener(e, handleActivity));

    return () => {
      events.forEach((e) => window.removeEventListener(e, handleActivity));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [photos.length]);

  useEffect(() => {
    if (active && photos.length > 1) {
      cycleRef.current = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setIndex((i) => (i + 1) % photos.length);
          setFade(true);
        }, 500);
      }, CYCLE_INTERVAL);

      return () => {
        if (cycleRef.current) clearInterval(cycleRef.current);
      };
    }
  }, [active, photos.length]);

  if (!active || photos.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-none"
      style={{ backgroundColor: ACCENT }}
    >
      <div
        className="relative w-[70vw] h-[70vh] transition-opacity duration-500"
        style={{ opacity: fade ? 1 : 0 }}
      >
        <Image
          src={photos[index]}
          alt=""
          fill
          sizes="70vw"
          className="object-contain rounded-lg"
        />
      </div>

    </div>
  );
}
