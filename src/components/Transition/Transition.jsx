import React from "react";
import { Experience } from "../Experience";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import profile from "../../assets/Profile.JPG";
import "./Transition.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Transition = () => {
  const transition = useRef(null);
  const stickyRef = useRef(null);
  const handContainer = useRef(null);
  const handRef = useRef(null);
  const handImgRef = useRef(null);
  const introRef = useRef(null);
  const h1ElementRef = useRef(null);
  const introCopyRef = useRef(null);
  const websiteContent = useRef(null);

  const introHeaders = [
    "<span>A </span> Proper Blend of ",
    "Front End Expertise",
    "Back End Experience",
    "<span>Where Ideas </span> Becomes Reality",
    "<span>Welcome to </span> My World",
  ];

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on unmount
    };
  }, []);

  useGSAP(
    () => {
      let currentCycle = -1;
      let imgReveal = false;

      const updateHeader = () => {
        if (h1ElementRef.current) {
          h1ElementRef.current.innerHTML =
            introHeaders[Math.min(currentCycle, introHeaders.length - 1)];
        }
      };

      const pinnedHeight = window.innerHeight * 8;

      gsap.set(handContainer.current, { rotationZ: -90 });

      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${pinnedHeight}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const rotation = Math.min((progress * 8) / 5, 1);
          const totalRotation = rotation * 1800 - 90;
          const rotationCycle = ((totalRotation + 90) % 360) - 90;

          gsap.set(handContainer.current, { rotationZ: rotationCycle });

          const newCycle = Math.floor((totalRotation + 90) / 360);
          if (
            newCycle !== currentCycle &&
            newCycle >= 0 &&
            newCycle < introHeaders.length
          ) {
            currentCycle = newCycle;
            updateHeader();

            if (newCycle === 3 && !imgReveal) {
              gsap.to(handImgRef.current, { opacity: 1, duration: 0.3 });
              gsap.to(introCopyRef.current.querySelectorAll("p"), {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
              });

              imgReveal = true;
            } else if (newCycle !== 3 && imgReveal) {
              gsap.to(handImgRef.current, { opacity: 0, duration: 0.3 });
              gsap.to(introCopyRef.current.querySelectorAll("p"), {
                x: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
              });

              imgReveal = false;
            }
          }

          if (progress <= 6 / 8) {
            const animationProgress = Math.max(0, (progress - 5 / 8) / (1 / 8));
            const newHeight = gsap.utils.interpolate(
              52.75,
              100,
              animationProgress
            );

            const newOpacity = gsap.utils.interpolate(1, 0, animationProgress);
            gsap.set(handRef.current, { height: `${newHeight}%` });
            gsap.set(introRef.current, { opacity: 1 });
            gsap.set(h1ElementRef.current, { opacity: newOpacity });
            gsap.set(h1ElementRef.current.querySelector("span"), {
              opacity: newOpacity,
            });
          } else {
            gsap.set(introRef.current, { opacity: 0 });
          }

          if (progress <= 7 / 8) {
            const scaleProgress = Math.max(0, (progress - 6 / 8) / (1 / 8));
            const newScale = gsap.utils.interpolate(1, 20, scaleProgress);
            gsap.set(handRef.current, { scale: newScale });
          }

          if (progress <= 7.5 / 8) {
            const opacityProgress = Math.max(0, (progress - 7 / 8) / (0.5 / 8));
            const newOpacity = gsap.utils.interpolate(1, 0, opacityProgress);
            gsap.set(handRef.current, { opacity: newOpacity });
          }

          if (progress > 7.5 / 8) {
            const revealProgress = (progress - 7.5 / 8) / (0.5 / 8);
            const newOpacity = gsap.utils.interpolate(0, 1, revealProgress);

            gsap.set(websiteContent.current, { opacity: newOpacity });
          } else {
            gsap.set(websiteContent.current, { opacity: 0 });
          }
        },
      });

      updateHeader();

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: transition }
  );
  return (
    <div className="transition" ref={transition}>
      <section className="stickyE" ref={stickyRef}>
        <div className="handContainer" ref={handContainer}>
          <div className="hand" ref={handRef}>
            <img src={profile} alt="" ref={handImgRef} />
          </div>
        </div>

        <div className="intro" ref={introRef}>
          <h1 ref={h1ElementRef}>
            <span>
              Time to <span>be brave</span>
            </span>
          </h1>

          <div ref={introCopyRef}>
            <p>
              Websites that doesn’t just look good but works
              hard for your business. I build fast, scalable web apps with
              React, Tailwind, Bootstrap, PHP, and MySQL that handle real
              traffic and deliver real results.
            </p>
            <p>
              From Pixel Perfect UI to seamless React Frontend. I design systems that not only work 
              but works for you
            </p>
          </div>
        </div>

        <div className="websiteContent" ref={websiteContent}>
          <h1>CodeGrid</h1>
        </div>
      </section>
    </div>
  );
};
