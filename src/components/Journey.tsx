import { localizeDigits, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";

const DOTS: [number, number][] = (() => {
  const out: [number, number][] = [];
  for (let y = 30; y < 390; y += 24) {
    for (let x = 20; x < 790; x += 24) {
      const n = Math.sin(x * 0.021) * Math.cos(y * 0.034) + Math.sin((x + y) * 0.011);
      if (n > 0.15) out.push([x, y]);
    }
  }
  return out;
})();

const ROUTE = "M620 300 C 540 150, 330 40, 170 110";

export function Journey({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="section" id="journey" data-anim>
      <div className="container journey-grid">
        <div>
          <SectionHead pill={t.journey.pill} title={t.journey.title} lead={t.journey.lead} center={false} />
          <ol className="steps">
            {t.journey.steps.map((s, i) => (
              <li key={s.title} className="step reveal" style={{ ["--d" as string]: `${i * 110}ms` }}>
                <span className="step-num">{localizeDigits(i + 1, lang)}</span>
                <div>
                  <h3 className="step-title"><Icon name={s.icon} size={20} /> {s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="btn btn-primary" href="#enquire" data-form="individual">{t.hero.cta1} <Icon name="arrow" size={18} className="flip-rtl" /></a>
        </div>

        <div className="map reveal from-end" dir="ltr">
          <svg viewBox="0 0 800 400" className="map-svg" role="img" aria-label={`${t.journey.from} → ${t.journey.to}`}>
            <defs>
              <linearGradient id="route-g" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#E9A23B" />
                <stop offset=".5" stopColor="#0D9488" />
                <stop offset="1" stopColor="#1D6FB8" />
              </linearGradient>
            </defs>
            <g className="map-dots">
              {DOTS.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
              ))}
            </g>
            <path d={ROUTE} className="route-bg" />
            <path d={ROUTE} className="route-line" pathLength={1} />
            <path id="route-path" d={ROUTE} fill="none" stroke="none" />
            {[
              { x: 620, y: 300, label: t.journey.from, c: "#E9A23B", dy: 44 },
              { x: 170, y: 110, label: t.journey.to, c: "#0D9488", dy: -28 },
            ].map((p) => (
              <g key={p.label} transform={`translate(${p.x} ${p.y})`}>
                <circle r="26" fill={p.c} className="pin-pulse" />
                <circle r="11" fill="#fff" stroke={p.c} strokeWidth="4" />
                <text y={p.dy} textAnchor="middle" className="pin-label">{p.label}</text>
              </g>
            ))}
            <g className="plane">
              <circle r="17" fill="#fff" />
              <path transform="scale(.9)" d="M-12 -2 L10 -2 L16 0 L10 2 L-12 2 Z M-2 -2 L-8 -11 L-4 -11 L5 -2 Z M-2 2 L-8 11 L-4 11 L5 2 Z M-12 -1 L-15 -6 L-12 -6 L-9 -1 Z M-12 1 L-15 6 L-12 6 L-9 1 Z" fill="#0D9488" />
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#route-path" />
              </animateMotion>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
