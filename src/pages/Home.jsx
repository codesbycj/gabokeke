import React, { useEffect } from "react";
import { Hero, Header, Footer, Contact } from "../components";
import { Experience } from "../components/Experience";

export const Home = () => {
  useEffect(() => {
    document.title = "Emmanuel Gabokeke | Software Engineer | Portfolio";
  }, []);

  return (
    <div className="bg-black overflow-x-hidden">
      <main>
        <Header />
        <Hero />
        {/* <Transition /> */}
        <Experience />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};
