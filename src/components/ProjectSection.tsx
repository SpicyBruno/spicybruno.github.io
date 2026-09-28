import { useTranslations } from "next-intl";
import type { Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./motion/Reveal";

const bandStyles = {
  void: {
    section: "text-on-void",
    muted: "text-on-void-muted",
    ghost: "text-void-ghost",
    statBorder: "border-void-line",
    statSurface: "bg-void",
  },
  paper: {
    section: "text-on-paper",
    muted: "text-on-paper-muted",
    ghost: "text-paper-ghost",
    statBorder: "border-on-paper",
    statSurface: "bg-paper",
  },
} as const;

interface ProjectSectionProps {
  project: Project;
  index: number;
  total: number;
}

/*
  Ogni progetto occupa una banda intera e inverte la colonna dell'immagine
  rispetto al precedente: il numero gigante resta sempre sul lato del testo.
*/
export function ProjectSection({ project, index, total }: ProjectSectionProps) {
  const t = useTranslations(`projects.${project.id}`);
  const tShared = useTranslations("projects");

  const s = bandStyles[project.band];
  const imageFirst = index % 2 === 0;
  const tags = t.raw("tags") as string[];
  const statLabels = project.stats
    ? (t.raw("statLabels") as string[])
    : undefined;

  const copy = (
    <div>
      <p
        aria-hidden="true"
        className={`scrub-in m-0 font-title text-[clamp(3.75rem,7vw,6.875rem)] leading-none ${s.ghost}`}
      >
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="scrub-in mb-5 mt-2 font-title text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
        {t("title")}
      </h3>
      <Reveal delay={0.15}>
        <ul className="mb-6 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.2}>
        <p className={`mb-8 max-w-lg leading-relaxed text-pretty ${s.muted}`}>
          {t("description")}
        </p>
      </Reveal>

      {project.stats && statLabels && (
        <Reveal delay={0.25}>
          <dl
            className={`mb-8 grid max-w-lg grid-cols-3 gap-px border ${s.statBorder} bg-current`}
          >
            {project.stats.map((value, i) => (
              <div key={statLabels[i]} className={`${s.statSurface} px-3.5 py-4`}>
                <dd className={`m-0 font-title text-2xl ${s.section}`}>
                  {value}
                </dd>
                <dt
                  className={`mt-1 text-[10px] uppercase tracking-[0.12em] ${s.muted}`}
                >
                  {statLabels[i]}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      <Reveal delay={0.3}>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <a
            href={project.liveUrl ?? project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rule-link"
          >
            {project.liveUrl
              ? tShared("ctaLive")
              : tShared(project.cta === "github" ? "ctaGithub" : "ctaDeck")}
            <span aria-hidden="true" className="rule-link-arrow">
              →
            </span>
          </a>
          {project.liveUrl && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`border-b border-current pb-1 text-[11px] uppercase tracking-[0.15em] ${s.muted}`}
            >
              {tShared("ctaGithub")}
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );

  const visual = (
    <Reveal delay={0.2}>
      <ProjectVisual
        imageSrc={project.imageSrc}
        href={project.liveUrl ?? project.href}
        meta={t("meta")}
        priority={index === 0}
      />
    </Reveal>
  );

  return (
    <section
      data-band={project.band}
      aria-label={tShared("viewLabel", { index: index + 1, total })}
      className={`px-6 py-24 md:px-12 md:py-36 ${s.section}`}
    >
      <div className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-2">
        {imageFirst ? (
          <>
            {visual}
            {copy}
          </>
        ) : (
          <>
            {copy}
            {visual}
          </>
        )}
      </div>
    </section>
  );
}
