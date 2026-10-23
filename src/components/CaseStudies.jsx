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
  // Store graphics already carry their own device mockup and background, so
  // they render flat - putting one inside a `.phone` frame double-frames it.
  const graphics = study.graphics ?? [];
  const isMobile = shots.length > 0;
  const Media = study.live ? "a" : "div";
  const mediaLink = study.live
    ? {
        href: study.live,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${study.title} - open the live product`,
      }
    : {};

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
          {study.appLinks?.iosSoon && !study.appLinks?.ios && (
            <span
              className="case-study__website-btn case-study__store-btn case-study__store-btn--soon"
              title={`${study.title} on iOS - coming soon`}
              aria-label={`${study.title} on the App Store - coming soon`}
            >
              <AppleIcon />
            </span>
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
          {study.live && (
            <>
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
            </>
          )}
        </div>
      </div>

      <Media
        className="case-study__image-wrap"
        style={{ background: study.frame }}
        {...mediaLink}
      >
        {graphics.length > 0 ? (
          // Flat store graphics, centre one raised to match the phone layout.
          <div className="case-study__graphics" ref={tiltRef}>
            <div className="tilt-glare" />
            {graphics.slice(0, 3).map((graphic, i) => (
              <img
                key={graphic}
                src={graphic}
                alt={`${study.title} app screen ${i + 1}`}
                className={`case-study__graphic case-study__graphic--${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        ) : isMobile ? (
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
      </Media>
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
