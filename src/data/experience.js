import fixr from "../assets/usefixr.png";
import zeus from "../assets/Zeus.png";
import yelo from "../assets/Yelo.png";
import hospyta from "../assets/Hospyta.png";
import shuttlers from "../assets/shuttlers.png";
import gemcode from "../assets/Gemcode.png";
import bole from "../assets/Bole.png";

// One row per role, newest first. `desc` is a single tight paragraph —
// the row layout gives it ~680px, so keep it to two or three sentences.
export const experience = [
  {
    role: "Software Engineer",
    company: "Fixr Technologies",
    period: "2026 − Present",
    logo: fixr,
    desc: "Built the customer mobile app and the admin web dashboard that feed each other, so new orders reach technicians automatically instead of by hand. Owned the end-to-end subscription engine that moved the business from manual invoicing to recurring revenue.",
  },
  {
    role: "Frontend Developer",
    company: "ZEUS",
    period: "2025",
    logo: zeus,
    desc: "Rebuilt a CRM platform around live API data, replacing stale exports with real-time customer and operations views. Tightened frontend state management so daily usage stopped stalling as the dataset grew.",
  },
  {
    role: "Software Engineer",
    company: "Yelocode Systems",
    period: "2023 − 2024",
    logo: yelo,
    desc: "Led a team of three frontend engineers and two mobile engineers across healthcare and transport products. Cut team workload ~70% by replacing manual data entry with API-driven updates, and shipped on schedule against monthly targets.",
  },
  {
    role: "Software Engineer",
    company: "Hospyta",
    period: "2023 − 2025",
    logo: hospyta,
    desc: "Developed the mobile and web product that lets patients book appointments, consult doctors, access prescriptions and buy healthcare products in one place. Integrated it across pharmacies, vendors, riders and ambulance services.",
  },
  {
    role: "Software Engineer",
    company: "Shuttlers",
    period: "2023 − 2024",
    logo: shuttlers,
    desc: "Built core transport flows: route discovery, seat booking, check-in, push notifications and live shuttle tracking. Added the repeat-booking features — favourite routes, book again, driver ratings — that drove retention.",
  },
  {
    role: "Frontend Developer",
    company: "Gemcode Systems",
    period: "2025",
    logo: gemcode,
    desc: "Designed and built the company site in React with an external team, cutting load time and hosting cost through component-level optimisation.",
  },
  {
    role: "Junior Frontend Developer",
    company: "Bole Festival",
    period: "2021 − 2022",
    logo: bole,
    desc: "First role. Built responsive festival pages in HTML, CSS and JavaScript under senior guidance, and tested across browsers and devices before launch.",
  },
];
