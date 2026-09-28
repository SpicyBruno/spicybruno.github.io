"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/*
  MotionConfig reducedMotion="user" copre framer-motion, non il WebGL dei
  shader: questo hook serve a fermare l'animazione del canvas.

  useSyncExternalStore invece di useState + useEffect: niente setState nel
  corpo di un effetto (regola react-hooks/set-state-in-effect) e nessuna
  divergenza di idratazione, perché sul server la risposta è sempre false.
*/
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
