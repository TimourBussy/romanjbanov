import {Paragraph} from './Paragraph'
import {Title} from './Title'
import {getIcon} from '../../../sanity/lib/iconsRegistry'

export function Card({icon, title, paragraph, className}: {icon: string; title: string; paragraph: string; className?: string}) {
  const Icon = getIcon(icon)

  return (
    <div className={`bg-white flex flex-col gap-4 w-70 p-6 rounded-lg shadow-md cursor-default group hover:shadow-lg transition-all ${className || ''}`}>
      {Icon && <Icon size={48} className="text-amber-700" />}
      <Title level={5} align="left">
        {title}
      </Title>
      <Paragraph size="xs" align="left">
        {paragraph}
      </Paragraph>
    </div>
  )
}
