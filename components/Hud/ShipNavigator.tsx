import styles from "./hud.module.css";
import { SECTIONS, type SectionId } from "./sections";

interface ShipNavigatorProps {
  section: SectionId;
}

export default function ShipNavigator({ section }: ShipNavigatorProps) {
  const index = SECTIONS.findIndex((s) => s.id === section);
  const hint = `${SECTIONS[index]?.num ?? "01"}/${SECTIONS.length.toString().padStart(2, "0")}`;

  return (
    <div>
      <div className={styles.sideHeader}>
        <span>SHIP NAVIGATOR</span>
        <span className={styles.amberText}>{hint}</span>
      </div>
      <div className={styles.shipNavBox}>
        <div className={styles.shipNavGrid} />
        <span className={styles.shipNavPlaceholder}>—</span>
      </div>
      <div className={styles.shipNavLabel}>SHIP MODEL — BLOCCO 2</div>
    </div>
  );
}
