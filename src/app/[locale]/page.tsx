import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { projects } from "@/lib/projects";
import { Navbar } from "@/components/Navbar";
import { ScrollBands } from "@/components/ScrollBands";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ProjectSection } from "@/components/ProjectSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/** Apertura dell'indice lavori: un filo, il conteggio, niente altro. */
function WorksIntro() {
  const t = useTranslations("projects");
  return (
    <section
      id="lavori"
      data-band="paper"
      className="px-6 pb-20 pt-10 text-on-paper md:px-12"
    >
      <div className="mx-auto flex max-w-6xl items-baseline justify-between border-t border-on-paper pt-6">
        <p className="overline">{t("overline")}</p>
        <p className="overline text-on-paper-muted">
          {t("count", { count: projects.length })}
        </p>
      </div>
    </section>
  );
}

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <div id="pf-root">
      <ScrollBands />
      <Navbar />
      <main id="contenuto">
        <Hero />
        <Manifesto />
        <WorksIntro />
        {projects.map((project, i) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
          />
        ))}
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
