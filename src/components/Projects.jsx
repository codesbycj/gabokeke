import { sideProjects, stack } from "../data/projects";
import { useRevealChildren, useTilt } from "../hooks";

const ProjectCard = ({ project }) => {
  const tiltRef = useTilt({ max: 7, scale: 1.03 });

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="pub-article"
    >
      <div className="pub-article__image pub-article__tilt" ref={tiltRef}>
        <img src={project.image} alt="" className="pub-article__bg" loading="lazy" />
        <img
          src={project.badge}
          alt=""
          className="pub-article__logo"
          style={{ background: project.badgeBg }}
          loading="lazy"
        />
      </div>
      <div className="pub-article__details">
        <h3 className="pub-article__title">{project.title}</h3>
        <p className="pub-article__caption">{project.caption}</p>
      </div>
    </a>
  );
};

const GROUP_ORDER = ["Frontend", "Backend", "Data", "Tooling"];

export const Projects = () => {
  const ref = useRevealChildren();

  return (
    <section id="projects" className="section publications-section" ref={ref}>
      <div className="centered">
        <h2 className="publications__heading shiny-hover reveal-scroll">
          Projects &amp; stack
        </h2>

        <div className="publications__content">
          <div className="publications__articles reveal-scroll">
            {sideProjects.map((project) => (
              <ProjectCard key={project.href} project={project} />
            ))}
          </div>

          <div className="publications__tools reveal-scroll">
            {GROUP_ORDER.map((group) => {
              const items = stack.filter((t) => t.group === group);
              if (!items.length) return null;
              return (
                <div className="stack-group" key={group}>
                  <h3 className="stack-group__label">{group}</h3>
                  <ul className="stack-group__items">
                    {items.map((tool) => (
                      <li key={tool.name}>
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="stack-chip"
                          title={`${tool.name} - ${tool.caption}`}
                        >
                          <img
                            src={tool.logo}
                            alt=""
                            className="stack-chip__logo"
                            width="22"
                            height="22"
                            loading="lazy"
                          />
                          <span>{tool.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
