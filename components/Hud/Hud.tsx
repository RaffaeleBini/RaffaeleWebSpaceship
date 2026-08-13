"use client";

import { useEffect, useState } from "react";
import styles from "./hud.module.css";
import StatusBar from "./StatusBar";
import NavRail from "./NavRail";
import Viewport from "./Viewport";
import SidePanels from "./SidePanels";
import type { SectionId } from "./sections";

type Theme = "dark" | "light";

const PANEL_COUNT = 3;

export default function Hud() {
  const [section, setSection] = useState<SectionId>("home");
  const [theme, setTheme] = useState<Theme>("dark");
  const [panel, setPanel] = useState(0);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      return next;
    });
  }

  function prevPanel() {
    setPanel((p) => (p - 1 + PANEL_COUNT) % PANEL_COUNT);
  }

  function nextPanel() {
    setPanel((p) => (p + 1) % PANEL_COUNT);
  }

  return (
    <div className={styles.hud}>
      <div className={styles.background}>
        <div className={styles.planet} />
        <div className={styles.ringOuter} />
        <div className={styles.ringInner} />
        <div className={`${styles.meteor} ${styles.meteor1}`} />
        <div className={`${styles.meteor} ${styles.meteor2}`} />
        <div className={`${styles.meteor} ${styles.meteor3}`} />
        <div className={styles.veil} />
      </div>

      <StatusBar theme={theme} onToggleTheme={toggleTheme} />

      <div className={styles.main}>
        <NavRail section={section} onSelect={setSection} />
        <Viewport section={section} />
        <SidePanels section={section} panel={panel} onPrevPanel={prevPanel} onNextPanel={nextPanel} />
      </div>

      <div className={styles.footer}>
        <span>© 2026 RAFFAELE BINI</span>
        <span className={styles.footerLinks}>
          <a href="https://github.com/RaffaeleBini" target="_blank" rel="noreferrer">
            GITHUB
          </a>
          <a href="https://www.linkedin.com/in/raffaelebini/" target="_blank" rel="noreferrer">
            LINKEDIN
          </a>
        </span>
      </div>
    </div>
  );
}
