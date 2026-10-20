// One row per role, newest first. `desc` is a single tight paragraph -
// the row layout gives it ~680px, so keep it to two or three sentences.
// `brand` keys into `brands` in ./logos.js for the 56x56 mark.
//
// `detail` - the depth a reviewing engineer looks for. Every field is
//            optional; a row only renders the ones that are filled.
//              owned     - what YOU personally decided and wrote, as
//                          opposed to what the team shipped
//              stack     - the concrete pieces, named
//              build     - how it actually works: the mechanism, not the
//                          outcome
//              tradeoffs - what you chose against, and why
//              rigor     - testing, error handling, security, release
//              metrics   - { claim, baseline, method } so a number is never
//                          stated without what it is measured against
//
// Anything you cannot state accurately should stay out. A vague claim an
// interviewer can puncture is worse than no claim.
export const experience = [
  {
    role: "Software Engineer",
    company: "Fixr Technologies",
    period: "2026 - Present",
    brand: "fixr",
    desc: "Built the customer mobile app and the admin web dashboard that feed each other, so new orders reach technicians automatically instead of by hand. Owned the end-to-end subscription engine that moved the business from manual invoicing to recurring revenue.",
    detail: {
      verified: false,
      owned:
        "I built the customer app in React Native and the admin dashboard in React, and the path between them. The subscription and billing side was mine end to end.",
      stack: [
        "React Native",
        "React",
        "Node.js",
        "Socket.IO",
        "Paystack",
        "Firebase Cloud Messaging",
        "Supabase Storage",
        "MySQL",
      ],
      // What a customer can actually do in the app, and what each one is
      // built on. Plain language first, tooling second.
      features: [
        {
          name: "Sign in",
          what: "Phone number and a one-time code to get in. After that, Face ID or a fingerprint.",
          tech: ["OTP verification", "react-native-biometrics"],
        },
        {
          name: "Book a service",
          what: "Pick what needs fixing, where, and when. Address lookup fills itself in as you type.",
          tech: ["Google Places Autocomplete", "react-hook-form", "Zod"],
        },
        {
          name: "Find a technician",
          what: "The app looks for an available technician and assigns one, instead of someone in the office arranging it by phone.",
          tech: ["REST API", "TanStack Query"],
        },
        {
          name: "Live job updates",
          what: "The job status changes on your screen as it happens, without pulling to refresh.",
          tech: ["Socket.IO", "task_status_updated events"],
        },
        {
          name: "Track the technician",
          what: "See where they are on a map while they are on the way.",
          tech: ["react-native-maps"],
        },
        {
          name: "Chat with the technician",
          what: "Message them directly in the app rather than swapping phone numbers.",
          tech: ["In-house Fixr chat SDK"],
        },
        {
          name: "Notifications",
          what: "Alerts when a technician is assigned, on the way, or a payment is due. You choose which ones you get.",
          tech: ["Firebase Cloud Messaging", "Notifee"],
        },
        {
          name: "Your appliances",
          what: "Keep a list of what you own, including solar, so a repair starts with the history instead of questions.",
          tech: ["Image picker", "ML Kit text recognition"],
        },
        {
          name: "Maintenance plans",
          what: "Subscribe to have an appliance serviced regularly. There is a load analysis step for solar that works out what size system you need.",
          tech: ["Paystack"],
        },
        {
          name: "Subscription payments",
          what: "You pay once through Paystack, and it charges the same card again each cycle on its own. The app shows what is coming up and what has already been paid.",
          tech: ["Paystack", "react-native-paystack-webview"],
        },
        {
          name: "Job history",
          what: "Everything pending, upcoming, in progress or finished, with a rating once the work is done.",
          tech: ["TanStack Query", "react-native-ratings"],
        },
        {
          name: "Equipment financing",
          what: "Apply for financing in the app and upload your documents from your phone.",
          tech: ["Supabase Storage", "Document picker"],
        },
        {
          name: "Support",
          what: "Live chat with the Fixr team without leaving the app.",
          tech: ["Zoho SalesIQ"],
        },
        {
          name: "Staying stable",
          what: "Crashes are reported automatically, and the app tells you when an update is required.",
          tech: ["Sentry", "react-native-version-check"],
        },
      ],
      metrics: [
        {
          claim: "Dispatch no longer requires manual data entry",
          baseline: null, // CONFIRM: roughly how many orders/day were re-keyed before?
          method: null,
        },
        {
          claim: "Recurring revenue is collected automatically rather than invoiced by hand",
          baseline: null, // CONFIRM: what did collection look like before?
          method: null,
        },
      ],
    },
  },
  {
    role: "Frontend Developer",
    company: "ZEUS",
    period: "2025",
    brand: "zeus",
    desc: "Rebuilt a CRM platform around live API data, replacing stale exports with real-time customer and operations views. Tightened frontend state management so daily usage stopped stalling as the dataset grew.",
    detail: {
      verified: false,
      owned:
        "I rebuilt the CRM frontend and wired it to the database and APIs, so the screens read live data instead of exports that were already out of date.",
      stack: ["React", "REST APIs", "State management"],
      features: [
        {
          name: "Customer records",
          what: "One place for customer and operational data, current rather than exported last week.",
          tech: ["REST API", "Normalised client store"],
        },
        {
          name: "Live data",
          what: "Screens people keep open all day refresh on their own, so a number on screen is not stale.",
          tech: ["Scheduled refetching"],
        },
        {
          name: "Search and filter",
          what: "Find a record without scrolling through everything.",
          tech: ["Client-side filtering"],
        },
        {
          name: "Operational views",
          what: "The day-to-day screens the team works out of, rebuilt so they stay responsive as the dataset grows.",
          tech: ["React", "Memoised rendering"],
        },
      ],
      metrics: [
        {
          claim: "Frontend performance and state handling stopped stalling as the dataset grew",
          baseline: null, // CONFIRM: what was slow before - list rendering, a specific screen?
          method: null,
        },
      ],
    },
  },
  {
    role: "Software Engineer",
    company: "Yelocode Systems",
    period: "2023 - 2024",
    brand: "yelocode",
    desc: "Led a team of three frontend engineers and two mobile engineers across healthcare and transport products. Cut team workload ~70% by replacing manual data entry with API-driven updates, and shipped on schedule against monthly targets.",
    detail: {
      verified: false,
      owned:
        "Ran several client projects at once - admin dashboards, websites and PWAs - with three frontend and two mobile engineers. I ran sprint planning and reviews and still carried my own features, so the hard parts were not pushed onto whoever had capacity.",
      stack: ["React", "React Native", "REST APIs", "MySQL", "Firebase"],
      features: [
        {
          name: "Admin dashboards",
          what: "Turned complicated database queries into screens a non-technical team could read and act on.",
          tech: ["React", "MySQL"],
        },
        {
          name: "Client websites",
          what: "Marketing and product sites for different clients, each shipped on its own schedule alongside the rest of the work.",
          tech: ["React", "Responsive layout"],
        },
        {
          name: "Progressive web apps",
          what: "Apps that install to the home screen and keep working on a bad connection, without going through an app store.",
          tech: ["Service workers", "Web app manifest", "Offline caching"],
        },
        {
          name: "Automated data sync",
          what: "Records people were re-typing between systems started moving on their own over the API.",
          tech: ["REST APIs", "Scheduled sync"],
        },
        {
          name: "Sprint process",
          what: "Planning, reviews and unblocking across all the projects at once - nothing merged unseen, which mattered most for the junior engineers.",
          tech: ["Git", "Code review"],
        },
      ],
      metrics: [
        {
          claim: "Cut team workload by over 70%",
          baseline: null, // CONFIRM: 70% of what - hours/week on data entry? how many people?
          method: null,
        },
        {
          claim: "Reduced site load time by 30%",
          baseline: null, // CONFIRM: from what to what, on which site? Lighthouse or real users?
          method: null,
        },
      ],
    },
  },
  {
    role: "Software Engineer",
    company: "Hospyta",
    period: "2023 - 2025",
    brand: "hospyta",
    desc: "Developed the mobile and web product that lets patients book appointments, consult doctors, access prescriptions and buy healthcare products in one place. Integrated it across pharmacies, vendors, riders and ambulance services.",
    detail: {
      verified: false,
      owned:
        "I built the patient side: finding a doctor, booking, joining the consultation, and everything that follows from it. The platform spans pharmacies, vendors, riders and ambulance services, and my work was the patient's half of those handoffs.",
      stack: ["React Native", "React", "REST APIs", "Push notifications"],
      features: [
        {
          name: "Find a doctor",
          what: "Browse by specialty and see who is actually available, rather than calling a clinic to ask.",
          tech: ["REST API", "Search and filtering"],
        },
        {
          name: "Book an appointment",
          what: "Pick a slot in the doctor's calendar. The slot is checked again at the moment you book, so two people cannot take the same one.",
          tech: ["Slot availability API"],
        },
        {
          name: "Consult from the app",
          what: "Talk to the doctor without travelling to a clinic.",
          tech: [], // CONFIRM: what powered the call - Agora, Twilio, something else?
        },
        {
          name: "Prescriptions",
          what: "What the doctor prescribes is attached to your record, so the next step can act on it instead of you carrying paper.",
          tech: ["Patient record API"],
        },
        {
          name: "Buy healthcare products",
          what: "Order medication and supplies in the same app, fulfilled by partner pharmacies and vendors.",
          tech: ["Partner pharmacy integration"],
        },
        {
          name: "Riders and ambulance",
          what: "Delivery and emergency transport are wired into the same journey rather than being separate phone calls.",
          tech: ["Partner service APIs"],
        },
        {
          name: "Reminders",
          what: "Alerts before an appointment and when something needs your attention.",
          tech: ["Push notifications"],
        },
      ],
      metrics: [],
    },
  },
  {
    role: "Software Engineer",
    company: "Shuttlers",
    period: "2023 - 2024",
    brand: "shuttlers",
    desc: "Built core transport flows: route discovery, seat booking, check-in, push notifications and live shuttle tracking. Added the repeat-booking features - favourite routes, book again, driver ratings - that drove retention.",
    detail: {
      verified: false,
      owned:
        "I built the booking path - pickup and destination, route discovery, seat selection, check-in - and the repeat-booking features layered on top of it.",
      stack: ["React Native", "REST APIs", "Maps", "Push notifications"],
      features: [
        {
          name: "Set pickup and destination",
          what: "Say where you are starting and where you are going.",
          tech: ["Location search"],
        },
        {
          name: "Find a route",
          what: "See the scheduled shuttles that actually serve that trip, with their times.",
          tech: ["Route discovery API"],
        },
        {
          name: "Pick a seat",
          what: "Choose your seat and hold it while payment goes through, so it is not sold to someone else mid-checkout.",
          tech: ["Seat reservation API"],
        },
        {
          name: "Check in",
          what: "Confirm you are on the trip, which ties your booking to that specific shuttle.",
          tech: ["Trip check-in API"],
        },
        {
          name: "Track the shuttle",
          what: "Watch where the bus is on a map, so you know whether to leave the office now or in ten minutes.",
          tech: ["Live location", "Maps"],
        },
        {
          name: "Notifications",
          what: "Alerts when the shuttle is close or the trip changes - the things that matter when the app is closed.",
          tech: ["Push notifications"],
        },
        {
          name: "Favourite and recent routes",
          what: "The trips you take every day are one tap, instead of rebuilding the same booking each morning.",
          tech: ["Saved routes API"],
        },
        {
          name: "Book again",
          what: "Repeat your last trip without going through the whole flow.",
          tech: ["Booking history API"],
        },
        {
          name: "Change pickup or drop-off",
          what: "Adjust where you are getting on or off without cancelling and starting over.",
          tech: ["Booking modification API"],
        },
        {
          name: "Rate the driver",
          what: "Leave a rating and trip feedback once you arrive.",
          tech: ["Ratings API"],
        },
      ],
      metrics: [],
    },
  },
  {
    role: "Frontend Developer",
    company: "Gemcode Systems",
    period: "2025",
    brand: "gemcode",
    desc: "Designed and built the company site in React with an external team, cutting load time and hosting cost through component-level optimisation.",
    detail: {
      verified: false,
      owned:
        "Designed and built the company site in React, working with an external team on the design side.",
      stack: ["React", "Next.js", "Tailwind CSS"],
      features: [
        {
          name: "Marketing pages",
          what: "The company's services and work, built as components so sections could be rearranged without rewriting markup.",
          tech: ["React", "Next.js"],
        },
        {
          name: "Responsive layout",
          what: "Holds up from a phone to a desktop without a separate mobile site.",
          tech: ["Tailwind CSS"],
        },
        {
          name: "Fast loading",
          what: "Images and bundles trimmed to what each page actually needs, which cut both load time and hosting cost.",
          tech: ["Code splitting", "Image optimisation"],
        },
      ],
      metrics: [
        {
          claim: "Cut load time and hosting cost through component-level optimisation",
          baseline: null, // CONFIRM: what was the before - page weight, load time?
          method: null,
        },
      ],
    },
  },
  {
    role: "Junior Frontend Developer",
    company: "Bole Festival",
    period: "2021 - 2022",
    brand: "bole",
    desc: "First role. Built responsive festival pages in HTML, CSS and JavaScript under senior guidance, and tested across browsers and devices before launch.",
    detail: {
      verified: false,
      owned:
        "First role. Built responsive festival pages under senior guidance, and took the cross-browser and device testing before launch.",
      stack: ["HTML", "CSS", "JavaScript", "Git"],
      features: [
        {
          name: "Festival pages",
          what: "The public pages for the event - lineup, details, and the information people came looking for.",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          name: "Responsive layout",
          what: "Built to hold up on whatever phone a festival-goer happened to have.",
          tech: ["CSS"],
        },
        {
          name: "Cross-browser testing",
          what: "Checked across browsers and devices ahead of a fixed launch date.",
          tech: ["Manual QA"],
        },
      ],
      metrics: [],
    },
  },
];
