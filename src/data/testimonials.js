import edwin from "../assets/edwin.jpeg";
import kiron from "../assets/kiron.jpeg";
import karin from "../assets/karin.jpeg";
import vincent from "../assets/vincent.jpeg";
import harriette from "../assets/harriette.jpeg";
import david from "../assets/david.jpeg";
import innocent from "../assets/innocent.jpeg";

// ---------------------------------------------------------------------------
// DRAFTS AWAITING SIGN-OFF
//
// These are written from what you told me each person said about working with
// you - they are NOT quotes anyone has actually written. Before this goes live,
// send each person their paragraph and ask "does this sound like you?". Let
// them reword it however they want; people always make it sound more like
// themselves than I can.
//
// Once someone confirms, set `approved: true`. Anything still false logs a
// warning in the dev console so it doesn't quietly ship.
//
// `role` uses only what you told me about each person. Fix the exact titles.
// `linkedin` makes the name a link when set; null leaves it plain text.
// Photos are wired from src/assets/*.jpeg. Any entry left with avatar: null
// falls back to an initials tile.
// ---------------------------------------------------------------------------

export const testimonials = [
  {
    name: "Edwin",
    linkedin: "https://www.linkedin.com/in/edwin-eke",
    role: "Yelocode Systems",
    avatar: edwin,
    approved: false,
    quote: [
      "Emmanuel led our frontend and mobile engineers, and it showed in how much we got out the door. He plans the sprint, unblocks people, and still ships his own work on top of that.",
      "He's who I handed the difficult project to when the deadline was real.",
    ],
  },
  {
    name: "Kiron",
    linkedin: "https://www.linkedin.com/in/kiron-nandhra-520284224/",
    role: "ZEUS CRM",
    avatar: kiron,
    approved: false,
    quote: [
      "Our old CRM was slowing the team down more than it was helping. Emmanuel rebuilt the front of it and wired it properly to our data, so what people see is actually current.",
      "He worked through a long list of edge cases without once complaining about it. The team noticed the difference straight away.",
    ],
  },
  {
    name: "Karin",
    linkedin: null, // intentionally not linked

    role: "In-house dashboard",
    avatar: karin,
    approved: false,
    quote: [
      "We were running the whole operation out of spreadsheets and nobody could agree on the numbers. Emmanuel built us a dashboard that just showed it, clearly, in one place.",
      "What I appreciated most is that he never needed chasing. He said two weeks, and it was two weeks.",
    ],
  },
  {
    name: "Vincent",
    linkedin: "https://www.linkedin.com/in/ugo-vin-amajor-87387323/",
    role: "CFS Logistics",
    avatar: vincent,
    approved: false,
    quote: [
      "Emmanuel built an internal dashboard for us that replaced a lot of manual reporting. The team got time back almost immediately.",
      "He kept us in the loop through the build and hit every date he gave us. I'd bring him back for the next one.",
    ],
  },
  {
    name: "Harriette",
    linkedin: null, // intentionally not linked

    role: "In-house dashboard",
    avatar: harriette,
    approved: false,
    quote: [
      "I gave Emmanuel a fairly vague brief and he came back with something better than what I'd described. He asked the right questions early instead of building the wrong thing and fixing it afterwards.",
      "Delivered on schedule, and he was still around when we wanted small changes later.",
    ],
  },
  {
    name: "David",
    linkedin: "https://www.linkedin.com/in/david-jeremiah-77a0bb2b9/",
    role: "Laravel Developer · Colleague",
    avatar: david,
    approved: false,
    quote: [
      "I handled the Laravel side while Emmanuel took the frontend and mobile. Easiest integration work I've done - he reads the API properly, tells you when something in your contract doesn't make sense, and doesn't just hack around it.",
      "Straightforward to work with, no ego about any of it.",
    ],
  },
  {
    name: "Innocent",
    linkedin: "https://www.linkedin.com/in/innocent-akwolu-5096a5238/",
    role: "Colleague @ Fixr",
    avatar: innocent,
    approved: false,
    quote: [
      "Working next to Emmanuel at Fixr, the thing that stands out is that he finishes things. Not ninety percent done and moved on - actually finished, tested, edge cases handled.",
      "He'll also pick up the unglamorous ticket nobody else wants, which matters more than people give it credit for.",
    ],
  },
];

// Loud in dev, silent in the build.
if (import.meta.env?.DEV) {
  const pending = testimonials.filter((t) => !t.approved).map((t) => t.name);
  if (pending.length) {
    console.warn(
      `[testimonials] ${pending.length} draft(s) not yet approved by the person quoted: ${pending.join(
        ", "
      )}. Confirm the wording with each of them, then set approved: true in src/data/testimonials.js`
    );
  }
}
