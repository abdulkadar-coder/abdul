import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";
import CaseDialog from "../components/CaseDialog";
import { research } from "../data/content";

export default function Research() {
  const [activeCase, setActiveCase] = useState(null);
  const triggerRef = useRef(null);

  const openCase = (caseId, event) => {
    triggerRef.current = event.currentTarget;
    setActiveCase(caseId);
  };

  return (
    <section className="section section--panel" id="research">
      <div className="container">
        <SectionHeading
          index="04"
          kicker="Vulnerability research"
          lead="Three security issues I found, validated and reported. Open a finding for the full methodology, proof of concept and remediation."
        >
          Findings, not <em>claims</em>.
        </SectionHeading>

        <div className="research-list" data-reveal-group>
          {research.map((item) => (
            <button
              type="button"
              className="research-row"
              key={item.id}
              data-reveal-item
              aria-haspopup="dialog"
              onClick={(event) => openCase(item.id, event)}
            >
              <span className={`severity severity--${item.severity}`}>{item.severityLabel}</span>

              <span className="research-main">
                <span className="research-kicker">Finding {item.number}</span>
                <span className="research-title">{item.title}</span>
                <span className="research-meta">{item.meta}</span>
              </span>

              <span className="research-id">{item.idLabel}</span>

              <span className="research-open" aria-hidden="true">
                <Icon name="arrowRight" size={14} />
              </span>
            </button>
          ))}
        </div>

        <p className="research-note" data-reveal>
          All testing was performed within program scope or client authorisation, without destructive
          actions or mass exfiltration. Sensitive personal data is redacted from every public
          write-up.
        </p>
      </div>

      <CaseDialog
        caseId={activeCase}
        onClose={() => setActiveCase(null)}
        returnFocusRef={triggerRef}
      />
    </section>
  );
}
