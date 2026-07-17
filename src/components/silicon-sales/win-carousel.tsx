"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ssiWinBubbles } from "@/lib/silicon-sales";

function highlightQuote(quote: string, highlight: string) {
  const idx = quote.toLowerCase().indexOf(highlight.toLowerCase());
  if (idx < 0) return <>{quote}</>;
  const before = quote.slice(0, idx);
  const mid = quote.slice(idx, idx + highlight.length);
  const after = quote.slice(idx + highlight.length);
  return (
    <>
      {before}
      <mark className="ssi-bubble__mark">{mid}</mark>
      {after}
    </>
  );
}

const TOTAL = ssiWinBubbles.length;
/** Three copies → start in the middle band; jump invisibly when leaving it. */
const LOOP = [...ssiWinBubbles, ...ssiWinBubbles, ...ssiWinBubbles];

/**
 * Pre-built infinite strip. No end-clone lag —
 * animate, then snap index back into the middle copy with transitions off.
 */
export function WinCarousel() {
  const [index, setIndex] = useState<number>(TOTAL);
  const [animate, setAnimate] = useState(true);
  const [busy, setBusy] = useState(false);
  const [manual, setManual] = useState(false);
  const indexRef = useRef<number>(TOTAL);
  const timerRef = useRef<number | null>(null);

  const settle = useCallback((from: number) => {
    if (from >= TOTAL * 2) {
      const jumped = from - TOTAL;
      setAnimate(false);
      indexRef.current = jumped;
      setIndex(jumped);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setBusy(false);
        });
      });
      return;
    }
    if (from < TOTAL) {
      const jumped = from + TOTAL;
      setAnimate(false);
      indexRef.current = jumped;
      setIndex(jumped);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          setBusy(false);
        });
      });
      return;
    }
    setBusy(false);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (busy) return;
      const next = indexRef.current + dir;
      indexRef.current = next;
      setBusy(true);
      setAnimate(true);
      setIndex(next);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => settle(next), 400);
    },
    [busy, settle],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const onArrow = (dir: -1 | 1) => {
    setManual(true);
    go(dir);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || manual) return;
    const id = window.setInterval(() => go(1), 4000);
    return () => window.clearInterval(id);
  }, [go, manual]);

  const activeDot = ((index % TOTAL) + TOTAL) % TOTAL;

  return (
    <div className="ssi-wins">
      <div className="ssi-wins__viewport">
        <div
          className={`ssi-wins__strip ${animate ? "is-sliding" : "is-idle"}`}
          style={{ ["--ssi-win-index" as string]: String(index) }}
        >
          {LOOP.map((item, i) => (
            <article
              key={`${item.meta}-${i}`}
              className={`ssi-bubble ${i === index ? "is-mid is-center" : "is-side"}`}
              aria-hidden={i !== index}
            >
              <p className="ssi-bubble__quote">
                &ldquo;{highlightQuote(item.quote, item.highlight)}&rdquo;
              </p>
              <p className="ssi-bubble__meta">{item.meta}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="ssi-wins__controls">
        <button
          type="button"
          className="ssi-wins__arrow"
          aria-label="Previous win"
          onClick={() => onArrow(-1)}
        >
          ←
        </button>
        <div className="ssi-wins__dots" role="tablist" aria-label="Community wins">
          {ssiWinBubbles.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeDot}
              className={i === activeDot ? "is-active" : ""}
              onClick={() => {
                if (busy || i === activeDot) return;
                setManual(true);
                const forward = (i - activeDot + TOTAL) % TOTAL;
                const backward = (activeDot - i + TOTAL) % TOTAL;
                go(forward <= backward ? 1 : -1);
              }}
            />
          ))}
        </div>
        <button
          type="button"
          className="ssi-wins__arrow"
          aria-label="Next win"
          onClick={() => onArrow(1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
