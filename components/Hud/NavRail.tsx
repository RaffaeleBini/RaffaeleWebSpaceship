"use client";

import Image from "next/image";
import styles from "./hud.module.css";
import { SECTIONS, type SectionId } from "./sections";

interface NavRailProps {
  section: SectionId;
  onSelect: (id: SectionId) => void;
}

const TELEMETRY = [
  { key: "PROJECTS DELIVERED", value: "21" },
  { key: "PEOPLE TRAINED", value: "165" },
  { key: "AVAILABILITY", value: "OPEN" },
];

export default function NavRail({ section, onSelect }: NavRailProps) {
  return (
    <div className={styles.navRail}>
      <div>
        <div className={styles.logoBadge}>
          <Image src="/images/logo.png" alt="Raffaele Bini" width={32} height={32} priority />
        </div>
        <div className={styles.identityName}>
          RAFFAELE
          <br />
          BINI
        </div>
        <div className={styles.identityRole}>
          STARSHIP COMMANDER
          <br />
          MECHANICAL ENGINEER
        </div>
      </div>

      <div>
        <div className={styles.railLabel}>NAVIGATION</div>
        <div className={styles.navList}>
          {SECTIONS.map((s) => {
            const active = s.id === section;
            return (
              <button
                key={s.id}
                type="button"
                className={styles.navItem}
                onClick={() => onSelect(s.id)}
              >
                <span
                  className={`${styles.navNum} ${active ? styles.navItemActive : ""}`}
                >
                  {s.num}
                </span>
                <span
                  className={`${styles.navText} ${active ? styles.navItemActive : ""}`}
                >
                  {s.label}
                </span>
                <span
                  className={`${styles.navLine} ${active ? styles.navLineActive : ""}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.telemetry}>
        <div className={styles.railLabel}>TELEMETRY</div>
        {TELEMETRY.map((t) => (
          <div key={t.key} className={styles.telemetryRow}>
            <span>{t.key}</span>
            <span className={styles.telemetryValue}>{t.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
