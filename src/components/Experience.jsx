import React from "react";
import project2 from "../assets/project2.png";
import { live, projects, technologies } from "../data/Experience";
import { ArrowUp, CircleCheck } from "lucide-react";

export const Experience = () => {
  return (
    <div id="experience" className="py-10 px-4 sm:px-6 md:px-8 text-white space-y-14 sm:space-y-20">
      <section className="lg:w-2/3 lg:mx-auto" aria-label="About me">
        <div className="lg:w-2/3 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">ABOUT ME</h2>

          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Gabokeke Emmanuel is a software developer and engineer who builds tested, trusted, and scalable web
            and mobile applications paired with clean user interfaces to drive the best
            results.
          </p>
          <p className="mt-2 text-sm sm:text-base text-gray-400">
            Throughout my career as a software developer, I have consistently demonstrated my ability to
            master new technologies and lead teams in building scalable,
            user-friendly, and high-performing software and applications that
            positively impact users and support business goals using the following tools.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-x-6 sm:gap-y-5 mt-5" role="list" aria-label="Technologies and tools">
          {technologies.map((tech, index) => {
            return (
              <div key={index} role="listitem" className="flex items-center justify-start gap-3 sm:gap-4 border border-gray-600 px-2 sm:px-3 py-3 sm:py-4 rounded-xl">
                <img
                  src={tech.img}
                  alt={`${tech.app} logo`}
                  className="w-8 h-8 sm:w-10 sm:h-10 p-1 bg-gray-600 rounded-xl shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">{tech.app}</p>
                  <p className="text-gray-400 text-xs sm:text-sm font-semibold truncate">
                    {tech.type}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="lg:w-2/3 lg:mx-auto" aria-label="Work experience and featured projects">
        <div className="text-center font-semibold space-y-2 sm:space-y-3">
          <p className="text-sm sm:text-base">REAL-WORLD RESULTS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">WORK EXPERIENCE</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            See how I transformed concepts into digital engaging experiences
          </p>
        </div>
        <div className="mt-10 sm:mt-20 space-y-8 sm:space-y-10">
          {live.map((exp, index) => {
            return (
              <article
                key={index}
                className="flex flex-col md:flex-row border border-gray-700 pt-6 pb-2 sm:py-10 px-4 sm:px-6 md:px-10 lg:px-20 rounded-2xl overflow-hidden bg-gray-800
              backdrop-blur-2xl shadow-xs shadow-white gap-4 md:gap-8"
              >
                <div className="flex-1 flex-col gap-3 sm:gap-4 flex">
                  <p className="font-semibold text-xs sm:text-sm">{exp.Name}</p>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold border-b border-gray-500 pb-3 sm:pb-4">
                    {exp.Position}
                  </h3>

                  <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
                    {exp.exp.map((work, i) => {
                      return (
                        <li key={i} className="flex items-start gap-3 sm:gap-4">
                          <span className="shrink-0" aria-hidden="true">✪</span>
                          {work}
                        </li>
                      );
                    })}
                  </ul>

                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white w-max px-4 sm:px-5 text-center py-2 rounded-xl font-semibold mt-3 sm:mt-5 flex items-center gap-2 sm:gap-3 text-black text-sm sm:text-base"
                      aria-label={`Visit ${exp.Name} live site`}
                    >
                      Visit Live Site <ArrowUp className="rotate-45 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {exp.img && (
                  <div className="flex-1 relative w-full mt-4 md:mt-0 min-h-[200px] sm:min-h-[250px] md:min-h-0">
                    <img
                      src={exp.img}
                      alt={`Screenshot of ${exp.Name} project`}
                      className="md:absolute md:-right-22 md:top-5 w-full h-[calc(100%+2rem)] object-cover object-left rounded-2xl border border-gray-800
                      shadow-lg shadow-gray-100"
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="lg:w-4/5 lg:mx-auto" aria-label="Personal projects">
        <div className="text-center font-semibold space-y-2 sm:space-y-3">
          <p className="text-sm sm:text-base">PERSONAL PROJECTS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Featured Projects</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Ideas, Assignments, Clones ... All of it
          </p>
        </div>
        <div className="mt-10 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-9">
          {projects.map((exp, index) => {
            return (
              <article
                key={index}
                className="border border-gray-700 py-6 sm:py-10 px-5 sm:px-7 lg:px-15 rounded-2xl overflow-hidden bg-gray-800
              backdrop-blur-2xl shadow-xs shadow-white"
              >
                <div className="flex-1 flex-col gap-3 sm:gap-4 flex">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold border-b border-gray-500 pb-3 sm:pb-4">
                    {exp.Name}
                  </h3>

                  <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm sm:text-base">
                    {exp.exp.map((item, i) => {
                      return (
                        <li key={i} className="flex items-start gap-3 sm:gap-4">
                           {item}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white w-max px-4 sm:px-5 text-center py-2 rounded-xl font-semibold mt-3 sm:mt-5 flex items-center gap-2 sm:gap-3 text-black text-sm sm:text-base"
                    aria-label={`Visit ${exp.Name} live site`}
                  >
                    Visit Live Site <ArrowUp className="rotate-45 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
