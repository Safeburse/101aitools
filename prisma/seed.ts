/**
 * One-time / repeat import from prisma/seed/tools-data.json into MySQL.
 * Run: npx prisma db seed
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { buildSlugMap } from "../src/lib/toolSlug";

const __dirname = dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

type CsvRow = {
  id: number;
  name: string;
  _category_: string;
  category: string;
  secondaryc: string;
  link: string;
  externalLink: string;
  image: string;
  youtubeId: string;
  description: string;
  pricingMode: string;
  features: string;
  usecases: string;
  sponsored: string;
};

async function main() {
  const jsonPath = join(__dirname, "seed", "tools-data.json");
  const raw = readFileSync(jsonPath, "utf8");
  const toolsData = JSON.parse(raw) as CsvRow[];

  const slugMap = buildSlugMap(toolsData.map((r) => ({ id: r.id, name: r.name })));

  const rows = toolsData.map((row) => {
    const slug = slugMap.get(row.id);
    if (!slug) throw new Error(`Missing slug for tool id ${row.id}`);
    return {
      id: row.id,
      name: row.name,
      csvCategory: row._category_,
      category: row.category,
      secondaryc: row.secondaryc,
      link: row.link,
      externalLink: (row.externalLink ?? "").trim() || row.link,
      image: row.image,
      youtubeId: row.youtubeId,
      description: row.description,
      pricingModeRaw: row.pricingMode.trim(),
      features: row.features,
      usecases: row.usecases,
      sponsored: row.sponsored,
      slug,
    };
  });

  for (const data of rows) {
    await prisma.tool.upsert({
      where: { id: data.id },
      create: data,
      update: {
        name: data.name,
        csvCategory: data.csvCategory,
        category: data.category,
        secondaryc: data.secondaryc,
        link: data.link,
        externalLink: data.externalLink,
        image: data.image,
        youtubeId: data.youtubeId,
        description: data.description,
        pricingModeRaw: data.pricingModeRaw,
        features: data.features,
        usecases: data.usecases,
        sponsored: data.sponsored,
        slug: data.slug,
      },
    });
  }

  console.log(`Seed complete: ${rows.length} tools upserted.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
