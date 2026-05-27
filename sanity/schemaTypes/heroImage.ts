import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'object',
  fields: [
    defineField({
      name: 'src',
      title: 'Source *',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string', validation: (rule) => rule.required()},
        {name: 'RU', title: 'Русский', type: 'string', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'string', validation: (rule) => rule.required()},
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string', validation: (rule) => rule.required()},
        {name: 'RU', title: 'Русский', type: 'string', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'string', validation: (rule) => rule.required()},
      ],
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string', validation: (rule) => rule.required()},
        {name: 'RU', title: 'Русский', type: 'string', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'string', validation: (rule) => rule.required()},
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'text', validation: (rule) => rule.required()},
        {name: 'RU', title: 'Русский', type: 'text', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'text', validation: (rule) => rule.required()},
      ],
    }),
  ],
  preview: {
    select: {
      media: 'src',
      titleFr: 'title.FR',
      titleRu: 'title.RU',
      titleEn: 'title.EN',
    },
    prepare({media, titleFr, titleRu, titleEn}) {
      return {
        title:
          titleFr && titleRu && titleEn ? `${titleFr} / ${titleRu} / ${titleEn}` : 'Hero Image',
        media,
      }
    },
  },
})
