import { Wordmark } from "./Wordmark";
import { useToast } from "../context/toast";
import { navLinks, socials } from "../data/site";
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
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`sidebar-external ${reveal}`}
          style={delay(360)}
        >
          LinkedIn
        </a>
        <button
          type="button"
          className={`sidebar-external ${reveal}`}
          style={delay(400)}
          onClick={copyEmail}
        >
          Email
        </button>
      </div>
    </aside>
  );
};
