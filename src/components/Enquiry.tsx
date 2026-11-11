"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import type { FormType } from "@/lib/enquiry";
import { site } from "@/lib/site";
import { Icon } from "./Icon";
import { SectionHead } from "./SectionHead";

type FieldKey = keyof Dictionary["enquiry"]["fields"];
type Field = { key: FieldKey; type?: "text" | "email" | "tel" | "number"; required?: boolean; full?: boolean; area?: boolean; dir?: "ltr" };

const FIELDS: Record<FormType, Field[]> = {
  individual: [
    { key: "fullName", required: true },
    { key: "designation", required: true },
    { key: "specialty" },
    { key: "hospital" },
    { key: "email", type: "email", required: true, dir: "ltr" },
    { key: "phone", type: "tel", dir: "ltr" },
    { key: "dates", full: true },
    { key: "message", full: true, area: true },
  ],
  institutional: [
    { key: "organisation", required: true },
    { key: "lead", required: true },
    { key: "email", type: "email", required: true, dir: "ltr" },
    { key: "phone", type: "tel", dir: "ltr" },
    { key: "participants", type: "number" },
    { key: "dates" },
    { key: "message", full: true, area: true },
  ],
};

type Status = "idle" | "sending" | "done" | "error";

export function Enquiry({ t, lang }: { t: Dictionary; lang: Locale }) {
  const [type, setType] = useState<FormType>("individual");
  const [values, setValues] = useState<Partial<Record<FieldKey, string>>>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey | "consent", string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [delivered, setDelivered] = useState(true);
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<FormType>).detail;
      if (detail === "individual" || detail === "institutional") {
        setType(detail);
        setStatus("idle");
      }
    };
    window.addEventListener("ark:enquiry", onOpen);
    return () => window.removeEventListener("ark:enquiry", onOpen);
  }, []);

  const set = (k: FieldKey, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<FieldKey | "consent", string>> = {};
    for (const f of FIELDS[type]) {
      const v = (values[f.key] ?? "").trim();
      if (f.required && !v) next[f.key] = t.enquiry.required;
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.key] = t.enquiry.invalidEmail;
    }
    if (!consent) next.consent = t.enquiry.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type, lang, consent, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; delivered?: boolean };
      if (!res.ok || !data.ok) throw new Error("failed");
      setDelivered(data.delivered !== false);
      setStatus("done");
      setValues({});
      setConsent(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section" id="enquire">
      <div className="container enquiry-grid">
        <div className="enquiry-intro">
          <SectionHead pill={t.enquiry.pill} title={t.enquiry.title} lead={t.enquiry.lead} center={false} />
          <div className="reveal">
            <ul className="contact-list">
              <li><span className="icon-orb sm"><Icon name="mail" size={18} /></span>
                {site.email ? <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a> : <span>{t.footer.tbc}</span>}
              </li>
              <li><span className="icon-orb sm"><Icon name="phone" size={18} /></span>
                {site.phone ? <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} dir="ltr">{site.phone}</a> : <span>{t.footer.tbc}</span>}
              </li>
              <li><span className="icon-orb sm"><Icon name="pin" size={18} /></span><span>{t.footer.address}</span></li>
            </ul>
          </div>
        </div>

        <div className="form-card reveal">
                    {status === "done" ? (
              <div key="done" className="success" role="status">
                <svg className="success-check" viewBox="0 0 80 80" aria-hidden="true">
                  <circle className="sc-circle" cx="40" cy="40" r="34" fill="none" stroke="#0D9488" strokeWidth="4" pathLength={1} />
                  <path className="sc-tick" d="M25 41l10 10 20-22" fill="none" stroke="#0D9488" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
                </svg>
                <div className="burst" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <span key={i} style={{ transform: `rotate(${i * 30}deg)` }} />)}</div>
                <h3>{t.enquiry.successTitle}</h3>
                <p>{t.enquiry.successText}</p>
                {!delivered && <p className="demo-note">{t.enquiry.demoNote}</p>}
                <button type="button" className="btn btn-outline" onClick={() => setStatus("idle")}>{t.enquiry.again}</button>
              </div>
            ) : (
              <form key="form" noValidate onSubmit={onSubmit} className="form-enter">
                <div className={`tabs${type === "institutional" ? " is-second" : ""}`} role="tablist" aria-label={t.enquiry.pill}>
                  <span className="tab-pill" aria-hidden="true" />
                  {(["individual", "institutional"] as const).map((k) => (
                    <button key={k} type="button" role="tab" aria-selected={type === k} className={`tab${type === k ? " is-active" : ""}`} onClick={() => { setType(k); setErrors({}); }}>
                                            <span className="tab-label"><Icon name={k === "individual" ? "user" : "building"} size={18} />{k === "individual" ? t.enquiry.tabInd : t.enquiry.tabInst}</span>
                    </button>
                  ))}
                </div>

                <div key={type} className="fields form-enter">
                    {FIELDS[type].map((f) => {
                      const id = `f-${type}-${f.key}`;
                      const err = errors[f.key];
                      const common = {
                        id,
                        name: f.key,
                        value: values[f.key] ?? "",
                        placeholder: " ",
                        dir: f.dir,
                        "aria-invalid": err ? ("true" as const) : ("false" as const),
                        "aria-describedby": err ? `${id}-err` : undefined,
                      };
                      return (
                        <div key={id} className={`field${f.full ? " full" : ""}${err ? " has-error" : ""}`}>
                          {f.area ? (
                            <textarea {...common} rows={4} maxLength={3000} onChange={(e) => set(f.key, e.target.value)} />
                          ) : (
                            <input {...common} type={f.type ?? "text"} maxLength={200} min={f.type === "number" ? 1 : undefined} onChange={(e) => set(f.key, e.target.value)} />
                          )}
                          <label htmlFor={id}>{t.enquiry.fields[f.key]}{f.required ? " *" : ""}</label>
                          <span className="field-line" aria-hidden="true" />
                          {err && <span id={`${id}-err`} className="field-err">{err}</span>}
                        </div>
                      );
                    })}
                  </div>

                <div className="hp" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>

                <label className={`consent${errors.consent ? " has-error" : ""}`}>
                  <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }} aria-invalid={errors.consent ? "true" : "false"} />
                  <span className="consent-box" aria-hidden="true"><Icon name="check" size={14} strokeWidth={3} /></span>
                  <span>{t.enquiry.consent}</span>
                </label>
                {errors.consent && <p className="field-err static">{errors.consent}</p>}
                {status === "error" && <p className="form-error" role="alert">{t.enquiry.error}</p>}

                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === "sending"}>
                  {status === "sending" ? <><span className="spinner" aria-hidden="true" />{t.enquiry.sending}</> : <>{t.enquiry.submit}<Icon name="arrow" size={18} className="flip-rtl" /></>}
                </button>
              </form>
            )}
        </div>
      </div>
    </section>
  );
}
