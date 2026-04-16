import {defineType} from 'sanity'
import {spacingFields} from './spacing'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  fields: spacingFields,
  preview: {
    prepare() {
      return {title: 'Gallery'}
    },
  },
})
