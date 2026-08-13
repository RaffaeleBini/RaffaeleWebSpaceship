"use client";

import { useState, type FormEvent } from "react";
import styles from "./sections.module.css";

type FormState = "idle" | "sending" | "sent" | "error";

const CONSOLE_TEXT: Record<FormState, string> = {
  idle: "> channel idle",
  sending: "> encoding message...\n> routing via deep space net",
  sent: "> encoding message...\n> routing via deep space net\n> TRANSMISSION SENT",
  error: "> encoding message...\n> routing via deep space net\n> TRANSMISSION FAILED — check connection and retry",
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "New message from raffaelebini.com",
          name,
          email,
          message,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setFormState("sent");
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setFormState("idle"), 4000);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className={styles.contact}>
      <div className={styles.contactMain}>
        <div className={styles.sectionTitle}>OPEN CHANNEL</div>
        <p className={styles.contactIntro}>
          Tell me what the plant, the team or the product is struggling with. I answer within two
          working days.
        </p>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div>
            <label className={styles.contactLabel} htmlFor="contact-name">
              SENDER
            </label>
            <input
              id="contact-name"
              className={styles.contactInput}
              placeholder="name / company"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.contactLabel} htmlFor="contact-email">
              RETURN FREQUENCY
            </label>
            <input
              id="contact-email"
              type="email"
              className={styles.contactInput}
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className={styles.contactLabel} htmlFor="contact-message">
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              rows={3}
              className={styles.contactInput}
              placeholder="mission brief"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.contactSubmit} disabled={formState === "sending"}>
            <span>TRANSMIT</span>
            <span>↗</span>
          </button>
        </form>
      </div>

      <div>
        <div className={styles.contactLogLabel}>TRANSMISSION LOG</div>
        <div className={styles.contactConsole} aria-live="polite">
          {CONSOLE_TEXT[formState]}
          <span className={styles.contactCursor}>_</span>
        </div>

        <div className={styles.contactChannelsLabel}>DIRECT CHANNELS</div>
        <div className={styles.contactChannels}>
          <a href="https://www.linkedin.com/in/raffaelebini/" target="_blank" rel="noreferrer">
            LINKEDIN ↗
          </a>
          <a href="https://github.com/RaffaeleBini" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
        </div>
      </div>
    </div>
  );
}
