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

const DELAY = 0.6;
const DURATION = 0.9;

/** Gomito all'8% — mobile, rientro corto. */
const PATH_SM = "M0,20 H40 L80,100 H1000";
/** Gomito al 38% — da md in su. */
const PATH_MD = "M0,20 H340 L380,100 H1000";

export function AngleRule() {
  const reduced = useReducedMotion();

  const draw = {
    initial: { pathLength: reduced ? 1 : 0 },
    animate: { pathLength: 1 },
    transition: reduced
      ? { duration: 0 }
      : { duration: DURATION, delay: DELAY, ease: [0.4, 0, 0.2, 1] as const },
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
        d={PATH_SM}
        className="md:hidden"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        {...draw}
        d={PATH_MD}
        className="hidden md:block"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
