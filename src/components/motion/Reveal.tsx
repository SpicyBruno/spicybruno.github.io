"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/*
  Risalita di 40px in 800ms all'ingresso in viewport: è l'unica animazione
  di scroll del sito, ripetuta ovunque con delay crescenti.
  Con prefers-reduced-motion il MotionConfig globale (reducedMotion="user")
  sopprime il transform e lascia il fade.
*/
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
