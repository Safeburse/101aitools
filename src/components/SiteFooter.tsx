import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const SiteFooter = () => (
  <footer className="mt-24 border-t border-border bg-card/40">
    <div className="container py-12">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <div>
            <p className="font-bold tracking-tight">
              101<span className="text-gradient">AI</span>Tools
            </p>
            <p className="text-xs text-muted-foreground">The professional directory of the best AI tools.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
          
          <Link className="text-muted-foreground hover:text-foreground" to="/about">
            About
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/terms">
            Terms
          </Link>
          <Link className="text-muted-foreground hover:text-foreground" to="/privacy">
            Privacy
          </Link>
        </div>
      </div>
      <p className="mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} 101 AI Tools — All trademarks belong to their respective owners. For email:{" "}
        <a className="text-foreground underline-offset-4 hover:underline" href="mailto:support@101aitools.com">
          support@101aitools.com
        </a>
      </p>
    </div>
  </footer>
);
