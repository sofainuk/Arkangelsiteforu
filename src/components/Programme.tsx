"use client";

import { useEffect, useRef, useState } from "react";
import { localizeDigits, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

const DURATION = 7000;

/** Five-day programme explorer: click a day, or let it play automatically while on screen. */
export function Programme({ t, lang }: { t: Dictionary; lang: Locale }) {
  const days = t.programme.days;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || paused) return;
    const id = window.setTimeout(() => setActive((v) => (v + 1) % days.length), DURATION);
    return () => window.clearTimeout(id);
  }, [playing, paused, active, days.length]);

  const d = days[active];
  const running = playing && !paused;

  return (
    <section className="section section-soft" id="programme">
      <div className="container">
        <SectionHead pill={t.programme.pill} title={t.programme.title} lead={t.programme.lead} />
        <div className="prog reveal" ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="prog-tabs" role="tablist" aria-label={t.programme.pill}>
            {days.map((day, i) => (
              <button
                key={day.title}
                type="button"
                role="tab"
                id={`day-tab-${i}`}
                aria-selected={i === active}
                aria-controls="day-panel"
                className={`prog-tab${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="prog-num">
                  <small>{t.programme.day}</small>
                  {localizeDigits(i + 1, lang)}
                </span>
                <span className="prog-name">{day.title}</span>
                {i === active && <span key={`${active}-${running}`} className={`prog-timer${running ? " run" : ""}`} style={{ ["--dur" as string]: `${DURATION}ms` }} aria-hidden="true" />}
              </button>
            ))}
          </div>

          <div className="prog-panel" id="day-panel" role="tabpanel" aria-labelledby={`day-tab-${active}`} key={active}>
            <Photo name={d.photo} alt={d.title} sizes="(max-width: 1060px) 92vw, 640px" className="prog-photo" />
            <div className="prog-body">
              <span className="prog-badge">{t.programme.day} {localizeDigits(active + 1, lang)}</span>
              <h3 className="prog-title">{d.title}</h3>
              <p className="card-text">{d.text}</p>
              <p className="prog-sample">{t.programme.sample}</p>
              <ul className="mini-list two-col">
                {d.items.map((it) => (
                  <li key={it}><Icon name="check" size={15} strokeWidth={2.6} />{it}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="note"><Icon name="shield" size={17} /> {t.programme.note}</p>
      </div>
    </section>
  );
}
