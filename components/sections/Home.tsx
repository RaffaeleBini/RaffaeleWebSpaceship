import styles from "./sections.module.css";
import ShipAccent from "../Hud/ShipAccent";
import { TELEMETRY, type SectionId } from "../Hud/sections";

interface HomeProps {
  onNavigate: (id: SectionId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className={styles.home}>
      <ShipAccent />
      <div className={styles.homeKicker}>HELLO, I&apos;M</div>
      <div className={styles.homeName}>
        RAFFAELE
        <br />
        BINI
      </div>
      <div className={styles.homeClaim}>Engineering for a just and sustainable world.</div>
      <p className={styles.homeParagraph}>
        Human-centric digital transformation for industrial operations — 18+ years turning food
        manufacturing plants into places that run leaner and treat people better.
      </p>
      <div className={styles.homeCtaRow}>
        <button type="button" className={styles.homeCtaPrimary} onClick={() => onNavigate("contact")}>
          <span>REQUEST A BRIEFING</span>
          <span>→</span>
        </button>
        <button type="button" className={styles.homeCtaSecondary} onClick={() => onNavigate("projects")}>
          VIEW MY WORK
        </button>
      </div>

      <div className={styles.homeTelemetry}>
        <div className={styles.homeTelemetryLabel}>TELEMETRY</div>
        {TELEMETRY.map((t) => (
          <div key={t.key} className={styles.homeTelemetryRow}>
            <span>{t.key}</span>
            <span className={styles.amberText}>{t.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
