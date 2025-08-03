import React from "react";
import me from "../assets/Okeke_Memoji.png";
import cursor1 from "../assets/10001.svg";
import cursor2 from "../assets/10002.svg";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center flex-col gap-8 relative">
      <div className="flex items-center gap-7">
        <div
          className="rounded-full flex items-center justify-center w-20 h-20
        bg-white"
        >
          <img src={me} alt="" className="object-contain mt-3" />
        </div>
        <p className="text-lg font-bold border border-gray-400 p-3 rounded-xl">
          I'm Gabokeke Emmanuel
        </p>
      </div>

      <div className="text-center relative lg:text-8xl text-5xl font-semibold">
        {/* <p className="text-4xl">A</p> */}
        <h1 className="text-[#A374FF]">FRONT-END</h1>
        <div className="flex items-center gap-3 justify-center">
          {" "}
          <h1 className="text-[#FFD074]">DESIGNER </h1>
          <span className="text-white text-lg text-center font-semibold">
            {" "}
            // 3+ Years <br /> of Experience
          </span>
        </div>
        <h1 className="text-[#17F1D1]">
          {" "}
          <span className="text-white">&</span> DEVELOPER.
        </h1>

        <div className="absolute animate-move top-0 right-0">
          <img src={cursor2} alt="" />
        </div>
        <div className="absolute animate-straight bottom-0 left-0">
          <img src={cursor1} alt="" />
        </div>
      </div>

      <div className="text-center font-semibold">
        <p className="lg:text-3xl text-lg">
          I create scalable applications that borders on <br />
          <span className="text-[#A374FF]">efficiency</span>,{" "}
          <span className="text-[#FFD074]">aesthetics</span> &{" "}
          <span className="text-[#17F1D1]">functionality</span>.
        </p>
      </div>

      <Link
        to="/summary"
        className="absolute bottom-10 right-20 py-3 px-7 bg-gray-300 
      text-black font-bold shadow-sm shadow-white rounded-sm"
      >
        Quick Summary
      </Link>

      {/* <div>
        <h1>Essential Tools I Use</h1>
        <p>Discover the powerful tools and technologies I use to create exceptional,
           high-performing websites & applications</p>

        <div>
          <div>
            <img src="" alt="" />
            <div>
              <p>CSS3</p>
              <p>User Interface</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
