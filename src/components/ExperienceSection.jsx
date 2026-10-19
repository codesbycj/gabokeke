import { BrandMark } from "./BrandMark";
import { experience } from "../data/experience";
import { useRevealChildren } from "../hooks";

export const ExperienceSection = () => {
  const ref = useRevealChildren();

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="centered">
        <h2 className="experience__heading shiny-hover reveal-scroll">
          Experience
        </h2>

        <div className="experience__rows">
          {experience.map((role) => (
            <div
              className="experience__row reveal-scroll"
              key={`${role.company}-${role.period}`}
            >
              <div className="experience__left">
                <BrandMark
                  brandKey={role.brand}
                  className="experience__logo"
                />
                <div className="experience__details">
                  <div className="experience__title">{role.role}</div>
                  <div className="experience__caption">
                    {role.company}
                    <span className="experience__caption-dot">
                      &nbsp;・&nbsp;
                    </span>
                    {role.period}
                  </div>
                </div>
              </div>
              <p className="experience__desc">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
