import { cn } from "@/lib/utils";
import type { Pricing } from "@/data/tools";

const styles: Record<Pricing, string> = {
  Free: "bg-free/15 text-free border-free/30",
  Freemium: "bg-freemium/15 text-freemium border-freemium/30",
  Paid: "bg-paid/15 text-paid border-paid/40",
};

export const PricingBadge = ({ pricing, className }: { pricing: Pricing; className?: string }) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
      styles[pricing],
      className,
    )}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {pricing}
  </span>
);