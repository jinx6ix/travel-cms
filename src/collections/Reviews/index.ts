import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: () => true,
    delete: authenticated,
    read: ({ req }) => {
      if (req.user) return true
      return {
        and: [
          { status: { equals: 'approved' } },
          { publishedOnFrontend: { equals: true } },
        ],
      }
    },
    update: authenticated,
  },
  admin: {
    defaultColumns: ['reviewerName', 'tour', 'rating', 'status', 'publishedOnFrontend', 'createdAt'],
    useAsTitle: 'reviewerName',
    description: '⭐ Manage customer reviews. Approve and push to front-end here.',
    group: 'Reviews & Ratings',
  },
  fields: [
    {
      name: 'reviewerName',
      type: 'text',
      required: true,
    },
    {
      name: 'reviewerCountry',
      type: 'text',
    },
    {
      name: 'reviewerAvatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: true,
    },
    {
      name: 'tourDate',
      type: 'date',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'subRatings',
      type: 'group',
      fields: [
        { name: 'guide', type: 'number', min: 1, max: 5 },
        { name: 'accommodation', type: 'number', min: 1, max: 5 },
        { name: 'valueForMoney', type: 'number', min: 1, max: 5 },
        { name: 'transport', type: 'number', min: 1, max: 5 },
        { name: 'meals', type: 'number', min: 1, max: 5 },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'reviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'travelType',
      type: 'select',
      options: [
        { label: 'Solo', value: 'solo' },
        { label: 'Couple', value: 'couple' },
        { label: 'Family', value: 'family' },
        { label: 'Friends', value: 'friends' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: '⏳ Pending Review', value: 'pending' },
        { label: '✅ Approved', value: 'approved' },
        { label: '❌ Rejected', value: 'rejected' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Set to Approved to enable publishing',
      },
    },
    {
      name: 'publishedOnFrontend',
      type: 'checkbox',
      defaultValue: false,
      label: '🚀 Publish to Website',
      admin: {
        position: 'sidebar',
        description: 'Show this review on the public website',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: '⭐ Feature on Homepage',
      admin: { position: 'sidebar' },
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: false,
      label: '✓ Verified Purchase',
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'website',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Website Form', value: 'website' },
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Google Reviews', value: 'google' },
        { label: 'Manual Entry', value: 'manual' },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: '📝 Admin Notes (internal)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'responseFromBusiness',
      type: 'group',
      label: '💬 Our Response',
      fields: [
        { name: 'response', type: 'textarea' },
        { name: 'respondedAt', type: 'date' },
        { name: 'respondedBy', type: 'text' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        if (
          doc.status === 'approved' &&
          doc.publishedOnFrontend &&
          (previousDoc?.status !== 'approved' || !previousDoc?.publishedOnFrontend)
        ) {
          try {
            const tourId = typeof doc.tour === 'object' ? doc.tour?.id : doc.tour
            if (!tourId) return
            const allReviews = await req.payload.find({
              collection: 'reviews',
              where: {
                and: [
                  { tour: { equals: tourId } },
                  { status: { equals: 'approved' } },
                  { publishedOnFrontend: { equals: true } },
                ],
              },
              limit: 1000,
            })
            const total = allReviews.docs.reduce((sum: number, r: any) => sum + (r.rating || 0), 0)
            const avg = allReviews.totalDocs > 0 ? total / allReviews.totalDocs : 0
            await req.payload.update({
              collection: 'tours',
              id: tourId,
              data: {
                rating: Math.round(avg * 10) / 10,
                reviewCount: allReviews.totalDocs,
              },
            })
          } catch (e) {
            console.error('Error updating tour rating:', e)
          }
        }
      },
    ],
  },
  timestamps: true,
}
