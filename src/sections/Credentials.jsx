import SectionHeading from "../components/SectionHeading";
import { competitions, credentials } from "../data/content";

export default function Credentials() {
  return (
    <section className="section section--panel" id="credentials">
      <div className="container">
        <SectionHeading
          index="06"
          kicker="Credentials"
          lead="Formal training, certifications and competitive security events."
        >
          Certifications &amp; <em>competition</em>.
        </SectionHeading>

        <div className="credentials-grid" data-reveal-group>
          {credentials.map((item) => (
            <article className="credential" key={`${item.year}-${item.title}`} data-reveal-item>
              <span className="credential-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.issuer}</p>
              <span className="credential-tag">{item.tag}</span>
            </article>
          ))}
        </div>

        <div className="competitions">
          <h3 className="competitions-title" data-reveal>
            Competitions
          </h3>

          <div className="competition-grid" data-reveal-group>
            {competitions.map((item) => (
              <article className="competition" key={item.title} data-reveal-item>
                <span className="competition-badge">{item.badge}</span>
                <h4>{item.title}</h4>
                <p>{item.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
