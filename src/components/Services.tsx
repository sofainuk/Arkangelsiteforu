import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Services({ t }: { t: Dictionary }) {
  return (
    <section className="section section-soft" id="programmes">
      <div className="container">
        <SectionHead pill={t.services.pill} title={t.services.title} lead={t.services.lead} />
        <div className="cards-3">
          {t.services.items.map((s, i) => (
            <article key={s.title} className={`svc reveal${i === 1 ? " is-featured" : ""}`} style={{ ["--d" as string]: `${i * 100}ms` }}>
              <div className="svc-media">
                <Photo name={s.photo} alt={s.title} sizes="(max-width: 760px) 92vw, (max-width: 1060px) 46vw, 380px" />
                <span className="tag">{s.tag}</span>
              </div>
              <span className="svc-icon"><Icon name={s.icon} size={28} /></span>
              <div className="svc-body">
                <h3 className="card-title">{s.title}</h3>
                <p className="card-text">{s.text}</p>
                <ul className="mini-list">
                  {s.list.map((li) => (
                    <li key={li}><Icon name="check" size={15} strokeWidth={2.6} />{li}</li>
                  ))}
                </ul>
                <a className="link-btn" href="#enquire" data-form={s.form}>
                  {t.services.more} <Icon name="arrow" size={18} className="flip-rtl" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
