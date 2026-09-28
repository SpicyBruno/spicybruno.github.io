import { useTranslations } from "next-intl";
import { Reveal } from "./motion/Reveal";

export function Manifesto() {
  const t = useTranslations("manifesto");

  return (
    <section
      data-band="paper"
      className="px-6 py-28 text-on-paper md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[180px_1fr]">
        <Reveal>
          <p className="overline text-on-paper-muted">{t("overline")}</p>
        </Reveal>
        <div>
          <h2 className="scrub-in m-0 font-title text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-pretty">
            {t("title")}
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-on-paper-muted text-pretty md:text-xl">
              {t("body")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
