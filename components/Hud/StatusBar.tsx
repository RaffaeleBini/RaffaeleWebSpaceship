"use client";

import { useEffect, useState } from "react";
import styles from "./hud.module.css";

type Theme = "dark" | "light";

interface StatusBarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function formatClock(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function StatusBar({ theme, onToggleTheme }: StatusBarProps) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    setClock(formatClock(new Date()));
    const id = setInterval(() => setClock(formatClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusLeft}>
        <span className={styles.amberText}>◤</span>
        <span>SYSTEM ONLINE</span>
        <span className={styles.blinkDot} />
      </div>

      <div className={styles.statusCenter}>RAFFAELE BINI · PORTFOLIO v2.0</div>

      <div className={styles.statusRight}>
        <span>MILANO · 45.46°N 9.19°E</span>
        <span className={styles.amberText}>{clock}</span>
        <span className={styles.langSwitch}>
          <span className={styles.langActive}>EN</span>
          <span>IT</span>
          <span>ES</span>
        </span>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>
      </div>
    </div>
  );
}
