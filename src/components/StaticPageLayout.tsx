import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export function StaticPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10 bg-gradient-mesh opacity-60" />
        <div className="container max-w-3xl py-10 md:py-14">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">
            ← Back to home
          </Link>
          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-pretty text-muted-foreground md:text-lg">{subtitle}</p>
          ) : null}
        </div>
      </div>
      <main className="container max-w-3xl py-10 md:py-16">
        <article className="space-y-6 text-sm leading-relaxed text-foreground/90 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:first:mt-0 [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mt-3 [&_p]:first:mt-0 [&_strong]:font-semibold [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
