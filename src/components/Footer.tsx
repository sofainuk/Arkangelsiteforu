import { localizeDigits, type Dictionary, type Locale } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { BackToTop } from "./BackToTop";
import { Icon } from "./Icon";
import { LogoMark } from "./Logo";

export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const other = lang === "ar" ? "en" : "ar";
  const links = [
    { id: "about", label: t.nav.about },
    { id: "programmes", label: t.nav.programmes },
    { id: "journey", label: t.nav.journey },
    { id: "gallery", label: t.nav.gallery },
    { id: "network", label: t.nav.network },
    { id: "faq", label: t.nav.faq },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand brand-light" href="#top">
              <LogoMark size={42} />
              <span className="brand-text">
                <span className="brand-name">{t.brand.name}</span>
                <span className="brand-sub">{t.brand.sub}</span>
              </span>
            </a>
            <p>{t.footer.text}</p>
          </div>
          <div>
            <h2 className="footer-title">{t.footer.explore}</h2>
            <ul className="footer-links">
              {links.map((l) => <li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">{t.footer.contact}</h2>
            <ul className="footer-contact">
              <li><Icon name="pin" size={18} /><span>{t.footer.address}</span></li>
              <li><Icon name="mail" size={18} />{site.email ? <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> : <span>{t.footer.tbc}</span>}</li>
              <li><Icon name="phone" size={18} />{site.phone ? <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} dir="ltr">{site.phone}</a> : <span>{t.footer.tbc}</span>}</li>
            </ul>
          </div>
        </div>
        <div className="footer-info">
          <span className="footer-info-icon"><Icon name="shield" size={20} /></span>
          <div>
            <h2 className="footer-title">{t.footer.infoTitle}</h2>
            <p>{t.footer.info}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {localizeDigits(new Date().getFullYear(), lang)} {t.brand.name} — {t.brand.sub}. {t.footer.rights}</p>
          <a className="footer-lang" href={`/${other}`} lang={other}><Icon name="translate" size={16} /> {t.nav.switchTo}</a>
        </div>
      </div>
      <BackToTop label={t.footer.top} />
      {site.whatsapp && (
        <a className="wa" href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={t.footer.whatsapp}>
          <Icon name="whatsapp" size={26} />
        </a>
      )}
    </footer>
  );
}
