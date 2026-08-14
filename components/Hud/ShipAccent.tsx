import styles from "./hud.module.css";
import ShipSvg from "./ShipSvg";

export default function ShipAccent() {
  return (
    <div className={styles.shipAccent}>
      <ShipSvg activePart="bridge" width={110} height={165} />
    </div>
  );
}
