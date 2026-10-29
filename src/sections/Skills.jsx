import SectionHeading from "../components/SectionHeading";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <section className="section section--panel" id="skills">
      <div className="container">
        <SectionHeading
          index="02"
          kicker="Capabilities"
          lead="Grouped by what I do, not by buzzword count. Every tool here has been used on a lab, a CTF or a live assessment."
        >
          The toolkit I <em>actually</em> use.
        </SectionHeading>

        <div className="skills-grid" data-reveal-group>
          {skills.map((skill) => (
            <article className="skill-card" key={skill.index} data-reveal-item>
              <div className="skill-head">
                <span className="skill-index">{skill.index}</span>
                <h3>{skill.title}</h3>
              </div>
              <p>{skill.description}</p>
              <ul className="chips">
                {skill.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
