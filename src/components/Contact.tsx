import { useTranslations } from "next-intl";
import { EMAIL, GITHUB_HANDLE, GITHUB_URL, HWYL_URL } from "@/lib/site";
import { Reveal } from "./motion/Reveal";
import { ShaderBackdrop } from "./ShaderBackdrop";

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
          <a
            href={`mailto:${EMAIL}`}
            aria-label={t("emailLabel", { email: EMAIL })}
            className="block font-display text-[clamp(2.5rem,7vw,6.875rem)] uppercase leading-[0.95] tracking-[-0.02em]"
          >
            {lines.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i === lines.length - 1 && (
                  <span className="text-accent">.</span>
                )}
              </span>
            ))}
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
              className="border-b border-current pb-1 text-[13px] uppercase tracking-[0.15em]"
            >
              {GITHUB_HANDLE}
            </a>
            <a
              href={HWYL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-current pb-1 text-[13px] uppercase tracking-[0.15em]"
            >
              {t("hwylLabel")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
