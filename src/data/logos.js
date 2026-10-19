// Official brand assets, pulled from each company's own site.
//
// `height`     - wordmark height in the trust strip, tuned per logo so the row
//                reads optically even (wide all-caps marks need less height).
// `markHeight` - height used in the strip when a brand has no wordmark and
//                falls back to its square mark.
// `bleed`      - true for full-bleed app icons that own their own background,
//                so the tile skips the white padding and crops edge to edge.
import fixrWordmark from "../assets/logos/fixr-wordmark.svg";
import fixrMark from "../assets/logos/fixr-mark.png";
import hospytaWordmark from "../assets/logos/hospyta-wordmark.png";
import hospytaMark from "../assets/logos/hospyta-mark.png";
import shuttlersWordmark from "../assets/logos/shuttlers-wordmark.png";
import shuttlersMark from "../assets/logos/shuttlers-mark.png";
import gemcodeWordmark from "../assets/logos/gemcode-wordmark.png";
import gemcodeMark from "../assets/logos/gemcode-mark.svg";
import yelocodeMark from "../assets/logos/yelocode-mark.png";
import zeusMark from "../assets/logos/zeus-mark.png";
import boleMark from "../assets/logos/bole-mark.jpg";

export const brands = {
  fixr: {
    name: "Fixr",
    wordmark: fixrWordmark,
    mark: fixrMark,
    height: 21,
  },
  hospyta: {
    name: "Hospyta",
    wordmark: hospytaWordmark,
    mark: hospytaMark,
    height: 25,
  },
  shuttlers: {
    name: "Shuttlers",
    wordmark: shuttlersWordmark,
    mark: shuttlersMark,
    height: 14,
  },
  yelocode: {
    name: "Yelocode",
    wordmark: null,
    mark: yelocodeMark,
    markHeight: 26,
    bleed: true,
  },
  gemcode: {
    name: "Gemcode",
    wordmark: gemcodeWordmark,
    mark: gemcodeMark,
    height: 23,
  },
  zeus: {
    name: "ZEUS",
    wordmark: null,
    mark: zeusMark,
    markHeight: 26,
  },
  bole: {
    name: "Bole Festival",
    wordmark: null,
    mark: boleMark,
    markHeight: 24,
  },
};
