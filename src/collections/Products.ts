import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'world', 'subcategory', 'isVisible'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'world',
      type: 'relationship',
      relationTo: 'worlds' as any,
      required: true,
    },
    {
      name: 'subcategory',
      type: 'relationship',
      relationTo: 'subcategories' as any ,
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'point',
          type: 'text',
        },
      ],
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'variants',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'sku',
          type: 'text',
          required: true,
        },
        {
          name: 'colour',
          type: 'text',
        },
        {
          name: 'colourHex',
          type: 'text',
        },
        {
          name: 'size',
          type: 'text',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'mrp',
          type: 'number',
        },
        {
          name: 'stock',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'hsnCode',
      type: 'text',
    },
    {
      name: 'countryOfOrigin',
      type: 'text',
      required: true,
    },
    {
      name: 'weightGrams',
      type: 'number',
    },
    {
      name: 'isVisible',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}