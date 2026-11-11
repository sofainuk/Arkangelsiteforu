import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Audience({ t }: { t: Dictionary }) {
  return (
    <section className="section section-soft" id="audience">
      <div className="container">
        <SectionHead pill={t.audience.pill} title={t.audience.title} />
        <div className="cards-3">
          {t.audience.items.map((a, i) => (
            <article key={a.title} className="aud reveal" style={{ ["--d" as string]: `${i * 100}ms` }}>
              <Photo name={a.photo} alt={a.title} sizes="(max-width: 760px) 92vw, (max-width: 1060px) 46vw, 380px" className="aud-photo" />
              <div className="aud-body">
                <span className="aud-icon"><Icon name={a.icon} size={24} /></span>
                <h3 className="card-title">{a.title}</h3>
                <p className="card-text">{a.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
