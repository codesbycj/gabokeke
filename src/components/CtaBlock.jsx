import { ArrowUpRight } from "./icons";
import { bookCallUrl } from "../data/site";
import { useRevealOnScroll } from "../hooks";

export const CtaBlock = () => {
  const ref = useRevealOnScroll();

  return (
    <section className="cta-block reveal-scroll" ref={ref}>
      <div className="centered">
        <div className="cta-block__content">
          <span className="cta-block__label cta-block__label--desktop shiny-hover shiny-hover--blue">
            Hiring? Let's talk about the role
          </span>
          <span className="cta-block__label cta-block__label--mobile shiny-hover shiny-hover--blue">
            Hiring? Let's talk
          </span>
          <a
            href={bookCallUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="case-study__btn cta-block__btn"
          >
            <span>Book a Call</span>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
};
