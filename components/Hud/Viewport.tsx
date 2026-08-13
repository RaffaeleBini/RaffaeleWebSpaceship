import styles from "./hud.module.css";
import Ticker from "./Ticker";
import { SECTIONS, type SectionId } from "./sections";

interface ViewportProps {
  section: SectionId;
}

export default function Viewport({ section }: ViewportProps) {
  const active = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];

  return (
    <div className={styles.viewportCol}>
      <div className={styles.viewportHeader}>
        <span>
          // {active.num}. {active.label}
        </span>
        <span>{active.meta}</span>
      </div>

      <div className={styles.viewportBody}>
        <p className={styles.viewportPlaceholder}>
          Sezione &ldquo;{active.label}&rdquo; in arrivo — Blocco 3.
        </p>
      </div>

      <Ticker />
    </div>
  );
}
