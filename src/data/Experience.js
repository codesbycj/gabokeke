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
import hospyta from "../assets/Hospyta.png";
import zeus from "../assets/Zeus.png";
import usefixr from "../assets/usefixr.png";
import shuttlers from "../assets/shuttlers.png";

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
    Name: "Fixr Technologies",
    Position: "Software Engineer",
    Date: "Jan 2026 – Till Date",
    exp: [
      "Built a mobile app for customers and a web dashboard for admins that work together to automatically send new orders to technicians, eliminating manual data entry.",
      "Engineered the entire end-to-end subscription engine, moving the business from manual billing to an automated recurring revenue model that secured consistent monthly cash flow.",
      "Used WebSockets to show customers exactly where their technician is in real-time as well as a chat system between technicians and customers.",
      "Built a finance screen that shows the company exactly how much they are earning and how technicians are performing.",
    ],
    img: usefixr,
    link: "https://usefixr.com/",
    mobile: true,
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.fixrapp",
      ios: "https://apps.apple.com/app/id6476404086",
    },
  },
  {
    Name: "ZEUS",
    Position: "Frontend Developer (Freelance)",
    Date: "Jan 2025 – Dec 2025",
    exp: [
      "Delivered a fully remodeled CRM platform that improved internal workflows, data accuracy, and day-to-day efficiency for business operations.",
      "Enabled faster decision-making by integrating the database and APIs to provide real-time, reliable access to customer and operational data.",
      "Increased team productivity by optimizing frontend performance and state management, reducing delays and friction in daily CRM usage.",
      "Shipped a production-ready CRM solution that supported business growth and scaled with increasing data and user demands.",
    ],
    img: zeus,
    link: "https://zeuscrm-frontend.onrender.com",
  },
  {
    Name: "Yelocode Systems",
    Position: "Software Engineer",
    Date: "Jan 2023 – Nov 2024",
    exp: [
      "Delivered multiple high-priority web and mobile products on schedule by leading a team consisting of a full stack engineer and two frontend engineers, helping the company meet monthly targets.",
      "Cut team workload by over 70% by migrating a web application from manual data entry to automated API-driven updates, freeing the team to focus on higher-value tasks.",
      "Led sprint planning meetings and worked on improving processes to boost efficiency and productivity.",
      "Built and maintained healthcare and transport products with strong user flows, dashboards, and booking features that improved customer experience and operational delivery.",
    ],
    img: yelo,
  },
  {
    Name: "Hospyta",
    Position: "Software Engineer",
    Date: "Healthcare platform",
    exp: [
      "Developed and maintained the Hospyta mobile and web application, enabling patients to book appointments, consult doctors, access prescriptions, buy healthcare products, and manage their healthcare journey from a single platform.",
      "Implemented core mobile workflows including doctor discovery, appointment scheduling, telemedicine consultations, and patient-provider interactions.",
      "Integrated the mobile product across a wider healthcare ecosystem involving patients, doctors, pharmacies, vendors, riders, and ambulance services.",
    ],
    img: hospyta,
    link: "https://hospyta.com",
    mobile: true,
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.hospyta.hospyta",
      ios: "https://apps.apple.com/ng/app/hospyta/id6475042063",
    },
  },
  {
    Name: "Shuttlers",
    Position: "Software Engineer",
    Date: "Transport booking platform",
    exp: [
      "Built and integrated core transportation workflows including pickup and destination selection, route discovery, seat booking, trip management, push notifications, check-in, and live shuttle tracking.",
      "Implemented repeat-booking enhancements such as favorite and recent routes, booking again, pickup and drop-off modifications, driver ratings, and in-app trip feedback.",
    ],
    img: shuttlers,
    link: "https://apps.apple.com/ng/app/shuttlers/id1532662341",
    mobile: true,
    appLinks: {
      android: "https://play.google.com/store/apps/details?id=com.shuttlers.android",
      ios: "https://apps.apple.com/ng/app/shuttlers/id1532662341",
    },
  },
  {
    Name: "Gemcode Systems Limited",
    Position: "Front End Developer",
    Date: "Website redesign",
    exp: [
      "Improved customer engagement and retention by collaborating with an external team to design and develop the company website using ReactJS.",
      "Reduced hosting and infrastructure cost on a project by maximizing site efficiency and reducing load times through React optimizations and component-based structuring.",
    ],
    img: gemcode,
    link: "https://gemcodesystemlimited.com/",
  },
  {
    Name: "Bole Festival",
    Position: "Junior Front End Developer",
    Date: "Sep 2021 – Oct 2022",
    exp: [
      "Assisted in building responsive festival web pages using HTML, CSS, and JavaScript under senior developer guidance.",
      "Collaborated with the team using Git/GitHub to manage code updates and version control.",
      "Tested pages across browsers and devices to ensure consistent performance before launch.",
    ],
    img: bole,
    link: "https://bolefestival.com/",
  },
];

export const projects = [
  {
    Name: "Fixr",
    img: okekeAI,
    exp: [
      "A customer and technician platform that automates job dispatch, real-time technician tracking, customer messaging, and recurring billing for home services.",
    ],
    skills: ["React Native", "React", "WebSockets", "MySQL"],
    link: "https://usefixr.com/",
  },
  {
    Name: "Hospyta",
    img: hospyta,
    exp: [
      "A healthcare ecosystem that connects patients, doctors, pharmacies, vendors, riders, and ambulance support into a single experience for booking and care management.",
    ],
    skills: ["React Native", "Mobile UX", "Healthcare flows", "API Integration"],
    link: "https://hospyta.com",
  },
  {
    Name: "Shuttlers",
    img: project2,
    exp: [
      "A transport booking app with live shuttle tracking, seat selection, route management, push notifications, and trip feedback features for repeat users.",
    ],
    skills: ["React Native", "Booking flows", "Live Tracking", "Push Notifications"],
    link: "https://apps.apple.com/ng/app/shuttlers/id1532662341",
  },
  {
    Name: "ZEUS CRM",
    img: zeus,
    exp: [
      "A CRM platform redesigned to improve workflows, customer data accuracy, and day-to-day operations with real-time API-driven updates.",
    ],
    skills: ["React", "API Integration", "State Management", "Dashboard UX"],
    link: "https://zeuscrm-frontend.onrender.com",
  },
  {
    Name: "Okeke AI",
    img: okekeAI,
    exp: [
      "A lightweight personal AI assistant built to support the team with real-time query handling and reliable fallback capabilities when external AI providers are unavailable.",
    ],
    skills: ["ReactJs", "Context API", "API Integration", "CSS"],
    link: "https://okeke-ai.vercel.app/",
  },

  // {
  //   Name: "Streaming Service",
  //   img: okekeDash,
  //   exp: [
  //     "Built a custom streaming service platform that allowed users to browse, watch, and interact with content in real time. Designed with a focus on smooth playback, responsive layouts, and a clean user experience.",
  //   ],
  //   skills: ["ReactJs", "Firebase"],
  //   link: "https://cj-interior.vercel.app/",
  // },

  // {
  //   Name: "Fully Interactive Dashboard",
  //   img: okekeDash,
  //   exp: [
  //     "Developed a fully interactive analytics dashboard that transformed complex data into clear, actionable visualizations. The dashboard included real-time updates, customizable views, and responsive charts, giving teams instant insights and reducing reporting time by over 50%.",
  //   ],

  //   skills: ["ReactJs", "Tailwind"],
  //   link: "https://cjdash.vercel.app/",
  // },

  // {
  //   Name: "Shopping Cart",
  //   img: okekeCart,
  //   exp: [
  //     "Created a scalable shopping cart system that supported product sorting, filtering, and seamless checkout flows. Designed with React and state management tools, it ensured a smooth user experience and minimized cart abandonment rates.",
  //   ],

  //   skills: ["ReactJs", "TailwindCSS"],

  //   link: "https://lotech.vercel.app/",
  // },

  // {
  //   Name: "Interior Decoration Landing Page",
  //   img: okekeInterior,
  //   exp: ["Fully Dynamic Interior Decoration Landing Page"],

  //   skills: ["ReactJs", "TailwindCSS"],

  //   link: "https://cj-interior.vercel.app/",
  // },
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
