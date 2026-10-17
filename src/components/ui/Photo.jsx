// Responsive stock photo from /public/images/photos (800w + 1600w WebP, licensed from Unsplash).
export default function Photo({ name, alt = "", sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, className = "" }) {
  const base = `/images/photos/${name}`;
  return (
    <img
      src={`${base}-800.webp`}
      srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
