import { trustedBy } from "../data/site";
import { brands } from "../data/logos";

export const LogosStrip = () => (
  <div className="logos-section">
    <span className="logos-section__divider" aria-hidden="true" />
    <div className="logos-section__content">
      <p className="logos-section__title">Shipped product for</p>
      <div className="logos-section__logos">
        {trustedBy.map((key) => {
          const brand = brands[key];
          if (!brand) return null;

          // Prefer a wordmark; a brand with only a square icon uses that.
          const src = brand.wordmark || brand.mark;

          // Last resort, so a missing asset never leaves a hole in the row.
          if (!src) {
            return (
              <span className="logos-section__logo" key={key}>
                {brand.name}
              </span>
            );
          }

          const height = brand.wordmark ? brand.height : brand.markHeight ?? 26;

          return (
            <img
              key={key}
              src={src}
              alt={brand.name}
              className={`logos-section__logo-img ${
                brand.wordmark ? "" : "logos-section__logo-img--icon"
              }`}
              style={{ height }}
              loading="lazy"
            />
          );
        })}
      </div>
    </div>
    <span className="logos-section__divider" aria-hidden="true" />
  </div>
);
