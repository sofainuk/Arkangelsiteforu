import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";

export function Why({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="why">
      <div className="container">
        <SectionHead pill={t.why.pill} title={t.why.title} />
        <div className="cards-4">
          {t.why.items.map((item, i) => (
            <article key={item.title} className="why reveal" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <span className="why-num" aria-hidden="true">0{i + 1}</span>
              <span className="why-icon"><Icon name={item.icon} size={30} /></span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
