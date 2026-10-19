import { GithubIcon, LinkedinIcon, XIcon } from "./icons";
import { footerSocials, profile } from "../data/site";

const icons = { github: GithubIcon, linkedin: LinkedinIcon, x: XIcon };

export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="centered">
      <div className="footer__inner">
        <span className="footer__copyright">
          {new Date().getFullYear()} © <strong>{profile.fullName}</strong>. All
          rights reserved.
        </span>
        <div className="footer__socials">
          {footerSocials.map((social) => {
            const Icon = icons[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={social.label}
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  </footer>
);
