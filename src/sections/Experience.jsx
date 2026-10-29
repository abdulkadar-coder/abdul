import SectionHeading from "../components/SectionHeading";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading
          index="05"
          kicker="Experience"
          lead="Internships and programs where the theory turned into lab time, reports and triage feedback."
        >
          Where I've <em>learned</em>.
        </SectionHeading>

        <ol className="timeline" data-reveal-group>
          {experience.map((item) => (
            <li className="timeline-item" key={`${item.org}-${item.role}`} data-reveal-item>
              <div className="timeline-marker" aria-hidden="true" />

              <div className="timeline-meta">
                <span className="timeline-period">{item.period}</span>
                <span className="timeline-type">{item.type}</span>
              </div>

              <div className="timeline-body">
                <h3>{item.role}</h3>
                <p className="timeline-org">{item.org}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
