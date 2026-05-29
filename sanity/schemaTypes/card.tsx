import {defineField, defineType} from 'sanity'
import {commonFields} from './commonFields'
import {IconSelector} from '../components/IconSelector'
import {getIcon} from '../lib/iconsRegistry'

export default defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon *',
      type: 'string',
      validation: (rule) => rule.required(),
      components: {
        input: IconSelector,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title *',
      type: 'object',
      fields: [
        {name: 'FR', title: 'Français', type: 'string', validation: (rule) => rule.required()},
        {name: 'RU', title: 'Русский', type: 'string', validation: (rule) => rule.required()},
        {name: 'EN', title: 'English', type: 'string', validation: (rule) => rule.required()},
      ],
      validation: (rule) => rule.required(),
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
    ...commonFields,
  ],
  preview: {
    select: {
      titleFr: 'title.FR',
      titleRu: 'title.RU',
      titleEn: 'title.EN',
      icon: 'icon',
    },
    prepare({titleFr, titleRu, titleEn, icon}) {
      const IconComponent = icon ? getIcon(icon) : null
      return {
        title: `${titleFr || ''} / ${titleRu || ''} / ${titleEn || ''}`,
        media: IconComponent && (() => <IconComponent size={32} />),
      }
    },
  },
})
