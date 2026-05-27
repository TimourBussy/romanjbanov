export function HeroImage({src, alt, title, subtitle, description}: {src: string; alt: string; title?: string; subtitle?: string; description?: string}) {
  return (
    <img
      src={src}
      alt={alt}
      className="top-0 left-0 w-full lg:h-150 object-cover"
    />
  )
}
