import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories, type Tool } from "@/data/tools";
import { PricingBadge } from "./PricingBadge";
import { cn } from "@/lib/utils";

export const ToolCard = ({ tool }: { tool: Tool }) => {
  const category = categories.find((c) => c.id === tool.categoryId)!;
  // Unique capability list, primary category first.
  const capabilityIds = Array.from(
    new Set<string>([tool.categoryId, ...(tool.capabilities ?? [])])
  );
  const capabilityCats = capabilityIds
    .map((id) => categories.find((c) => c.id === id))
    .filter(Boolean) as typeof categories;
  const isMulti = capabilityCats.length > 1;

  return (
    <Link
      to={`/tool/${encodeURIComponent(tool.slug)}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-bounce hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-smooth group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {capabilityCats.map((c) => {
            const CapIcon = c.icon;
            return (
              <div
                key={c.id}
                title={c.name}
                aria-label={c.name}
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-soft",
                  c.accent
                )}
              >
                <CapIcon className="h-5 w-5" />
              </div>
            );
          })}
        </div>
        <PricingBadge pricing={tool.pricing} />
      </div>

      <div className="flex-1 space-y-1.5">
        <h3 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-foreground">
          {tool.name}
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-bounce group-hover:translate-x-0.5 group-hover:text-primary" />
          {isMulti && (
            <span className="ml-auto rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              Multi-tool
            </span>
          )}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs">
        <span className="font-medium text-muted-foreground">
          {capabilityCats.map((c) => c.name).join(" • ")}
        </span>
        <span className="font-medium text-primary opacity-0 transition-smooth group-hover:opacity-100">Details →</span>
      </div>
    </Link>
  );
};