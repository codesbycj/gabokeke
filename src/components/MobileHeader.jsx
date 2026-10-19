import { useEffect, useState } from "react";
import { Wordmark } from "./Wordmark";
import { useToast } from "../context/toast";
import { MailIcon } from "./icons";
import { socialIconMap } from "./socialIcons";
import { navLinks, profile, socialLinks } from "../data/site";
import { useHideOnScrollDown } from "../hooks";

export const MobileHeader = ({ activeSection }) => {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScrollDown();
  const { copyEmail } = useToast();

  // Lock body scroll while the overlay is up.
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  // Esc closes the overlay.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`mobile-header ${
          hidden && !open ? "mobile-header--hidden" : ""
        }`}
      >
        <a href="#services" className="mobile-logo" aria-label="Back to top">
          <Wordmark />
        </a>

        <nav className="mobile-header__nav" aria-label="Sections">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-header__link ${
                activeSection === link.id ? "active" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </header>

      <div className="mobile-menu" aria-hidden={!open}>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="mobile-menu-link"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </a>
        ))}

        <div className="mobile-menu-bottom">
          <div className="mobile-menu-socials">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon];
              if (!Icon) return null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-menu-social"
                  aria-label={social.label}
                  title={social.handle ?? social.label}
                  tabIndex={open ? 0 : -1}
                >
                  <Icon size={20} />
                </a>
              );
            })}
            <button
              type="button"
              className="mobile-menu-social"
              onClick={() => {
                copyEmail();
                setOpen(false);
              }}
              aria-label="Copy email address"
              title={profile.email}
              tabIndex={open ? 0 : -1}
            >
              <MailIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
