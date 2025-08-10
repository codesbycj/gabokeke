import react from "../assets/React.svg";
import javascript from "../assets/Javascript.svg";
import css from "../assets/CSS.svg";
import html from "../assets/HTML.svg";
import tailwind from "../assets/Tailwind.svg";
import mysql from "../assets/MySQL.svg";
import php from "../assets/PHP.svg";
import git from "../assets/Git.svg";
import gemcode from "../assets/Gemcode.png";
import yelo from "../assets/Yelo.png"
import bole from "../assets/Bole.png";
import okekeAI from "../assets/Okeke_AI.png"
import okekeCart from "../assets/Okeke_Cart.png"
import okekeDash from "../assets/Okeke_Dash.png"
import okekeInterior from "../assets/Okeke_Interior.png"
import project1 from "../assets/project1.png";
import project2 from "../assets/depotters.png";

export const experience = [
  {
    Name: "Yelocode Systems",
    Position: "Full Stack Developer - Intern",
    Date: "Jan 2025 - July 2025",
    exp: [
      "I lead the frontend engineering team consisting of three frontend engineers and two mobile engineers, with a focus on building, maintaining and improving multiple products and applications.",
      "Developed and maintained responsive Websites using ReactJS and PHP reducing load time by 30% through code optimization.",
      "Built reusable UI components (buttons, modals, forms) with TailwindCSS on multiple projects, improving development speed by 25%.",
      "Collaborated with other Frontend designers to implement Figma/Adobe Designs into pixel-perfect, accessible interfaces.",
      "Built admin dashboards that mirrored complex MYSQL queries into digestible frontend visualizations as well as testing pages to ensure consistent performance.",
      "Integrated RESTful APIs to fetch and display dynamic data, enhancing user engagement.",
    ],
    skills: [
      "ReactJs",
      "Laravel",
      "HTML",
      "CSS",
      "TailwindCSS",
      "BootStrapCSS",
      "PHP",
      "NextJS",
      "MYSQL",
      "Firebase",
      "Ajax",
      "JQuery",
    ],
  },

  {
    Name: "DePotters",
    Position: "Front End Developer - Contract",
    Date: "May 2025",
    exp: [
      "Built the entire frontend for De Potters with no pre-existing UI/UX mockups, and responsive layouts using PHP and BootStrapCSS.",
      "Researched and applied UI best practices (contrast ratios, intuitive navigation) to compensate for lack of designer input.",
      "Pixel - Perfect Responsiveness: Created a fully responsive website that's optimized perfectly for all devices ",
    ],
    skills: [
      "HTML",
      "CSS",
      "BootStrapCSS",
      "PHP",
    ],
  },

  {
    Name: "Gemcode Systems Limited",
    Position: "Front End Developer - Contract",
    Date: "April 2025",
    exp: [
      "Designed and coded the homepage from scratch, ensuring fast loading and mobile-friendly responsiveness",
    ],

    skills: [
      "ReactJs",
      "TailwindCSS",
      "BootStrapCSS",
      "NextJS",
      "JQuery",
    ],
  },

  {
    Name: "Upwork & Fiverr",
    Position: "Front End Developer - Freelance",
    Date: "Jan 2023 - August 2024",
    exp: [
      "Designed a food delivery site with online ordering and real-time menu updates for local SEO",
      "Created a visually striking portfolio with smooth animations, gallery grids, and contact forms for artists",
      "Made a property search site with interactive maps, filters, and virtual tour embeds for realtors.",
    ],

    skills: [
      "ReactJs",
      "HTML",
      "CSS",
      "TailwindCSS",
      "BootStrapCSS",
    ],
  },

  {
    Name: "Bole Festival",
    Position: "Front End Developer - Freelance",
    Date: "Jan 2023",
    exp: [
      "Assisted in building responsive festival web pages using HTML, CSS, and JavaScript under senior developer guidance.",
      "Collaborated with the team using Git/GitHub to manage code updates and version control.",
      "Tested pages across browsers/devices to ensure consistent performance before launch.",
    ],

    skills: [
      "HTML",
      "CSS",
      "Javascript"
    ],
  },
];

export const live = [
  {
    Name: "Yelocode Systems - 2025",
    Position: "Full Stack Developer Intern",
    exp: [
      "I lead the frontend engineering team consisting of three frontend engineers and two mobile engineers, with a focus on building, maintaining and improving multiple products and applications.",
      "Developed and maintained responsive Websites using ReactJS and PHP reducing load time by 30% through code optimization.",
      "Built reusable UI components (buttons, modals, forms) with TailwindCSS on multiple projects, improving development speed by 25%.",
      "Collaborated with other Frontend designers to implement Figma/Adobe Designs into pixel-perfect, accessible interfaces.",
      "Built admin dashboards that mirrored complex MYSQL queries into digestible frontend visualizations as well as testing pages to ensure consistent performance.",
      "Integrated RESTful APIs to fetch and display dynamic data, enhancing user engagement.",
    ],
    img: yelo,
  },

  {
    Name: "DePotters - 2025",
    Position: "Front End Developer",
    exp: [
      "Built the entire frontend for De Potters with no pre-existing UI/UX mockups, and responsive layouts using PHP and BootStrapCSS.",
      "Researched and applied UI best practices (contrast ratios, intuitive navigation) to compensate for lack of designer input.",
      "Pixel - Perfect Responsiveness: Created a fully responsive website that's optimized perfectly for all devices ",
    ],
    img: project2,
    link: "https://gemcodesystemlimited.com/",
  },

  {
    Name: "Gemcode Systems Limited- 2025",
    Position: "Front End Developer",
    exp: [
      "Designed and coded the homepage from scratch, ensuring fast loading and mobile-friendly responsiveness",
    ],
    img: gemcode,
    link: "https://gemcodesystemlimited.com/",
  },

  {
    Name: "Upwork & Fiverr - 2024",
    Position: "Front End Developer",
    exp: [
      "Designed a food delivery site with online ordering and real-time menu updates for local SEO",
      "Created a visually striking portfolio with smooth animations, gallery grids, and contact forms for artists",
      "Made a property search site with interactive maps, filters, and virtual tour embeds for realtors.",
    ],
    img: project1,
  },

  {
    Name: "Bole Festival - 2023",
    Position: "Front End Developer",
    exp: [
      "Assisted in building responsive festival web pages using HTML, CSS, and JavaScript under senior developer guidance.",
      "Collaborated with the team using Git/GitHub to manage code updates and version control.",
      "Tested pages across browsers/devices to ensure consistent performance before launch.",
    ],
    img: bole,
    link: "https://bolefestival.com/",
  },
];

export const projects = [
  {
    Name: "Fully Functional AI",
    img: okekeAI,
    exp: [
      "Engineered a custom API wrapper around Google's Gemini AI",
      "Implemented real-time streaming responses with React Context API, solving complex state management challenges",
      "Optimized API call efficiency through intelligent caching, reducing costs by 25%",
    ],
    skills: ["ReactJs", "Context API", "API Integration", "CSS"],
    link: "https://okeke-ai.vercel.app/",
  },

  {
    Name: "Streaming Service",
    img: okekeDash,
    exp: [
      "Engineered a Netflix-style UI with dynamic content discovery using TMDB's API",
      "Built a Firebase-powered auth flow supporting logins",
      "Optimized video streaming with lazy-loaded thumbnails and adaptive bitrate handling",
    ],
    skills: [
      "ReactJs",
      "Firebase",
    ],
    link: "https://cj-interior.vercel.app/",
  },

  {
    Name: "Fully Interactive Dashboard",
    img: okekeDash,
    exp: [
      "Designed a fully responsive layout that adapts to phones, tablets, and desktops.",
      "Built interactive price charts with toggleable timeframes for user-driven analysis.",
      "Lazy-loaded charts/tables to handle large datasets efficiently, ensuring fast renders.",
    ],

    skills: [
      "ReactJs",
      "Tailwind"
    ],
    link: "https://cjdash.vercel.app/",
  },

  {
    Name: "Shopping Cart",
    img: okekeCart,
    exp: [
      "Engineered a real-time cart system using React Context API/Redux, handling 50+ items with optimized re-renders.",
      "Achieved 100% mobile compatibility with touch-friendly controls and adaptive CSS Grid layouts.",
      "Implemented localStorage sync to retain cart items across sessions, improving bounce rates by 25%.",
      "Built dynamic product cards with quantity adjusters and instant price calculation",
    ],

    skills: [
      "ReactJs",
      "TailwindCSS",
    ],

    link: "https://cj-cart.vercel.app/",
  },

  {
    Name: "Interior Decoration Landing Page",
    img: okekeInterior,
    exp: [
      "Fully Dynamic Interior Decoration Landing Page"
    ],

    skills: [
      "ReactJs",
      "TailwindCSS",
    ],

    link: "https://cj-interior.vercel.app/",
  },
];

export const technologies = [
  {
    app: "React",
    type: "Framework",
    img: react,
  },
  {
    app: "Javascript",
    type: "Interaction",
    img: javascript,
  },
  {
    app: "CSS",
    type: "Styling",
    img: css,
  },
  {
    app: "HTML",
    type: "Structure",
    img: html,
  },
  {
    app: "Tailwind CSS",
    type: "CSS Framework",
    img: tailwind,
  },
  {
    app: "MySQL",
    type: "Relational Database",
    img: mysql,
  },
  {
    app: "PHP",
    type: "Backend Language",
    img: php,
  },
  {
    app: "Git",
    type: "Version Control",
    img: git,
  },
];
