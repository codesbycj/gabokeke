import React from "react";
import { ArrowUpRight, CheckIcon, CopyIcon } from "./icons";
import { useToast } from "../context/toast";
import portrait from "../assets/Profile.JPG";
import { askAiLinks, bookCallUrl, profile } from "../data/site";
import { useCopyToClipboard, useRevealChildren, useTilt } from "../hooks";

// TODO: add two more candid shots here and the mobile strip fills out to three.
const photos = [{ src: portrait, alt: `${profile.fullName}` }];

const paragraphs = [
  "I started where most self-taught engineers start: building whatever people asked for, in whatever stack they already had. Festival pages in plain HTML, then PHP sites, then React. Each project taught me a layer of how software actually gets built and shipped.",
  "That path turned into full ownership. I've worked across the whole thing: mobile apps, web dashboards, the APIs between them, the database underneath, and the billing that makes it a business. What the screen does, and why it does it that way.",
  "I take a feature from scope to production without needing it handed back and forth. No details lost between a design file and the build, and I stay through the unglamorous parts: the edge cases, the migration, the release that almost didn't go out.",
  "I've led frontend and mobile teams, run sprint planning, and spent a lot of time unblocking other people instead of hoarding the interesting work. It's the fastest way to ship more than one person can.",
  "I'm looking for a team where an engineer still shapes the product, not just the ticket. Real users, real ownership, and a short line between a decision and its consequence.",
];

export const About = () => {
  const bodyRef = useRevealChildren();
  const photoRef = useTilt({ max: 4, scale: 1.01, glareSelector: ".about__hero-glare" });
  const { copied, copy } = useCopyToClipboard();
  const { notify } = useToast();

  const onCopy = async () => {
    const ok = await copy(profile.email);
    notify(ok ? "Email copied to clipboard" : profile.email);
  };

  return (
    <section id="about" className="section about-section" ref={bodyRef}>
      <div className="centered">
        <h2 className="about__heading shiny-hover reveal-scroll">
          About me
        </h2>

        <div className="about__body">
          <div className="about__content">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <div className="about__hero-photo about__hero-photo--visible" ref={photoRef}>
            <div className="about__hero-glare" />
            <img src={photos[0].src} alt={photos[0].alt} loading="lazy" />
          </div>

          <div className="about__photos">
            {photos.map((photo) => (
              <div className="about__photo" key={photo.src}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="about__footer reveal-scroll">
          <div className="about__cta-card">
            <div className="about__cta-title shiny-hover shiny-hover--blue">
              Tell me about the role.
              <br className="about__cta-br" /> Let's see if I'm a fit.
            </div>
            <div className="about__cta-controls">
              <div className="about__email-pill">
                <span className="about__email-text">{profile.email}</span>
                <button
                  type="button"
                  className="about__icon-btn"
                  aria-label="Copy email address"
                  onClick={onCopy}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <a
                href={bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study__btn about__book-btn"
              >
                <span>Book a Call</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>

          <div className="about__ask-ai">
            <div className="about__ask-ai-title">
              Ask AI about {profile.firstName}
            </div>
            <div className="about__ai-pill">
              {askAiLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__icon-btn"
                  aria-label={`Ask ${link.label} about ${profile.firstName}`}
                >
                  {link.short}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
