"use client";

/**
 * Port of Athar ParticleText — expanded scatter domain, dense readable glyphs.
 */

import { useEffect, useRef, useState } from "react";

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
  amp: number;
}

const STOPS: Array<[number, number, number]> = [
  [184, 255, 60],
  [210, 255, 110],
  [160, 240, 50],
];

function gradientColor(f: number): string {
  const t = Math.max(0, Math.min(1, f));
  const seg = t * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(seg));
  const local = seg - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  const r = Math.round(a[0] + (b[0] - a[0]) * local);
  const g = Math.round(a[1] + (b[1] - a[1]) * local);
  const bl = Math.round(a[2] + (b[2] - a[2]) * local);
  return `rgb(${r},${g},${bl})`;
}

export function ParticleStar({
  text = "In 30 – 45 Days",
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);
  const [pad, setPad] = useState(72);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const textEl = textRef.current;
    const canvas = canvasRef.current;
    if (!textEl || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999, active: false };
    let particles: Particle[] = [];
    let raf = 0;
    let disposed = false;
    let dotSize = 1.7;
    let padPx = 72;

    const REPULSE_RADIUS = 72;
    const REPULSE_FORCE = 5;
    const SPRING = 0.045;
    const DAMPING = 0.88;

    function build() {
      if (disposed) return;
      const rect = textEl!.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const cs = getComputedStyle(textEl!);
      const fontPx = parseFloat(cs.fontSize) || 48;
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;

      // Measure full glyph box (fixes trailing “s” clipped by tight span width)
      const measure = document.createElement("canvas").getContext("2d");
      if (!measure) return;
      measure.font = font;
      const metrics = measure.measureText(text);
      const ascent = metrics.actualBoundingBoxAscent || fontPx * 0.8;
      const descent = metrics.actualBoundingBoxDescent || fontPx * 0.25;
      const narrow = window.innerWidth < 720;
      const parentW =
        textEl!.parentElement?.clientWidth ||
        Math.max(200, window.innerWidth - 48);
      // Fit the string; never force wider than the title line (avoids page overflow)
      const inkW = Math.ceil(
        Math.max(metrics.width, metrics.actualBoundingBoxRight || 0) +
          (narrow ? 12 : 28),
      );
      const tw = Math.min(inkW, Math.floor(parentW));
      textEl!.style.minWidth = `${tw}px`;
      textEl!.style.maxWidth = "100%";
      const th = Math.ceil(Math.max(rect.height, ascent + descent) + 8);

      padPx = Math.round(
        Math.max(
          narrow ? 28 : 64,
          Math.min(narrow ? 44 : 120, fontPx * (narrow ? 0.85 : 1.25)),
        ),
      );
      setPad(padPx);

      const w = tw + padPx * 2;
      const h = th + padPx * 2;

      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.floor(tw * dpr);
      off.height = Math.floor(th * dpr);
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.scale(dpr, dpr);
      octx.clearRect(0, 0, tw, th);
      octx.font = font;
      octx.fillStyle = "#fff";
      octx.textBaseline = "alphabetic";
      octx.direction = "ltr";
      octx.textAlign = "left";
      // Slight stroke thickens thin terminals (trailing s) for sampling
      octx.lineWidth = Math.max(1, fontPx * 0.02);
      octx.strokeStyle = "#fff";
      const baseline = ascent + 3;
      octx.strokeText(text, 4, baseline);
      octx.fillText(text, 4, baseline);

      const data = octx.getImageData(0, 0, off.width, off.height).data;
      // Sparse grid + sub-gap dots → discrete particles (glyphs stay readable)
      const gap = Math.max(2, Math.round(fontPx / 24));
      dotSize = gap * 0.75;
      const next: Particle[] = [];
      const inkAt = (x: number, y: number) => {
        // Any ink in the gap cell counts (catches thin strokes)
        for (let dy = 0; dy < gap; dy++) {
          for (let dx = 0; dx < gap; dx++) {
            const px = Math.min(off.width - 1, Math.floor((x + dx) * dpr));
            const py = Math.min(off.height - 1, Math.floor((y + dy) * dpr));
            if (data[(py * off.width + px) * 4 + 3] > 70) return true;
          }
        }
        return false;
      };
      for (let y = 0; y < th; y += gap) {
        for (let x = 0; x < tw; x += gap) {
          if (!inkAt(x, y)) continue;
          const hx = x + padPx;
          const hy = y + padPx;
          next.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            color: gradientColor(x / tw),
            phase: Math.random() * Math.PI * 2,
            amp: 0.25 + Math.random() * 0.55,
          });
        }
      }
      particles = next;
      setActive(true);
    }

    function frame(now: number) {
      if (disposed) return;
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      ctx!.clearRect(0, 0, w, h);
      const r2 = REPULSE_RADIUS * REPULSE_RADIUS;
      const t = now / 1000;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const levX = Math.sin(t * 0.7 + p.phase) * p.amp;
        const levY = Math.cos(t * 0.6 + p.phase * 1.2) * p.amp * 0.8;
        const homeX = p.hx + levX;
        const homeY = p.hy + levY;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 0.0001;
            const force =
              ((REPULSE_RADIUS - d) / REPULSE_RADIUS) * REPULSE_FORCE;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        p.vx += (homeX - p.x) * SPRING;
        p.vy += (homeY - p.y) * SPRING;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, dotSize / 2, 0, Math.PI * 2);
        ctx!.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function moveFromClient(clientX: number, clientY: number) {
      const r = canvas!.getBoundingClientRect();
      pointer.x = clientX - r.left;
      pointer.y = clientY - r.top;
      pointer.active = true;
    }
    const onPointerMove = (e: PointerEvent) =>
      moveFromClient(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) =>
      moveFromClient(e.clientX, e.clientY);
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    raf = requestAnimationFrame(frame);

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);

    const rebuild = () => {
      cancelAnimationFrame(raf);
      build();
      raf = requestAnimationFrame(frame);
    };
    let rebuildRaf = 0;
    const scheduleRebuild = () => {
      if (disposed || rebuildRaf) return;
      rebuildRaf = requestAnimationFrame(() => {
        rebuildRaf = 0;
        rebuild();
      });
    };

    const ro = new ResizeObserver(scheduleRebuild);
    if (textEl.parentElement) ro.observe(textEl.parentElement);
    ro.observe(textEl);
    window.addEventListener("resize", scheduleRebuild);
    window.addEventListener("orientationchange", scheduleRebuild);
    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleRebuild).catch(() => {});
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rebuildRaf);
      ro.disconnect();
      window.removeEventListener("resize", scheduleRebuild);
      window.removeEventListener("orientationchange", scheduleRebuild);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, [text]);

  return (
    <span
      className="ssi-particle-text"
      style={{ ["--ssi-particle-pad" as string]: `${pad}px` }}
    >
      <span
        ref={textRef}
        className={`ssi-particle-text__fill ${className}`}
        style={active ? { opacity: 0 } : undefined}
      >
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="ssi-particle-text__canvas"
        style={{ touchAction: "none" }}
      />
    </span>
  );
}
