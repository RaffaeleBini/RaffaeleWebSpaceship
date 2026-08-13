import styles from "./hud.module.css";

const ITEMS = [
  { value: "21", text: "DIGITALISATION PROJECTS DELIVERED" },
  { value: "+40%", text: "PRODUCTIVITY VIA LEAN MANUFACTURING" },
  { value: "165", text: "PEOPLE TRAINED ON DIGITAL TECHNOLOGIES" },
];

function TickerItems() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item.text}>
          <span className={styles.tickerValue}>{item.value}</span> {item.text}
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerTrack}>
        <TickerItems />
        <TickerItems />
      </div>
    </div>
  );
}
