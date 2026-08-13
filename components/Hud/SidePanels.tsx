import styles from "./hud.module.css";
import ShipNavigator from "./ShipNavigator";
import type { SectionId } from "./sections";

interface SidePanelsProps {
  section: SectionId;
  panel: number;
  onPrevPanel: () => void;
  onNextPanel: () => void;
}

const PANEL_TITLES = ["SUSTAINABILITY INDEX", "CREW & TRAINING", "CURRENT STACK"];

const LAST_ENTRIES = [
  { date: "2026.07.14", title: "Owly API v2" },
  { date: "2026.06.30", title: "CO₂ infographic" },
  { date: "2026.06.11", title: "Chef Hippo beta" },
];

export default function SidePanels({ section, panel, onPrevPanel, onNextPanel }: SidePanelsProps) {
  return (
    <div className={styles.sideCol}>
      <ShipNavigator section={section} />

      <div>
        <div className={`${styles.sideHeader} ${styles.panelHeader}`}>
          <span>{PANEL_TITLES[panel]}</span>
          <span className={styles.panelArrows}>
            <button type="button" className={styles.panelArrowBtn} onClick={onPrevPanel} aria-label="Previous panel">
              ‹
            </button>
            <button type="button" className={styles.panelArrowBtn} onClick={onNextPanel} aria-label="Next panel">
              ›
            </button>
          </span>
        </div>
        <div className={styles.panelBody}>Contenuto in arrivo — Blocco 3</div>
      </div>

      <div className={styles.lastEntries}>
        <div className={styles.sideHeader}>LAST ENTRIES</div>
        <div className={styles.lastEntriesList}>
          {LAST_ENTRIES.map((entry) => (
            <div key={entry.title}>
              {entry.date} <span className={styles.lastEntryTitle}>{entry.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
