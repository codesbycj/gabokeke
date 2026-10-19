import { ServicesWheel } from "./ServicesWheel";
import { Testimonials } from "./Testimonials";
import { useLoadReveal } from "../hooks";

export const SocialProof = () => {
  const reveal = useLoadReveal(320);

  return (
    <div className={`social-proof ${reveal}`}>
      <div className="social-proof__left">
        <ServicesWheel />
      </div>
      <Testimonials />
    </div>
  );
};
