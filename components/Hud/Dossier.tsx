"use client";

import { useEffect, useRef } from "react";
import styles from "./hud.module.css";
import type { Project } from "@/lib/content";

interface DossierProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Dossier({ project, onClose }: DossierProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <div className={styles.dossierOverlay}>
      <div className={styles.dossierScrim} onClick={onClose} />
      <div
        className={styles.dossierPanel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
      >
        <div className={styles.dossierCornerTL} />
        <div className={styles.dossierCornerBR} />

        <div className={styles.dossierHeader}>
          <div>
            <div className={styles.dossierCode}>PROJECT DOSSIER · {project.code}</div>
            <h2 id="dossier-title" className={styles.dossierTitle}>
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            ref={closeButtonRef}
            className={styles.dossierClose}
            onClick={onClose}
          >
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
