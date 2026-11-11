import type { Dictionary } from "@/i18n/dictionaries";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Gallery({ t }: { t: Dictionary }) {
  return (
    <section className="section section-soft" id="gallery">
      <div className="container">
        <SectionHead pill={t.gallery.pill} title={t.gallery.title} lead={t.gallery.lead} />
        <div className="gallery">
          {t.gallery.items.map((g, i) => (
            <figure key={g.title} className={`g-item g${i + 1} reveal`} style={{ ["--d" as string]: `${i * 80}ms` }}>
              <Photo name={g.photo} alt={g.title} sizes={i === 0 ? "(max-width: 760px) 92vw, 600px" : "(max-width: 760px) 92vw, 300px"} />
              <figcaption>
                <span className="g-tag">{g.tag}</span>
                <span className="g-title">{g.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
