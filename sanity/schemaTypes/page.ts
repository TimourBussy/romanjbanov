import {defineField, defineType} from 'sanity'
import {BLOCKS} from './blocks'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title *',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string'},
        {name: 'RU', title: 'Русский', type: 'string'},
        {name: 'EN', title: 'English', type: 'string'},
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug *',
      type: 'object',
      fields: [
        {
          name: 'FR',
          title: 'Français',
          type: 'slug',
          options: {source: 'title.FR'},
          validation: (rule) => rule.required(),
        },
        {
          name: 'EN',
          title: 'English',
          type: 'slug',
          options: {source: 'title.EN'},
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      type: 'object',
      fields: [
        {name: 'src', title: 'Source', type: 'image'},
        {name: 'altFr', title: 'Texte alternatif Français', type: 'string'},
        {name: 'altRu', title: 'Альтернативный текст Русский', type: 'string'},
        {name: 'altEn', title: 'Alternative text English', type: 'string'},
      ],
    }),
    defineField({
      name: 'displayTitle',
      title: 'Display page title',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: BLOCKS,
    }),
  ],
  preview: {
    select: {
      fr: 'title.FR',
      ru: 'title.RU',
      en: 'title.EN',
      media: 'heroImage.src',
    },
    prepare({fr, ru, en, media}) {
      return {
        title: `${fr || ''} / ${ru || ''} / ${en || ''}`,
        media,
      }
    },
  },
})
