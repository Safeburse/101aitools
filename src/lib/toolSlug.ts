/** URL segment for /tool/:slug — lowercase, hyphenated, unique across the catalog. */

export function slugifyToolName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function baseSlugForRow(row: { id: number; name: string }): string {
  let base = slugifyToolName(row.name);
  if (!base || /^\d+$/.test(base)) base = `tool-${row.id}`;
  return base;
}

function ensureUniqueSlugs(map: Map<number, string>): Map<number, string> {
  let current = new Map(map);
  for (let pass = 0; pass < 50; pass++) {
    const bySlug = new Map<string, number[]>();
    for (const [id, slug] of current) {
      const arr = bySlug.get(slug) ?? [];
      arr.push(id);
      bySlug.set(slug, arr);
    }
    const next = new Map(current);
    let changed = false;
    for (const [slug, ids] of bySlug) {
      if (ids.length <= 1) continue;
      for (const id of [...ids].sort((a, b) => a - b)) {
        const newSlug = `${slug}-${id}`;
        if (next.get(id) !== newSlug) {
          next.set(id, newSlug);
          changed = true;
        }
      }
    }
    if (!changed) return next;
    current = next;
  }
  return current;
}

/** Deterministic slug per tool id (handles duplicate names and slug collisions). */
export function buildSlugMap(rows: readonly { id: number; name: string }[]): Map<number, string> {
  const enriched = rows.map((row) => ({ row, base: baseSlugForRow(row) }));

  const byBase = new Map<string, typeof enriched>();
  for (const e of enriched) {
    const list = byBase.get(e.base) ?? [];
    list.push(e);
    byBase.set(e.base, list);
  }

  const idToSlug = new Map<number, string>();
  for (const [, group] of byBase) {
    if (group.length === 1) {
      idToSlug.set(group[0]!.row.id, group[0]!.base);
    } else {
      const sorted = [...group].sort((a, b) => a.row.id - b.row.id);
      for (const g of sorted) {
        const slug = g.row.id === sorted[0]!.row.id ? g.base : `${g.base}-${g.row.id}`;
        idToSlug.set(g.row.id, slug);
      }
    }
  }

  return ensureUniqueSlugs(idToSlug);
}
