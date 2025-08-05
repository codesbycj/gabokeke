import React from "react";
import "./Loading.css";
import { useGSAP } from "@gsap/react";
import { Hero } from "../Hero";
import gsap from "gsap";
import { Header } from "../Header";

export const Loading = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    const speed = 1.2;
    const phases = [
      { n2: [2, 3, 4], n3: [1, 5] },
      { n2: [5, 6], n3: [7, 8, 9] },
    ];

    phases.forEach(({ n2, n3 }, index) => {
      let secondDigit = gsap.utils.random(n2);
      let thirdDigit = gsap.utils.random(n3);

      tl.to(
        ".number2 .number-wrap",
        {
          duration: speed,
          yPercent: (secondDigit - 1) * -10,
        },
        ">"
      );

      tl.to(
        ".number3 .number-wrap",
        {
          duration: speed,
          yPercent: (thirdDigit - 1) * -10,
        },
        "<"
      );

      tl.to(`.pre-welcome .line:nth-child(${index + 1}) p`, {
        duration: speed / 2,
        y: 0,
      });

      tl.to(
        ".progress-bar",
        {
          duration: speed,
          width: `${secondDigit * 10 + thirdDigit}%`,
        },
        "<"
      );
    });

    tl.to(
      [".number2 .number-wrap", ".number3 .number-wrap"],
      {
        duration: speed,
        yPercent: -90,
      },
      ">"
    );

    tl.to(
      ".progress-bar",
      {
        duration: speed,
        width: "100%",
      },
      "<"
    );

    tl.to(
      ".number1 .number-wrap",
      {
        duration: speed,
        y: 0,
      },
      "<"
    )
      .to(
        [".number-wrap", ".loading-screen .numbers"],
        {
          duration: speed,
          yPercent: -100,
        },
        ">"
      )
      .to(
        ".percentage",
        {
          duration: speed,
          yPercent: -100,
        },
        "<"
      )
      .to(
        `.pre-welcome .line p`,
        {
          duration: speed / 2,
          yPercent: -100,
          stagger: 0.2,
        },
        "<"
      )
      .to(".progress-bar", {
        duration: speed / 1.5,
        height: `100%`,
        opacity: 0,
      })
      .to(
        ".welcome",
        {
          duration: speed,
          y: 0,
        },
        "<"
      );
  });

  return (
    <div className="loading-container h-screen w-screen fixed top-0 left-0 bg-stone-900 text-white">
      <div className="loading-screen">
        <div className="progress-bar  absolute top-0 left-0 h-1.5 w-0 bg-white"></div>
        <div className="pre-welcome">
          <div className="line font-semibold">
            <p>Building the view layer</p>
          </div>
          <div className="line font-semibold">
            <p>one pixel at a time 🎨</p>
          </div>
        </div>

        <div className="welcome">
          <Header />
          <Hero />
        </div>
        <div className="numbers flex items-center absolute bottom-7 left-7 overflow-hidden">
          <div className="number1 number overflow-hidden">
            <div className="number-wrap transform translate-y-full flex flex-col">
              <span>1</span>
            </div>
          </div>
          <div className="number2 number overflow-hidden">
            <div className="number-wrap flex flex-col font-bold">
              <span className="font-bold">1</span>
              <span className="font-bold">2</span>
              <span className="font-bold">3</span>
              <span className="font-bold">4</span>
              <span className="font-bold">5</span>
              <span className="font-bold">6</span>
              <span className="font-bold">7</span>
              <span className="font-bold">8</span>
              <span className="font-bold">9</span>
              <span className="font-bold">0</span>
            </div>
          </div>
          <div className="number3 number overflow-hidden">
            <div className="number-wrap flex flex-col">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>0</span>
            </div>
          </div>
          <div className="percentage">%</div>
        </div>
      </div>
    </div>
  );
};
