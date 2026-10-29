import SectionHeading from "../components/SectionHeading";
import SpotlightCard from "../reactbits/SpotlightCard";
import Icon from "../components/Icon";
import { aboutFacts, aboutParagraphs, profile } from "../data/content";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading index="01" kicker="About me">
          Curious by default.
          <br />
          <em>Methodical</em> by training.
        </SectionHeading>

        <div className="about-grid">
          <div className="about-copy">
            <p className="lead" data-reveal>
              {profile.summary}
            </p>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} data-reveal>
                {paragraph}
              </p>
            ))}

            <ul className="about-facts" data-reveal-group>
              {aboutFacts.map((fact) => (
                <li key={fact.label} data-reveal-item>
                  <span className="fact-label">{fact.label}</span>
                  <span className={fact.accent ? "fact-status" : undefined}>{fact.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <SpotlightCard
            className="about-card"
            spotlightColor="rgba(200, 255, 61, 0.22)"
            intensity={0.22}
            spotlightSize={280}
            data-reveal
          >
            <div className="about-card-top">
              <div className="avatar" aria-hidden="true">
                SAK
              </div>
              <div>
                <p className="about-name">{profile.name}</p>
                <p className="about-role">Security researcher</p>
              </div>
            </div>

            <div className="about-meta">
              <div>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div>
                <span>Phone</span>
                <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
              </div>
              <div>
                <span>Profiles</span>
                <p className="about-links">
                  <a href={profile.socials[0].href} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                  <a href={profile.socials[2].href} target="_blank" rel="noopener noreferrer">
                    THM ↗
                  </a>
                </p>
              </div>
            </div>

            <a className="about-resume" href={profile.resume} target="_blank" rel="noopener">
              <Icon name="download" size={15} />
              Download resume
              <span>PDF</span>
            </a>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
