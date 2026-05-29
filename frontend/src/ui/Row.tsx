import {Block} from './Block'
import type {TBlock} from './Block'

const gapClasses: Record<number, string> = {
  4: 'gap-1 sm:gap-2 md:gap-4',
  8: 'gap-2 sm:gap-4 md:gap-8',
  12: 'gap-3 sm:gap-4 md:gap-8 lg:gap-12',
  16: 'gap-4 sm:gap-8 md:gap-12 lg:gap-16',
  20: 'gap-5 sm:gap-12 md:gap-16 lg:gap-20',
  24: 'gap-6 sm:gap-16 md:gap-20 lg:gap-24',
}

export function Row({blocks, gap = 4, className}: {blocks: TBlock[]; gap?: number; className?: string}) {
  const gapClass = gapClasses[gap as keyof typeof gapClasses] || gapClasses[4]

  return (
    <div className={`flex flex-wrap justify-center ${gapClass} ${className || ''}`}>
      {blocks.map((block) => (
        <Block key={block._key} block={block} />
      ))}
    </div>
  )
}
