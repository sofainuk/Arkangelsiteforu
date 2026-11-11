import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../globals.css";
import { getDictionary, isLocale, locales } from "@/i18n/dictionaries";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import { Effects } from "@/components/Effects";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0D9488",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: `/${lang}`, languages: { en: "/en", ar: "/ar" } },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ar" ? "ar_SA" : "en_GB",
      type: "website",
      images: [{ url: `${photos.hero}?auto=format&fit=crop&w=1200&h=630&q=70`, width: 1200, height: 630 }],
    },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "is-ar" : "is-en"}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">{t.nav.skip}</a>
        <div id="progress" className="progress" aria-hidden="true" />
        {children}
        <Effects />
      </body>
    </html>
  );
}
