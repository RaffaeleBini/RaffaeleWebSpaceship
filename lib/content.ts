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

export interface Project {
  slug: string;
  code: string;
  title: string;
  short: string;
  tech: string;
  impact: string;
  status: string;
  image: string;
  detailTech: string[];
  detailImpact: string[];
  bodyHtml: string;
}

export function getProjectsContent(locale = "en"): Project[] {
  const dir = path.join(CONTENT_DIR, locale, "projects");
  const slugs = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const projects = slugs.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      code: data.code as string,
      title: data.title as string,
      short: data.short as string,
      tech: data.tech as string,
      impact: data.impact as string,
      status: data.status as string,
      image: data.image as string,
      detailTech: data.detailTech as string[],
      detailImpact: data.detailImpact as string[],
      bodyHtml: renderMarkdown(content),
    };
  });

  return projects.sort((a, b) => a.code.localeCompare(b.code));
}

export interface PortfolioContent {
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  projects: Project[];
}

export function getPortfolioContent(locale = "en"): PortfolioContent {
  return {
    about: getAboutContent(locale),
    skills: getSkillsContent(locale),
    experience: getExperienceContent(locale),
    projects: getProjectsContent(locale),
  };
}
