import velofiPay from "../assets/velofi5.png";
import velofiHome from "../assets/velofi4.png";
import velofiCertificate from "../assets/velofi1.png";
import fixr from "../assets/usefixr.png";
import hospyta from "../assets/Hospyta.png";
import shuttlers from "../assets/shuttlers.png";
import zeus from "../assets/Zeus.png";

// The sticky-stacking work section.
//
// `frame`    - pad colour behind the shot
// `image`    - wide product shot, used when there are no phone screens
// `shots`    - 2-3 portrait app screenshots; when present the card renders
//              them in phone frames instead of the wide `image`
// `graphics` - 3 store listing graphics, shown flat; use these instead of
//              `shots` when the images already contain their own device frame
// `live`     - the public product URL. Omit it and the card drops the globe
//              and the CTA, and the shot stops being a link
// `appLinks` - adds App Store / Play Store buttons to the card header.
//              `iosSoon: true` renders a dimmed Apple mark for an app that is
//              not on the App Store yet, rather than a link to nothing
//
// The technical detail for each role lives in ./experience.js.
export const caseStudies = [
  {
    id: "velofi",
    title: "Velofi",
    desc: "Payments, transfers and fixed-term investments in one app",
    year: "'26 - Present",
    // Pay, then the home screen, then the certificate - the product in the
    // order a customer meets it. Centre slot carries the home screen.
    graphics: [velofiPay, velofiHome, velofiCertificate],
    frame: "rgba(226, 219, 255, 0.86)",
    appLinks: {
      iosSoon: true,
      android: "https://play.google.com/store/apps/details?id=com.velofi",
    },
  },
  {
    id: "fixr",
    title: "Fixr",
    desc: "Home services platform with automated dispatch & billing",
    year: "'26 - Present",
    image: fixr,
    // TODO: add 3 portrait screenshots and the card switches to phone frames.
    shots: [],
    frame: "rgba(209, 227, 255, 0.88)",
    live: "https://usefixr.com/",
    ctaLabel: "Explore Live",
    appLinks: {
      ios: "https://apps.apple.com/app/id6476404086",
      android: "https://play.google.com/store/apps/details?id=com.fixrapp",
    },
  },
  {
    id: "hospyta",
    title: "Hospyta",
    desc: "Healthcare ecosystem for patients, doctors & pharmacies",
    year: "'23 - 25",
    image: hospyta,
    shots: [],
    frame: "rgba(191, 239, 212, 0.42)",
    live: "https://hospyta.com",
    ctaLabel: "Explore Live",
    appLinks: {
      ios: "https://apps.apple.com/ng/app/hospyta/id6475042063",
      android:
        "https://play.google.com/store/apps/details?id=com.hospyta.hospyta",
    },
  },
  {
    id: "shuttlers",
    title: "Shuttlers",
    desc: "Transport booking with live shuttle tracking",
    year: "'23 - 24",
    image: shuttlers,
    shots: [],
    frame: "rgba(255, 230, 232, 0.72)",
    live: "https://shuttlers.co",
    ctaLabel: "Explore Live",
    appLinks: {
      ios: "https://apps.apple.com/ng/app/shuttlers/id1532662341",
      android:
        "https://play.google.com/store/apps/details?id=com.shuttlers.android",
    },
  },
  {
    id: "zeus",
    title: "ZEUS CRM",
    desc: "CRM rebuilt around real-time operational data",
    year: "'25",
    image: zeus,
    frame: "rgba(232, 227, 227, 0.72)",
    live: "https://zeuscrm-frontend.onrender.com",
    ctaLabel: "Explore Live",
  },
];
