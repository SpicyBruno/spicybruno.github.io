import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/*
  Export statico per GitHub Pages: niente server, quindi niente proxy
  next-intl e niente ottimizzazione immagini. La root `/` reindirizza a
  `/it/` tramite public/index.html.
*/
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: __dirname },
};

export default withNextIntl(nextConfig);
