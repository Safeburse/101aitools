import ToolDetailView from "@/components/pages/ToolDetailView";
import { getToolById, getToolBySlug, getAllToolSlugs } from "@/data/tools-db";
import { normalizeToolUrl } from "@/data/tools";
import type { Tool } from "@/data/tools";
import { getSiteOrigin } from "@/lib/site";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

const SITE_DESC =
  "Browse 101 hand-picked AI tools by category. Compare free and paid AI tools for writing, image, video, code, marketing and more.";

function buildMetadata(tool: Tool): Metadata {
  const description = tool.description.trim().slice(0, 160) || `${tool.name} — ${tool.category}. ${SITE_DESC.slice(0, 120)}`;
  const origin = getSiteOrigin();
  const path = `/tool/${encodeURIComponent(tool.slug)}`;
  const image = tool.image?.trim();
  return {
    title: `${tool.name} — AI Tool Details`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${tool.name} — AI Tool Details | 101 AI Tools`,
      description,
      url: `${origin}${path}`,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${tool.name} — AI Tool Details | 101 AI Tools`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllToolSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug: raw } = await props.params;
  const key = decodeURIComponent(raw).trim().toLowerCase();
  if (/^\d+$/.test(key)) {
    const id = Number(key);
    const t = Number.isInteger(id) && id > 0 ? await getToolById(id) : null;
    if (t) return buildMetadata(t);
  }
  const tool = await getToolBySlug(key);
  if (!tool) return { title: "Not found" };
  return buildMetadata(tool);
}

export default async function ToolPage(props: { params: Promise<{ slug: string }> }) {
  const { slug: raw } = await props.params;
  const key = decodeURIComponent(raw).trim();
  if (/^\d+$/.test(key)) {
    const id = Number(key);
    const t = Number.isInteger(id) && id > 0 ? await getToolById(id) : null;
    if (t) permanentRedirect(`/tool/${encodeURIComponent(t.slug)}`);
  }
  const tool = await getToolBySlug(key);
  if (!tool) notFound();

  const origin = getSiteOrigin();
  const canonicalUrl = `${origin}/tool/${encodeURIComponent(tool.slug)}`;
  const image = tool.image?.trim();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.name,
    description: tool.description,
    url: canonicalUrl,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.description,
      applicationCategory: tool.category,
      image: image || undefined,
      url: normalizeToolUrl(tool.externalLink || tool.link),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ToolDetailView tool={tool} />
    </>
  );
}
