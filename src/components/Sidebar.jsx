import { Wordmark } from "./Wordmark";
import { useToast } from "../context/toast";
import { MailIcon } from "./icons";
import { socialIconMap } from "./socialIcons";
import { navLinks, profile, socialLinks } from "../data/site";
import { useLoadReveal } from "../hooks";

export const Sidebar = ({ activeSection }) => {
  const { copyEmail } = useToast();

  // One mount flag; the stagger comes from per-item transition delays so we
  // don't call a hook per list item.
  const reveal = useLoadReveal(0);
  const delay = (ms) => ({ transitionDelay: `${ms}ms` });

  return (
    <aside className="sidebar reveal-load reveal-load--active">
      <div className="sidebar-top">
        <a
          href="#about"
          className={`sidebar-name ${reveal}`}
          style={delay(60)}
          aria-label="About"
        >
          <Wordmark />
        </a>

        <nav className="sidebar-nav" aria-label="Sections">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link ${
                activeSection === link.id ? "active" : ""
              } ${reveal}`}
              style={delay(140 + i * 40)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className={`sidebar-socials ${reveal}`} style={delay(320)}>
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-social"
                aria-label={
                  social.handle
                    ? `${social.label} ${social.handle}`
                    : social.label
                }
                title={social.handle ?? social.label}
              >
                <Icon size={18} />
                <span className="sidebar-social__label">{social.label}</span>
              </a>
            );
          })}
          <button
            type="button"
            className="sidebar-social"
            onClick={copyEmail}
            aria-label="Copy email address"
            title={profile.email}
          >
            <MailIcon size={18} />
            <span className="sidebar-social__label">Email</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
