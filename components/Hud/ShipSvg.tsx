import type { CSSProperties } from "react";
import type { ShipPart } from "./sections";

interface ShipSvgProps {
  activePart: ShipPart;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
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

export default function ShipSvg({ activePart, width = 152, height = 228, className, style }: ShipSvgProps) {
  const s = (p: ShipPart) => partStyle(p === activePart);

  return (
    <svg
      viewBox="0 0 200 300"
      width={width}
      height={height}
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* hull */}
      <polygon points="100,8 117,66 123,152 119,246 81,246 77,152 83,66" style={s("hull")} />
      <polygon points="83,66 117,66 119,112 81,112" style={s("hull")} />
      <polygon points="81,150 119,150 119,196 81,196" style={s("hull")} />
      {/* comms */}
      <rect x="86" y="16" width="3" height="30" style={s("comms")} />
      <rect x="111" y="16" width="3" height="30" style={s("comms")} />
      <polygon points="100,10 105,42 95,42" style={s("comms")} />
      <rect x="93" y="46" width="14" height="6" style={s("comms")} />
      {/* bridge */}
      <rect x="86" y="72" width="28" height="36" rx="6" style={s("bridge")} />
      <circle cx="100" cy="90" r="7" style={s("bridge")} />
      {/* labs */}
      <rect x="34" y="118" width="44" height="48" style={s("labs")} />
      <rect x="122" y="118" width="44" height="48" style={s("labs")} />
      <rect x="56" y="118" width="0.8" height="48" style={s("labs")} />
      <rect x="143" y="118" width="0.8" height="48" style={s("labs")} />
      <rect x="34" y="140" width="44" height="0.8" style={s("labs")} />
      <rect x="122" y="140" width="44" height="0.8" style={s("labs")} />
      {/* hold */}
      <circle cx="100" cy="174" r="15" style={s("hold")} />
      <rect x="91" y="192" width="18" height="26" style={s("hold")} />
      {/* reactors */}
      <rect x="42" y="196" width="34" height="42" style={s("reactors")} />
      <rect x="124" y="196" width="34" height="42" style={s("reactors")} />
      <rect x="48" y="238" width="9" height="15" style={s("reactors")} />
      <rect x="62" y="238" width="9" height="15" style={s("reactors")} />
      <rect x="129" y="238" width="9" height="15" style={s("reactors")} />
      <rect x="143" y="238" width="9" height="15" style={s("reactors")} />
      {/* quarters */}
      <rect x="80" y="250" width="40" height="34" style={s("quarters")} />
      <rect x="80" y="264" width="40" height="0.8" style={s("quarters")} />
      <rect x="88" y="284" width="24" height="8" style={s("quarters")} />
    </svg>
  );
}
