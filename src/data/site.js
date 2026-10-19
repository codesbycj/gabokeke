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
};

export const footerSocials = [
  { label: "GitHub", href: socials.github, icon: "github" },
  { label: "LinkedIn", href: socials.linkedin, icon: "linkedin" },
  { label: "X", href: socials.x, icon: "x" },
];

// Companies whose products he has shipped on - shown as the trust strip.
// Values are keys into `brands` in ./logos.js.
export const trustedBy = ["fixr", "hospyta", "shuttlers", "yelocode", "gemcode"];

const askPrompt = `I'm evaluating ${profile.fullName} (${profile.url}) for a software engineering role on our team. Review his portfolio and tell me: what's his technical range, what kind of team and stage he fits best, and what I'd actually get if I hired him. Be specific - reference his projects and experience.`;

export const askAiLinks = [
  {
    label: "ChatGPT",
    short: "GPT",
    href: `https://chatgpt.com/?q=${encodeURIComponent(askPrompt)}`,
  },
  {
    label: "Claude",
    short: "CL",
    href: `https://claude.ai/new?q=${encodeURIComponent(askPrompt)}`,
  },
  {
    label: "Perplexity",
    short: "PX",
    href: `https://www.perplexity.ai/search?q=${encodeURIComponent(askPrompt)}`,
  },
  {
    label: "Gemini",
    short: "GM",
    href: `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(
      askPrompt
    )}`,
  },
  {
    label: "Grok",
    short: "GK",
    href: `https://x.com/i/grok?text=${encodeURIComponent(askPrompt)}`,
  },
];
