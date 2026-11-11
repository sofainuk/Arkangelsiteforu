import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "./Icon";
import { Photo } from "./Photo";

export function Cta({ t }: { t: Dictionary }) {
  return (
    <section className="section cta-section" data-anim>
      <div className="container">
        <div className="cta reveal">
          <Photo name="cta" alt="" sizes="(max-width: 1220px) 96vw, 1220px" className="cta-photo" />
          <div className="cta-inner">
            <span className="cta-shape s1" aria-hidden="true"><Icon name="plus" size={40} strokeWidth={2.2} /></span>
            <span className="cta-shape s2" aria-hidden="true"><Icon name="heart" size={34} /></span>
            <h2 className="cta-title">{t.cta.title}</h2>
            <p className="cta-text">{t.cta.text}</p>
            <div className="cta-actions">
              <a className="btn btn-light btn-lg" href="#enquire" data-form="individual">{t.cta.btn1} <Icon name="arrow" size={20} className="flip-rtl" /></a>
              <a className="btn btn-ghost-light btn-lg" href="#enquire" data-form="institutional">{t.cta.btn2}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
