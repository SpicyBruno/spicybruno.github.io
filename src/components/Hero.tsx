"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShaderBackdrop } from "./ShaderBackdrop";
import { AngleRule } from "./AngleRule";

/*
  Sequenza d'ingresso unica e orchestrata: occhiello → prime due righe →
  il filo che devia → la riga sfalsata → piede. Un solo momento, non effetti
  sparsi (STACK.md: "Framer Motion, solo micro-interazioni, con misura").
*/
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] as const },
});

export function Hero() {
  const t = useTranslations("hero");
  const lines = t.raw("titleLines") as string[];

  return (
    <section
      id="hero"
      data-band="void"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-28 text-on-void md:px-12 md:pt-32"
    >
      <ShaderBackdrop opacity={0.25} />

      {/*
        I wrapper .hero-exit portano la dissolvenza allo scroll; framer resta
        sugli elementi interni. Due animazioni sullo stesso nodo si
        annullerebbero — quella CSS vince sugli stili inline di framer.
      */}
      <div className="hero-exit">
        {/* L'occhiello sta nel flusso: in assoluto finiva sotto la navbar fissa */}
        <motion.p
          {...rise(0.1)}
          className="overline relative z-10 text-on-void-muted"
        >
          {t("overline")}
        </motion.p>
      </div>

      <div className="hero-exit">
        <h1 className="relative z-10 m-0 font-display text-[clamp(2rem,8.5vw,9rem)] uppercase leading-[0.95] tracking-[-0.03em]">
          <motion.span {...rise(0.25)} className="block">
            {lines[0]}
          </motion.span>
          <motion.span {...rise(0.4)} className="block">
            {lines[1]}
          </motion.span>

          <AngleRule />

          {/*
            Il rientro combacia con il gomito del filo: è il filo che porta la
            riga fuori asse, non un margine arbitrario.
          */}
          <motion.span
            {...rise(1.3)}
            className="ml-[8%] block whitespace-nowrap md:ml-[38%]"
          >
            {lines[2]}
            <span className="text-accent">.</span>
          </motion.span>
        </h1>
      </div>

      <div className="hero-exit">
        <motion.div
          {...rise(1.6)}
          className="relative z-10 flex items-end justify-between gap-6"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-on-void-muted">
            {t("name")}
          </p>

          <div aria-hidden="true" className="flex flex-col items-center gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-on-void-muted [writing-mode:vertical-rl]">
              {t("scroll")}
            </span>
            <span className="block h-12 w-px bg-void-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
