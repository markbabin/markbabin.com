"use client";

import { useEffect, useRef, useState } from "react";

const FRAME_WIDTH = 225;
const FRAME_HEIGHT = 240;
const FRAME_COUNT = 4;
const SPRITE_SCALE = 0.15;
const DISPLAY_W = FRAME_WIDTH * SPRITE_SCALE;
const DISPLAY_H = FRAME_HEIGHT * SPRITE_SCALE;
const SPEED = 1.5;
const ANIM_INTERVAL = 120;
const JUMP_HEIGHT = 60;
const JUMP_DURATION = 400;

// Accent color #e8855c as RGB
const ACCENT_R = 0xe8;
const ACCENT_G = 0x85;
const ACCENT_B = 0x5c;

function tintSprite(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] === 0) continue;
        // Get luminance of original pixel
        const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
        d[i] = Math.min(255, ACCENT_R * lum * 1.5);
        d[i + 1] = Math.min(255, ACCENT_G * lum * 1.5);
        d[i + 2] = Math.min(255, ACCENT_B * lum * 1.5);
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.src = src;
  });
}

export function RunningMario() {
  const ref = useRef<HTMLDivElement>(null);
  const [tintedSrc, setTintedSrc] = useState<string | null>(null);

  useEffect(() => {
    tintSprite("/mario.png").then(setTintedSrc);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !tintedSrc) return;

    let x = 0;
    let frame = 0;
    let facingRight = true;
    let animId: number;
    let lastFrameSwap = 0;
    let jumping = false;
    let jumpStart = 0;

    function handleClick() {
      if (!jumping) {
        jumping = true;
        jumpStart = performance.now();
      }
    }

    el.addEventListener("click", handleClick);

    function tick(ts: number) {
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;
      const maxX = parent.clientWidth - DISPLAY_W;

      if (lastFrameSwap === 0) lastFrameSwap = ts;
      if (ts - lastFrameSwap > ANIM_INTERVAL) {
        frame = (frame + 1) % FRAME_COUNT;
        lastFrameSwap = ts;
      }

      x += facingRight ? SPEED : -SPEED;
      if (x >= maxX) {
        x = maxX;
        facingRight = false;
      } else if (x <= 0) {
        x = 0;
        facingRight = true;
      }

      let jumpY = 0;
      if (jumping) {
        const elapsed = ts - jumpStart;
        const progress = Math.min(elapsed / JUMP_DURATION, 1);
        jumpY = Math.sin(progress * Math.PI) * JUMP_HEIGHT;
        if (progress >= 1) jumping = false;
      }

      el.style.transform = `translateX(${x}px) translateY(${-jumpY}px) scaleX(${facingRight ? 1 : -1})`;
      el.style.backgroundPosition = `-${frame * FRAME_WIDTH * SPRITE_SCALE}px 0`;

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("click", handleClick);
    };
  }, [tintedSrc]);

  if (!tintedSrc) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full pointer-events-none" style={{ zIndex: 50 }}>
      <div
        ref={ref}
        className="pointer-events-auto cursor-pointer"
        style={{
          width: DISPLAY_W,
          height: DISPLAY_H,
          backgroundImage: `url(${tintedSrc})`,
          backgroundSize: `${FRAME_COUNT * DISPLAY_W}px ${DISPLAY_H}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
