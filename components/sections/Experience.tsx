import styles from "./sections.module.css";
import type { ExperienceContent } from "@/lib/content";

interface ExperienceProps {
  content: ExperienceContent;
}

export default function Experience({ content }: ExperienceProps) {
  return (
    <div className={styles.experience}>
      <div className={styles.sectionTitle}>{content.title}</div>

      <div className={styles.timeline}>
        {content.entries.map((entry) => (
          <div key={`${entry.years}-${entry.role}`} className={styles.timelineRow}>
            <div className={styles.timelineYears}>{entry.years}</div>
            <div>
              <div className={styles.timelineRole}>{entry.role}</div>
              <div className={styles.timelineOrg}>{entry.org}</div>
              <div className={styles.timelineNote}>{entry.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
