import { profile } from "../data/site";

/**
 * Stands in for a hand-drawn signature. Drop a `signature.svg` into
 * /public and swap this for an <img> if you ever get one made.
 */
export const Wordmark = ({ className = "" }) => (
  <span className={`wordmark ${className}`} aria-hidden="true">
    <span>{profile.firstName}</span>
    <span>{profile.lastName}</span>
  </span>
);
