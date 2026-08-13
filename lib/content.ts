import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readMarkdown(locale: string, slug: string) {
  const file = path.join(CONTENT_DIR, locale, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  return matter(raw);
}

function renderMarkdown(markdown: string): string {
  return remark().use(html).processSync(markdown).toString();
}

export interface AboutContent {
  title: string;
  bodyHtml: string;
}

export function getAboutContent(locale = "en"): AboutContent {
  const { data, content } = readMarkdown(locale, "about");
  return {
    title: data.title as string,
    bodyHtml: renderMarkdown(content),
  };
}

export interface SkillItem {
  label: string;
  value: string;
}

export interface SkillsContent {
  title: string;
  items: SkillItem[];
  toolbox: string[];
}

export function getSkillsContent(locale = "en"): SkillsContent {
  const { data } = readMarkdown(locale, "skills");
  return {
    title: data.title as string,
    items: data.items as SkillItem[],
    toolbox: data.toolbox as string[],
  };
}

export interface ExperienceEntry {
  years: string;
  role: string;
  org: string;
  note: string;
}

export interface ExperienceContent {
  title: string;
  entries: ExperienceEntry[];
}

export function getExperienceContent(locale = "en"): ExperienceContent {
  const { data } = readMarkdown(locale, "experience");
  return {
    title: data.title as string,
    entries: data.entries as ExperienceEntry[],
  };
}

export interface PortfolioContent {
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
}

export function getPortfolioContent(locale = "en"): PortfolioContent {
  return {
    about: getAboutContent(locale),
    skills: getSkillsContent(locale),
    experience: getExperienceContent(locale),
  };
}
