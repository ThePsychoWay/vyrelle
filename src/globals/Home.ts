import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroHeadline',
      type: 'text',
      defaultValue: 'Adorn Every Layer',
    },
    {
      name: 'heroSubline',
      type: 'text',
      defaultValue: 'Everyday pieces for how she lives.',
    },
    {
      name: 'heroCtaText',
      type: 'text',
      defaultValue: 'Explore the Collection',
    },
    {
      name: 'heroCtaLink',
      type: 'text',
      defaultValue: '/adorn',
    },
  ],
}