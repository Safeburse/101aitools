/**
 * Generates public/sitemap.xml and refreshes public/robots.txt (Sitemap: line).
 * Set SITE_URL for production (e.g. https://101aitools.com).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildSlugMap } from "../src/lib/toolSlug.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const DEFAULT_SITE_URL = "https://101aitools.com";

const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const NS_IMAGE = "http://www.google.com/schemas/sitemap-image/1.1";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeOrigin(raw: string | undefined): string {
  const t = (raw || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
  if (!/^https:\/\//i.test(t)) {
    console.warn("generate-sitemap: SITE_URL should use https:// for production SEO. Using value as-is.");
  }
  return t;
}

type Entry = { path: string; changefreq: string; priority: string; image?: string };

function urlEl(base: string, entry: Entry, lastmod: string): string {
  const loc = escapeXml(`${base}${entry.path}`);
  let body = `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>`;
  if (entry.image && /^https:\/\//i.test(entry.image.trim())) {
    body += `
    <image:image>
      <image:loc>${escapeXml(entry.image.trim())}</image:loc>
    </image:image>`;
  }
  body += `
  </url>`;
  return body;
}

function main(): void {
  const base = normalizeOrigin(process.env.SITE_URL || process.env.VITE_SITE_URL);
  const lastmod = new Date().toISOString().slice(0, 10);

  const toolsPath = join(root, "src/data/tools-data.json");
  const tools = JSON.parse(readFileSync(toolsPath, "utf8")) as { id: number; name: string; image?: string }[];
  if (!Array.isArray(tools)) {
    throw new Error("tools-data.json must be an array");
  }

  const slugMap = buildSlugMap(tools.map((r) => ({ id: r.id, name: r.name })));

  const staticEntries: Entry[] = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/terms", changefreq: "yearly", priority: "0.4" },
    { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  ];

  const toolEntries: Entry[] = tools.map((row) => {
    const slug = slugMap.get(row.id);
    if (!slug) throw new Error(`Missing slug for tool id ${row.id}`);
    return {
      path: `/tool/${encodeURIComponent(slug)}`,
      changefreq: "weekly",
      priority: "0.8",
      image: typeof row.image === "string" ? row.image : "",
    };
  });

  const allEntries = [...staticEntries, ...toolEntries];

  const inner = allEntries.map((e) => urlEl(base, e, lastmod)).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="${NS}" xmlns:image="${NS_IMAGE}">
${inner}
</urlset>
`;

  writeFileSync(join(root, "public/sitemap.xml"), xml, "utf8");

  const robots = `User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

  writeFileSync(join(root, "public/robots.txt"), robots, "utf8");

  console.log(`generate-sitemap: wrote ${allEntries.length} URLs to public/sitemap.xml (base: ${base})`);
}

main();
