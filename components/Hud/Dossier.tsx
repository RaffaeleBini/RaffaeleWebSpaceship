import styles from "./hud.module.css";
import type { Project } from "@/lib/content";

interface DossierProps {
  project: Project;
  onClose: () => void;
}

export default function Dossier({ project, onClose }: DossierProps) {
  return (
    <div className={styles.dossierOverlay}>
      <div className={styles.dossierScrim} onClick={onClose} />
      <div className={styles.dossierPanel}>
        <div className={styles.dossierCornerTL} />
        <div className={styles.dossierCornerBR} />

        <div className={styles.dossierHeader}>
          <div>
            <div className={styles.dossierCode}>PROJECT DOSSIER · {project.code}</div>
            <div className={styles.dossierTitle}>{project.title}</div>
          </div>
          <button type="button" className={styles.dossierClose} onClick={onClose}>
            CLOSE ✕
          </button>
        </div>

        <div className={styles.dossierImage}>
          <div
            className={styles.dossierImageInner}
            style={{ backgroundImage: `url('${project.image}')` }}
          />
        </div>

        <div className={styles.dossierBody}>
          <div
            className={styles.dossierBodyText}
            dangerouslySetInnerHTML={{ __html: project.bodyHtml }}
          />
          <div className={styles.dossierMeta}>
            <div>
              <div className={styles.dossierMetaLabel}>TECHNOLOGY</div>
              <div className={styles.dossierMetaValue}>
                {project.detailTech.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.dossierMetaLabel}>IMPACT DOMAIN</div>
              <div className={`${styles.dossierMetaValue} ${styles.amberText}`}>
                {project.detailImpact.map((i) => (
                  <div key={i}>{i}</div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.dossierMetaLabel}>STATUS</div>
              <div className={styles.dossierMetaValue}>{project.status}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
