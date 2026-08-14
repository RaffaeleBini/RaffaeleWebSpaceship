import styles from "./hud.module.css";
import ShipSvg from "./ShipSvg";
import { PART_LABELS, SECTIONS, SHIP_ORIENT, type SectionId, type ShipPart } from "./sections";

interface ShipNavigatorProps {
  section: SectionId;
}

export default function ShipNavigator({ section }: ShipNavigatorProps) {
  const active = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];
  const part: ShipPart = active.part;

  return (
    <div>
      <div className={styles.sideHeader}>
        <span>SHIP NAVIGATOR</span>
        <span className={styles.amberText}>{active.num}/07</span>
      </div>

      <div className={styles.shipNavBox}>
        <div className={styles.shipNavGrid} />
        <ShipSvg activePart={part} className={styles.shipSvg} style={{ transform: SHIP_ORIENT[part] }} />
      </div>

      <div className={styles.shipNavLabel}>{PART_LABELS[part]}</div>
    </div>
  );
}
