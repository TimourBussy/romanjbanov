import {defineField, defineType} from 'sanity'
import {commonFields} from './commonFields'
import {BLOCKS} from './blocks'

export default defineType({
  name: 'row',
  title: 'Row',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: BLOCKS,
    }),
    defineField({
      name: 'gap',
      title: 'Gap',
      type: 'number',
      options: {
        list: [4, 8, 12, 16, 20, 24],
      },
      initialValue: 4,
    }),
    ...commonFields,
  ],
  preview: {
    select: {
      blocks: 'blocks',
      gap: 'gap',
    },
    prepare({blocks, gap}) {
      return {
        title: 'Row',
        subtitle: `${blocks?.length || 0} block${blocks?.length !== 1 ? 's' : ''} - Gap: ${gap}`,
      }
    },
  },
})
