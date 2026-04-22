import {
  PenLine, Image as ImageIcon, Video, Code2, MessageSquare, Mic2,
  LineChart, Briefcase, Palette, GraduationCap, Search, Music2,
  type LucideIcon,
} from "lucide-react";
import { buildSlugMap } from "@/lib/toolSlug";
import toolsDataRaw from "./tools-data.json";

export type Pricing = "Free" | "Freemium" | "Paid";

/** Values from CSV `pricingMode` column. */
export type PricingMode = "Free Trial" | "Paid Service";

export interface Tool {
  id: number;
  name: string;
  _category_: string;
  category: string;
  secondaryc: string;
  link: string;
  externalLink: string;
  image: string;
  youtubeId: string;
  description: string;
  pricingMode: PricingMode;
  features: string;
  usecases: string;
  sponsored: string;
  /** Derived from CSV `_category_` for filters and category pills. */
  categoryId: CategoryId;
  /** All capabilities this tool covers. If omitted, defaults to [categoryId]. */
  capabilities?: CategoryId[];
  /** Derived for existing free / paid filter UI. */
  pricing: Pricing;
  url: string;
  /** Canonical path segment for /tool/:slug */
  slug: string;
}

type CsvRow = {
  id: number;
  name: string;
  _category_: string;
  category: string;
  secondaryc: string;
  link: string;
  externalLink: string;
  image: string;
  youtubeId: string;
  description: string;
  pricingMode: string;
  features: string;
  usecases: string;
  sponsored: string;
};

export type CategoryId =
  | "writing"
  | "image"
  | "video"
  | "code"
  | "chatbot"
  | "audio"
  | "marketing"
  | "productivity"
  | "design"
  | "education"
  | "research"
  | "music";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const categories: Category[] = [
  { id: "chatbot",      name: "AI Chatbots",      description: "Conversational AI assistants", icon: MessageSquare, accent: "from-neutral-900 to-neutral-700" },
  { id: "writing",      name: "Writing & Copy",   description: "Content, copy & long-form",    icon: PenLine,       accent: "from-neutral-900 to-neutral-700" },
  { id: "image",        name: "Image Generation", description: "Create art & visuals",         icon: ImageIcon,     accent: "from-neutral-900 to-neutral-700" },
  { id: "video",        name: "Video & Avatars",  description: "Generate and edit video",      icon: Video,         accent: "from-neutral-900 to-neutral-700" },
  { id: "code",         name: "Code & Dev",       description: "AI pair programmers",          icon: Code2,         accent: "from-neutral-900 to-neutral-700" },
  { id: "audio",        name: "Voice & Audio",    description: "TTS, dubbing, transcription",  icon: Mic2,          accent: "from-neutral-900 to-neutral-700" },
  { id: "music",        name: "Music",            description: "Compose and produce",          icon: Music2,        accent: "from-neutral-900 to-neutral-700" },
  { id: "marketing",    name: "Marketing & Sales",description: "SEO, ads, social & sales",     icon: LineChart,     accent: "from-neutral-900 to-neutral-700" },
  { id: "productivity", name: "Productivity",     description: "Notes, meetings, automation",  icon: Briefcase,     accent: "from-neutral-900 to-neutral-700" },
  { id: "design",       name: "Design & UI",      description: "UI, mockups & creativity",     icon: Palette,       accent: "from-neutral-900 to-neutral-700" },
  { id: "education",    name: "Education",        description: "Learning & tutoring",          icon: GraduationCap, accent: "from-neutral-900 to-neutral-700" },
  { id: "research",     name: "Research & Search",description: "Search, summarize, analyze",   icon: Search,        accent: "from-neutral-900 to-neutral-700" },
];

/** Maps CSV `_category_` to app `CategoryId` for filtering. */
const csvCategoryToCategoryId: Record<string, CategoryId> = {
  "3D": "design",
  Art: "image",
  "Audio Editing": "audio",
  Avatars: "video",
  Code: "code",
  "Code Assistant": "code",
  Copywriting: "writing",
  "Customer Support": "chatbot",
  "Design Assistant": "design",
  "Education Assistant": "education",
  "General Writing": "writing",
  Healthcare: "research",
  "Human Resources": "productivity",
  "Image Editing": "image",
  "Image Generator": "image",
  "Legal Assistant": "research",
  "Life Assistant": "productivity",
  "Logo Generator": "design",
  "Low-code/no-code": "code",
  Marketing: "marketing",
  Memory: "productivity",
  Music: "music",
  Paraphraser: "writing",
  "Personalized Videos": "video",
  Productivity: "productivity",
  "Real Estate": "marketing",
  Research: "research",
  SEO: "marketing",
  Sales: "marketing",
  "Search Engine": "research",
  "Social Media Assistant": "marketing",
  Startup: "productivity",
  "Story Teller": "writing",
  Summarizer: "research",
  "Text To Speech": "audio",
  Transcriber: "audio",
  "Video Editing": "video",
  "Video Generator": "video",
  "Video Planner": "video",
  "Voice To Text": "audio",
  "mage Editing": "image",
};

/** Normalize vendor URLs (add https when missing). */
export const normalizeToolUrl = (link: string): string => {
  const t = link.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
};

const csvPricingToApp = (raw: string): { pricing: Pricing; pricingMode: PricingMode } => {
  const pm = raw.trim();
  if (pm === "Paid Service") return { pricing: "Paid", pricingMode: "Paid Service" };
  return { pricing: "Freemium", pricingMode: "Free Trial" };
};

const toolsData = toolsDataRaw as CsvRow[];

const toolSlugMap = buildSlugMap(toolsData.map((r) => ({ id: r.id, name: r.name })));

export const tools: Tool[] = toolsData.map((row) => {
  const link = normalizeToolUrl(row.link);
  const { pricing, pricingMode } = csvPricingToApp(row.pricingMode);
  const categoryId = csvCategoryToCategoryId[row._category_] ?? "productivity";
  const slug = toolSlugMap.get(row.id);
  if (!slug) throw new Error(`Missing slug for tool id ${row.id}`);
  return {
    id: row.id,
    name: row.name,
    _category_: row._category_,
    category: row.category,
    secondaryc: row.secondaryc,
    link,
    externalLink: row.externalLink?.trim() || link,
    image: row.image,
    youtubeId: row.youtubeId,
    description: row.description,
    pricingMode,
    features: row.features,
    usecases: row.usecases,
    sponsored: row.sponsored,
    categoryId,
    pricing,
    url: link,
    slug,
  };
});

export const TOTAL_TOOLS = tools.length;

export function getToolById(id: number): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function getToolBySlug(param: string): Tool | undefined {
  const key = decodeURIComponent(param).trim().toLowerCase();
  if (!key) return undefined;
  return tools.find((t) => t.slug === key);
}
