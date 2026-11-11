import type { Dictionary, Locale } from "@/i18n/dictionaries";
import { Counter } from "./Counter";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function About({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="section" id="about" data-anim>
      <div className="container split">
        <div className="collage reveal from-start">
          <Photo name="about1" alt={t.about.pill} sizes="(max-width: 1060px) 80vw, 440px" className="collage-a" />
          <Photo name="about2" alt="" sizes="(max-width: 1060px) 50vw, 300px" className="collage-b" />
          <div className="collage-badge">
            <span className="cb-num">{lang === "ar" ? "٥" : "5"}</span>
            <span className="cb-text">{t.about.stats[0].label}</span>
          </div>
          <span className="collage-dots" aria-hidden="true" />
        </div>

        <div>
          <SectionHead pill={t.about.pill} title={t.about.title} center={false} />
          <p className="text-strong reveal">{t.about.text1}</p>
          <p className="reveal">{t.about.text2}</p>
          <ul className="check-list">
            {t.about.points.map((p, i) => (
              <li key={p} className="reveal" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <span className="check-ico"><Icon name="check" size={15} strokeWidth={2.8} /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="stats">
          {t.about.stats.map((s, i) => (
            <div key={s.label} className="stat reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <p className="stat-num"><Counter to={s.value} suffix={s.suffix} lang={lang} /></p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
