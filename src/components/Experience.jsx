import React from "react";
import project2 from "../assets/project2.png";
import { live, projects, technologies } from "../data/Experience";
import { ArrowUp, CircleCheck } from "lucide-react";

export const Experience = () => {
  return (
    <div id="experience" className="py-10 px-5 text-white space-y-20">
      <div className="lg:w-2/3 lg:mx-auto ">
        <div className="lg:w-2/3 w-full">
          <h2 className="text-4xl font-bold">ABOUT ME</h2>

          <p className="mt-2 text-gray-400">
            A Frontend developer that develops high-performing, scalable web
            applications paired with clean, user interface to drive the best
            results .
          </p>
          <p className="mt-2 text-gray-400">
            I have throughout my career, consistently demonstrated my ability to
            master new technologies and lead teams in building scalable,
            user-friendly, and high-performing applications that
            positively impact users and support business goals using the following tools.{" "}
          </p>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols md:grid-cols-2 gap-x-10 gap-y-5 mt-5">
          {technologies.map((tech) => {
            return (
              <div className="flex items-center justify-start gap-4 border border-gray-600 px-3 py-4 rounded-xl">
                <img
                  src={tech.img}
                  alt=""
                  className="w-10 h-10 p-1 bg-gray-600 rounded-xl"
                />
                <div>
                  <p className="font-semibold">{tech.app}</p>
                  <p className="text-gray-400 text-sm font-semibold">
                    {tech.type}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:w-2/3 lg:mx-auto ">
        <div className="text-center font-semibold space-y-3">
          <h1>REAL-WORLD RESULTS</h1>
          <p className="text-5xl">Featured Projects</p>
          <p className="text-gray-500">
            See how I transformed concepts into digital engaging experiences
          </p>
        </div>
        <div className="mt-20 space-y-10">
          {live.map((exp) => {
            return (
              <div
                className="flex flex-col md:flex-row flex-wrap border border-gray-700 py-10 md:px-20 px-5 rounded-2xl overflow-hidden bg-gray-800
              backdrop-blur-2xl shadow-xs shadow-white"
              >
                <div className="flex-1 flex-col gap-4 flex">
                  <p className="font-semibold text-xs lg:text-sm">{exp.Name}</p>
                  <p className="lg:text-4xl text-3xl font-bold border-b border-gray-500 pb-4">
                    {exp.Position}
                  </p>

                  <ul className="space-y-4 text-gray-400">
                    {exp.exp.map((work) => {
                      return (
                        <li className="flex items-start gap-4">
                          <p>✪</p>
                          {work}
                        </li>
                      );
                    })}
                  </ul>

                  {exp.link && (
                    <button
                      className="bg-white  w-max px-5 
                text-center py-2 rounded-xl font-semibold mt-5"
                    >
                      <a
                        href={exp.link}
                        target="_blank"
                        className="flex items-center gap-3 text-black"
                      >
                        Visit Live Site <ArrowUp className="rotate-45 w-4" />
                      </a>{" "}
                    </button>
                  )}
                </div>

                <div className="flex-1 relative w-full ">
                  <img
                    src={exp.img}
                    alt=""
                    className="md:absolute ms-16 -mb-15 mt-5 -right-22 h-full object-cover object-left w-full -bottom-15 
                    shadow-lg shadow-gray-100 rounded-2xl border border-gray-800"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="projects" className="lg:w-4/5 lg:mx-auto ">
        <div className="text-center font-semibold space-y-3">
          <h1>PERSONAL PROJECTS</h1>
          <p className="text-5xl">Featured Projects</p>
          <p className="text-gray-500">
            Ideas, Assignments, Clones ... All of it
          </p>
        </div>
        <div className="mt-20 space-y-10 grid lg:grid-cols-2 gap-9 grid-cols-1">
          {projects.map((exp) => {
            return (
              <div
                className="border border-gray-700 py-10 lg:px-15 px-7 rounded-2xl overflow-hidden bg-gray-800
              backdrop-blur-2xl shadow-xs shadow-white"
              >
                <div className="flex-1 flex-col gap-4 flex">
                  <p className="text-4xl font-bold border-b border-gray-500 pb-4">
                    {exp.Name}
                  </p>

                  <ul className="space-y-4 text-gray-400">
                    {exp.exp.map((exp) => {
                      return (
                        <li className="flex items-start gap-4">
                           {exp}
                        </li>
                      );
                    })}
                  </ul>

                  <button
                    className="bg-white  w-max px-5 
                text-center py-2 rounded-xl font-semibold mt-5"
                  >
                    <a
                      href={exp.link}
                      target="_blank"
                      className="flex items-center gap-3 text-black"
                    >
                      Visit Live Site <ArrowUp className="rotate-45 w-4" />
                    </a>{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
