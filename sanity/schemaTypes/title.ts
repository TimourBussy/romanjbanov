import { defineField, defineType } from 'sanity'
import { commonFields } from './commonFields'

export default defineType({
  name: 'title',
  title: 'Title',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Title *',
      type: 'object',
      fields: [
        { name: 'FR', title: 'Français', type: 'string' },
        { name: 'RU', title: 'Русский', type: 'string' },
        { name: 'EN', title: 'English', type: 'string' }
      ],
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'level',
      title: 'Level *',
      type: 'number',
      options: {
        list: [3, 4, 5, 6],
      },
      initialValue: 3,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'colored',
      title: 'Colored',
      type: 'boolean',
      initialValue: false,
    }),
    ...commonFields,
  ],
  preview: {
    select: {
      fr: 'content.FR',
      ru: 'content.RU',
      en: 'content.EN',
      level: 'level',
      colored: 'colored',
    },
    prepare({fr, ru, en, level, colored}) {
      return {
        title: `${fr || ru || en || ''} (H${level})`,
        subtitle: colored && 'Colored',
      }
    },
  },
})
