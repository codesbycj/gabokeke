import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import Profile from "../assets/Profile.JPG";
import { experience, projects } from "../data/Experience";
import project from '../assets/project1.png'

export const Summary = () => {
  const socials = [
    { social: Linkedin },
    { social: Twitter },
    { social: Github },
    { social: Mail },
  ];

  return (
    <div className="flex lg:flex-row bg-[#121212] text-white lg:px-40 py-16 gap-20 flex-col px-5  overflow-x-hidden">
      <div className="w-100 relative flex items-start justify-center">
        <div className="lg:fixed flex flex-col gap-4 flex-wrap">
          <img
            src={Profile}
            alt=""
            className="w-50 h-50 object-cover object-center rounded-full"
          />
          <h1 className="text-5xl font-bold">Gabokeke Emmanuel</h1>
          <p className="text-gray-500 text-xl font-semibold">
            Front - End Web Developer
          </p>
          <p className="text-gray-500 text-xl font-semibold">
            Building Real Products For Real Clients, <br /> Not Just More
            Projects
          </p>

          <div className="flex gap-9 mt-5">
            {socials.map((each) => {
              return (
                <div className="bg-gray-600 p-3 rounded-full w-12 h-12">
                  {<each.social />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:flex-1 lg:px-10 lg:w-170 overflow-x-hidden">
        <div className="text-lg text-gray-300 flex flex-wrap flex-col gap-2">
          <p>
            I'm a 23-year-old experienced Full Stack Developer with a knack for
            building products that make a difference. My expertise spans both
            frontend and backend technologies, enabling me to craft
            comprehensive solutions from the ground up.{" "}
          </p>
          <p>
            Throughout my career, I've been deeply involved in the startup
            ecosystem. I've worked with various startups, embracing the
            fast-paced, innovative nature of these environments.{" "}
          </p>

          <p>
            This journey led me to found my own startup, where I gained
            firsthand experience in every aspect of product development and
            business operations. During my high school years, I excelled in
            software development, earning the prestigious title of DUX (top
            student) in this field.{" "}
          </p>

          <p>
            This early achievement laid the foundation for my passion and
            expertise in programming. When I'm not immersed in code, you'll find
            me experimenting in the kitchen or bringing ideas to life with my 3D
            printer. I'm always creating, whether it's digital products or
            tangible objects.
          </p>
        </div>

        <div className="mt-10">
          <h1 className="text-4xl font-bold text-white">Skills</h1>
          <div className="mt-5">
            <p className="text-2xl font-semibold mb-5">Frontend</p>

            <div className="flex gap-5 font-semibold flex-wrap">
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                Javascript
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                ReactJs
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                NextJs
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                TailwindCSS
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                BootStrapCSS
              </p>
              <p className="bg-[#1E3356] text-[#266EF6] px-4 py-2 rounded-2xl">
                GSAP
              </p>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-2xl font-semibold mb-5">Backend</p>

            <div className="flex gap-5 font-semibold flex-wrap">
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                PHP
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                Laravel
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                Rest API
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                MySQL
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                Firebase
              </p>
              <p className="bg-[#164728] text-[#22C55E] px-4 py-2 rounded-2xl">
                Git
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="text-4xl font-bold ">WORK EXPERIENCE</h1>
          {experience.map((expn) => {
            return (
              <div className="border border-gray-800 rounded-xl px-9 py-5 mt-7 hover:bg-[#262626] transition-colors">
                <div className="">
                  <p className="text-2xl font-semibold flex gap-3 items-center">
                    {expn.Name} <ArrowUp className=" rotate-30" />
                  </p>
                  <p className="text-gray-400 font-semibold">{expn.Position}</p>
                  <p className="text-gray-400 font-semibold">{expn.Date}</p>

                  <div>
                    <ul className="list-disc ms-5 mt-5">
                      {expn.exp.map((ex) => {
                        return <li className="mt-4">{ex}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4">
                    {expn.skills.map((skill) => {
                      return (
                        <p className="px-4 py-1 rounded-3xl bg-[#243039] text-[#1782CF] font-semibold">
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

        <div className="mt-25">
          <h1 className="text-4xl font-bold ">MY PROJECTS</h1>

          {projects.map((expn) => {
            return (
              <div className="border border-gray-800 rounded-xl px-9 py-5 mt-7">
                <img src={project} alt="" srcset="" />
                <div className="mt-10">
                  <p className="text-2xl font-semibold flex gap-3 items-center">
                    {expn.Name} <ArrowUp className=" rotate-30" />
                  </p>
                  <p className="text-gray-400 font-semibold">{expn.Position}</p>
                  <p className="text-gray-400 font-semibold">{expn.Date}</p>

                  <div>
                    <ul className="list-disc ms-5 mt-5">
                      {expn.exp.map((ex) => {
                        return <li className="mt-4">{ex}</li>;
                      })}
                    </ul>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4">
                    {expn.skills.map((skill) => {
                      return (
                        <p className="px-4 py-1 rounded-3xl bg-[#164728] text-[#22C55E] font-semibold">
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
