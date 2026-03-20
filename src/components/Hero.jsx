import React from "react";
import me from "../assets/Okeke_Memoji.png";
import cursor1 from "../assets/10001.svg";
import cursor2 from "../assets/10002.svg";

export const Hero = () => {
  return (
    <section
      id="home"
      aria-label="Hero section"
      className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4 sm:gap-6 lg:gap-8 relative px-4 sm:px-6 pt-20 pb-10"
    >
      <div className="flex items-center gap-4 sm:gap-7">
        <div
          className="rounded-full flex items-center justify-center w-12 h-12 sm:w-15 sm:h-15 lg:w-20 lg:h-20
        bg-white shrink-0"
        >
          <img src={me} alt="Gabokeke Emmanuel memoji avatar" className="object-contain mt-2 sm:mt-3 w-10 sm:w-auto" />
        </div>
        <p className="text-sm sm:text-base lg:text-lg font-bold border border-gray-400 p-2 sm:p-3 rounded-xl">
          I'm Gabokeke Emmanuel
        </p>
      </div>

      <div className="text-center relative text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold max-w-full">
        <h1 className="sr-only">Gabokeke Emmanuel - Software Developer & Engineer with 4+ Years Experience</h1>
        <p className="text-[#A374FF] text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold" aria-hidden="true">SOFTWARE</p>
        <div className="flex items-center gap-2 sm:gap-3 justify-center flex-wrap" aria-hidden="true">
          <p className="text-[#FFD074] text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">DEVELOPER </p>
          <span className="text-white text-xs sm:text-sm lg:text-lg text-center font-semibold">
            // 4+ Years <br /> Experience
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-center" aria-hidden="true">
          <p className="text-[#17F1D1] text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold">
            <span className="text-white">&</span> ENGINEER
          </p>
        </div>

        <div className="absolute animate-move top-0 right-0" aria-hidden="true">
          <img src={cursor2} alt="" role="presentation" />
        </div>
        <div className="absolute animate-straight bottom-0 left-0" aria-hidden="true">
          <img src={cursor1} alt="" role="presentation" />
        </div>
      </div>

      <div className="text-center font-semibold px-2">
        <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
          I create scalable softwares and applications that borders on <br className="hidden sm:block" />
          <span className="text-[#A374FF]">efficiency</span>,{" "}
          <span className="text-[#FFD074]">aesthetics</span> &{" "}
          <span className="text-[#17F1D1]">functionality</span>.
        </p>
      </div>
    </section>
  );
};
