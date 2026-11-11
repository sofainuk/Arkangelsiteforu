"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Faq({ t }: { t: Dictionary }) {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <div className="faq-side">
          <SectionHead pill={t.faq.pill} title={t.faq.title} center={false} />
          <div className="faq-card reveal">
            <Photo name="day2" alt="" sizes="(max-width: 1060px) 92vw, 420px" className="faq-photo" />
            <div className="faq-cta">
              <p>{t.cta.text}</p>
              <a className="btn btn-primary btn-sm" href="#enquire" data-form="individual">{t.nav.cta}</a>
            </div>
          </div>
        </div>
        <div className="faq-list">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            const pid = `${base}-p${i}`;
            return (
              <div key={f.q} className={`faq-item reveal${isOpen ? " is-open" : ""}`} style={{ ["--d" as string]: `${i * 60}ms` }}>
                <button type="button" className="faq-q" aria-expanded={isOpen} aria-controls={pid} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="faq-icon"><Icon name="plus" size={20} strokeWidth={2.4} /></span>
                </button>
                <div id={pid} role="region" className="faq-a" aria-hidden={!isOpen}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
