export default function SectionHeading({ index, kicker, lead, children, actions }) {
  return (
    <div className={`section-head${actions ? " section-head--row" : ""}`}>
      <div className="section-head-copy">
        <p className="eyebrow" data-reveal>
          <span>{index}</span>
          {kicker}
        </p>
        <div className="heading-mask" data-heading>
          <h2>{children}</h2>
        </div>
        {lead ? (
          <p className="section-lead" data-reveal>
            {lead}
          </p>
        ) : null}
      </div>
      {actions ? <div className="section-head-actions">{actions}</div> : null}
    </div>
  );
}
