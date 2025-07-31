import React, { useEffect, useState } from "react";
import { Hero, Loading, Header } from "../components";
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
    <div className="bg-black">
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <Header />
          <Hero />
          <Experience />
        </main>
      )}
    </div>
  );
};
