"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = { it: "Italiano", en: "English" };

/*
  Due sigle separate da una barra: la lingua attiva è piena, l'altra al 50%.
  Come per ThemeToggle il colore viene da `currentColor`.
*/
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]"
      role="group"
      aria-label="Lingua / Language"
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="opacity-40">
              /
            </span>
          )}
          <button
            type="button"
            lang={l}
            aria-label={labels[l]}
            aria-pressed={l === locale}
            onClick={() => router.replace(pathname, { locale: l })}
            className={l === locale ? "" : "opacity-50 hover:opacity-100"}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
