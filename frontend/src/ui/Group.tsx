import {Block} from './Block'
import type {TBlock} from './Block'

export const MARGIN_CLASSES: Record<string, Record<number, string>> = {
  mt: {4: 'sm:mt-2 md:mt-4', 8: 'sm:mt-4 md:mt-8', 12: 'sm:mt-4 md:mt-8 lg:mt-12', 16: 'mt-4 sm:mt-8 md:mt-12 lg:mt-16', 20: 'mt-8 sm:mt-12 md:mt-16 lg:mt-20', 24: 'mt-12 sm:mt-16 md:mt-20 lg:mt-24'},
  mb: {4: 'sm:mb-2 md:mb-4', 8: 'sm:mb-4 md:mb-8', 12: 'sm:mb-4 md:mb-8 lg:mb-12', 16: 'mb-4 sm:mb-8 md:mb-12 lg:mb-16', 20: 'mb-8 sm:mb-12 md:mb-16 lg:mb-20', 24: 'mb-12 sm:mb-16 md:mb-20 lg:mb-24'},
  ml: {4: 'sm:ml-2 md:ml-4', 8: 'sm:ml-4 md:ml-8', 12: 'sm:ml-4 md:ml-8 lg:ml-12', 16: 'ml-4 sm:ml-8 md:ml-12 lg:ml-16', 20: 'ml-8 sm:ml-12 md:ml-16 lg:ml-20', 24: 'ml-12 sm:ml-16 md:ml-20 lg:ml-24'},
  mr: {4: 'sm:mr-2 md:mr-4', 8: 'sm:mr-4 md:mr-8', 12: 'sm:mr-4 md:mr-8 lg:mr-12', 16: 'mr-4 sm:mr-8 md:mr-12 lg:mr-16', 20: 'mr-8 sm:mr-12 md:mr-16 lg:mr-20', 24: 'mr-12 sm:mr-16 md:mr-20 lg:mr-24'},
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
