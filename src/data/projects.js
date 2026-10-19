import recommendCover from "../assets/recommend.png";
import recommendBadge from "../assets/projects/recommend-badge.png";
import arvestCover from "../assets/myarvest.png";
import arvestBadge from "../assets/projects/arvest-badge.png";
import react from "../assets/React.svg";
import vue from "../assets/Vue.svg";
import node from "../assets/Node.svg";
import laravel from "../assets/Laravel.svg";
import nextjs from "../assets/nextjs.svg";
import tailwind from "../assets/Tailwind.svg";
import firebase from "../assets/firebase.svg";
import mysql from "../assets/MySQL.svg";
import git from "../assets/Git.svg";

// Left column of the Projects section - shipped products, with a cover + badge.
export const sideProjects = [
  {
    title: "Recommend - order from vendors near you, just by chatting",
    caption:
      "Conversational commerce in Lagos. Tell it what you want, it sources from vendors nearby, takes payment, and gets it to your door",
    href: "https://getrecommend.co/",
    image: recommendCover,
    badge: recommendBadge,
    badgeBg: "#FFFCE3",
  },
  {
    title: "MyArvest - spend tomorrow's money tomorrow",
    caption:
      "Budgeting app built around time-locked vaults that release your money on a schedule, daily, weekly or monthly",
    href: "https://www.spreadmyarvest.com/",
    image: arvestCover,
    badge: arvestBadge,
    badgeBg: "#013C08",
  },
];

// Right column - the stack, shown as "name · category".
// React Native shares the React atom; there's no separate official mark.
export const stack = [
  {
    name: "React",
    category: "UI library",
    caption: "Component architecture, hooks, and state that stays predictable",
    captionShort: "Components, hooks, state",
    logo: react,
    href: "https://react.dev",
  },
  {
    name: "React Native",
    category: "Mobile",
    caption: "Apps on both stores, with the push, deep links and offline states that come with them",
    captionShort: "Apps shipped to both stores",
    logo: react,
    href: "https://reactnative.dev",
  },
  {
    name: "Next.js",
    category: "Framework",
    caption: "Routing, server rendering and builds that ship fast by default",
    captionShort: "Routing and server rendering",
    logo: nextjs,
    href: "https://nextjs.org",
  },
  {
    name: "Vue",
    category: "UI framework",
    caption: "Composition API and single-file components on the projects that call for it",
    captionShort: "Composition API, SFCs",
    logo: vue,
    href: "https://vuejs.org",
  },
  {
    name: "Node.js",
    category: "Backend",
    caption: "The APIs, auth and billing logic behind the apps I build",
    captionShort: "APIs, auth and billing",
    logo: node,
    href: "https://nodejs.org",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    caption: "Design systems in tokens, responsive without the stylesheet sprawl",
    captionShort: "Token-driven responsive styling",
    logo: tailwind,
    href: "https://tailwindcss.com",
  },
  {
    name: "MySQL",
    category: "Database",
    caption: "Schema design and query tuning behind the dashboards I build",
    captionShort: "Schema design and query tuning",
    logo: mysql,
    href: "https://www.mysql.com",
  },
  {
    name: "Firebase",
    category: "Backend as a service",
    caption: "Auth, realtime data and push notifications without a server to run",
    captionShort: "Auth, realtime data, push",
    logo: firebase,
    href: "https://firebase.google.com",
  },
  {
    name: "Laravel & PHP",
    category: "Backend",
    caption: "Shipped against Laravel APIs alongside backend teams, and built PHP front ends directly",
    captionShort: "Shipped against Laravel APIs",
    logo: laravel,
    href: "https://laravel.com",
  },
  {
    name: "Git",
    category: "Version control",
    caption: "Branching, reviews and release hygiene across teams",
    captionShort: "Branching, reviews, releases",
    logo: git,
    href: "https://git-scm.com",
  },
];
