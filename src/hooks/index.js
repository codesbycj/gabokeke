import { useCallback, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveal on scroll. Returns a ref to attach to the element that already
 * carries `.reveal-scroll`; adds the --visible class once, on first entry.
 */
export function useRevealOnScroll({ threshold = 0.12, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("reveal-scroll--visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-scroll--visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Same idea for a list: attach the returned ref to the container and every
 * descendant matching `selector` gets revealed as it enters the viewport.
 */
export function useRevealChildren(selector = ".reveal-scroll") {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll(selector));
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      targets.forEach((t) => t.classList.add("reveal-scroll--visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-scroll--visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [selector]);

  return ref;
}

/** Page-load reveal with a stagger delay, for above-the-fold elements. */
export function useLoadReveal(delay = 0) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setActive(true);
      return;
    }
    const id = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  return active ? "reveal-load reveal-load--active" : "reveal-load";
}

/**
 * Which section is currently in view. Picks the last section whose top has
 * crossed the threshold, so later/deeper sections win.
 */
export function useScrollSpy(ids, offset = 120) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = null;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        let current = ids[0];
        for (let i = ids.length - 1; i >= 0; i -= 1) {
          const el = document.getElementById(ids[i]);
          if (el && el.getBoundingClientRect().top <= offset) {
            current = ids[i];
            break;
          }
        }
        setActive(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}

/** Hide the mobile header on scroll down, show it on scroll up. */
export function useHideOnScrollDown(threshold = 80) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let frame = null;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const y = window.scrollY;
        const delta = y - lastY.current;
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > threshold);
          lastY.current = y;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return hidden;
}

/** Copy text, with a short-lived "copied" flag for the confirmation toast. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Clipboard API needs a secure context; fall back to a hidden input.
        const input = document.createElement("input");
        input.value = text;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand("copy");
        } catch {
          document.body.removeChild(input);
          return false;
        }
        document.body.removeChild(input);
      }

      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
      return true;
    },
    [resetAfter]
  );

  useEffect(() => () => timer.current && clearTimeout(timer.current), []);

  return { copied, copy };
}

/**
 * Pointer-follow 3D tilt. Attach the returned ref to the element that should
 * tilt; pass the wrapper that receives the pointer via `boundsRef` when the
 * hit area is larger than the tilting element.
 */
export function useTilt({ max = 6, scale = 1.012, glareSelector = null } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const glare = glareSelector ? el.querySelector(glareSelector) : null;
    let frame = null;
    let target = { rx: 0, ry: 0, s: 1 };

    const apply = () => {
      frame = null;
      el.style.transform = `perspective(900px) rotateX(${target.rx.toFixed(
        2
      )}deg) rotateY(${target.ry.toFixed(2)}deg) scale(${target.s.toFixed(3)})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      target = { rx: -py * max, ry: px * max, s: scale };
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${(
          (px + 0.5) *
          100
        ).toFixed(1)}% ${((py + 0.5) * 100).toFixed(
          1
        )}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      }
      schedule();
    };

    const onEnter = () => {
      el.style.transition = "transform 0.25s var(--ease-out-quart)";
      if (glare) glare.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.transition = "transform 0.6s var(--ease-out-back-soft)";
      target = { rx: 0, ry: 0, s: 1 };
      if (glare) glare.style.opacity = "0";
      schedule();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max, scale, glareSelector]);

  return ref;
}

/**
 * Sticky case-study stack: as each card scrolls under the next one it fades
 * and blurs slightly, so the incoming card reads as the foreground.
 */
export function useStackFade(selector = ".case-study") {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll(selector));
    if (cards.length < 2) return;

    if (prefersReducedMotion()) return;

    let frame = null;

    const update = () => {
      frame = null;
      for (let i = 0; i < cards.length - 1; i += 1) {
        const card = cards[i];
        const next = cards[i + 1];
        const nextTop = next.getBoundingClientRect().top;
        const cardTop = card.getBoundingClientRect().top;
        // How far the next card has climbed over this one, 0 → 1.
        const span = Math.max(card.offsetHeight * 0.55, 1);
        const p = Math.min(Math.max((cardTop + span - nextTop) / span, 0), 1);
        card.style.opacity = String(1 - p * 0.55);
        card.style.filter = p > 0.02 ? `blur(${(p * 4).toFixed(2)}px)` : "none";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cards.forEach((c) => {
        c.style.opacity = "";
        c.style.filter = "";
      });
    };
  }, [selector]);

  return ref;
}

/** True while the element is on screen - used to pause off-screen animation. */
export function useOnScreen(ref, rootMargin = "100px") {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);

  return onScreen;
}
