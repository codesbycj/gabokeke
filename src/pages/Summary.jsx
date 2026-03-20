import {
  ArrowUp,
  Github,
  Linkedin,
  LucideArrowLeft,
  Mail,
  Twitter,
} from "lucide-react";
import React from "react";
import Profile from "../assets/Profile.JPG";
import { experience, projects } from "../data/Experience";
import { Link } from "react-router-dom";

export const Summary = () => {
  const socials = [
    { social: Linkedin, link: "https://www.linkedin.com/in/emmanuel-gabokeke" },
    { social: Twitter, link: "https://x.com/codesbycj" },
    { social: Github, link: "https://github.com/codesbycj" },
    { social: Mail, link: "gabokekeemmanuel@gmail.com" },
  ];

  return (
    <div className="flex flex-col lg:flex-row bg-[#121212] text-white px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8 sm:py-12 lg:py-16 gap-10 lg:gap-20 overflow-x-hidden">
      <div className="flex">
        <Link to="/">
          <LucideArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" />
        </Link>
      </div>

      <div className="w-full lg:w-80 xl:w-100 relative flex items-start justify-center">
        <div className="lg:fixed flex flex-col gap-3 sm:gap-4 items-center lg:items-start">
          <img
            src={Profile}
            alt=""
            className="w-32 h-32 sm:w-40 sm:h-40 lg:w-50 lg:h-50 object-cover object-center rounded-full"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left">Gabokeke Emmanuel</h1>
          <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-semibold text-center lg:text-left">
            Front - End Web Developer
          </p>
          <p className="text-gray-500 text-base sm:text-lg lg:text-xl font-semibold text-center lg:text-left">
            Building Real Products For Real Clients, <br className="hidden sm:block" /> Not Just More
            Projects
          </p>

          <div className="flex gap-4 sm:gap-6 lg:gap-9 mt-3 sm:mt-5">
            {socials.map((each, index) => {
              return (
                <div key={index} className="bg-gray-600 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12">
                  <a href={each.link} target="_blank">
                    {<each.social className="w-full h-full" />}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:flex-1 lg:px-6 xl:px-10 overflow-x-hidden">
        <div className="text-base sm:text-lg text-gray-300 flex flex-wrap flex-col gap-2">
          <p>
            I began my Front End Journey in 2021, assisting in building
            impactful digital products from concept to completion. I further
            developed these skills handling solo projects in 2022 with local
            businesses in my area. My dual expertise in frontend and backend
            development allows me to architect complete, scalable solutions that
            address real-world needs.
          </p>
          <p>
            I've thrived in fast-paced environments that demand innovation and
            adaptability. The experience culminated in my most recent
            internship, giving me invaluable firsthand knowledge of both
            technical implementation and business strategy.
          </p>
          <p>
            Throughout my career, I have consistently demonstrated my ability to
            master new technologies and lead teams in building scalable,
            user-friendly, and high-performing frontend applications that
            positively impact users and support business goals.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Skills</h1>
          <div className="mt-4 sm:mt-5">
            <p className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">Frontend</p>

            <div className="flex gap-3 sm:gap-5 font-semibold flex-wrap">
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                Javascript
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                ReactJs
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                NextJs
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                TailwindCSS
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                BootStrapCSS
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                GSAP
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-5">
            <p className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-5">Backend</p>

            <div className="flex gap-3 sm:gap-5 font-semibold flex-wrap">
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                PHP
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                Laravel
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                Rest API
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                MySQL
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                Firebase
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-sm sm:text-base">
                Git
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">WORK EXPERIENCE</h1>
          {experience.map((expn, index) => {
            return (
              <div key={index} className="border border-gray-800 rounded-xl px-4 sm:px-6 lg:px-9 py-4 sm:py-5 mt-5 sm:mt-7 hover:bg-[#262626] transition-colors">
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold flex gap-3 items-center">
                    {expn.Name} <ArrowUp className="rotate-30 w-4 sm:w-5" />
                  </p>
                  <p className="text-gray-400 font-semibold text-sm sm:text-base">{expn.Position}</p>
                  <p className="text-gray-400 font-semibold text-sm sm:text-base">{expn.Date}</p>

                  <div>
                    <ul className="list-disc ms-5 mt-4 sm:mt-5">
                      {expn.exp.map((ex, i) => {
                        return <li key={i} className="mt-3 sm:mt-4 text-gray-400 text-sm sm:text-base">{ex}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-4">
                    {expn.skills.map((skill, i) => {
                      return (
                        <p key={i} className="px-3 sm:px-4 py-1 rounded-3xl bg-[#243039] text-[#1782CF] font-semibold text-xs sm:text-sm">
                          {skill}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-25">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">MY PROJECTS</h1>

          {projects.map((expn, index) => {
            return (
              <div key={index} className="border border-gray-800 rounded-xl px-4 sm:px-6 lg:px-9 py-4 sm:py-5 mt-5 sm:mt-7">
                <img src={expn.img} alt="" className="w-full rounded-xl" />
                <div className="mt-6 sm:mt-10">
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold flex gap-3 items-center">
                    {expn.Name} <ArrowUp className="rotate-30 w-4 sm:w-5" />
                  </p>
                  <p className="text-gray-400 font-semibold text-sm sm:text-base">{expn.Position}</p>
                  <p className="text-gray-400 font-semibold text-sm sm:text-base">{expn.Date}</p>

                  <div>
                    <ul className="list-disc ms-5 mt-4 sm:mt-5 text-gray-400">
                      {expn.exp.map((ex, i) => {
                        return <li key={i} className="mt-3 sm:mt-4 text-sm sm:text-base">{ex}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-4">
                    {expn.skills.map((skill, i) => {
                      return (
                        <p key={i} className="px-3 sm:px-4 py-1 rounded-3xl bg-[#164728] text-[#22C55E] font-semibold text-xs sm:text-sm">
                          {skill}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
