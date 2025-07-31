import React, { useEffect, useState } from "react";
import { Hero, Loading, Header, Transition } from "../components";
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
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <Header />
          <Hero />
          <Transition />
          <Experience />
        </main>
      )}
    </div>
  );
};
