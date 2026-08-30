import type { CollectionConfig } from 'payload'

export const Worlds: CollectionConfig = {
  slug: 'worlds',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isVisible', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Poetic name shown in nav, e.g. "Unwind"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe version, e.g. "unwind" becomes /unwind',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'One line under the world name',
      },
    },
    {
      name: 'seoCopyBlock',
      type: 'textarea',
      admin: {
        description: '150-250 words of literal search-friendly copy',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'seoH1',
      type: 'text',
      admin: { description: 'Literal, searchable heading, e.g. "Nighties & Night Gowns for Women"' },
    },
  ],
}   