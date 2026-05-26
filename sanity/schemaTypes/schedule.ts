import {defineType, defineField} from 'sanity'
import {commonFields} from './commonFields'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: commonFields,
  preview: {
    prepare() {
      return {title: 'Schedule'}
    },
  },
})
