import styles from "./hud.module.css";
import Ticker from "./Ticker";
import { SECTIONS, type SectionId } from "./sections";
import Home from "../sections/Home";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Projects from "../sections/Projects";
import type { PortfolioContent } from "@/lib/content";

interface ViewportProps {
  section: SectionId;
  content: PortfolioContent;
  onNavigate: (id: SectionId) => void;
  onOpenDossier: (slug: string) => void;
}

const PLACEHOLDER_BLOCK: Partial<Record<SectionId, string>> = {
  contact: "Blocco 5",
  log: "fase 2",
};

export default function Viewport({ section, content, onNavigate, onOpenDossier }: ViewportProps) {
  const active = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];

  return (
    <div className={styles.viewportCol}>
      <div className={styles.viewportHeader}>
        <span>
          // {active.num}. {active.label}
        </span>
        <span>{active.meta}</span>
      </div>

      <div className={styles.viewportBody}>
        {section === "home" && <Home onNavigate={onNavigate} />}
        {section === "about" && <About content={content.about} />}
        {section === "skills" && <Skills content={content.skills} />}
        {section === "experience" && <Experience content={content.experience} />}
        {section === "projects" && (
          <Projects projects={content.projects} onOpen={onOpenDossier} />
        )}
        {PLACEHOLDER_BLOCK[section] && (
          <p className={styles.viewportPlaceholder}>
            Sezione &ldquo;{active.label}&rdquo; in arrivo — {PLACEHOLDER_BLOCK[section]}.
          </p>
        )}
      </div>

      <Ticker />
    </div>
  );
}
