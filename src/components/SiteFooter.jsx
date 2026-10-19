import { socialIconMap } from "./socialIcons";
import { socialLinks, profile } from "../data/site";


export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="centered">
      <div className="footer__inner">
        <span className="footer__copyright">
          {new Date().getFullYear()} © <strong>{profile.fullName}</strong>. All
          rights reserved.
        </span>
        <div className="footer__socials">
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social"
                aria-label={
                  social.handle
                    ? `${social.label} ${social.handle}`
                    : social.label
                }
                title={social.handle ?? social.label}
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
