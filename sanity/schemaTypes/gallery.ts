import {defineType} from 'sanity'
import {commonFields} from './commonFields'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: commonFields,
  preview: {
    prepare() {
      return {title: 'Gallery'}
    },
  },
})
