import {defineField, defineType} from 'sanity'
import {commonFields} from './commonFields'
import {BLOCKS} from './blocks'

export default defineType({
  name: 'group',
  title: 'Group',
  type: 'object',
  fields: [
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: BLOCKS,
    }),
    ...commonFields,
  ],
  preview: {
    select: {
      blocks: 'blocks',
    },
    prepare({blocks}) {
      return {
        title: 'Group',
        subtitle: `${blocks?.length || 0} block${blocks?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
