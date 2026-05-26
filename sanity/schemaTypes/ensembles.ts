import {defineType} from 'sanity'
import { commonFields } from './commonFields'

export default defineType({
  name: 'ensembles',
  title: 'Ensembles',
  type: 'object',
  fields: commonFields,
  preview: {
    prepare() {
      return {title: 'Ensembles'}
    },
  },
})
