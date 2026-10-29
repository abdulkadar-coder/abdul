import { useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/SectionHeading";
import SpotlightCard from "../reactbits/SpotlightCard";
import Icon from "../components/Icon";
import { filterOptions, projects } from "../data/content";

function ProjectCard({ project, order, filter }) {
  const isFeatured = Boolean(project.featured);
  const className = `project spotlight-project${isFeatured ? " project--featured" : ""}`;

  return (
    <SpotlightCard
      key={`${filter}-${project.id}`}
      className={className}
      spotlightColor="rgba(200, 255, 61, 0.2)"
      spotlightSize={isFeatured ? 380 : 260}
      intensity={0.16}
      borderGlow={0.45}
      softness={0.75}
      style={{ animationDelay: `${order * 55}ms` }}
    >
      <div className="project-top">
        <span className="project-index">
          {project.index}
          {isFeatured ? " / Featured" : ""}
        </span>
        {project.link ? (
          <div className="project-links">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
            >
              <Icon name="arrowUpRight" size={15} />
            </a>
          </div>
        ) : null}
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p className="project-sub">{project.subtitle}</p>
        {project.description.map((paragraph) => (
          <p key={paragraph.slice(0, 20)}>{paragraph}</p>
        ))}
      </div>

      {project.metrics ? (
        <ul className="project-metrics">
          {project.metrics.map((metric) => (
            <li key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="chips project-tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </SpotlightCard>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const visibleProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.categories.includes(filter));
  }, [filter]);

  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [filter]);

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          index="03"
          kicker="Selected work"
          lead="Security-first engineering, full-stack products and research labs."
          actions={
            <div className="filters" role="group" aria-label="Filter projects">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`filter${filter === option.value ? " is-active" : ""}`}
                  data-filter={option.value}
                  aria-pressed={filter === option.value}
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          }
        >
          Things I've <em>built</em>.
        </SectionHeading>

        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} order={index} filter={filter} />
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <p className="projects-empty">No projects in this category yet.</p>
        ) : null}
      </div>
    </section>
  );
}
