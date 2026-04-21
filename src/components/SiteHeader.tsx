import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUBMIT_TOOL_MAILTO = `mailto:support@101aitools.com?subject=${encodeURIComponent("Name of your AI tools")}`;

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-lg tracking-tight">
            101<span className="text-gradient">AI</span>Tools
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/#categories"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Categories
          </Link>
          <Link
            to="/?pricing=free#directory-filters"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Free Tools
          </Link>
          <Link
            to="/?pricing=paid#directory-filters"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Paid Tools
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="hero" size="sm" asChild>
            <a href={SUBMIT_TOOL_MAILTO}>Submit a tool</a>
          </Button>
        </div>
      </div>
    </header>
  );
};