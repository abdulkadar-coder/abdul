import { useEffect, useRef, useState } from "react";
import SpotlightCard from "../reactbits/SpotlightCard";
import Magnet from "../reactbits/Magnet";
import Icon from "../components/Icon";
import { profile } from "../data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const copyEmail = async () => {
    const email = profile.email;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }

    setCopied(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SpotlightCard
          className="contact-panel"
          spotlightColor="rgba(200, 255, 61, 0.18)"
          spotlightSize={420}
          intensity={0.2}
          borderGlow={0.55}
          softness={0.8}
          data-reveal
        >
          <div className="contact-inner">
            <p className="eyebrow">
              <span>07</span>
              Contact
            </p>

            <div className="heading-mask" data-heading>
              <h2 className="contact-title">
                Let's find what's
                <br />
                <em>breakable</em>.
              </h2>
            </div>

            <p className="contact-lead">
              Open to junior penetration testing and application security roles, internships and
              research collaborations. I usually reply within a day.
            </p>

            <div className="contact-actions">
              <Magnet
                wrapperClassName="magnet"
                innerClassName="magnet-inner"
                padding={70}
                magnetStrength={18}
                maxOffset={8}
              >
                <a
                  className="btn btn--primary btn--lg"
                  href={`mailto:${profile.email}?subject=Security%20role%20%2F%20collaboration`}
                >
                  {profile.email}
                  <Icon name="arrowRight" size={16} />
                </a>
              </Magnet>

              <Magnet
                wrapperClassName="magnet"
                innerClassName="magnet-inner"
                padding={70}
                magnetStrength={18}
                maxOffset={8}
              >
                <button
                  type="button"
                  className={`btn btn--ghost btn--lg copy-email${copied ? " is-copied" : ""}`}
                  onClick={copyEmail}
                  aria-live="polite"
                >
                  <Icon name={copied ? "check" : "copy"} size={16} />
                  <span>{copied ? "Copied to clipboard" : "Copy email"}</span>
                </button>
              </Magnet>
            </div>

            <div className="contact-links">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{social.label}</span>
                  <Icon name="arrowUpRight" size={13} />
                </a>
              ))}
              <a href={`tel:${profile.phoneHref}`}>
                <span>{profile.phone}</span>
                <Icon name="arrowUpRight" size={13} />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
