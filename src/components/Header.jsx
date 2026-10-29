import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navItems, profile } from "../data/content";
import { lockScroll, unlockScroll } from "../hooks/useSmoothScroll";
import Icon from "./Icon";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const progressRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    lockScroll();
    document.body.classList.add("nav-open");

    // Keep focus and assistive tech inside the open menu instead of the page
    // content underneath it.
    const inertTargets = [
      document.getElementById("main"),
      document.querySelector(".site-footer"),
      document.querySelector(".to-top-btn"),
      document.querySelector(".skip-link"),
    ].filter(Boolean);

    inertTargets.forEach((element) => {
      element.inert = true;
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 780) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      unlockScroll();
      document.body.classList.remove("nav-open");
      inertTargets.forEach((element) => {
        element.inert = false;
      });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-is-open" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Syed Abdul Kadar — home" onClick={closeMenu}>
            <span className="brand-mark">SAK</span>
            <span className="brand-slash">//</span>
            <span className="brand-text">security</span>
          </a>

          <nav
            id="primaryNav"
            ref={navRef}
            className={`nav${menuOpen ? " is-open" : ""}`}
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : ""}
                aria-current={active === item.id ? "location" : undefined}
                onClick={closeMenu}
              >
                <span>{item.index}</span>
                {item.label}
              </a>
            ))}

            <div className="nav-foot">
              <p>
                <span className="status-dot" aria-hidden="true" /> {profile.availability}
              </p>
              <a href={`mailto:${profile.email}`} onClick={closeMenu}>
                {profile.email}
              </a>
            </div>
          </nav>

          <div className="header-actions">
            <a
              className="btn btn--sm btn--ghost resume-link"
              href={profile.resume}
              target="_blank"
              rel="noopener"
            >
              <Icon name="download" size={15} />
              Resume
            </a>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="primaryNav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
