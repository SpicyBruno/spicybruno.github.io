"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "./motion/useReducedMotion";

/*
  Il filo che porta l'ultima riga del titolo fuori asse: corre dritto, devia
  una volta sola, riprende dritto. La deviazione è una sola — un seghetto
  ripetuto sarebbe decorazione, questo è l'angolo di cui parla il manifesto.

  preserveAspectRatio="none" fa combaciare la x del gomito con la percentuale
  di rientro della riga: 8% su mobile, 38% da md in su. `vector-effect` tiene
  il filo a 1px a qualsiasi larghezza, altrimenti lo stiramento lo ingrossa.
*/

const DURATION = 0.9;

/** Il gomito: il filo scende di 80 unità su 40 di corsa, sempre uguale. */
const path = (elbowPct: number) => {
  const x = elbowPct * 10;
  return `M0,20 H${x} L${x + 40},100 H1000`;
};

interface AngleRuleProps {
  /**
   * Inizio della deviazione in % della larghezza, mobile / da md in su.
   * Il default (4 / 34) fa finire il gomito all'8% e al 38%: i rientri
   * dell'ultima riga dell'hero.
   */
  elbow?: { sm: number; md: number };
  /**
   * "mount": parte con la sequenza d'ingresso dell'hero.
   * "inView": si disegna quando entra nello schermo (contatti).
   */
  trigger?: "mount" | "inView";
  delay?: number;
}

export function AngleRule({
  elbow = { sm: 4, md: 34 },
  trigger = "mount",
  delay = 0.6,
}: AngleRuleProps) {
  const reduced = useReducedMotion();

  const target = { pathLength: 1 };
  const draw = {
    initial: { pathLength: reduced ? 1 : 0 },
    ...(trigger === "mount"
      ? { animate: target }
      : { whileInView: target, viewport: { once: true, margin: "-15%" } }),
    transition: reduced
      ? { duration: 0 }
      : { duration: DURATION, delay, ease: [0.4, 0, 0.2, 1] as const },
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      className="block h-14 w-full md:h-24"
    >
      <motion.path
        {...draw}
        d={path(elbow.sm)}
        className="md:hidden"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        {...draw}
        d={path(elbow.md)}
        className="hidden md:block"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
