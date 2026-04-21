import { cn } from "@/lib/utils";
import type { Category } from "@/data/tools";

interface Props {
  category: Category | { id: "all"; name: string; icon: React.ComponentType<{ className?: string }>; accent: string };
  count: number;
  active: boolean;
  onClick: () => void;
}

export const CategoryPill = ({ category, count, active, onClick }: Props) => {
  const Icon = category.icon as React.ComponentType<{ className?: string }>;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-bounce",
        active
          ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:-translate-y-0.5",
      )}
    >
      <Icon className="h-4 w-4" />
      {category.name}
      <span
        className={cn(
          "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
};