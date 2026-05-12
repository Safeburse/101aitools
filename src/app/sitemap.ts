import type { MetadataRoute } from "next";
import { getAllToolSlugs } from "@/data/tools-db";
import { getSiteOrigin } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteOrigin();
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];

  const slugs = await getAllToolSlugs();
  for (const slug of slugs) {
    routes.push({
      url: `${base}/tool/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  return routes;
}
