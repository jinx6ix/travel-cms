import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'country', 'updatedAt'],
    useAsTitle: 'name',
    group: 'Content',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'country',
      type: 'select',
      required: true,
      options: [
        { label: 'Kenya', value: 'kenya' },
        { label: 'Tanzania', value: 'tanzania' },
        { label: 'Uganda', value: 'uganda' },
        { label: 'Rwanda', value: 'rwanda' },
        { label: 'Ethiopia', value: 'ethiopia' },
        { label: 'Zanzibar', value: 'zanzibar' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'shortDescription', type: 'textarea', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          name: 'meta',
          fields: [
            OverviewField({ titlePath: 'meta.title', descriptionPath: 'meta.description', imagePath: 'meta.image' }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({ hasGenerateFn: true, titlePath: 'meta.title', descriptionPath: 'meta.description' }),
          ],
        },
      ],
    },
    slugField(),
  ],
  versions: { drafts: { autosave: { interval: 100 } }, maxPerDoc: 20 },
}
