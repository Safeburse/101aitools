/** Returns YouTube embed URL if `raw` is a watch or youtu.be URL, else null. */
export function getYoutubeEmbedSrc(raw: string): string | null {
  const u = raw.trim();
  if (!u) return null;
  const watch = u.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  const short = u.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  return null;
}
