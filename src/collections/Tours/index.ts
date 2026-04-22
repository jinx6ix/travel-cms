import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Tours: CollectionConfig = {
  slug: 'tours',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    featuredImage: true,
    price: true,
    duration: true,
    difficulty: true,
    rating: true,
    reviewCount: true,
    shortDescription: true,
    tourType: true,
    groupSize: true,
    countries: true,
    isFeatured: true,
    isPopular: true,
  },
  admin: {
    defaultColumns: ['title', 'tourType', 'price', 'duration', 'updatedAt'],
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug, collection: 'tours', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'tours', req }),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      maxLength: 300,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tour Details',
          fields: [
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'caption', type: 'text' },
                { name: 'altText', type: 'text' },
              ],
            },
            {
              name: 'countries',
              type: 'select',
              hasMany: true,
              required: true,
              options: [
                { label: 'Kenya', value: 'kenya' },
                { label: 'Tanzania', value: 'tanzania' },
                { label: 'Uganda', value: 'uganda' },
                { label: 'Rwanda', value: 'rwanda' },
                { label: 'Ethiopia', value: 'ethiopia' },
                { label: 'Zanzibar', value: 'zanzibar' },
                { label: 'Seychelles', value: 'seychelles' },
                { label: 'Mozambique', value: 'mozambique' },
              ],
            },
            {
              name: 'tourType',
              type: 'select',
              required: true,
              options: [
                { label: 'Wildlife Safari', value: 'wildlife-safari' },
                { label: 'Mountain Trekking', value: 'mountain-trekking' },
                { label: 'Beach & Island', value: 'beach-island' },
                { label: 'Cultural & Heritage', value: 'cultural-heritage' },
                { label: 'Gorilla Trekking', value: 'gorilla-trekking' },
                { label: 'Hot Air Balloon', value: 'hot-air-balloon' },
                { label: 'Birding', value: 'birding' },
                { label: 'Adventure', value: 'adventure' },
                { label: 'Honeymoon', value: 'honeymoon' },
                { label: 'Family Safari', value: 'family-safari' },
                { label: 'Luxury Safari', value: 'luxury-safari' },
                { label: 'Budget Safari', value: 'budget-safari' },
              ],
            },
            {
              name: 'duration',
              type: 'number',
              required: true,
              min: 1,
              max: 30,
            },
            {
              name: 'price',
              type: 'group',
              fields: [
                { name: 'amount', type: 'number', required: true },
                {
                  name: 'currency',
                  type: 'select',
                  defaultValue: 'USD',
                  options: ['USD', 'EUR', 'GBP', 'KES'].map((v) => ({ label: v, value: v })),
                },
                {
                  name: 'priceType',
                  type: 'select',
                  defaultValue: 'per-person',
                  options: [
                    { label: 'Per Person', value: 'per-person' },
                    { label: 'Per Group', value: 'per-group' },
                  ],
                },
                { name: 'originalPrice', type: 'number' },
              ],
            },
            {
              name: 'groupSize',
              type: 'group',
              fields: [
                { name: 'min', type: 'number', defaultValue: 1 },
                { name: 'max', type: 'number', defaultValue: 12 },
              ],
            },
            {
              name: 'difficulty',
              type: 'select',
              required: true,
              options: [
                { label: 'Easy', value: 'easy' },
                { label: 'Moderate', value: 'moderate' },
                { label: 'Challenging', value: 'challenging' },
                { label: 'Strenuous', value: 'strenuous' },
              ],
            },
            {
              name: 'rating',
              type: 'number',
              min: 0,
              max: 5,
              defaultValue: 0,
              admin: { readOnly: true },
            },
            {
              name: 'reviewCount',
              type: 'number',
              defaultValue: 0,
              admin: { readOnly: true },
            },
            {
              name: 'bestTime',
              type: 'text',
            },
            {
              name: 'availability',
              type: 'select',
              defaultValue: 'year-round',
              options: [
                { label: 'Year Round', value: 'year-round' },
                { label: 'Jan-Mar', value: 'jan-mar' },
                { label: 'Apr-Jun', value: 'apr-jun' },
                { label: 'Jul-Sep', value: 'jul-sep' },
                { label: 'Oct-Dec', value: 'oct-dec' },
              ],
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Feature on homepage',
            },
            {
              name: 'isPopular',
              type: 'checkbox',
              defaultValue: false,
              label: 'Mark as Popular',
            },
          ],
        },
        {
          label: 'Itinerary',
          fields: [
            {
              name: 'overview',
              type: 'richText',
              label: 'Tour Overview',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
            },
            {
              name: 'itinerary',
              type: 'array',
              label: 'Day-by-Day Itinerary',
              fields: [
                { name: 'day', type: 'number', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'accommodation', type: 'text' },
                {
                  name: 'meals',
                  type: 'select',
                  hasMany: true,
                  options: [
                    { label: 'Breakfast', value: 'breakfast' },
                    { label: 'Lunch', value: 'lunch' },
                    { label: 'Dinner', value: 'dinner' },
                  ],
                },
                {
                  name: 'activities',
                  type: 'array',
                  fields: [{ name: 'activity', type: 'text' }],
                },
              ],
            },
            {
              name: 'inclusions',
              type: 'array',
              label: "What's Included",
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'exclusions',
              type: 'array',
              label: "What's Not Included",
              fields: [{ name: 'item', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Highlights & FAQs',
          fields: [
            {
              name: 'highlights',
              type: 'array',
              label: 'Tour Highlights',
              fields: [{ name: 'highlight', type: 'text', required: true }],
            },
            {
              name: 'faqs',
              type: 'array',
              label: 'FAQs (Rich Schema)',
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
            {
              name: 'keywords',
              type: 'array',
              label: 'Target Keywords',
              fields: [
                { name: 'keyword', type: 'text' },
                {
                  name: 'searchVolume',
                  type: 'select',
                  options: [
                    { label: 'High (>10k/mo)', value: 'high' },
                    { label: 'Medium (1k-10k/mo)', value: 'medium' },
                    { label: 'Low (<1k/mo)', value: 'low' },
                  ],
                },
              ],
            },
          ],
        },
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
        {
          label: 'Search Indexing',
          fields: [
            {
              name: 'indexingConfig',
              type: 'group',
              label: 'Page Indexing Control',
              fields: [
                {
                  name: 'robotsDirective',
                  type: 'select',
                  defaultValue: 'index,follow',
                  label: 'Robots Directive',
                  options: [
                    { label: 'Index, Follow (recommended)', value: 'index,follow' },
                    { label: 'Noindex, Follow', value: 'noindex,follow' },
                    { label: 'Index, Nofollow', value: 'index,nofollow' },
                    { label: 'Noindex, Nofollow', value: 'noindex,nofollow' },
                  ],
                },
                {
                  name: 'sitemapPriority',
                  type: 'select',
                  defaultValue: '0.8',
                  label: 'Sitemap Priority',
                  options: [
                    { label: '1.0 - Highest', value: '1.0' },
                    { label: '0.9 - Very High', value: '0.9' },
                    { label: '0.8 - High (default)', value: '0.8' },
                    { label: '0.7 - Medium', value: '0.7' },
                    { label: '0.5 - Normal', value: '0.5' },
                  ],
                },
                {
                  name: 'sitemapChangefreq',
                  type: 'select',
                  defaultValue: 'weekly',
                  label: 'Sitemap Change Frequency',
                  options: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].map(
                    (v) => ({ label: v.charAt(0).toUpperCase() + v.slice(1), value: v }),
                  ),
                },
                {
                  name: 'canonicalUrl',
                  type: 'text',
                  label: 'Canonical URL Override',
                },
                {
                  name: 'breadcrumbs',
                  type: 'array',
                  label: 'Breadcrumb Schema',
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
                {
                  name: 'structuredDataTypes',
                  type: 'select',
                  hasMany: true,
                  label: 'Rich Schema Types',
                  defaultValue: ['TouristTrip', 'FAQPage', 'BreadcrumbList'],
                  options: [
                    { label: 'TouristTrip', value: 'TouristTrip' },
                    { label: 'FAQPage', value: 'FAQPage' },
                    { label: 'BreadcrumbList', value: 'BreadcrumbList' },
                    { label: 'AggregateRating', value: 'AggregateRating' },
                    { label: 'ImageObject', value: 'ImageObject' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
