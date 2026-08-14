export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "contact"
  | "log";

export type ShipPart =
  | "bridge"
  | "quarters"
  | "reactors"
  | "labs"
  | "hull"
  | "comms"
  | "hold";

export interface SectionMeta {
  id: SectionId;
  num: string;
  label: string;
  meta: string;
  part: ShipPart;
}

export const SECTIONS: SectionMeta[] = [
  { id: "home", num: "01", label: "HOME", meta: "MAIN VIEWPORT", part: "bridge" },
  { id: "about", num: "02", label: "ABOUT", meta: "MISSION PROFILE", part: "quarters" },
  { id: "skills", num: "03", label: "SKILLS", meta: "SYSTEMS ONLINE", part: "reactors" },
  { id: "projects", num: "04", label: "PROJECTS", meta: "3 RECORDS", part: "labs" },
  { id: "experience", num: "05", label: "EXPERIENCE", meta: "18+ YEARS", part: "hull" },
  { id: "contact", num: "06", label: "CONTACT", meta: "CHANNEL OPEN", part: "comms" },
  { id: "log", num: "07", label: "LOG", meta: "3 ENTRIES", part: "hold" },
];

export const PART_LABELS: Record<ShipPart, string> = {
  bridge: "COMMAND BRIDGE · HOME",
  quarters: "CREW QUARTERS · ABOUT",
  reactors: "REACTORS · SKILLS",
  labs: "LAB MODULES · PROJECTS",
  hull: "HULL · EXPERIENCE",
  comms: "SENSOR ARRAY · CONTACT",
  hold: "CARGO HOLD · LOG",
};

export const SHIP_ORIENT: Record<ShipPart, string> = {
  bridge: "rotateX(52deg) rotateZ(0deg) scale(1.02)",
  quarters: "rotateX(-56deg) rotateZ(14deg) scale(1.04)",
  reactors: "rotateX(-48deg) rotateZ(-20deg) scale(1.05)",
  labs: "rotateX(64deg) rotateZ(-26deg) scale(1.03)",
  hull: "rotateX(34deg) rotateZ(8deg) scale(1)",
  comms: "rotateX(62deg) rotateZ(20deg) scale(1.06)",
  hold: "rotateX(46deg) rotateZ(30deg) scale(1.08)",
};

export interface TelemetryItem {
  key: string;
  value: string;
}

export const TELEMETRY: TelemetryItem[] = [
  { key: "PROJECTS DELIVERED", value: "21" },
  { key: "PEOPLE TRAINED", value: "165" },
  { key: "AVAILABILITY", value: "OPEN" },
];
