import { useEffect, useRef } from "react";
import gsap from "gsap";
import { caseStudies } from "../data/caseStudies";
import { lockScroll, unlockScroll } from "../hooks/useSmoothScroll";
import Icon from "./Icon";

export default function CaseDialog({ caseId, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const innerRef = useRef(null);
  const closingRef = useRef(false);
  const study = caseId ? caseStudies[caseId] : null;

  useEffect(() => {
    if (!caseId) return undefined;

    const dialog = dialogRef.current;
    const inner = innerRef.current;
    if (!dialog) return undefined;

    closingRef.current = false;
    if (!dialog.open) dialog.showModal();
    if (inner) inner.scrollTop = 0;
    lockScroll();
    document.body.classList.add("dialog-open");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx;
    if (!reduced && inner) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".case-header > *",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.055, ease: "power3.out" }
        );
        gsap.fromTo(
          ".case-section",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.045,
            delay: 0.12,
            ease: "power2.out",
          }
        );
      }, inner);
    }

    return () => {
      ctx?.revert();
      unlockScroll();
      document.body.classList.remove("dialog-open");
    };
  }, [caseId]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    const handleCancel = (event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  });

  const close = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    const dialog = dialogRef.current;
    const inner = innerRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      if (dialog?.open) dialog.close();
      onClose();
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };

    if (!inner || reduced) {
      finish();
      return;
    }

    gsap.to(inner, {
      opacity: 0,
      y: 12,
      duration: 0.2,
      ease: "power2.in",
      onComplete: finish,
    });
  };

  return (
    <dialog
      className="case-dialog"
      id="caseDialog"
      ref={dialogRef}
      aria-labelledby={study ? "caseTitle" : undefined}
      onClick={(event) => {
        if (event.target === dialogRef.current) close();
      }}
    >
      {study ? (
        <div className="case-dialog-inner" ref={innerRef} data-lenis-prevent>
          <button type="button" className="case-close" onClick={close} aria-label="Close case study">
            <Icon name="close" size={16} />
          </button>

          <header className="case-header">
            <p className="case-kicker">{study.kicker}</p>
            <h2 id="caseTitle">{study.title}</h2>
            <div className="case-badges">
              {study.badges.map((badge) => (
                <span
                  key={badge.label}
                  className={badge.tone ? `severity severity--${badge.tone}` : "case-badge"}
                >
                  {badge.label}
                </span>
              ))}
            </div>
            <p className="case-meta">{study.meta}</p>
          </header>

          {study.sections.map((section) => (
            <section className="case-section" key={section.title}>
              <h3>{section.title}</h3>
              {section.content}
            </section>
          ))}

          <div className="case-footer">
            <button type="button" className="btn btn--ghost btn--sm" onClick={close}>
              Back to research
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
