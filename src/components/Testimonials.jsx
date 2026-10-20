import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import { testimonials } from "../data/testimonials";

const PIXELS = 64; // 8x8 dissolve grid over the avatar
const PIXEL_PHASE = 200;

/** First letters of up to two names, for the photo-less avatar tile. */
const initials = (name) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

/**
 * Renders an anchor when there is somewhere to go, and a plain div otherwise,
 * so a person without a LinkedIn URL does not get a dead link.
 */
const Maybe = ({ href, className, label, children }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} ${className}--link`}
      aria-label={label}
    >
      {children}
    </a>
  ) : (
    <div className={className}>{children}</div>
  );

const shuffled = () => {
  const a = Array.from({ length: PIXELS }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const [shownIdx, setShownIdx] = useState(0);
  const [outDir, setOutDir] = useState(null);
  const [litPixels, setLitPixels] = useState(() => new Set());
  const [clicking, setClicking] = useState(null);
  const busy = useRef(false);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const goTo = useCallback(
    (next, dir) => {
      if (busy.current || next === idx || next < 0 || next >= testimonials.length)
        return;
      busy.current = true;
      setIdx(next);

      // Text slides out the way we're heading…
      setOutDir(dir === 1 ? "left" : "right");

      // …while the avatar dissolves pixel by pixel.
      const order = shuffled();
      const reveal = (list, done) => {
        list.forEach((p, i) => {
          timers.current.push(
            setTimeout(() => {
              setLitPixels((prev) => {
                const s = new Set(prev);
                s.add(p);
                return s;
              });
            }, (i / PIXELS) * PIXEL_PHASE)
          );
        });
        timers.current.push(setTimeout(done, PIXEL_PHASE + 40));
      };

      reveal(order, () => {
        // Swap the image and the text under the cover of the pixels.
        setShownIdx(next);
        const hideOrder = shuffled();
        hideOrder.forEach((p, i) => {
          timers.current.push(
            setTimeout(() => {
              setLitPixels((prev) => {
                const s = new Set(prev);
                s.delete(p);
                return s;
              });
            }, (i / PIXELS) * PIXEL_PHASE)
          );
        });

        // Text slides back in from the opposite side.
        setOutDir(dir === 1 ? "right" : "left");
        timers.current.push(
          setTimeout(() => {
            setOutDir(null);
            busy.current = false;
          }, 40)
        );
      });
    },
    [idx]
  );

  const nudge = (dir) => {
    setClicking(dir);
    setTimeout(() => setClicking(null), 700);
  };

  const current = testimonials[shownIdx];

  return (
    <div className="sp-card sp-card--testimonial">
      <div className="sp-testimonial__header">
        <div className="sp-testimonial__author">
          <Maybe
            href={current.linkedin}
            className="sp-testimonial__avatar"
            label={`${current.name} on LinkedIn`}
          >
            {current.avatar ? (
              <img
                src={current.avatar}
                alt={current.name}
                width="56"
                height="56"
              />
            ) : (
              <span
                className="sp-testimonial__initials"
                role="img"
                aria-label={current.name}
              >
                {initials(current.name)}
              </span>
            )}
            <div className="sp-testimonial__pixels" aria-hidden="true">
              {Array.from({ length: PIXELS }, (_, i) => (
                <span
                  key={i}
                  className={`sp-testimonial__pixel ${
                    litPixels.has(i) ? "sp-testimonial__pixel--on" : ""
                  }`}
                />
              ))}
            </div>
          </Maybe>
          <div className="sp-testimonial__details">
            <div className="sp-testimonial__name">
              {current.linkedin ? (
                <a
                  href={current.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sp-testimonial__name-link"
                >
                  {current.name}
                </a>
              ) : (
                current.name
              )}
            </div>
            <div className="sp-testimonial__role">{current.role}</div>
          </div>
        </div>

        <div className="sp-testimonial__nav">
          <button
            type="button"
            className={`sp-testimonial__btn sp-testimonial__btn--prev ${
              clicking === "prev" ? "is-clicking" : ""
            }`}
            aria-label="Previous testimonial"
            disabled={idx === 0}
            onClick={() => {
              nudge("prev");
              goTo(idx - 1, -1);
            }}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className={`sp-testimonial__btn sp-testimonial__btn--next ${
              clicking === "next" ? "is-clicking" : ""
            }`}
            aria-label="Next testimonial"
            disabled={idx === testimonials.length - 1}
            onClick={() => {
              nudge("next");
              goTo(idx + 1, 1);
            }}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <blockquote
        className={`sp-testimonial__quote ${
          outDir ? `sp-testimonial__quote--out-${outDir}` : ""
        }`}
      >
        {current.quote.map((para, i) => (
          <p key={i}>
            {i === 0 ? "“" : ""}
            {para}
            {i === current.quote.length - 1 ? "”" : ""}
          </p>
        ))}
      </blockquote>

      {/* Mobile pager: carets either side of the dots, so the header stays
          uncluttered on a narrow card. */}
      <div className="sp-testimonial__pager">
        <button
          type="button"
          className="sp-testimonial__caret"
          aria-label="Previous testimonial"
          disabled={idx === 0}
          onClick={() => goTo(idx - 1, -1)}
        >
          <ChevronLeft />
        </button>

        <div className="sp-testimonial__dots">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              className={`sp-testimonial__dot ${
                i === idx ? "sp-testimonial__dot--active" : ""
              }`}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => goTo(i, i > idx ? 1 : -1)}
            />
          ))}
        </div>

        <button
          type="button"
          className="sp-testimonial__caret"
          aria-label="Next testimonial"
          disabled={idx === testimonials.length - 1}
          onClick={() => goTo(idx + 1, 1)}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
