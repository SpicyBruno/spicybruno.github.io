import { HWYL_URL } from "./site";

export type ProjectBand = "void" | "paper";

/** Tipo di call-to-action: repository pubblica o deck sfogliabile. */
export type ProjectCta = "github" | "deck";

export interface Project {
  /** Chiave dei messaggi in messages/{locale}.json → projects.<id> */
  id: "hwyl" | "financeDashboard" | "carolus" | "sunnee" | "ideight" | "yoyo";
  band: ProjectBand;
  /** Cover reale in /public/works. */
  imageSrc: string;
  cta: ProjectCta;
  href: string;
  /** Sito pubblicato: se c'è diventa la CTA principale, `href` resta secondario. */
  liveUrl?: string;
  /**
   * Metriche mostrate in griglia sotto la descrizione. Le etichette vivono
   * nei messaggi (projects.<id>.statLabels), qui solo i valori.
   */
  stats?: string[];
}

/*
  Le bande si alternano scura/chiara: è il ritmo su cui è costruita la
  pagina, e il fondo segue lo scroll. Cambiare l'ordine cambia il ritmo.
*/
export const projects: Project[] = [
  {
    id: "hwyl",
    band: "void",
    imageSrc: "/works/hwyl-portfolio.png",
    cta: "github",
    href: "https://github.com/SpicyBruno/hwyl-portfolio",
    liveUrl: HWYL_URL,
  },
  {
    id: "financeDashboard",
    band: "paper",
    imageSrc: "/works/finance-dashboard.png",
    cta: "github",
    href: "https://github.com/SpicyBruno/finance-dashboard",
  },
  {
    id: "carolus",
    band: "void",
    imageSrc: "/works/sito-nonno.png",
    cta: "github",
    href: "https://github.com/SpicyBruno/carolus-site",
  },
  {
    id: "sunnee",
    band: "paper",
    imageSrc: "/works/sunnee-cover.png",
    cta: "deck",
    href: "/decks/sunnee-deck.pdf",
    stats: ["800K", "≥ 2,5", "≤ €30"],
  },
  {
    id: "ideight",
    band: "void",
    imageSrc: "/works/analisi-cover.png",
    cta: "deck",
    href: "/decks/analisi-strategica-deck.pdf",
  },
  {
    id: "yoyo",
    band: "paper",
    imageSrc: "/works/yoyo-cover.png",
    cta: "deck",
    href: "/decks/yoyo-deck.pdf",
  },
];
