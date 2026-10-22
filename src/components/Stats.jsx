import { stats } from "../data/site";
import { useLoadReveal } from "../hooks";

/**
 * Headline numbers under the bio - the scale a client or a recruiter is
 * scanning for before they read a word of the experience. The claims live in
 * site.js so there is one place to keep them true.
 *
 * Reveal delay sits between the bio (200) and the social proof cards (320),
 * so the band lands as part of the same load stagger rather than after it.
 */
export const Stats = () => {
  const reveal = useLoadReveal(260);

  return (
    <ul className={`hero-stats ${reveal}`}>
      {stats.map((s) => (
        <li className="hero-stat" key={s.label}>
          <span className="hero-stat__value">{s.value}</span>
          <span className="hero-stat__label">{s.label}</span>
        </li>
      ))}
    </ul>
  );
};
