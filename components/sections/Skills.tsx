import styles from "./sections.module.css";
import type { SkillsContent } from "@/lib/content";

interface SkillsProps {
  content: SkillsContent;
}

export default function Skills({ content }: SkillsProps) {
  return (
    <div className={styles.skills}>
      <div className={styles.sectionTitle}>{content.title}</div>

      <div className={styles.skillsList}>
        {content.items.map((skill) => (
          <div key={skill.label}>
            <div className={styles.skillHeader}>
              <span>{skill.label}</span>
              <span className={styles.skillValue}>{skill.value}</span>
            </div>
            <div className={styles.skillTrack}>
              <div className={styles.skillFill} style={{ width: skill.value }} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.toolboxLabel}>TOOLBOX</div>
      <div className={styles.toolboxList}>
        {content.toolbox.map((tool) => (
          <span key={tool} className={styles.toolboxChip}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
