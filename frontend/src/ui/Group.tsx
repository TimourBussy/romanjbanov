import {Block} from './Block'
import type {TBlock} from './Block'

export const PADDING_CLASSES: Record<string, Record<number, string>> = {
  pt: {4: 'sm:pt-2 md:pt-4', 8: 'sm:pt-4 md:pt-8', 12: 'sm:pt-4 md:pt-8 lg:pt-12', 16: 'pt-4 sm:pt-8 md:pt-12 lg:pt-16', 20: 'pt-8 sm:pt-12 md:pt-16 lg:pt-20', 24: 'pt-12 sm:pt-16 md:pt-20 lg:pt-24'},
  pb: {4: 'sm:pb-2 md:pb-4', 8: 'sm:pb-4 md:pb-8', 12: 'sm:pb-4 md:pb-8 lg:pb-12', 16: 'pb-4 sm:pb-8 md:pb-12 lg:pb-16', 20: 'pb-8 sm:pb-12 md:pb-16 lg:pb-20', 24: 'pb-12 sm:pb-16 md:pb-20 lg:pb-24'},
  pl: {4: 'sm:pl-2 md:pl-4', 8: 'sm:pl-4 md:pl-8', 12: 'sm:pl-4 md:pl-8 lg:pl-12', 16: 'pl-4 sm:pl-8 md:pl-12 lg:pl-16', 20: 'pl-8 sm:pl-12 md:pl-16 lg:pl-20', 24: 'pl-12 sm:pl-16 md:pl-20 lg:pl-24'},
  pr: {4: 'sm:pr-2 md:pr-4', 8: 'sm:pr-4 md:pr-8', 12: 'sm:pr-4 md:pr-8 lg:pr-12', 16: 'pr-4 sm:pr-8 md:pr-12 lg:pr-16', 20: 'pr-8 sm:pr-12 md:pr-16 lg:pr-20', 24: 'pr-12 sm:pr-16 md:pr-20 lg:pr-24'},
}

export function Group({blocks, className}: {blocks: TBlock[]; className?: string}) {
  return (
    <section className={`flex flex-col gap-4 sm:gap-6 ${className || ''}`}>
      {blocks.map((block) => (
        <Block key={block._key} block={block} />
      ))}
    </section>
  )
}
