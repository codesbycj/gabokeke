import react from "../assets/React.svg";
import fiverr from "../assets/fIVERR.png";
import bootstrap from "../assets/bootstrap.svg";
import nextjs from "../assets/nextjs.svg";
import firebase from "../assets/firebase.svg";
import jquery from "../assets/jquery.svg";
import javascript from "../assets/Javascript.svg";
import css from "../assets/CSS.svg";
import html from "../assets/HTML.svg";
import tailwind from "../assets/Tailwind.svg";
import mysql from "../assets/MySQL.svg";
import php from "../assets/PHP.svg";
import git from "../assets/Git.svg";
import gemcode from "../assets/Gemcode.png";
import yelo from "../assets/Yelo.png";
import bole from "../assets/Bole.png";
import okekeAI from "../assets/Okeke_AI.png";
import okekeCart from "../assets/Okeke_Cart.png";
import okekeDash from "../assets/Okeke_Dash.png";
import okekeInterior from "../assets/Okeke_Interior.png";
import project2 from "../assets/depotters.png";

export const experience = [
  {
    Name: "Yelocode Systems",
    Position: "Full Stack Developer",
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
    Name: "Hospyta",
    Position: "Front End Developer - Contract",
    Date: "May 2025",
    exp: [
      "Built the entire frontend for De Potters with no pre-existing UI/UX mockups, and responsive layouts using PHP and BootStrapCSS.",
      "Researched and applied UI best practices (contrast ratios, intuitive navigation) to compensate for lack of designer input.",
      "Pixel - Perfect Responsiveness: Created a fully responsive website that's optimized perfectly for all devices ",
    ],
    skills: ["HTML", "CSS", "BootStrapCSS", "PHP"],
  },

  {
    Name: "Gemcode Systems Limited",
    Position: "Front End Developer - Contract",
    Date: "April 2025",
    exp: [
      "Designed and coded the homepage from scratch, ensuring fast loading and mobile-friendly responsiveness",
    ],

    skills: ["ReactJs", "TailwindCSS", "BootStrapCSS", "NextJS", "JQuery"],
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

    skills: ["ReactJs", "HTML", "CSS", "TailwindCSS", "BootStrapCSS"],
  },

  {
    Name: "Bole Festival",
    Position: "Front End Developer - Freelance",
    Date: "Sep 2022 - Oct 2022",
    exp: [
      "Assisted in building responsive festival web pages using HTML, CSS, and JavaScript under senior developer guidance.",
      "Collaborated with the team using Git/GitHub to manage code updates and version control.",
      "Tested pages across browsers/devices to ensure consistent performance before launch.",
    ],

    skills: ["HTML", "CSS", "Javascript"],
  },
];

export const live = [
  {
    Name: "Yelocode Systems - 2025",
    Position: "Fullstack Developer",
    exp: [
      "Delivery of multiple high-priority web products on schedule by leading a team consisting of a fullstack engineer and two frontend engineers, helping the company meet monthly targets.",
      "Developed an in-house AI, now known as Okeke AI, which serves as a reliable fallback solution during ChatGPT downtimes, ensuring uninterrupted productivity for the team",
      "Cut team workload by over 70% by migrating a web application from manual data entry to automated API-driven updates, freeing the team to focus on higher-value tasks.",
      "Led sprint planning meetings and worked on improving processes to boost efficiency and productivity.",
      "Managed several projects, such as the Listkeeping Dashboard, Tailwind CSS migration and more. This involved coordinating teams, meeting project objectives, and developing effective strategies for successful implementation.",
    ],
    img: yelo,
  },

  {
    Name: "Gemcode Systems Limited- 2025",
    Position: "Front End Developer",
    exp: [
      "Improved customer engagement and retention by collaborating with an external team to design and develop the company's website using ReactJS.",
      "Optimized the website with SEO strategies that doubled ad conversion rates, turning existing traffic into significantly more revenue.",
      "Reduced hosting and infrastructure cost on a project by maximizing site efficiency and reducing load times through Redux toolkits, Context API and components.",
    ],
    img: gemcode,
    link: "https://gemcodesystemlimited.com/",
  },

  {
    Name: "Hospyta - 2025",
    Position: "Front End Developer",
    exp: [
      "Developed and managed the current version of the company's website to improve customer engagement and retention.",
      "Optimized the website with SEO strategies that tripled, even quadripled ad conversion rates",
      "Worked hands in hands with the CEO to design and implement various web solutions, always focused on meeting requirements and delivering high-quality results.",
    ],
    img: project2,
    link: "https://hospyta.com",
  },

  {
    Name: "Upwork & Fiverr - 2024",
    Position: "Front End Developer",
    exp: [
      "Worked with a diverse range of clients, including Jollof Republik and Babelos, creating custom web solutions tailored to their needs.",
      "Created a visually striking portfolio with smooth animations, gallery grids, and contact forms for artists",
      "Adapted quickly to diverse tools and workflows, from Ajax and REST APIs to state management systems, while staying collaborative, documenting processes, and continuously improving based on industry trends ",
    ],
    img: fiverr,
  },

  {
    Name: "Bole Festival - 2021",
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
      "Okeke AI, a personal artificial intelligence assistant designed to interact with users in real-time, answer queries, and streamline simple tasks — all with a lightweight, responsive interface.",
    ],
    skills: ["ReactJs", "Context API", "API Integration", "CSS"],
    link: "https://okeke-ai.vercel.app/",
  },

  {
    Name: "Streaming Service",
    img: okekeDash,
    exp: [
      "Built a custom streaming service platform that allowed users to browse, watch, and interact with content in real time. Designed with a focus on smooth playback, responsive layouts, and a clean user experience.",
    ],
    skills: ["ReactJs", "Firebase"],
    link: "https://cj-interior.vercel.app/",
  },

  {
    Name: "Fully Interactive Dashboard",
    img: okekeDash,
    exp: [
      "Developed a fully interactive analytics dashboard that transformed complex data into clear, actionable visualizations. The dashboard included real-time updates, customizable views, and responsive charts, giving teams instant insights and reducing reporting time by over 50%.",
    ],

    skills: ["ReactJs", "Tailwind"],
    link: "https://cjdash.vercel.app/",
  },

  {
    Name: "Shopping Cart",
    img: okekeCart,
    exp: [
      "Created a scalable shopping cart system that supported product sorting, filtering, and seamless checkout flows. Designed with React and state management tools, it ensured a smooth user experience and minimized cart abandonment rates.",
    ],

    skills: ["ReactJs", "TailwindCSS"],

    link: "https://lotech.vercel.app/",
  },

  {
    Name: "Interior Decoration Landing Page",
    img: okekeInterior,
    exp: ["Fully Dynamic Interior Decoration Landing Page"],

    skills: ["ReactJs", "TailwindCSS"],

    link: "https://cj-interior.vercel.app/",
  },
];

export const technologies = [
  {
    app: "React - Vite",
    type: "Framework",
    img: react,
  },
  {
    app: "Next",
    type: "Framework",
    img: nextjs,
  },
  {
    app: "Tailwind CSS",
    type: "CSS Framework",
    img: tailwind,
  },
  {
    app: "BootStrap CSS",
    type: "CSS Framework",
    img: bootstrap,
  },
  {
    app: "Firebase",
    type: "BaaS",
    img: firebase,
  },
  {
    app: "JQuery",
    type: "Javascript Library",
    img: jquery,
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
];
