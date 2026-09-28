import { useTranslations } from "next-intl";

/*
  Riga di chiusura: stessa banda nera dei contatti, separata solo da un filo.
  Nessun contenuto nuovo — è la firma della pagina.
*/
export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer data-band="void" className="px-6 pb-12 text-on-void md:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-void-line pt-5 text-[11px] uppercase tracking-[0.15em] text-on-void-muted">
        <span>{t("credit", { year: new Date().getFullYear() })}</span>
        <span>{t("role")}</span>
      </div>
    </footer>
  );
}
