"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/*
  MotionConfig reducedMotion="user": con prefers-reduced-motion attive
  le animazioni di transform vengono soppresse (resta il fade),
  senza divergenze tra HTML server e client.
*/
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
