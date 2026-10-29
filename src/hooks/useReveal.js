import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section-level scroll reveals.
 * - [data-reveal]          single element fade/slide
 * - [data-reveal-group]    staggers [data-reveal-item] children
 * - [data-heading] h2      masked line reveal
 */
export function useReveal() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-heading]").forEach((mask) => {
        const heading = mask.querySelector("h2");
        if (!heading) return;
        gsap.fromTo(
          heading,
          { yPercent: 112 },
          {
            yPercent: 0,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: { trigger: mask, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            delay: Number(el.dataset.revealDelay || 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        const items = gsap.utils.toArray("[data-reveal-item]", group);
        if (!items.length) return;
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.075,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          }
        );
      });
    });

    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);
}
