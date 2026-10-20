import { useState } from "react";
import { BrandMark } from "./BrandMark";
import { ChevronRight } from "./icons";
import { experience } from "../data/experience";
import { useRevealChildren } from "../hooks";


/**
 * The depth a reviewing engineer looks for: what he personally owned, how the
 * thing works, what he chose against, and how each claim was measured.
 * Collapsed by default so the row reads the same until someone wants it.
 */
const RoleDetail = ({ detail, company }) => {
  const [open, setOpen] = useState(false);
  if (!detail) return null;

  const metrics = (detail.metrics ?? []).filter((m) => m.claim);
  const features = (detail.features ?? []).filter((f) => f.name);
  const blocks = [
    ["What I owned", detail.owned],
    ["How it works", detail.build],
    ["Trade-offs", detail.tradeoffs],
    ["What I tested against", detail.rigor],
  ].filter(([, body]) => body);

  if (!blocks.length && !metrics.length && !features.length && !detail.stack?.length)
    return null;

  return (
    <div className={`role-detail ${open ? "role-detail--open" : ""}`}>
      <button
        type="button"
        className="role-detail__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronRight size={16} />
        <span>{open ? "Hide the detail" : `What I built at ${company}`}</span>
      </button>

      {open && (
        <div className="role-detail__body">
          {detail.stack?.length > 0 && (
            <ul className="role-detail__tags">
              {detail.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          {features.length > 0 && (
            <div className="role-detail__block">
              <h4>What it does</h4>
              <ul className="role-detail__features">
                {features.map((f) => (
                  <li key={f.name}>
                    <span className="role-detail__feature-name">{f.name}</span>
                    <span className="role-detail__feature-what">{f.what}</span>
                    {f.tech?.length > 0 && (
                      <span className="role-detail__feature-tech">
                        {f.tech.join(" · ")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {blocks.map(([heading, body]) => (
            <div className="role-detail__block" key={heading}>
              <h4>{heading}</h4>
              <p>{body}</p>
            </div>
          ))}

          {metrics.length > 0 && (
            <div className="role-detail__block">
              <h4>Results</h4>
              <ul className="role-detail__metrics">
                {metrics.map((m) => (
                  <li key={m.claim}>
                    <span className="role-detail__claim">{m.claim}</span>
                    {m.baseline && (
                      <span className="role-detail__context">
                        Before: {m.baseline}
                      </span>
                    )}
                    {m.method && (
                      <span className="role-detail__context">
                        Measured: {m.method}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ExperienceSection = () => {
  const ref = useRevealChildren();

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="centered">
        <h2 className="experience__heading shiny-hover reveal-scroll">
          Experience
        </h2>

        <div className="experience__rows">
          {experience.map((role) => (
            <div
              className="experience__row reveal-scroll"
              key={`${role.company}-${role.period}`}
            >
              <div className="experience__left">
                <BrandMark
                  brandKey={role.brand}
                  className="experience__logo"
                />
                <div className="experience__details">
                  <div className="experience__title">{role.role}</div>
                  <div className="experience__caption">
                    {role.company}
                    <span className="experience__caption-dot">
                      &nbsp;・&nbsp;
                    </span>
                    {role.period}
                  </div>
                </div>
              </div>
              <div className="experience__body">
                <p className="experience__desc">{role.desc}</p>
                <RoleDetail detail={role.detail} company={role.company} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
