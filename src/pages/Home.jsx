import React, { useEffect, useState } from "react";
import { Hero, Loading, Header, Transition, Footer, Contact } from "../components";
import { Experience } from "../components/Experience";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = "Gabokeke Emmanuel | Software Developer & Engineer | Portfolio";
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
