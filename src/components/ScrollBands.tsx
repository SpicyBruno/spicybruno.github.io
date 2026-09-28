"use client";

import { useEffect } from "react";

const BAND_VAR: Record<string, string> = {
  void: "--void",
  paper: "--paper",
  mist: "--mist",
};

/*
  Il fondo della pagina segue la banda che sta attraversando la metà dello
  schermo: nero → bianco → nero, con una transizione lunga che rende il
  passaggio percepibile ma non lampeggiante.

  Le sezioni sono trasparenti e dichiarano `data-band`; l'unico elemento
  colorato è #pf-root. Legge sempre i token, così il tema scuro non richiede
  un secondo percorso.

  La banda corrente viene anche pubblicata su #pf-root come `data-current-band`:
  la navbar ci aggancia il proprio colore in CSS (vedi .site-nav in globals.css),
  senza stato React né un secondo listener di scroll.
*/
export function ScrollBands() {
  useEffect(() => {
    const root = document.getElementById("pf-root");
    if (!root) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-band]")
    );
    if (!sections.length) return;

    let current = "";
    let scrolled: boolean | null = null;
    const apply = () => {
      const middle = window.innerHeight / 2;
      const hit = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= middle && rect.bottom >= middle;
      });
      const band = hit?.dataset.band ?? sections[0].dataset.band;
      if (band && band !== current) {
        current = band;
        root.style.backgroundColor = `var(${BAND_VAR[band] ?? "--void"})`;
        root.dataset.currentBand = band;
      }

      /*
        Fuori dalla cima la barra prende un velo: sopra l'hero resta nuda,
        appena il contenuto le scorre sotto serve un fondo per leggerla.
      */
      const isScrolled = window.scrollY > 24;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        root.dataset.scrolled = String(isScrolled);
      }
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
