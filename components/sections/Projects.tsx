import styles from "./sections.module.css";
import type { Project } from "@/lib/content";

interface ProjectsProps {
  projects: Project[];
  onOpen: (slug: string) => void;
}

export default function Projects({ projects, onOpen }: ProjectsProps) {
  return (
    <div className={styles.projects}>
      <div className={styles.sectionTitle}>FLIGHT RECORD</div>
      <div className={styles.projectsSubtitle}>CLICK A PROJECT TO OPEN THE DOSSIER</div>

      <div className={styles.projectsList}>
        {projects.map((project) => (
          <button
            key={project.slug}
            type="button"
            className={styles.projectRow}
            onClick={() => onOpen(project.slug)}
          >
            <div className={styles.projectThumb}>
              <div
                className={styles.projectThumbImg}
                style={{ backgroundImage: `url('${project.image}')` }}
              />
            </div>
            <div className={styles.projectInfo}>
              <div className={styles.projectTitle}>{project.title}</div>
              <div className={styles.projectShort}>{project.short}</div>
              <div className={styles.projectMeta}>
                <span>{project.tech}</span>
                <span className={styles.amberText}>{project.impact}</span>
              </div>
            </div>
            <div className={styles.projectArrow}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}
