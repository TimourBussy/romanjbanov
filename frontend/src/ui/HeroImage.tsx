import { Paragraph } from "./Paragraph"
import { Title } from "./Title"

export function HeroImage({
  src,
  alt,
  title,
  subtitle,
  description,
}: {
  src: string
  alt: string
  title?: string
  subtitle?: string
  description?: string
}) {
  return (
    <div className="relative w-full lg:h-150">
      <img src={src} alt={alt} className="object-cover w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
      {(title || subtitle || description) && (
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-center text-white">
          {title && <Title level={1}>{title}</Title>}
          {subtitle && <Title level={2} className="text-gray-200">{subtitle}</Title>}
          {description && <Paragraph size="xl" className="text-gray-300">{description}</Paragraph>}
        </div>
      )}
    </div>
  )
}
