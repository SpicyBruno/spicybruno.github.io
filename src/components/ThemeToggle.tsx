"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

/*
  Nessuno stato "mounted": l'icona giusta la sceglie la variante `dark:`,
  quindi HTML del server e del client coincidono sempre. Il colore arriva da
  `currentColor`, cioè dall'inchiostro corrente della navbar (--nav-ink).
*/
export function ThemeToggle() {
  const t = useTranslations("nav");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={t("themeToggle")}
      className="flex size-11 items-center justify-center border border-current"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
