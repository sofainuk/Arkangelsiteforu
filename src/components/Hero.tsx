import { localizeDigits, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { RotatingWords } from "./RotatingWords";

export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="hero" id="top" data-anim>
      <div className="hero-bg" aria-hidden="true">
        <span className="shape s1" />
        <span className="shape s2" />
        <span className="shape s3"><Icon name="plus" size={34} strokeWidth={2.4} /></span>
        <span className="shape s4"><Icon name="plus" size={22} strokeWidth={2.4} /></span>
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="pill load-up" style={{ ["--d" as string]: "0ms" }}>
            <span className="pill-dot live" />
            {t.hero.badge}
          </span>
          <h1 className="hero-title load-up" style={{ ["--d" as string]: "80ms" }}>
            {t.hero.titlePre} <RotatingWords words={t.hero.words} /> {t.hero.titlePost}
          </h1>
          <p className="hero-lead load-up" style={{ ["--d" as string]: "160ms" }}>{t.hero.lead}</p>
          <div className="hero-actions load-up" style={{ ["--d" as string]: "240ms" }}>
            <a className="btn btn-primary btn-lg" href="#enquire" data-form="individual">
              {t.hero.cta1} <Icon name="arrow" size={20} className="flip-rtl" />
            </a>
            <a className="btn btn-outline btn-lg" href="#enquire" data-form="institutional">
              {t.hero.cta2}
            </a>
          </div>
          <ul className="hero-chips load-up" style={{ ["--d" as string]: "320ms" }}>
            {t.hero.chips.map((c) => (
              <li key={c}><Icon name="check" size={16} strokeWidth={2.6} />{c}</li>
            ))}
          </ul>
        </div>

        <div className="hero-visual load-zoom">
          <span className="hero-ring" aria-hidden="true" />
          <Photo name="hero" alt={t.hero.badge} sizes="(max-width: 1060px) 90vw, 560px" className="hero-photo" priority />
          <Photo name="heroSmall" alt="" sizes="200px" className="hero-photo-sm" />

          <div className="float-card fc-1">
            <span className="fc-icon"><Icon name="calendar" size={22} /></span>
            <span><strong>{t.hero.chips[0]}</strong><small>{t.hero.cardFoot}</small></span>
          </div>

          <div className="float-card fc-2">
            <div className="fc-head"><Icon name="pulse" size={18} /> {t.hero.cardTitle}<span className="live-badge"><span className="pill-dot live" />{t.hero.cardLive}</span></div>
            <svg className="ecg" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
              <path className="ecg-line" d="M0 30 H40 L48 30 L54 14 L60 44 L68 6 L76 38 L82 30 H120 L128 30 L134 18 L140 42 L148 10 L156 36 L162 30 H200" />
            </svg>
            <ul className="fc-bars">
              {t.hero.cardRows.slice(0, 3).map((r) => (
                <li key={r.label}>
                  <span>{r.label}</span>
                  <span className="bar"><span style={{ ["--w" as string]: `${r.value}%` }} /></span>
                  <b>{localizeDigits(r.value, lang)}%</b>
                </li>
              ))}
            </ul>
          </div>

          <div className="float-chip fc-3"><Icon name="shield" size={18} /> {t.hero.float2}</div>
        </div>
      </div>
    </section>
  );
}
