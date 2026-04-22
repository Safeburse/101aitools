import { useMemo, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Globe, Hash, Layers, Tag, Youtube } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ToolPageSeo } from "@/components/ToolPageSeo";
import { PricingBadge } from "@/components/PricingBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { categories, getToolById, getToolBySlug, normalizeToolUrl, type Tool } from "@/data/tools";
import { getYoutubeEmbedSrc } from "@/lib/youtube";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

function SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border/50 py-3 last:border-0 sm:grid-cols-[minmax(0,160px)_1fr] sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-sm text-foreground">{children}</dd>
    </div>
  );
}

const ToolDetailContent = ({ tool, canonicalUrl }: { tool: Tool; canonicalUrl: string }) => {
  const category = categories.find((c) => c.id === tool.categoryId)!;
  const CapIcon = category.icon;
  const embedSrc = useMemo(() => getYoutubeEmbedSrc(tool.youtubeId), [tool.youtubeId]);
  const outboundHref = normalizeToolUrl(tool.externalLink || tool.link).trim();
  const canOpenVendor = Boolean(outboundHref);

  return (
    <>
      <ToolPageSeo tool={tool} canonicalUrl={canonicalUrl} />
      <div className="min-h-screen bg-background">
        <SiteHeader />

        <div className="container py-8 md:py-12">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#categories">Directory</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[12rem] truncate sm:max-w-md">{tool.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <Button variant="ghost" size="sm" className="w-fit gap-2 pl-0 text-muted-foreground hover:text-foreground" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to directory
              </Link>
            </Button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                      category.accent
                    )}
                  >
                    <CapIcon className="h-5 w-5" aria-hidden />
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {tool._category_}
                  </Badge>
                  <PricingBadge pricing={tool.pricing} />
                  <Badge variant="secondary" className="font-medium">
                    {tool.pricingMode}
                  </Badge>
                  {tool.sponsored.trim() ? (
                    <Badge variant="default" className="font-medium">
                      Sponsored
                    </Badge>
                  ) : null}
                  {tool.secondaryc.trim() ? (
                    <Badge variant="outline" className="font-normal text-muted-foreground">
                      {tool.secondaryc}
                    </Badge>
                  ) : null}
                </div>

                <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {tool.name}
                </h1>
                <p className="text-lg text-muted-foreground">{tool.category}</p>
                <p className="max-w-3xl text-pretty text-base leading-relaxed text-foreground/90">{tool.description}</p>
              </div>

              <Card className="overflow-hidden border-border/80 shadow-sm">
                <CardHeader className="border-b border-border/60 bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="h-5 w-5 text-primary" />
                    Features &amp; details
                  </CardTitle>
                  <CardDescription>Full overview from our catalog (read-only reference).</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="px-6 py-2">
                    <SpecRow label="Category (short)">
                      <span>{tool._category_}</span>
                    </SpecRow>
                    <SpecRow label="Category">
                      <span>{tool.category}</span>
                    </SpecRow>
                    <SpecRow label="Pricing (CSV)">
                      <span>{tool.pricingMode}</span>
                    </SpecRow>
                    <SpecRow label="Directory pricing">
                      <PricingBadge pricing={tool.pricing} />
                    </SpecRow>
                    {tool.sponsored.trim() ? (
                      <SpecRow label="Sponsored note">
                        <span>{tool.sponsored}</span>
                      </SpecRow>
                    ) : null}
                  </div>
                </CardContent>
              </Card>

              {tool.features.trim() ? (
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Extended features</CardTitle>
                    <CardDescription>In-depth description and capability notes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[32rem] overflow-y-auto rounded-lg border border-border/60 bg-muted/20 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{tool.features}</p>
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              {tool.usecases.trim() ? (
                <Card className="border-border/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Tag className="h-5 w-5 text-primary" />
                      Use cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">{tool.usecases}</p>
                  </CardContent>
                </Card>
              ) : null}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {tool.image.trim() ? (
                <Card className="overflow-hidden border-border/80 shadow-sm">
                  <CardContent className="p-0">
                    <img
                      src={tool.image}
                      alt=""
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </CardContent>
                </Card>
              ) : null}

              {embedSrc ? (
                <Card className="overflow-hidden border-border/80 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Youtube className="h-5 w-5 text-red-600" />
                      Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        title={`${tool.name} — video`}
                        src={embedSrc}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : null}

              <Card className="border-border/80 bg-card/80 shadow-glow backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="h-5 w-5 text-primary" />
                    Visit this tool
                  </CardTitle>
                  <CardDescription>
                    The only outbound link on this page. Opens the vendor site in a new tab.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Separator />
                  {canOpenVendor ? (
                    <Button variant="glow" size="lg" className="h-12 w-full gap-2 text-base" asChild>
                      <a href={outboundHref} target="_blank" rel="noopener noreferrer">
                        Open official site
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="secondary" size="lg" className="h-12 w-full" disabled>
                      No vendor link on file
                    </Button>
                  )}
                  <p className="text-center text-xs text-muted-foreground">
                    Destination:{" "}
                    <span className="break-all font-mono text-[11px] text-foreground/80">
                      {canOpenVendor ? outboundHref : "—"}
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-dashed border-border/80">
                <CardContent className="flex items-start gap-3 pt-6">
                  <Hash className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    URLs above are shown for reference only and are not clickable, except the primary &quot;Open official
                    site&quot; button which uses the referral link when available.
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>

        <SiteFooter />
      </div>
    </>
  );
};

const ToolDetail = () => {
  const { slug: slugParam } = useParams();
  const raw = slugParam ? slugParam.trim() : "";

  if (/^\d+$/.test(raw)) {
    const id = Number(raw);
    if (Number.isInteger(id) && id > 0) {
      const byId = getToolById(id);
      if (byId) {
        return <Navigate to={`/tool/${encodeURIComponent(byId.slug)}`} replace />;
      }
    }
  }

  const tool = raw ? getToolBySlug(raw) : undefined;

  if (!tool) return <NotFound />;

  const canonicalUrl = `${window.location.origin}/tool/${encodeURIComponent(tool.slug)}`;

  return <ToolDetailContent tool={tool} canonicalUrl={canonicalUrl} />;
};

export default ToolDetail;
