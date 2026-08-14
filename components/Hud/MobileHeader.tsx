"use client";

import Image from "next/image";
import styles from "./hud.module.css";
import { SECTIONS, type SectionId } from "./sections";

interface MobileHeaderProps {
  section: SectionId;
  onSelect: (id: SectionId) => void;
  ariaHidden?: boolean;
}

export default function MobileHeader({ section, onSelect, ariaHidden }: MobileHeaderProps) {
  return (
    <div className={styles.mobileHeader} aria-hidden={ariaHidden || undefined}>
      <div className={styles.mobileIdentity}>
        <div className={styles.mobileLogoBadge}>
          <Image src="/images/logo.png" alt="Raffaele Bini" width={24} height={24} priority />
        </div>
        <div>
          <div className={styles.mobileName}>RAFFAELE BINI</div>
          <div className={styles.mobileRole}>STARSHIP COMMANDER</div>
        </div>
      </div>

      <nav className={styles.mobileNavList}>
        {SECTIONS.map((s) => {
          const active = s.id === section;
          return (
            <button
              key={s.id}
              type="button"
              className={`${styles.mobileNavItem} ${active ? styles.mobileNavItemActive : ""}`}
              onClick={() => onSelect(s.id)}
            >
              <span className={styles.navNum}>{s.num}</span>
              <span className={styles.navText}>{s.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
