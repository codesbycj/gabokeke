import { useEffect } from "react";
import {
  About,
  CaseStudies,
  CtaBlock,
  ExperienceSection,
  Hero,
  LogosStrip,
  MobileHeader,
  Projects,
  Sidebar,
  SiteFooter,
  SocialProof,
  Stats,
} from "../components";
import { navLinks, profile } from "../data/site";
import { useScrollSpy } from "../hooks";

const SECTION_IDS = navLinks.map((l) => l.id);

export const Home = () => {
  const active = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    document.title = profile.title;
  }, []);

  return (
    <>
      <MobileHeader activeSection={active} />
      <Sidebar activeSection={active} />

      <main className="content">
        <section id="services" className="section section--hero">
          <div className="centered">
            <Hero />
            <Stats />
            <SocialProof />
            <LogosStrip />
            <CaseStudies />
          </div>
        </section>

        <ExperienceSection />
        <CtaBlock />
        <Projects />
        <About />
        <SiteFooter />
      </main>
    </>
  );
};

