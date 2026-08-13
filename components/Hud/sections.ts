export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact"
  | "log";

export interface SectionMeta {
  id: SectionId;
  num: string;
  label: string;
  meta: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "home", num: "01", label: "HOME", meta: "MAIN VIEWPORT" },
  { id: "about", num: "02", label: "ABOUT", meta: "MISSION PROFILE" },
  { id: "skills", num: "03", label: "SKILLS", meta: "SYSTEMS ONLINE" },
  { id: "projects", num: "04", label: "PROJECTS", meta: "3 RECORDS" },
  { id: "experience", num: "05", label: "EXPERIENCE", meta: "18+ YEARS" },
  { id: "contact", num: "06", label: "CONTACT", meta: "CHANNEL OPEN" },
  { id: "log", num: "07", label: "LOG", meta: "3 ENTRIES" },
];
