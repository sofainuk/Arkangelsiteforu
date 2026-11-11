"use client";

import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

export function Navbar({ t, lang }: { t: Dictionary; lang: Locale }) {
  const links = [
    { id: "about", label: t.nav.about },
    { id: "programmes", label: t.nav.programmes },
    { id: "journey", label: t.nav.journey },
    { id: "network", label: t.nav.network },
    { id: "faq", label: t.nav.faq },
    { id: "enquire", label: t.nav.contact },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const other: Locale = lang === "ar" ? "en" : "ar";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled(window.scrollY > 20);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const map: Record<string, string> = {
      top: "",
      about: "about",
      programmes: "programmes",
      why: "programmes",
      programme: "programmes",
      journey: "journey",
      gallery: "journey",
      network: "network",
      audience: "network",
      faq: "faq",
      enquire: "enquire",
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(map[e.target.id] ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    Object.keys(map).forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const switchLang = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/${other}${window.location.hash}`;
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label={`${t.brand.name} — ${t.brand.sub}`}>
          <LogoMark size={40} />
          <span className="brand-text">
            <span className="brand-name">{t.brand.name}</span>
            <span className="brand-sub">{t.brand.sub}</span>
          </span>
        </a>

        <nav className="nav-links" aria-label={t.nav.menu}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? "is-active" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="lang-btn" href={`/${other}`} onClick={switchLang} hrefLang={other} lang={other} title={t.nav.switchTitle}>
            <Icon name="translate" size={18} />
            <span>{t.nav.switchTo}</span>
          </a>
          <a className="btn btn-primary btn-sm nav-cta" href="#enquire" data-form="individual">
            {t.nav.cta}
          </a>
          <button type="button" className="burger" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
            <span className="burger-lines" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!open}>
        <nav aria-label={t.nav.menu}>
          {links.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${0.08 + i * 0.04}s` : "0s" }}>
              <span className="mm-num">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="mm-actions">
          <a className="btn btn-primary" href="#enquire" data-form="individual" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{t.nav.cta}</a>
          <a className="btn btn-outline" href={`/${other}`} onClick={switchLang} lang={other} tabIndex={open ? 0 : -1}>
            <Icon name="translate" size={18} /> {t.nav.switchTo}
          </a>
        </div>
      </div>
    </header>
  );
}
