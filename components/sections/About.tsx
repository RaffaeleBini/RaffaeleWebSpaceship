import Image from "next/image";
import styles from "./sections.module.css";
import type { AboutContent } from "@/lib/content";

interface AboutProps {
  content: AboutContent;
}

export default function About({ content }: AboutProps) {
  return (
    <div className={styles.about}>
      <div className={styles.aboutText}>
        <div className={styles.sectionTitle}>{content.title}</div>
        <div
          className={styles.aboutBody}
          dangerouslySetInnerHTML={{ __html: content.bodyHtml }}
        />
      </div>
      <div className={styles.aboutPortrait}>
        <Image
          src="/images/about-portrait.png"
          alt="Raffaele Bini"
          fill
          sizes="220px"
          priority
        />
        <div className={styles.aboutCornerTL} />
        <div className={styles.aboutCornerBR} />
      </div>
    </div>
  );
}
