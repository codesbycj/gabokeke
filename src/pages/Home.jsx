import React, { useEffect, useState } from "react";
import { Hero, Loading, Header, Transition, Footer } from "../components";
import { Experience } from "../components/Experience";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black overflow-x-hidden">
      <main>
        <Header />
        <Hero />
        {/* <Transition /> */}
        <Experience />
        <Footer />
      </main>
    </div>
  );
};
