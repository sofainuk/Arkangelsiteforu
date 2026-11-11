import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { About } from "./About";
import { Services } from "./Services";
import { Why } from "./Why";
import { Programme } from "./Programme";
import { Journey } from "./Journey";
import { Gallery } from "./Gallery";
import { Network } from "./Network";
import { Audience } from "./Audience";
import { Faq } from "./Faq";
import { Enquiry } from "./Enquiry";
import { Cta } from "./Cta";
import { Footer } from "./Footer";

export function Site({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <>
      <Navbar t={t} lang={lang} />
      <main id="main">
        <Hero t={t} lang={lang} />
        <Marquee items={t.marquee} />
        <About t={t} lang={lang} />
        <Services t={t} />
        <Why t={t} />
        <Programme t={t} lang={lang} />
        <Journey t={t} lang={lang} />
        <Gallery t={t} />
        <Network t={t} />
        <Audience t={t} />
        <Faq t={t} />
        <Enquiry t={t} lang={lang} />
        <Cta t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
