import type { CSSProperties } from "react";
import styles from "./hud.module.css";
import { PART_LABELS, SECTIONS, SHIP_ORIENT, type SectionId, type ShipPart } from "./sections";

interface ShipNavigatorProps {
  section: SectionId;
}

function partStyle(active: boolean): CSSProperties {
  return {
    fill: active ? "rgba(245,185,19,.30)" : "transparent",
    stroke: "var(--amber)",
    strokeWidth: active ? 1.6 : 0.9,
    strokeOpacity: active ? 1 : 0.32,
    filter: active ? "drop-shadow(0 0 7px rgba(245,185,19,.55))" : "none",
    transition: "all .5s cubic-bezier(.4,0,.2,1)",
  };
}

export default function ShipNavigator({ section }: ShipNavigatorProps) {
  const active = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];
  const part: ShipPart = active.part;

  const style = (p: ShipPart) => partStyle(p === part);

  return (
    <div>
      <div className={styles.sideHeader}>
        <span>SHIP NAVIGATOR</span>
        <span className={styles.amberText}>{active.num}/07</span>
      </div>

      <div className={styles.shipNavBox}>
        <div className={styles.shipNavGrid} />
        <svg
          viewBox="0 0 200 300"
          width="152"
          height="228"
          aria-hidden="true"
          className={styles.shipSvg}
          style={{ transform: SHIP_ORIENT[part] }}
        >
          {/* hull */}
          <polygon points="100,8 117,66 123,152 119,246 81,246 77,152 83,66" style={style("hull")} />
          <polygon points="83,66 117,66 119,112 81,112" style={style("hull")} />
          <polygon points="81,150 119,150 119,196 81,196" style={style("hull")} />
          {/* comms */}
          <rect x="86" y="16" width="3" height="30" style={style("comms")} />
          <rect x="111" y="16" width="3" height="30" style={style("comms")} />
          <polygon points="100,10 105,42 95,42" style={style("comms")} />
          <rect x="93" y="46" width="14" height="6" style={style("comms")} />
          {/* bridge */}
          <rect x="86" y="72" width="28" height="36" rx="6" style={style("bridge")} />
          <circle cx="100" cy="90" r="7" style={style("bridge")} />
          {/* labs */}
          <rect x="34" y="118" width="44" height="48" style={style("labs")} />
          <rect x="122" y="118" width="44" height="48" style={style("labs")} />
          <rect x="56" y="118" width="0.8" height="48" style={style("labs")} />
          <rect x="143" y="118" width="0.8" height="48" style={style("labs")} />
          <rect x="34" y="140" width="44" height="0.8" style={style("labs")} />
          <rect x="122" y="140" width="44" height="0.8" style={style("labs")} />
          {/* hold */}
          <circle cx="100" cy="174" r="15" style={style("hold")} />
          <rect x="91" y="192" width="18" height="26" style={style("hold")} />
          {/* reactors */}
          <rect x="42" y="196" width="34" height="42" style={style("reactors")} />
          <rect x="124" y="196" width="34" height="42" style={style("reactors")} />
          <rect x="48" y="238" width="9" height="15" style={style("reactors")} />
          <rect x="62" y="238" width="9" height="15" style={style("reactors")} />
          <rect x="129" y="238" width="9" height="15" style={style("reactors")} />
          <rect x="143" y="238" width="9" height="15" style={style("reactors")} />
          {/* quarters */}
          <rect x="80" y="250" width="40" height="34" style={style("quarters")} />
          <rect x="80" y="264" width="40" height="0.8" style={style("quarters")} />
          <rect x="88" y="284" width="24" height="8" style={style("quarters")} />
        </svg>
      </div>

      <div className={styles.shipNavLabel}>{PART_LABELS[part]}</div>
    </div>
  );
}
