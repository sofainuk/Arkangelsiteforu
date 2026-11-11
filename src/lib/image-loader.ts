type LoaderArgs = { src: string; width: number; quality?: number };

/** Unsplash CDN loader: returns a resized, auto-format (WebP/AVIF) photo for each screen size. */
export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const sep = src.includes("?") ? "&" : "?";
  return `${src}${sep}auto=format&fit=crop&w=${width}&q=${quality ?? 70}`;
}
