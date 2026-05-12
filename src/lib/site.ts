export const DEFAULT_SITE_ORIGIN = "https://101aitools.com";

export function getSiteOrigin(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  return DEFAULT_SITE_ORIGIN;
}
