import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

export function Network({ t }: { t: Dictionary }) {
  return (
    <section className="section" id="network" data-anim>
      <div className="container split">
        <div>
          <SectionHead pill={t.network.pill} title={t.network.title} center={false} />
          <p className="text-strong reveal">{t.network.text}</p>
          <ul className="type-list">
            {t.network.types.map((ty, i) => (
              <li key={ty.title} className="type-item reveal" style={{ ["--d" as string]: `${i * 70}ms` }}>
                <span className="type-icon"><Icon name={ty.icon} size={22} /></span>
                {ty.title}
              </li>
            ))}
          </ul>
          <div className="reveal">
            <p className="hosts-title">{t.network.hostsTitle}</p>
            <ul className="hosts">
              {t.network.hosts.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <p className="note start"><Icon name="shield" size={17} /> {t.network.note}</p>
          </div>
        </div>

        <div className="orbit reveal from-end" aria-hidden="true">
          <div className="orbit-track">
            {t.network.types.map((ty, i) => (
              <span key={ty.title} className={`orbit-node n${i}`}><span><Icon name={ty.icon} size={24} /></span></span>
            ))}
          </div>
          <Photo name="london" alt="" sizes="(max-width: 1060px) 70vw, 380px" className="orbit-photo" />
          <span className="orbit-label"><Icon name="pin" size={18} /> {t.network.core}</span>
        </div>
      </div>
    </section>
  );
}
