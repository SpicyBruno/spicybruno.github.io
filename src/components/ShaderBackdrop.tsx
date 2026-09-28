"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ACCENT_HEX } from "@/lib/site";
import { useReducedMotion } from "./motion/useReducedMotion";

/*
  Import pigro: il bundle WebGL non deve pesare sul primo paint. Fino al
  caricamento il fallback è null, quindi la sezione resta semplicemente nera.
*/
const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  }))
);

interface ShaderBackdropProps {
  /** Quanto il retino emerge dal nero. 0.25 hero, 0.35 contatti. */
  opacity: number;
  idleSpeed?: number;
  hoverSpeed?: number;
}

/*
  Retino tipografico animato in giallo accento, dietro il contenuto delle
  bande nere. Trasparente sul fondo (colorBack "#00000000"), così la banda
  sotto continua a decidere il colore della pagina.

  L'hover è ascoltato sull'elemento *padre*: la sezione ospite non deve
  diventare un client component solo per tenere questo stato.
*/
export function ShaderBackdrop({
  opacity,
  idleSpeed = 0.2,
  hoverSpeed = 0.6,
}: ShaderBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;

    const onEnter = () => setIsHovered(true);
    const onLeave = () => setIsHovered(false);
    host.addEventListener("mouseenter", onEnter);
    host.addEventListener("mouseleave", onLeave);
    return () => {
      host.removeEventListener("mouseenter", onEnter);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity }}
    >
      <Suspense fallback={null}>
        <Dithering
          className="size-full"
          colorBack="#00000000"
          colorFront={ACCENT_HEX}
          shape="warp"
          type="4x4"
          // A motion ridotta il retino resta, ma immobile.
          speed={reduced ? 0 : isHovered ? hoverSpeed : idleSpeed}
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
