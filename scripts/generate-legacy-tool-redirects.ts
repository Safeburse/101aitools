/**
 * Writes src/data/legacy-tool-id-to-slug.json for Edge middleware (301 from /tool/{id} → /tool/{slug}).
 * Requires DATABASE_URL and `npx prisma generate`.
 * If the database is unreachable, writes {} so `next build` can still complete (e.g. local CI without DB).
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "src/data/legacy-tool-id-to-slug.json");

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    writeFileSync(outPath, "{}\n", "utf8");
    console.warn("generate-legacy-tool-redirects: DATABASE_URL unset, wrote empty legacy map.");
    return;
  }
  try {
    const rows = await prisma.tool.findMany({
      select: { id: true, slug: true },
      orderBy: { id: "asc" },
    });
    const out: Record<string, string> = {};
    for (const r of rows) out[String(r.id)] = r.slug;
    writeFileSync(outPath, JSON.stringify(out, null, 0) + "\n", "utf8");
    console.log(`legacy-tool-id-to-slug: ${Object.keys(out).length} ids`);
  } catch (e) {
    console.warn("generate-legacy-tool-redirects: DB unavailable, writing empty map.", e);
    writeFileSync(outPath, "{}\n", "utf8");
  }
}

main()
  .catch((e) => {
    console.warn("generate-legacy-tool-redirects:", e);
    writeFileSync(outPath, "{}\n", "utf8");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
