"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { HWYL_URL } from "@/lib/site";

const anchors = [
  { href: "#lavori", key: "works" },
  { href: "#chi-sono", key: "about" },
  { href: "#contatti", key: "contact" },
] as const;

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
            className="nav-link py-1 text-xs uppercase tracking-[0.18em]"
          >
            {t("hwyl")} <span aria-hidden="true">↗</span>
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
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div className="site-nav-panel px-6 pb-8 pt-2 md:hidden">
          <ul className="flex flex-col">
            {anchors.map((anchor) => (
              <li key={anchor.key}>
                <a
                  href={anchor.href}
                  onClick={() => setOpen(false)}
                  className="block border-b py-4 text-sm uppercase tracking-[0.18em]"
                >
                  {t(anchor.key)}
                </a>
              </li>
            ))}
            <li>
              <a
                href={HWYL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block border-b py-4 text-sm uppercase tracking-[0.18em]"
              >
                {t("hwyl")} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
