import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./motion/Reveal";

export function About() {
  const t = useTranslations("about");
  const skills = t.raw("skills") as string[];

  return (
    <section
      id="chi-sono"
      data-band="mist"
      className="px-6 py-28 text-on-paper md:px-12 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 md:grid-cols-2">
        <Reveal>
          <div className="visual-frame relative aspect-4/5 max-w-md">
            <Image
              src="/brand/selfie.jpeg"
              alt={t("portraitAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="overline mb-6 text-on-paper-muted">{t("overline")}</p>
          </Reveal>
          <h2 className="scrub-in m-0 font-title text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
            {t("title")}
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-on-paper-muted text-pretty">
              {t("body1")}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-on-paper-muted text-pretty">
              {t("body2")}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            {/* Elenco competenze come tabella a due colonne, non come chip */}
            <ul className="mt-10 grid max-w-lg grid-cols-1 border-t border-on-paper sm:grid-cols-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="border-b border-paper-line py-4 text-[13px] uppercase tracking-[0.12em]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
