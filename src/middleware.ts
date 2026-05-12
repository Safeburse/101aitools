import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import legacy from "@/data/legacy-tool-id-to-slug.json";

const map = legacy as Record<string, string>;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const m = pathname.match(/^\/tool\/(\d+)$/);
  if (!m) return NextResponse.next();
  const slug = map[m[1]!];
  if (!slug) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/tool/${slug}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/tool/:path*"],
};
