export function SectionHead({ pill, title, lead, center = true }: { pill: string; title: string; lead?: string; center?: boolean }) {
  return (
    <header className={`sec-head reveal${center ? " is-center" : ""}`}>
      <span className="pill"><span className="pill-dot" />{pill}</span>
      <h2 className="sec-title">{title}</h2>
      {lead ? <p className="sec-lead">{lead}</p> : null}
    </header>
  );
}
