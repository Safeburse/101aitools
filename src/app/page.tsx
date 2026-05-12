import { Suspense } from "react";
import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { getTools } from "@/data/tools-db";

const title = "101 AI Tools — The Professional Directory of the Best AI Tools";
const description =
  "Browse 101 hand-picked AI tools by category. Compare free and paid AI tools for writing, image, video, code, marketing and more.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
  },
};

export const revalidate = 300;

export default async function Page() {
  const tools = await getTools();

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomePage tools={tools} />
    </Suspense>
  );
}
