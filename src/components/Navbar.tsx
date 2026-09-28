"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { HWYL_URL } from "@/lib/site";

const anchors = [
  { href: "#lavori", key: "works" },
  { href: "#chi-sono", key: "about" },
  { href: "#contatti", key: "contact" },
] as const;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/*
  Il pannello mobile si srotola dal bordo della barra (clip-path, nessun
  reflow) e si richiude più in fretta di come si apre. Le voci salgono di
  poco, in fila: è un elenco, e appare come tale.
  Con prefers-reduced-motion MotionConfig toglie gli spostamenti, restano
  le dissolvenze.
*/
const panel: Variants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.2, ease: EASE_OUT_EXPO },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.32,
      ease: EASE_OUT_EXPO,
      delayChildren: 0.06,
      staggerChildren: 0.04,
    },
  },
};

const item: Variants = {
  closed: { opacity: 0, y: 8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: EASE_OUT_EXPO },
  },
};

/*
  La barra resta fissa e cambia inchiostro insieme alla banda che scorre sotto:
  il colore arriva da --nav-ink, che ScrollBands aggiorna su #pf-root
  (regole in globals.css, .site-nav). Oltre i primi pixel di scroll compare
  anche un velo sfocato, così il testo regge pure sopra le copertine.
*/
export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:uppercase focus:tracking-[0.12em] focus:text-on-accent"
      >
        {t("skipToContent")}
      </a>

      <nav
        aria-label="Principale"
        className="site-nav relative isolate flex items-center justify-between px-6 py-5 md:px-12"
      >
        <a
          href="#hero"
          className="font-title text-[13px] uppercase tracking-[0.12em]"
        >
          {t("brand")}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {anchors.map((anchor) => (
            <a
              key={anchor.key}
              href={anchor.href}
              className="nav-link py-1 text-xs uppercase tracking-[0.18em]"
            >
              {t(anchor.key)}
            </a>
          ))}
          <a
            href={HWYL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex items-center gap-1 py-1 text-xs uppercase tracking-[0.18em]"
          >
            {t("hwyl")}
            <ArrowUpRight className="ext-arrow size-3.5" aria-hidden="true" />
          </a>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="flex size-11 items-center justify-center md:hidden"
        >
          {/* Le due icone si danno il cambio ruotando di un quarto di giro */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15, ease: EASE_OUT_EXPO }}
              className="flex"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={panel}
            initial="closed"
            animate="open"
            exit="closed"
            className="site-nav-panel px-6 pb-8 pt-2 md:hidden"
          >
            <ul className="flex flex-col">
              {anchors.map((anchor) => (
                <motion.li key={anchor.key} variants={item}>
                  <a
                    href={anchor.href}
                    onClick={() => setOpen(false)}
                    className="block border-b py-4 text-sm uppercase tracking-[0.18em]"
                  >
                    {t(anchor.key)}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={item}>
                <a
                  href={HWYL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1.5 border-b py-4 text-sm uppercase tracking-[0.18em]"
                >
                  {t("hwyl")}
                  <ArrowUpRight className="ext-arrow size-4" aria-hidden="true" />
                </a>
              </motion.li>
            </ul>
            <motion.div variants={item} className="mt-6 flex items-center gap-4">
              <LocaleSwitcher />
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
