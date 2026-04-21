import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Search, Sparkles, LayoutGrid, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CategoryPill } from "@/components/CategoryPill";
import { ToolCard } from "@/components/ToolCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { categories, tools, type CategoryId, type Pricing } from "@/data/tools";

type Filter = "all" | "free" | "paid";

const DIRECTORY_FILTERS_ID = "directory-filters";
const DIRECTORY_GRID_ID = "directory-grid";
const PAGE_SIZE = 50;
const SUBMIT_TOOL_MAILTO = `mailto:support@101aitools.com?subject=${encodeURIComponent("Name of your AI tools")}`;
const PARTNER_WITH_US_MAILTO = `mailto:support@101aitools.com?subject=${encodeURIComponent("Partner with us")}`;  

const filterFromSearchParams = (params: URLSearchParams): Filter => {
  const p = params.get("pricing");
  if (p === "free") return "free";
  if (p === "paid") return "paid";
  return "all";
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pricingSectionRef = useRef<HTMLElement>(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [filter, setFilter] = useState<Filter>(() => filterFromSearchParams(searchParams));
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilter(filterFromSearchParams(searchParams));
  }, [searchParams]);

  useEffect(() => {
    const pricing = searchParams.get("pricing");
    const shouldScroll =
      pricing === "free" ||
      pricing === "paid" ||
      location.hash === `#${DIRECTORY_FILTERS_ID}`;
    if (!shouldScroll) return;

    const run = () =>
      pricingSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(run);
    });
    return () => window.cancelAnimationFrame(id);
  }, [searchParams, location.hash, location.pathname]);

  useEffect(() => {
    setPage(1);
  }, [query, activeCategory, filter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      if (activeCategory !== "all" && t.categoryId !== activeCategory) return false;
      if (filter === "free" && !(t.pricing === "Free" || t.pricing === "Freemium")) return false;
      if (filter === "paid" && !(t.pricing === "Paid" || t.pricing === "Freemium")) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory, filter]);

  const totalPages = useMemo(() => {
    if (filtered.length === 0) return 0;
    return Math.ceil(filtered.length / PAGE_SIZE);
  }, [filtered.length]);

  useEffect(() => {
    if (totalPages === 0) return;
    setPage((p) => Math.min(Math.max(1, p), totalPages));
  }, [totalPages]);

  const paginatedTools = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const scrollToGrid = () => {
    document.getElementById(DIRECTORY_GRID_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToPage = (next: number) => {
    setPage(next);
    window.requestAnimationFrame(() => scrollToGrid());
  };

  const counts = useMemo(() => {
    const map = new Map<CategoryId, number>();
    for (const t of tools) map.set(t.categoryId, (map.get(t.categoryId) ?? 0) + 1);
    return map;
  }, []);

  const pricingCounts = useMemo(() => {
    const c = { Free: 0, Freemium: 0, Paid: 0 } as Record<Pricing, number>;
    for (const t of tools) c[t.pricing]++;
    return c;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-80" />
        <div className="absolute inset-x-0 -top-40 -z-10 mx-auto h-[40rem] max-w-5xl bg-gradient-primary opacity-[0.08] blur-3xl" />

        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur animate-fade-up">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              The curated directory of {tools.length} AI tools
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl animate-fade-up [animation-delay:80ms]">
              Discover the best{" "}
              <span className="text-gradient">AI tools</span>{" "}
              for every workflow
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-muted-foreground animate-fade-up [animation-delay:160ms]">
              Browse 101 hand-picked AI tools by category, compare free and paid options, and find the right fit for your team — all in one professional directory.
            </p>

            {/* Search */}
            <div className="mx-auto mt-8 max-w-xl animate-fade-up [animation-delay:240ms]">
              <div className="group relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search 101 AI tools — e.g. ChatGPT, video, marketing…"
                  className="h-14 rounded-2xl border-border bg-card/80 pl-12 pr-4 text-base shadow-soft backdrop-blur focus-visible:ring-primary"
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Popular:</span>
                {["ChatGPT", "Midjourney", "Runway", "Cursor", "Notion AI"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="rounded-full border border-border bg-card px-2.5 py-1 transition-smooth hover:border-primary/40 hover:text-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            {/* <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 animate-fade-up [animation-delay:320ms]">
              {[
                { label: "AI Tools", value: tools.length },
                { label: "Categories", value: categories.length },
                { label: "Free options", value: pricingCounts.Free + pricingCounts.Freemium },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card/60 px-4 py-4 backdrop-blur">
                  <p className="text-2xl font-bold tracking-tight text-gradient">{s.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section id="categories" className="container pb-16">
        {/* Pricing tabs — scroll target for header “Free / Paid Tools” */}
        <section
          ref={pricingSectionRef}
          id={DIRECTORY_FILTERS_ID}
          className="scroll-mt-24 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 p-2 backdrop-blur md:flex-row md:gap-0"
          aria-label="Pricing filters"
        >
          <div className="flex w-full gap-1 md:w-auto" role="tablist">
            {([
              { id: "all", label: "All", count: tools.length },
              { id: "free", label: "Free & Freemium", count: pricingCounts.Free + pricingCounts.Freemium },
              { id: "paid", label: "Paid", count: pricingCounts.Paid + pricingCounts.Freemium },
            ] as { id: Filter; label: string; count: number }[]).map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`flex-1 md:flex-none rounded-xl px-4 py-2 text-sm font-semibold transition-smooth ${
                  filter === t.id
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
                <span className="ml-2 text-xs opacity-80">{t.count}</span>
              </button>
            ))}
          </div>
          <p className="px-3 text-center text-xs text-muted-foreground md:text-left">
            <span className="font-semibold text-foreground">{filtered.length}</span> match{filtered.length === 1 ? "" : "es"}{" "}
            · {tools.length} total
            {filtered.length > 0 && totalPages > 1 ? (
              <>
                {" "}
                · Page <span className="font-semibold text-foreground">{page}</span> of {totalPages}
              </>
            ) : null}
          </p>
        </section>

        {/* Category pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          <CategoryPill
            category={{ id: "all", name: "All categories", icon: LayoutGrid, accent: "" }}
            count={tools.length}
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c.id}
              category={c}
              count={counts.get(c.id) ?? 0}
              active={activeCategory === c.id}
              onClick={() => setActiveCategory(c.id)}
            />
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-lg font-semibold">No tools match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try clearing your search or selecting another category.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
                setFilter("all");
                setPage(1);
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm text-muted-foreground">
              Displaying{" "}
              <span className="font-medium text-foreground">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium text-foreground">{filtered.length}</span> results
            </p>
            <div
              id={DIRECTORY_GRID_ID}
              className="scroll-mt-24 mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {paginatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
            {totalPages > 1 ? (
              <Pagination className="mt-10">
                <PaginationContent className="flex-wrap justify-center gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href={`#${DIRECTORY_GRID_ID}`}
                      className={cn(page <= 1 && "pointer-events-none opacity-40")}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) goToPage(page - 1);
                      }}
                    />
                  </PaginationItem>
                  {totalPages <= 12
                    ? Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <PaginationItem key={n}>
                          <PaginationLink
                            href={`#${DIRECTORY_GRID_ID}`}
                            size="icon"
                            isActive={page === n}
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(n);
                            }}
                          >
                            {n}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    : (
                        <PaginationItem className="min-w-[7rem] justify-center">
                          <span className="px-2 text-sm text-muted-foreground">
                            Page {page} / {totalPages}
                          </span>
                        </PaginationItem>
                      )}
                  <PaginationItem>
                    <PaginationNext
                      href={`#${DIRECTORY_GRID_ID}`}
                      className={cn(page >= totalPages && "pointer-events-none opacity-40")}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) goToPage(page + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : null}
          </>
        )}
      </section>

      {/* CTA */}
      <section id="about" className="container pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 text-primary-foreground shadow-glow md:p-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-accent/40 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built something with AI? Get listed.</h2>
            <p className="mt-3 text-base text-primary-foreground/85">
              Submit your AI tool and reach thousands of professionals, founders and teams looking for the next product to add to their stack.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="glow" size="lg" className="text-foreground" asChild>
                <a href={SUBMIT_TOOL_MAILTO}>Submit a tool</a>
              </Button>
              <Button variant="ghost" size="lg" className="text-primary-foreground hover:bg-white/10" asChild>
                <a href={PARTNER_WITH_US_MAILTO}>Partner with us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
