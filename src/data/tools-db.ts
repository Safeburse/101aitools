import { prisma } from "@/lib/prisma";
import { toolDbRowToTool } from "@/data/tools";
import type { Tool } from "@/data/tools";

function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export async function getTools(): Promise<Tool[]> {
  if (!hasDatabaseUrl()) return [];
  const rows = await prisma.tool.findMany({ orderBy: { id: "asc" } });
  return rows.map(toolDbRowToTool);
}

export async function getToolById(id: number): Promise<Tool | null> {
  if (!hasDatabaseUrl()) return null;
  const row = await prisma.tool.findUnique({ where: { id } });
  return row ? toolDbRowToTool(row) : null;
}

export async function getToolBySlug(param: string): Promise<Tool | null> {
  if (!hasDatabaseUrl()) return null;
  const key = decodeURIComponent(param).trim().toLowerCase();
  if (!key) return null;
  const row = await prisma.tool.findFirst({
    where: { slug: key },
  });
  return row ? toolDbRowToTool(row) : null;
}

export async function getAllToolSlugs(): Promise<string[]> {
  if (!hasDatabaseUrl()) return [];
  const rows = await prisma.tool.findMany({ select: { slug: true }, orderBy: { id: "asc" } });
  return rows.map((r) => r.slug);
}
