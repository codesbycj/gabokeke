import { AppleIcon, ArrowUpRight, Globe, PlayStoreIcon } from "./icons";
import { caseStudies } from "../data/caseStudies";
import { useStackFade, useTilt } from "../hooks";

/** A single app screen in a device frame. */
const Phone = ({ src, alt, className = "" }) => (
  <div className={`phone ${className}`}>
    <div className="phone__screen">
      <img src={src} alt={alt} loading="lazy" />
    </div>
    <span className="phone__notch" aria-hidden="true" />
  </div>
);


const CaseStudy = ({ study }) => {
  const tiltRef = useTilt({ max: 5, scale: 1.01, glareSelector: ".tilt-glare" });
  const shots = study.shots ?? [];
  const isMobile = shots.length > 0;

  return (
    <div className="case-study">
      <div className="case-study__header">
        <div className="case-study__text">
          <h2 className="case-study__title shiny-hover">{study.title}</h2>
          <p className="case-study__caption">
            <span className="case-study__caption-desc">{study.desc}</span>
            <span className="case-study__caption-dot">&nbsp;・&nbsp;</span>
            <span className="case-study__caption-year">{study.year}</span>
          </p>
        </div>

        <div className="case-study__buttons">
          {study.appLinks?.ios && (
            <a
              href={study.appLinks.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__website-btn case-study__store-btn"
              aria-label={`${study.title} on the App Store`}
            >
              <AppleIcon />
            </a>
          )}
          {study.appLinks?.android && (
            <a
              href={study.appLinks.android}
              target="_blank"
              rel="noopener noreferrer"
              className="case-study__website-btn case-study__store-btn"
              aria-label={`${study.title} on Google Play`}
            >
              <PlayStoreIcon />
            </a>
          )}
          <a
            href={study.live}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study__website-btn"
            aria-label={`Visit the ${study.title} site`}
          >
            <Globe />
          </a>
          <a
            href={study.live}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study__btn"
          >
            <span>{study.ctaLabel}</span>
            <ArrowUpRight />
          </a>
        </div>
      </div>

      <a
        href={study.live}
        target="_blank"
        rel="noopener noreferrer"
        className="case-study__image-wrap"
        style={{ background: study.frame }}
        aria-label={`${study.title} - open the live product`}
      >
        {isMobile ? (
          // Phone screens: centre one raised, flanked by two stepped back.
          <div className="case-study__phones" ref={tiltRef}>
            <div className="tilt-glare" />
            {shots.slice(0, 3).map((shot, i) => (
              <Phone
                key={shot}
                src={shot}
                alt={`${study.title} app screen ${i + 1}`}
                className={`phone--${i + 1}`}
              />
            ))}
          </div>
        ) : (
          <div className="case-study__tilt" ref={tiltRef}>
            <div className="tilt-glare" />
            <img
              src={study.image}
              alt={`${study.title} - ${study.desc}`}
              className="case-study__image"
              loading="lazy"
            />
          </div>
        )}
      </a>
    </div>
  );
};

export const CaseStudies = () => {
  const stackRef = useStackFade();

  return (
    <div className="case-studies section" id="work" ref={stackRef}>
      {caseStudies.map((study) => (
        <CaseStudy key={study.id} study={study} />
      ))}
    </div>
  );
};
