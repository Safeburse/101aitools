import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import { getSiteOrigin } from "@/lib/site";

const title = "101 AI Tools — The Professional Directory of the Best AI Tools";
const description =
  "Browse 101 hand-picked AI tools by category. Compare free and paid AI tools for writing, image, video, code, marketing and more.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: title,
    template: "%s | 101 AI Tools",
  },
  description,
  authors: [{ name: "101 AI Tools" }],
  openGraph: {
    type: "website",
    title,
    description,
    images: [{ url: "/android-chrome-512x512.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
