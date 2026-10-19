import { brands } from "../data/logos";

// Deterministic tint per brand, so a fallback tile looks chosen rather than
// random and stays the same across reloads.
const TINTS = [
  { bg: "#EFF6FF", fg: "#1A6EFF" },
  { bg: "#FFE6E8", fg: "#B43145" },
  { bg: "#E9F7EF", fg: "#1F7A4D" },
  { bg: "#F3EEFF", fg: "#5B3FD1" },
  { bg: "#FFF4E5", fg: "#B3651A" },
];

const tintFor = (key) => {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return TINTS[hash % TINTS.length];
};

/**
 * 56x56 company tile. Uses the official square mark when one exists,
 * otherwise a lettermark on a brand-stable tint.
 */
export const BrandMark = ({ brandKey, className = "" }) => {
  const brand = brands[brandKey];
  if (!brand) return null;

  if (brand.mark) {
    return (
      <img
        src={brand.mark}
        alt={brand.name}
        // A full-bleed icon owns its background, so it fills the tile instead
        // of sitting padded on white.
        className={`${className} ${brand.bleed ? "experience__logo--bleed" : ""}`}
        width="56"
        height="56"
        loading="lazy"
      />
    );
  }

  const { bg, fg } = tintFor(brandKey);

  return (
    <span
      className={`${className} brand-mark--letter`}
      style={{ background: bg, color: fg }}
      role="img"
      aria-label={brand.name}
    >
      {brand.name.charAt(0)}
    </span>
  );
};
