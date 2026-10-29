import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "../reactbits/SplitText";
import CountUp from "../reactbits/CountUp";
import DecryptedText from "../reactbits/DecryptedText";
import Magnet from "../reactbits/Magnet";
import { profile, stats } from "../data/content";
import Icon from "../components/Icon";

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";

export default function Hero() {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const terminalRef = useRef(null);
  const accentRef = useRef(null);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(terminalRef.current, { transformPerspective: 1000 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

      tl.from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
        .from(".hero-role", { y: 20, opacity: 0, duration: 0.7 }, 0.55)
        .from(".hero-lead", { y: 22, opacity: 0, duration: 0.7 }, 0.66)
        .from(".hero-actions > *", { y: 18, opacity: 0, duration: 0.55, stagger: 0.08 }, 0.82)
        .from(".hero-socials", { y: 12, opacity: 0, duration: 0.5 }, 0.96)
        .from(panelRef.current, { y: 36, opacity: 0, duration: 0.9 }, 0.4)
        .from(".stat", { y: 14, opacity: 0, duration: 0.55, stagger: 0.07 }, 1.02)
        .from(
          accentRef.current,
          { scale: 0.4, opacity: 0, rotation: -10, duration: 0.8, ease: "back.out(2)" },
          0.9
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const terminal = terminalRef.current;
    if (!panel || !terminal) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rotateX = gsap.quickTo(terminal, "rotationX", { duration: 0.55, ease: "power3" });
    const rotateY = gsap.quickTo(terminal, "rotationY", { duration: 0.55, ease: "power3" });

    const onMove = (event) => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      rotateX(-y * 4.5);
      rotateY(x * 5.5);
    };

    const onLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerleave", onLeave);

    return () => {
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 className="hero-title">
            <span className="hero-line">
              <SplitText
                text="SYED ABDUL"
                tag="span"
                className="hero-split"
                splitType="chars"
                delay={34}
                duration={1.05}
                effect="rise"
                trigger="load"
                textAlign="left"
                hoverEffect="lift"
              />
            </span>
            <span className="hero-line">
              <SplitText
                text="KADAR"
                tag="span"
                className="hero-split"
                splitType="chars"
                delay={42}
                duration={1.05}
                effect="rise"
                trigger="load"
                textAlign="left"
                hoverEffect="lift"
              />
              <span className="hero-title-accent" ref={accentRef}>
                P
              </span>
            </span>
          </h1>

          <p className="hero-role">
            {profile.role.map((item, index) => (
              <span key={item} className="hero-role-item">
                {index > 0 ? <i className="sep" aria-hidden="true">/</i> : null}
                {item}
              </span>
            ))}
          </p>

          <p className="hero-lead">
            {profile.tagline} Currently hunting bugs, competing in CTFs and building security-focused
            tools.
          </p>

          <div className="hero-actions">
            <Magnet
              wrapperClassName="magnet"
              innerClassName="magnet-inner"
              padding={70}
              magnetStrength={16}
              maxOffset={9}
            >
              <a className="btn btn--primary" href="#research">
                View research
                <Icon name="arrowRight" size={16} />
              </a>
            </Magnet>

            <Magnet
              wrapperClassName="magnet"
              innerClassName="magnet-inner"
              padding={70}
              magnetStrength={16}
              maxOffset={9}
            >
              <a className="btn btn--ghost" href="#contact">
                Get in touch
              </a>
            </Magnet>
          </div>

          <div className="hero-socials">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-panel" ref={panelRef}>
          <div className="terminal" ref={terminalRef}>
            <div className="terminal-bar">
              <span className="dot dot--red" />
              <span className="dot dot--yellow" />
              <span className="dot dot--green" />
              <p>kadar@kali: ~/recon</p>
            </div>
            <div className="terminal-body">
              <p>
                <span className="prompt">$</span> whoami
              </p>
              <p className="out">
                <DecryptedText
                  text="syed_abdul_kadar"
                  animateOn="view"
                  speed={32}
                  maxIterations={12}
                  sequential
                  characters={SCRAMBLE}
                  className="decrypted"
                />
              </p>

              <p>
                <span className="prompt">$</span> cat focus.txt
              </p>
              <p className="out">
                <DecryptedText
                  text="web app security · recon · vuln research"
                  animateOn="view"
                  speed={24}
                  maxIterations={8}
                  characters={SCRAMBLE}
                  className="decrypted"
                />
              </p>

              <p>
                <span className="prompt">$</span> ls ./findings
              </p>
              <p className="out">
                <span className="accent">carenium_kyc</span> &nbsp;dekco_pacs &nbsp;vibinex_sqli
              </p>

              <p>
                <span className="prompt">$</span> ./status --current
              </p>
              <p className="out">
                <span className="ok">[+]</span> 3 vulnerability reports filed
              </p>
              <p className="out">
                <span className="ok">[+]</span> 4 internships completed
              </p>
              <p className="out">
                <span className="ok">[+]</span> ready for offensive security work
              </p>

              <p className="terminal-caret">
                <span className="prompt">$</span> <span className="caret" />
              </p>
            </div>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <span className="stat-num">
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={1.8}
                    delay={0.15}
                    prefix="0"
                    trigger="view"
                    className="stat-count"
                  />
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <i />
      </div>
    </section>
  );
}
