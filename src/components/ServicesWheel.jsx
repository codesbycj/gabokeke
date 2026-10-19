import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WheelArrow } from "./icons";
import { services, descriptions } from "../data/services";
import { useOnScreen } from "../hooks";

// --- Geometry (matches the circular-arc layout the design calls for) ---
const R = 128;
const STEP_DEG = 12;
const DEG = Math.PI / 180;
const CX = 64 - R;
const COPIES = 3;
const BLUR = [0, 1, 2, 3, 4, 5];

// --- Timing ---
const INTERVAL_DEFAULT = 5250;
const SWEEP_DEFAULT = 4750;
const NARROW_OFFSET = 3750;
const NUDGE_DUR = 700;
const ADVANCE_DUR = 600;

// Resting specs for the five stacked cards, top → bottom.
const SPECS = [
  {
    w: 134,
    h: 20,
    bg: 0.24,
    r: "14px 14px 0 0",
    shadow: "0 -12px 8px 0 rgba(255,243,244,0.35)",
    stroke: "none",
    pad: "0",
  },
  {
    w: 184,
    h: 28,
    bg: 0.44,
    r: "18px 18px 0 0",
    shadow: "0 -12px 8px 0 rgba(255,243,244,0.35)",
    stroke: "none",
    pad: "0",
  },
  {
    w: 260,
    h: 175,
    bg: 0.92,
    r: "32px",
    shadow: "0 -12px 8px 0 rgba(255,243,244,0.35)",
    stroke: "inset 0 -2px 0 0 rgba(255,206,209,0.32)",
    pad: "22px 28px 23px",
  },
  {
    w: 184,
    h: 28,
    bg: 0.44,
    r: "0 0 18px 18px",
    shadow: "none",
    stroke: "inset 0 -1.5px 0 0 rgba(255,222,224,0.32)",
    pad: "0",
  },
  {
    w: 134,
    h: 20,
    bg: 0.24,
    r: "0 0 14px 14px",
    shadow: "none",
    stroke: "inset 0 -1.5px 0 0 rgba(255,222,224,0.24)",
    pad: "0",
  },
];

const ACTIVE_POS = 2;

const specStyle = (i) => {
  const s = SPECS[i];
  const boxShadow =
    s.stroke !== "none" && s.shadow !== "none"
      ? `${s.stroke},${s.shadow}`
      : s.stroke !== "none"
      ? s.stroke
      : s.shadow;
  return {
    width: s.w,
    height: s.h,
    background: `rgba(255,222,224,${s.bg})`,
    borderRadius: s.r,
    boxShadow,
    padding: s.pad,
    transition: "all 450ms cubic-bezier(0.4, 0, 0.2, 1)",
  };
};

const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

/** Push out fast, then settle with a decaying oscillation. */
const springPushReturn = (t) => {
  if (t < 0.2) {
    const p = t / 0.2;
    return p * p * (3 - 2 * p);
  }
  const p = (t - 0.2) / 0.8;
  return Math.exp(-5 * p) * Math.cos(p * Math.PI * 2.5);
};

const getBlur = (dist) => {
  const i = Math.min(Math.floor(dist), BLUR.length - 2);
  const f = dist - i;
  return BLUR[i] + (BLUR[i + 1] - BLUR[i]) * f;
};

export const ServicesWheel = () => {
  const N = services.length;
  const total = N * COPIES;

  const cardRef = useRef(null);
  const wheelRef = useRef(null);
  const arrowRef = useRef(null);
  const itemRefs = useRef([]);

  const onScreen = useOnScreen(cardRef);

  // Five stacked cards, each keeping its identity as it rotates through the
  // stack so CSS can transition it between specs.
  const [stack, setStack] = useState(() => [
    { key: "c0", text: "" },
    { key: "c1", text: "" },
    { key: "c2", text: descriptions[0] },
    { key: "c3", text: "" },
    { key: "c4", text: "" },
  ]);

  // Everything the animation loop touches lives in a ref, so a 60fps render
  // never triggers a React re-render.
  const st = useRef({
    currentIdx: 0,
    scrollAngle: 0,
    arrowNudge: 0,
    activeNudge: 0,
    hovered: null,
    isAnimating: false,
    centerY: 182,
    sweepEl: null,
    sweepElapsed: 0,
    sweepLast: 0,
    sweepPaused: false,
    sweepDur: SWEEP_DEFAULT,
    interval: INTERVAL_DEFAULT,
    timerElapsed: 0,
    timerLast: 0,
    paused: false,
    offScreen: false,
    pointerDown: false,
    dragging: false,
    dragStartY: 0,
  });

  const labels = useMemo(() => {
    const out = [];
    for (let c = 0; c < COPIES; c += 1) {
      for (let i = 0; i < N; i += 1) out.push({ label: services[i], idx: i });
    }
    return out;
  }, [N]);

  useEffect(() => {
    st.current.offScreen = !onScreen;
  }, [onScreen]);

  // ---- Paint one frame of the wheel ----
  const render = useCallback(() => {
    const s = st.current;
    const activeSlot = N + s.currentIdx;

    for (let i = 0; i < total; i += 1) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const angleDeg = (i - activeSlot) * STEP_DEG - s.scrollAngle;
      const angleRad = angleDeg * DEG;
      const x = CX + R * Math.cos(angleRad);
      const y = s.centerY + R * Math.sin(angleRad);

      const dist = Math.abs(angleDeg) / STEP_DEG;
      const isActive = dist < 0.5;
      const nx = isActive ? s.activeNudge : 0;

      el.style.left = `${(x + nx).toFixed(1)}px`;
      el.style.top = `${(y - 12.8).toFixed(1)}px`;
      el.style.transform = `rotate(${angleDeg.toFixed(2)}deg)`;

      const isHovered = el === s.hovered && !isActive;

      if (isActive) {
        el.style.fontWeight = "600";
        if (el !== s.sweepEl) el.style.color = "var(--text-body)";
        el.style.opacity = "1";
        el.style.filter = "none";
      } else if (isHovered) {
        el.style.fontWeight = "400";
        el.style.color = "var(--neutral-850)";
        el.style.opacity = "0.72";
        el.style.filter = "none";
      } else {
        el.style.fontWeight = "400";
        el.style.color = "var(--neutral-500)";
        el.style.opacity = "0.4";
        const blur = getBlur(dist);
        el.style.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : "none";
      }

      el.style.visibility = Math.abs(angleDeg) > 70 ? "hidden" : "visible";
      el.style.cursor = isActive
        ? "default"
        : Math.abs(angleDeg) < 50
        ? "pointer"
        : "default";
    }

    // Squash-and-stretch the arrow in step with its nudge: pushing forward
    // elongates it horizontally and thins it vertically, preserving volume.
    if (arrowRef.current) {
      const amt = Math.abs(s.arrowNudge) / 16;
      const sx = 1 + amt * 0.22;
      const sy = 1 - amt * 0.16;
      arrowRef.current.style.transform = `translateY(-50%) translateX(${s.arrowNudge.toFixed(
        1
      )}px) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
    }
  }, [N, total]);

  // ---- Rotate the card stack so the next description expands into place ----
  const updateDescription = useCallback((idx) => {
    setStack((prev) => {
      const next = prev.map((c) => ({ ...c }));
      // The card currently one below centre is the one that expands next,
      // so it has to carry the incoming text before the rotation.
      next[ACTIVE_POS + 1].text = descriptions[idx];
      // Shift left by one; the old top card wraps around to the bottom.
      return [next[1], next[2], next[3], next[4], next[0]];
    });
  }, []);

  // ---- Shimmer that reads left across the active label ----
  const clearSweep = useCallback(() => {
    const s = st.current;
    const el = s.sweepEl;
    if (el) {
      el.style.backgroundImage = "";
      el.style.backgroundSize = "";
      el.style.webkitBackgroundClip = "";
      el.style.backgroundClip = "";
      el.style.webkitTextFillColor = "";
      el.style.backgroundPosition = "";
    }
    s.sweepEl = null;
  }, []);

  const triggerSweep = useCallback(() => {
    const s = st.current;
    const el = itemRefs.current[N + s.currentIdx];
    if (!el) return;

    clearSweep();
    s.sweepEl = el;
    s.sweepElapsed = 0;
    s.sweepPaused = false;
    s.sweepLast = performance.now();

    el.style.backgroundImage =
      "linear-gradient(90deg, var(--text-body) 0%, var(--text-body) 44%, var(--accent-300) 50%, var(--text-body) 56%, var(--text-body) 100%)";
    el.style.backgroundSize = "200% auto";
    el.style.webkitBackgroundClip = "text";
    el.style.backgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
    el.style.backgroundPosition = "100% center";
  }, [N, clearSweep]);

  const animateNudge = useCallback(() => {
    const s = st.current;
    const start = performance.now();
    const distance = 16;
    const arrowLead = 60;
    let switched = false;

    const tick = (now) => {
      const elapsed = now - start;

      s.arrowNudge = distance * springPushReturn(Math.min(elapsed / NUDGE_DUR, 1));

      const textElapsed = Math.max(0, elapsed - arrowLead);
      s.activeNudge =
        distance *
        springPushReturn(Math.min(textElapsed / (NUDGE_DUR - arrowLead), 1));

      // Swap card + start the shimmer at the arrow's peak.
      if (!switched && elapsed >= 120) {
        switched = true;
        updateDescription(s.currentIdx);
        triggerSweep();
      }

      render();

      if (elapsed < NUDGE_DUR) {
        requestAnimationFrame(tick);
      } else {
        s.arrowNudge = 0;
        s.activeNudge = 0;
        render();
      }
    };

    requestAnimationFrame(tick);
  }, [render, triggerSweep, updateDescription]);

  const resetTimer = useCallback(() => {
    st.current.timerElapsed = 0;
    st.current.timerLast = performance.now();
  }, []);

  // ---- Step forward one slot ----
  const advance = useCallback(() => {
    const s = st.current;
    const start = performance.now();
    let committed = false;
    s.isAnimating = true;

    const tick = (now) => {
      const p = Math.min((now - start) / ADVANCE_DUR, 1);
      s.scrollAngle = STEP_DEG * easeOutCubic(p);

      if (!committed && p > 0.95) {
        committed = true;
        s.currentIdx = (s.currentIdx + 1) % N;
        s.scrollAngle = 0;
        s.isAnimating = false;
        animateNudge();
      }

      render();
      if (p < 1 && !committed) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [N, animateNudge, render]);

  // ---- Jump to a clicked label, taking the shortest way round ----
  const scrollToService = useCallback(
    (targetIdx) => {
      const s = st.current;
      let diff = targetIdx - s.currentIdx;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      if (diff === 0) return;

      const steps = Math.abs(diff);
      const totalDeg = steps * STEP_DEG * Math.sign(diff);
      const dur = Math.min(300 + steps * 150, 900);
      const start = performance.now();
      let committed = false;
      s.isAnimating = true;

      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        s.scrollAngle = totalDeg * easeOutCubic(p);

        if (!committed && p > 0.95) {
          committed = true;
          s.currentIdx = targetIdx;
          s.scrollAngle = 0;
          s.isAnimating = false;
          resetTimer();
          animateNudge();
        }

        render();
        if (p < 1 && !committed) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    },
    [N, animateNudge, render, resetTimer]
  );

  // ---- Measure, seed, and run the auto-advance + sweep loops ----
  useEffect(() => {
    const s = st.current;
    const wheel = wheelRef.current;

    const narrow = window.matchMedia("(max-width: 553px)");
    const applyTiming = () => {
      s.interval = narrow.matches
        ? INTERVAL_DEFAULT - NARROW_OFFSET
        : INTERVAL_DEFAULT;
      s.sweepDur = narrow.matches
        ? SWEEP_DEFAULT - NARROW_OFFSET
        : SWEEP_DEFAULT;
    };
    applyTiming();

    const measure = () => {
      if (wheel) s.centerY = wheel.offsetHeight / 2;
      render();
    };
    measure();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    s.timerLast = performance.now();
    if (!reduced) triggerSweep();

    let raf = requestAnimationFrame(function loop(now) {
      // Auto-advance timer, pausable on hover / off-screen.
      if (!s.paused && !s.offScreen && !s.isAnimating && !reduced) {
        s.timerElapsed += now - s.timerLast;
      }
      s.timerLast = now;

      if (!reduced && s.timerElapsed >= s.interval) {
        s.timerElapsed = 0;
        advance();
      }

      // Shimmer progress.
      if (s.sweepEl) {
        if (!s.sweepPaused && !s.offScreen) s.sweepElapsed += now - s.sweepLast;
        s.sweepLast = now;
        const p = Math.min(s.sweepElapsed / s.sweepDur, 1);
        s.sweepEl.style.backgroundPosition = `${(100 - 100 * p).toFixed(
          1
        )}% center`;
        if (p >= 1) clearSweep();
      }

      raf = requestAnimationFrame(loop);
    });

    narrow.addEventListener("change", applyTiming);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      narrow.removeEventListener("change", applyTiming);
      window.removeEventListener("resize", measure);
      clearSweep();
    };
  }, [advance, clearSweep, render, triggerSweep]);

  // ---- Drag to spin ----
  useEffect(() => {
    const s = st.current;
    const wheel = wheelRef.current;
    if (!wheel) return;

    const DRAG_THRESHOLD = 4;
    const pxPerStep = R * Math.sin(STEP_DEG * DEG);

    const snapTo = (dur, after) => {
      const start = performance.now();
      s.isAnimating = true;
      const tick = (now) => {
        if (now - start < dur) {
          requestAnimationFrame(tick);
        } else {
          s.scrollAngle = 0;
          s.isAnimating = false;
          render();
          after();
        }
      };
      requestAnimationFrame(tick);
    };

    const down = (y) => {
      if (s.isAnimating) return;
      s.pointerDown = true;
      s.dragging = false;
      s.dragStartY = y;
    };

    const move = (y) => {
      if (!s.pointerDown) return;
      if (!s.dragging) {
        if (Math.abs(y - s.dragStartY) < DRAG_THRESHOLD) return;
        s.dragging = true;
        clearSweep();
        wheel.classList.add("sp-services__wheel--grabbing");
      }
      s.scrollAngle = (-(y - s.dragStartY) / pxPerStep) * STEP_DEG;
      render();
    };

    const up = () => {
      if (!s.pointerDown) return;
      s.pointerDown = false;
      wheel.classList.remove("sp-services__wheel--grabbing");
      if (!s.dragging) return;
      s.dragging = false;

      const stepsOffset = Math.round(s.scrollAngle / STEP_DEG);
      if (stepsOffset === 0) {
        snapTo(300, triggerSweep);
        return;
      }

      s.currentIdx = ((s.currentIdx + stepsOffset) % N + N) % N;
      s.scrollAngle -= stepsOffset * STEP_DEG;
      snapTo(200, () => {
        resetTimer();
        animateNudge();
      });
    };

    const onMouseDown = (e) => {
      e.preventDefault();
      down(e.clientY);
    };
    const onMouseMove = (e) => {
      if (s.pointerDown) {
        e.preventDefault();
        move(e.clientY);
      }
    };
    const onTouchStart = (e) => down(e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (s.pointerDown) move(e.touches[0].clientY);
    };

    wheel.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", up);
    wheel.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", up);

    return () => {
      wheel.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", up);
      wheel.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", up);
    };
  }, [N, animateNudge, clearSweep, render, resetTimer, triggerSweep]);

  // ---- Pointer affordances ----
  const onMouseEnter = () => {
    st.current.paused = true;
    st.current.sweepPaused = true;
  };

  const onMouseLeave = () => {
    const s = st.current;
    s.paused = false;
    s.timerLast = performance.now();
    s.hovered = null;
    s.sweepPaused = false;
    s.sweepLast = performance.now();
    render();
  };

  const onItemOver = (e) => {
    const target = e.target.closest(".sp-wheel__item");
    if (target && target !== st.current.hovered) {
      st.current.hovered = target;
      render();
    }
  };

  const onItemOut = () => {
    if (st.current.hovered) {
      st.current.hovered = null;
      render();
    }
  };

  const onItemClick = (e) => {
    const s = st.current;
    if (s.dragging) return;
    const target = e.target.closest(".sp-wheel__item");
    if (!target || s.isAnimating) return;
    const idx = Number(target.dataset.serviceIdx);
    if (idx === s.currentIdx) return;
    scrollToService(idx);
  };

  return (
    <div className="sp-card sp-card--services" ref={cardRef}>
      <div
        className="sp-services__wheel"
        ref={wheelRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          className="sp-wheel__track"
          onMouseOver={onItemOver}
          onMouseOut={onItemOut}
          onClick={onItemClick}
        >
          {labels.map((item, i) => (
            <span
              key={`${item.idx}-${i}`}
              className="sp-wheel__item"
              data-service-idx={item.idx}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="sp-services__arrow" ref={arrowRef} aria-hidden="true">
        <WheelArrow />
      </div>

      <div className="sp-services__pill-stack">
        {stack.map((card, pos) => (
          <div
            key={card.key}
            className={`sp-stack__card ${
              pos === ACTIVE_POS ? "sp-stack__card--active" : ""
            }`}
            style={specStyle(pos)}
          >
            <span
              style={{
                opacity: pos === ACTIVE_POS ? 1 : 0,
                transition: "opacity 0.2s ease-in",
              }}
            >
              {card.text}
            </span>
          </div>
        ))}
      </div>

      {/* The wheel is decorative motion; the list itself stays readable. */}
      <ul className="sr-only">
        {services.map((s, i) => (
          <li key={s}>
            {s} - {descriptions[i]}
          </li>
        ))}
      </ul>
    </div>
  );
};
