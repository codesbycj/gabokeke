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
            {stack.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-tool"
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="pub-tool__logo"
                  width="56"
                  height="56"
                  loading="lazy"
                />
                <div className="pub-tool__details">
                  <div className="pub-tool__title">
                    <span className="pub-tool__title-full">
                      {tool.name}
                      <span className="pub-tool__dot">&nbsp;・&nbsp;</span>
                      {tool.category}
                    </span>
                    <span className="pub-tool__title-short">{tool.name}</span>
                  </div>
                  <div className="pub-tool__caption">
                    <span className="pub-tool__caption-full">
                      {tool.caption}
                    </span>
                    <span className="pub-tool__caption-short">
                      {tool.captionShort}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
