import { useLayoutEffect } from "react";
import type { Tool } from "@/data/tools";

const SITE_TITLE = "101 AI Tools — The Professional Directory of the Best AI Tools";
const SITE_DESCRIPTION =
  "Browse 101 hand-picked AI tools by category. Compare free and paid AI tools for writing, image, video, code, marketing and more.";

const SEO_MARK = "data-101ai-tool-seo";

function getMetaContent(selector: string): string {
  return document.querySelector<HTMLMetaElement>(selector)?.getAttribute("content") ?? "";
}

function setMetaContent(selector: string, content: string) {
  document.querySelector<HTMLMetaElement>(selector)?.setAttribute("content", content);
}

function removeJsonLd() {
  document.querySelectorAll(`script[type="application/ld+json"][${SEO_MARK}="1"]`).forEach((n) => n.remove());
}

export const ToolPageSeo = ({ tool, canonicalUrl }: { tool: Tool; canonicalUrl: string }) => {
  useLayoutEffect(() => {
    const pageTitle = `${tool.name} — AI Tool Details | 101 AI Tools`;
    const description =
      tool.description.trim().slice(0, 160) || `${tool.name} — ${tool.category}. ${SITE_DESCRIPTION.slice(0, 120)}`;
    const image = tool.image?.trim() || "";

    const prev = {
      title: document.title,
      description: getMetaContent('meta[name="description"]'),
      ogType: getMetaContent('meta[property="og:type"]'),
      ogTitle: getMetaContent('meta[property="og:title"]'),
      ogDescription: getMetaContent('meta[property="og:description"]'),
      ogUrl: getMetaContent('meta[property="og:url"]'),
      ogImage: getMetaContent('meta[property="og:image"]'),
      twitterCard: getMetaContent('meta[name="twitter:card"]'),
      twitterTitle: getMetaContent('meta[name="twitter:title"]'),
      twitterDescription: getMetaContent('meta[name="twitter:description"]'),
      twitterImage: getMetaContent('meta[name="twitter:image"]'),
    };

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonicalLink?.getAttribute("href") ?? "";
    const createdCanonical = !canonicalLink;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute(SEO_MARK, "1");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    document.title = pageTitle;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:type"]', "article");
    setMetaContent('meta[property="og:title"]', pageTitle);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    if (image) setMetaContent('meta[property="og:image"]', image);
    setMetaContent('meta[name="twitter:card"]', image ? "summary_large_image" : "summary");
    setMetaContent('meta[name="twitter:title"]', pageTitle);
    setMetaContent('meta[name="twitter:description"]', description);
    if (image) setMetaContent('meta[name="twitter:image"]', image);

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
        url: tool.link,
      },
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(SEO_MARK, "1");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = prev.title;
      setMetaContent('meta[name="description"]', prev.description);
      setMetaContent('meta[property="og:type"]', prev.ogType);
      setMetaContent('meta[property="og:title"]', prev.ogTitle);
      setMetaContent('meta[property="og:description"]', prev.ogDescription);
      setMetaContent('meta[property="og:url"]', prev.ogUrl);
      setMetaContent('meta[property="og:image"]', prev.ogImage);
      setMetaContent('meta[name="twitter:card"]', prev.twitterCard);
      setMetaContent('meta[name="twitter:title"]', prev.twitterTitle);
      setMetaContent('meta[name="twitter:description"]', prev.twitterDescription);
      setMetaContent('meta[name="twitter:image"]', prev.twitterImage);

      if (createdCanonical && canonicalLink?.getAttribute(SEO_MARK) === "1") {
        canonicalLink.remove();
      } else if (canonicalLink) {
        canonicalLink.setAttribute("href", prevCanonical);
      }

      removeJsonLd();
    };
  }, [tool, canonicalUrl]);

  return null;
};
