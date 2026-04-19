import {defineType} from 'sanity'
import {spacingFields} from './spacing'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  fields: spacingFields,
  preview: {
    prepare() {
      return {title: 'Contact Form'}
    },
  },
})
