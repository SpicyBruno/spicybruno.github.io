import type { Metadata } from "next";
import { BBH_Bartle, BBH_Bogle, BBH_Hegarty } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/Providers";
import { routing } from "@/i18n/routing";
import "../globals.css";

/*
  Il font system BBH del documento di design, self-hosted da next/font:
  niente <link> a fonts.googleapis.com, niente preconnect, nessuna richiesta
  a terzi. Le tre famiglie esistono solo in peso 400 — non applicare mai
  font-bold sopra, verrebbe sintetizzato (faux bold).

  Hegarty: i due titoli giganti (hero, contatti).
  Bartle:  titoli di sezione, numeri, dati, wordmark.
  Bogle:   testo corrente.
*/
const bbhHegarty = BBH_Hegarty({
  variable: "--font-hegarty",
  subsets: ["latin"],
  weight: "400",
});

const bbhBartle = BBH_Bartle({
  variable: "--font-bartle",
  subsets: ["latin"],
  weight: "400",
});

const bbhBogle = BBH_Bogle({
  variable: "--font-bogle",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Gabriele Brunazzo — Digital Media Strategist",
  description:
    "Strategia media e costruzione digitale nella stessa persona: funnel Meta end-to-end, siti, dashboard ed esperienze web.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${bbhHegarty.variable} ${bbhBartle.variable} ${bbhBogle.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
