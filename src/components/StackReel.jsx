import { useEffect, useRef, useState } from "react";
import { stack } from "../data/projects";

const SLOT = 56; // px per row in the vertical reel; viewport shows three
const TICK = 1900; // ms each logo holds the focused slot
const GLIDE = 620; // ms of travel between slots
const HORIZONTAL_AT = 900; // px: below this the reel lies on its side

/**
 * Reel of stack logos with one locked in focus and its neighbours faded.
 *
 * Vertical on desktop, where there's a narrow column beside the bio.
 * Horizontal below 900px, where the reel spans the full width instead of
 * sitting pinned to the left edge.
 *
 * The list renders twice so the track can travel past the end, then snaps
 * back with transitions off; the seam lands on an identical frame, so it
 * reads as one continuous loop.
 */
export const StackReel = () => {
  const items = stack;
  const N = items.length;

  const [index, setIndex] = useState(0);
  const [gliding, setGliding] = useState(true);
  const [horizontal, setHorizontal] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= HORIZONTAL_AT
  );
  const [slotX, setSlotX] = useState(200);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef(null);

  // Track orientation, and measure the viewport so the focused item can be
  // centred horizontally whatever the screen width.
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${HORIZONTAL_AT}px)`);

    const measure = () => {
      setHorizontal(mq.matches);
      const w = viewportRef.current?.offsetWidth ?? 0;
      setWidth(w);
      // Three equal slots, so the faded neighbours sit fully in frame rather
      // than being cropped away at the edges.
      setSlotX(Math.max(104, w / 3));
    };

    measure();
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => i + 1), TICK);
    return () => clearInterval(id);
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

  // The focused item is one step ahead of the track position in both
  // orientations, so the highlight doesn't jump when the breakpoint flips.
  const focused = index + 1;
  const activeIdx = focused % N;

  const transform = horizontal
    ? `translateX(${((width - slotX) / 2 - focused * slotX).toFixed(1)}px)`
    : `translateY(-${index * SLOT}px)`;

  return (
    <div
      className={`stack-reel ${horizontal ? "stack-reel--horizontal" : ""}`}
      aria-label="Tech stack"
    >
      <p className="stack-reel__label">Working with</p>

      <div className="stack-reel__viewport" ref={viewportRef}>
        <div
          className="stack-reel__track"
          style={{
            transform,
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
              style={horizontal ? { width: slotX } : { height: SLOT }}
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
