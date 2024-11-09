import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: !!process.env.LOCALIZED,
    },
  ],
}
