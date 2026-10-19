// Single source of truth for identity, navigation and outbound links.

export const profile = {
  firstName: "Emmanuel",
  lastName: "Gabokeke",
  fullName: "Emmanuel Gabokeke",
  role: "Software Engineer",
  title: "Emmanuel Gabokeke - Software Engineer",
  description:
    "Software engineer. Over 5 years across internal tools, financial products, customer-facing applications, AI systems and platforms handling real-world workflows.",
  url: "https://www.gabokeke.com",
  email: "gabokekeemmanuel@gmail.com",
  phone: "+2348166056249",
  location: "Open to new roles.",
  headline:
    "I'm Emmanuel, a software engineer building enterprise-level web and mobile products",
  bio: [
    "I've over the course of 5 years handled real-world workflows like internal tools, AI systems and platforms, financial products and customer-facing applications,  using React and React Native, Express, PostgreSQL, amidst other tools."
  ],
};

// TODO: swap for a Cal.com or Google Calendar booking link when you have one.
export const bookCallUrl = `https://wa.me/${profile.phone.replace("+", "")}`;

export const navLinks = [
  { id: "services", label: "Skills", href: "#services" },
  { id: "work", label: "Work", href: "#work" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
];

export const socials = {
  linkedin: "https://www.linkedin.com/in/emmanuel-gabokeke",
  github: "https://github.com/codesbycj",
  x: "https://x.com/codesbycj",
  instagram: "https://instagram.com/codesbycjay",
  threads: "https://www.threads.com/@codesbycjay",
  tiktok: "https://www.tiktok.com/@codesbycj",
};

// One ordered list, used by the sidebar, the mobile menu and the footer.
// `icon` keys into the icon map in SiteFooter.
export const socialLinks = [
  { label: "LinkedIn", href: socials.linkedin, icon: "linkedin" },
  { label: "GitHub", href: socials.github, icon: "github" },
  { label: "X", href: socials.x, icon: "x", handle: "@codesbycj" },
  {
    label: "Instagram",
    href: socials.instagram,
    icon: "instagram",
    handle: "@codesbycjay",
  },
  {
    label: "Threads",
    href: socials.threads,
    icon: "threads",
    handle: "@codesbycjay",
  },
  { label: "TikTok", href: socials.tiktok, icon: "tiktok", handle: "@codesbycj" },
];

// Companies whose products he has shipped on - shown as the trust strip.
// Values are keys into `brands` in ./logos.js.
export const trustedBy = ["fixr", "hospyta", "shuttlers", "yelocode", "gemcode"];

const askPrompt = `I'm evaluating ${profile.fullName} (${profile.url}) for a software engineering role on our team. Review his portfolio and tell me: what's his technical range, what kind of team and stage he fits best, and what I'd actually get if I hired him. Be specific - reference his projects and experience.`;

export const askAiLinks = [
  {
    label: "ChatGPT",
    short: "GPT",
    icon: "openai",
    href: `https://chatgpt.com/?q=${encodeURIComponent(askPrompt)}`,
  },
  {
    label: "Grok",
    short: "GK",
    icon: "x",
    href: `https://x.com/i/grok?text=${encodeURIComponent(askPrompt)}`,
  },
];
