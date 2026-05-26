import {defineType} from 'sanity'
import {commonFields} from './commonFields'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'object',
  fields: commonFields,
  preview: {
    prepare() {
      return {title: 'Contact Form'}
    },
  },
})
