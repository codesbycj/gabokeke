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
// `features[].what` is the implementation, not the brochure. Write what you
// built and how it works - the mechanism, the thing it replaced, the number
// it moved - not what a user sees on screen. "Held a socket and patched the
// query cache" beats "the status updates live".
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
      // Implementation, not brochure: what I wrote, how it works, and what it
      // replaced. The tech list names the concrete pieces underneath.
      features: [
        {
          name: "Sign in",
          what: "Implemented OTP sign-in end to end - number entry, code verification, resend throttling and token refresh - then layered biometric unlock over the stored session, so a returning customer reopens the app with Face ID or a fingerprint instead of waiting on another SMS.",
          tech: ["OTP verification", "react-native-biometrics"],
        },
        {
          name: "Book a service",
          what: "Built the booking flow as one react-hook-form schema validated with Zod, so service type, address and time slot are rejected on the device before an order is ever posted. Google Places Autocomplete resolves the address to coordinates dispatch can route against, rather than free text someone in the office has to interpret.",
          tech: ["Google Places Autocomplete", "react-hook-form", "Zod"],
        },
        {
          name: "Find a technician",
          what: "Replaced phone-arranged dispatch with an API path: the app posts the order, the backend matches an available technician, and TanStack Query revalidates the job so the assignment lands on the customer's screen without anyone re-keying it into a spreadsheet.",
          tech: ["REST API", "TanStack Query"],
        },
        {
          name: "Live job updates",
          what: "Held a Socket.IO connection per session and subscribed to task_status_updated, patching each event straight into the TanStack Query cache so the job moves through assigned, en route and complete with no polling loop and no pull-to-refresh. Reconnect refetches the job, so a dropped connection cannot leave stale status on screen.",
          tech: ["Socket.IO", "task_status_updated events"],
        },
        {
          name: "Track the technician",
          what: "Drove the technician marker on react-native-maps off the same socket stream as the status updates, so live location cost no second polling endpoint and the map and the job card can never disagree.",
          tech: ["react-native-maps"],
        },
        {
          name: "Chat with the technician",
          what: "Integrated the in-house Fixr chat SDK into the job screen with each thread scoped to a job, which keeps the conversation attached to the work order and keeps customer and technician phone numbers out of the exchange entirely.",
          tech: ["In-house Fixr chat SDK"],
        },
        {
          name: "Notifications",
          what: "Registered FCM tokens against the customer record and rendered the payloads through Notifee with per-category channels, so a customer can mute the promotional ones without losing 'technician assigned' or 'payment due'. Each notification deep-links to the job it is about instead of dropping the user on the home screen.",
          tech: ["Firebase Cloud Messaging", "Notifee"],
        },
        {
          name: "Your appliances",
          what: "Built the appliance register so a customer photographs the nameplate and ML Kit text recognition fills in brand, model and serial rather than them typing it. A repair request then opens with the unit and its service history already attached, which is what removed the back-and-forth of establishing what the customer owns.",
          tech: ["Image picker", "ML Kit text recognition"],
        },
        {
          name: "Maintenance plans",
          what: "Built recurring servicing as a subscribed plan rather than a repeat booking, including the solar load-analysis step that totals the customer's registered appliance draw and sizes the system from it - so the recommendation comes out of their own appliance list instead of a sales call.",
          tech: ["Paystack"],
        },
        {
          name: "Subscription payments",
          what: "Owned billing end to end: first charge through the Paystack webview, card authorisation stored against the plan, then every later cycle charged on its own. Webhook events reconcile back against the subscription record, so the app can show what has been collected and what is due next - and the business stopped invoicing by hand.",
          tech: ["Paystack", "react-native-paystack-webview"],
        },
        {
          name: "Job history",
          what: "Built the pending, upcoming, in-progress and completed views over one paginated, cached job query, with the rating prompt fired off the completion event so feedback is captured at the moment the work closes rather than chased afterwards.",
          tech: ["TanStack Query", "react-native-ratings"],
        },
        {
          name: "Equipment financing",
          what: "Implemented customer loan applications in-app - the application form, document capture and upload to Supabase Storage straight from the phone, and status tracking through to approval - which took an email-and-paper process off the back office entirely. Applications rose once customers could apply from the phone, and the channel has carried more than N500,000,000 in financing.",
          tech: ["Supabase Storage", "Document picker"],
        },
        {
          name: "Support",
          what: "Embedded Zoho SalesIQ with the signed-in customer and their current job passed through as context, so an agent opens the chat already knowing who it is and which job it concerns instead of asking.",
          tech: ["Zoho SalesIQ"],
        },
        {
          name: "Staying stable",
          what: "Wired Sentry with release tagging so a crash points at the build it came from, and gated startup with react-native-version-check so a client older than the minimum the API supports is told to update rather than failing against a contract it no longer understands.",
          tech: ["Sentry", "react-native-version-check"],
        },
      ],
      metrics: [
        {
          claim:
            "Financed more than N500,000,000 in customer equipment loans through the in-app application flow",
          baseline: null, // CONFIRM: over what period, and what was the paper/email application volume before?
          method: null, // CONFIRM: where does the figure come from - disbursement totals in the admin dashboard?
        },
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
          what: "Repointed the record screens from exported spreadsheets to the live REST APIs and normalised the responses into one client store keyed by id, so a customer edited on one screen updates everywhere instead of being duplicated per view.",
          tech: ["REST API", "Normalised client store"],
        },
        {
          name: "Live data",
          what: "Put the always-open operations screens on scheduled refetching with refresh on focus, so a number someone has had on screen for an hour is the number in the database - which is what stopped the team re-exporting to check.",
          tech: ["Scheduled refetching"],
        },
        {
          name: "Search and filter",
          what: "Built debounced search and filtering over the normalised store, so a lookup resolves against data already in memory rather than a round trip per keystroke.",
          tech: ["Client-side filtering"],
        },
        {
          name: "Operational views",
          what: "Rebuilt the daily-driver screens around memoised rows and derived selectors, which is what stopped the stalling as the dataset grew - re-render cost no longer scales with total records.",
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
          what: "Built React dashboards over the clients' MySQL-backed APIs, turning queries an analyst used to run by hand into filtered, paginated screens an operations team could act on without asking anyone for an extract.",
          tech: ["React", "MySQL"],
        },
        {
          name: "Client websites",
          what: "Shipped marketing and product sites for separate clients off a shared component approach, so each delivery reused the layout and form primitives instead of starting from markup - which is how several ran in parallel against monthly targets.",
          tech: ["React", "Responsive layout"],
        },
        {
          name: "Progressive web apps",
          what: "Added service workers with offline caching and a web app manifest, so the apps install to the home screen and keep serving cached data on a bad connection - delivery without an app store review cycle.",
          tech: ["Service workers", "Web app manifest", "Offline caching"],
        },
        {
          name: "Automated data sync",
          what: "Replaced the re-typing between client systems with scheduled API sync jobs, which is where the workload reduction came from - records moved on their own instead of being entered twice by hand.",
          tech: ["REST APIs", "Scheduled sync"],
        },
        {
          name: "Sprint process",
          what: "Ran planning, review and unblocking across all the projects at once and gated merges on review - nothing shipped unseen, which mattered most for the two junior engineers on the team.",
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
          what: "Built specialty browse and search over the provider API with availability resolved server-side, so the list shows doctors who actually have open slots rather than a directory the patient has to phone through.",
          tech: ["REST API", "Search and filtering"],
        },
        {
          name: "Book an appointment",
          what: "Built slot selection against the doctor's calendar with the slot re-checked at submit, so two patients racing for the same time get one booking and one clear rejection instead of a double-booked doctor.",
          tech: ["Slot availability API"],
        },
        {
          name: "Consult from the app",
          what: "Built the consultation entry path - joining from the booking, in-call state, and returning the patient to their record afterwards - so the appointment and the consultation are one flow rather than a link sent out of band.",
          tech: [], // CONFIRM: what powered the call - Agora, Twilio, something else?
        },
        {
          name: "Prescriptions",
          what: "Attached what the doctor issues to the patient record through the record API, so the pharmacy and order steps read it directly instead of the patient carrying paper between them.",
          tech: ["Patient record API"],
        },
        {
          name: "Buy healthcare products",
          what: "Built the in-app catalogue and checkout against the partner pharmacy and vendor integrations, so medication ordered off a prescription stays inside the same account and order history.",
          tech: ["Partner pharmacy integration"],
        },
        {
          name: "Riders and ambulance",
          what: "Wired the delivery and emergency transport partners into the patient journey as request steps in the app, so dispatch happens from the booking that caused it rather than a separate phone call.",
          tech: ["Partner service APIs"],
        },
        {
          name: "Reminders",
          what: "Registered device tokens per patient and pushed appointment and action reminders deep-linked to the appointment they refer to - the part that has to work when the app is closed.",
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
          what: "Built location entry that resolves what the rider types into stops the network actually serves, so route discovery matches against real stop ids rather than guessing at an address.",
          tech: ["Location search"],
        },
        {
          name: "Find a route",
          what: "Built route discovery over the scheduling API, so the rider sees only shuttles that serve that pickup-to-destination pair at a time they can still catch, instead of the full timetable.",
          tech: ["Route discovery API"],
        },
        {
          name: "Pick a seat",
          what: "Built seat selection against a reservation that holds the seat while payment runs and releases it on failure or timeout, which is what stops a seat being sold twice mid-checkout.",
          tech: ["Seat reservation API"],
        },
        {
          name: "Check in",
          what: "Built check-in so a booking is bound to the specific shuttle on the day, which gives the operator a real manifest rather than a list of people who paid.",
          tech: ["Trip check-in API"],
        },
        {
          name: "Track the shuttle",
          what: "Rendered the vehicle's live position on the trip map from the tracking feed, so the rider decides when to leave the office off the bus's actual position rather than the scheduled time.",
          tech: ["Live location", "Maps"],
        },
        {
          name: "Notifications",
          what: "Pushed approach and trip-change alerts to the device, deep-linked to the trip - the alerts that have to land when the app is closed, which is exactly when a rider needs them.",
          tech: ["Push notifications"],
        },
        {
          name: "Favourite and recent routes",
          what: "Built saved and recent routes so the commute a rider takes every morning is one tap off stored trip parameters rather than the full booking flow rebuilt daily - the retention lever on a product people open twice a day.",
          tech: ["Saved routes API"],
        },
        {
          name: "Book again",
          what: "Built repeat booking off the booking history, replaying the last trip's route, seat and time into a new reservation so a rebook is a confirmation instead of a flow.",
          tech: ["Booking history API"],
        },
        {
          name: "Change pickup or drop-off",
          what: "Built in-place booking modification, so a changed stop updates the existing reservation rather than forcing a cancel-and-rebook that risks losing the seat.",
          tech: ["Booking modification API"],
        },
        {
          name: "Rate the driver",
          what: "Built the post-trip rating prompt off trip completion, so feedback is collected at arrival while the rider still remembers it, and lands against the driver and that specific trip.",
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
          what: "Built the services and work pages out of composable section components, so the marketing team could reorder or reuse a section without anyone rewriting markup for it.",
          tech: ["React", "Next.js"],
        },
        {
          name: "Responsive layout",
          what: "Built one Tailwind layout that holds from a phone to a desktop, so there is no separate mobile site and no second set of pages to keep in sync.",
          tech: ["Tailwind CSS"],
        },
        {
          name: "Fast loading",
          what: "Code-split the bundles and optimised the images so each page ships only what it needs - which is where both the load time and the hosting bill came down, since less is served per visit.",
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
          what: "Built the public event pages - lineup, schedule and details - in hand-written HTML, CSS and JavaScript, against a launch date that could not move.",
          tech: ["HTML", "CSS", "JavaScript"],
        },
        {
          name: "Responsive layout",
          what: "Built the layout mobile-first, since the traffic was people checking the lineup on a phone at the event rather than on a desktop beforehand.",
          tech: ["CSS"],
        },
        {
          name: "Cross-browser testing",
          what: "Took the cross-browser and device pass before launch, finding and fixing the layout breaks on older phones ahead of a fixed, unmovable date.",
          tech: ["Manual QA"],
        },
      ],
      metrics: [],
    },
  },
];
