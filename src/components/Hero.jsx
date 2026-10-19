import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Globe } from "./icons";
import { StackReel } from "./StackReel";
import { profile } from "../data/site";
import { useLoadReveal } from "../hooks";

/**
 * Per-letter rotation that tracks the cursor:
 *  - magnitude peaks at 90° when the cursor sits on a letter's centre and
 *    falls off with distance
 *  - direction follows cursor travel, so letters tip the way you move
 *  - everything eases back to 0° once the cursor stops or leaves
 */
const FlipText = ({ text }) => {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const chars = Array.from(root.querySelectorAll(".flip-char"));
    if (!chars.length) return;

    const MAX_DEG = 90;
    const FALLOFF = 42; // px - distance at which the effect dies out

    // Cache each letter's centre plus a quickTo setter so tweens stay cheap.
    let centres = [];
    const setters = chars.map((c) =>
      gsap.quickTo(c, "rotationY", { duration: 0.5, ease: "power3.out" })
    );

    const measure = () => {
      centres = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    measure();

    let lastX = null;
    let direction = 1;
    let idle = null;

    const onMove = (e) => {
      if (lastX !== null) {
        const vx = e.clientX - lastX;
        // Only update direction on meaningful movement, so a held cursor
        // keeps its last direction instead of snapping back.
        if (Math.abs(vx) > 0.6) direction = vx > 0 ? 1 : -1;
      }
      lastX = e.clientX;

      centres.forEach((c, i) => {
        const dx = e.clientX - c.x;
        const dy = e.clientY - c.y;
        const dist = Math.hypot(dx, dy);
        const strength = Math.max(0, 1 - dist / FALLOFF);
        setters[i](direction * MAX_DEG * strength * strength);
      });

      if (idle) clearTimeout(idle);
      idle = setTimeout(() => setters.forEach((s) => s(0)), 420);
    };

    const onLeave = () => setters.forEach((s) => s(0));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    root.addEventListener("mouseleave", onLeave);

    return () => {
      if (idle) clearTimeout(idle);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      root.removeEventListener("mouseleave", onLeave);
    };
  }, [text]);

  return (
    <span className="flip-text" ref={ref}>
      {text.split("").map((ch, i) => (
        <span className="flip-char" key={`${ch}-${i}`}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
};

export const Hero = () => {
  const globeRef = useRef(null);
  const headline = useLoadReveal(100);
  const bio = useLoadReveal(200);

  // Spin once on load, then again on hover of the location line.
  const spin = () => {
    const el = globeRef.current;
    if (!el) return;
    el.classList.remove("globe-spinning");
    // Force a reflow so the animation restarts rather than being ignored.
    void el.offsetWidth;
    el.classList.add("globe-spinning");
  };

  useEffect(() => {
    const id = setTimeout(spin, 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <h1 className={`hero-name shiny-hover ${headline}`}>{profile.headline}</h1>

      <div className={`hero-lower ${bio}`}>
        <div className="hero-bio">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
          <p className="hero-bio--location" onMouseEnter={spin}>
            <span className="globe-wrap" ref={globeRef}>
              <Globe />
            </span>
            <FlipText text={profile.location} />
          </p>
        </div>

        <StackReel />
      </div>
    </>
  );
};
