import {defineField, defineType} from 'sanity'
import {commonFields} from './commonFields'
import {IconSelector} from '../components/IconSelector'

export default defineType({
  name: 'cardList',
  title: 'Card List',
  type: 'object',
  fields: [
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              components: {
                input: IconSelector,
              },
            },
            {
              name: 'title',
              title: 'Title *',
              type: 'object',
              fields: [
                {
                  name: 'FR',
                  title: 'Français',
                  type: 'string',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'RU',
                  title: 'Русский',
                  type: 'string',
                  validation: (rule) => rule.required(),
                },
                {
                  name: 'EN',
                  title: 'English',
                  type: 'string',
                  validation: (rule) => rule.required(),
                },
              ],
            },
            {
              name: 'description',
              title: 'Description *',
              type: 'object',
              fields: [
                {
                  name: 'FR',
                  title: 'Français',
                  type: 'text',
                  validation: (rule) => rule.required(),
                },
                {name: 'RU', title: 'Русский', type: 'text', validation: (rule) => rule.required()},
                {name: 'EN', title: 'English', type: 'text', validation: (rule) => rule.required()},
              ],
            },
          ],
        },
      ],
    }),
    ...commonFields,
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare({cards}) {
      return {
        title: `Card List`,
        subtitle: `${cards?.length || 0} card${cards?.length !== 1 ? 's' : ''}`,
      }
    },
  },
})
