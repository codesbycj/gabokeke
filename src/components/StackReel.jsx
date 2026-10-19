import { useEffect, useRef, useState } from "react";
import { stack } from "../data/projects";

const SLOT = 56; // px per row; the viewport shows exactly three
const TICK = 1900; // ms each logo holds the middle slot
const GLIDE = 620; // ms of travel between slots

/**
 * Vertical reel of stack logos: three visible at a time, the middle one
 * locked in focus while the two either side fade out. Rotates forever.
 *
 * The list is rendered twice so the track can keep travelling downward past
 * the end, then snap back to the top with transitions off - the seam lands
 * on an identical frame, so it reads as one continuous loop.
 */
export const StackReel = () => {
  const items = stack;
  const N = items.length;

  const [index, setIndex] = useState(0);
  const [gliding, setGliding] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => setIndex((i) => i + 1), TICK);
    return () => clearInterval(timer.current);
  }, []);

  // On reaching the duplicate, rewind to the real first item mid-flight.
  useEffect(() => {
    if (index < N) return;
    const id = setTimeout(() => {
      setGliding(false);
      setIndex(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setGliding(true))
      );
    }, GLIDE);
    return () => clearTimeout(id);
  }, [index, N]);

  // The middle slot sits one row below the top of the viewport.
  const activeIdx = (index + 1) % N;

  return (
    <div className="stack-reel" aria-label="Tech stack">
      <p className="stack-reel__label">Working with</p>

      <div className="stack-reel__viewport">
        <div
          className="stack-reel__track"
          style={{
            transform: `translateY(-${index * SLOT}px)`,
            transition: gliding
              ? `transform ${GLIDE}ms cubic-bezier(0.32, 1.2, 0.5, 1)`
              : "none",
          }}
        >
          {[...items, ...items].map((tool, i) => (
            <div
              className={`stack-reel__item ${
                i % N === activeIdx ? "stack-reel__item--active" : ""
              }`}
              key={`${tool.name}-${i}`}
              style={{ height: SLOT }}
              aria-hidden={i >= N}
            >
              <img
                src={tool.logo}
                alt=""
                className="stack-reel__logo"
                loading="lazy"
              />
              <span className="stack-reel__name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
