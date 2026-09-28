import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { EMAIL, GITHUB_HANDLE, GITHUB_URL, HWYL_URL } from "@/lib/site";
import { Reveal } from "./motion/Reveal";
import { ShaderBackdrop } from "./ShaderBackdrop";
import { AngleRule } from "./AngleRule";

export function Contact() {
  const t = useTranslations("contact");
  const lines = t.raw("titleLines") as string[];

  return (
    <section
      id="contatti"
      data-band="void"
      className="relative overflow-hidden px-6 pb-12 pt-28 text-on-void md:px-12 md:pt-40"
    >
      <ShaderBackdrop opacity={0.35} />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="overline mb-8 text-on-void-muted">{t("overline")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          {/*
            Il filo dell'hero torna qui e devia una seconda volta: la pagina
            apre e chiude sullo stesso angolo. La seconda riga rientra fino al
            gomito, come l'ultima riga dell'hero. Hover e focus stendono il
            giallo sotto le righe (.ink-line in globals.css).
          */}
          <a
            href={`mailto:${EMAIL}`}
            aria-label={t("emailLabel", { email: EMAIL })}
            className="contact-cta block font-display text-[clamp(2.5rem,7vw,6.875rem)] uppercase leading-[0.95] tracking-[-0.02em]"
          >
            <span className="block">
              <span className="ink-line">{lines[0]}</span>
            </span>
            <AngleRule trigger="inView" elbow={{ sm: 4, md: 12 }} delay={0.3} />
            <span className="ml-[8%] block md:ml-[16%] md:whitespace-nowrap">
              <span className="ink-line ink-line-2">
                {lines[1]}
                <span className="ink-dot">.</span>
              </span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap gap-10">
            <a
              href={`mailto:${EMAIL}`}
              className="border-b border-current pb-1 text-[13px] uppercase tracking-[0.15em]"
            >
              {EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-current pb-1 text-[13px] uppercase tracking-[0.15em]"
            >
              {GITHUB_HANDLE}
              <ArrowUpRight className="ext-arrow size-3.5" aria-hidden="true" />
            </a>
            <a
              href={HWYL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border-b border-current pb-1 text-[13px] uppercase tracking-[0.15em]"
            >
              {t("hwylLabel")}
              <ArrowUpRight className="ext-arrow size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
