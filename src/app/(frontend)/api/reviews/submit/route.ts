import { getPayload } from 'payload'
import config from '@payload-config'

// Allowed travel types from your Payload collection
const ALLOWED_TRAVEL_TYPES = ['solo', 'couple', 'family', 'friends'] as const
type TravelType = typeof ALLOWED_TRAVEL_TYPES[number] | null | undefined

function normalizeTravelType(value: unknown): TravelType {
  if (typeof value === 'string' && ALLOWED_TRAVEL_TYPES.includes(value as any)) {
    return value as TravelType
  }
  return undefined // or null, depending on your schema
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const tourId = formData.get('tourId') as string
    const tourSlug = formData.get('tourSlug') as string
    const reviewerName = formData.get('reviewerName') as string
    const reviewerCountry = (formData.get('reviewerCountry') as string) || undefined
    const rating = Number(formData.get('rating'))
    const rawTravelType = formData.get('travelType') as string | null
    const title = formData.get('title') as string
    const reviewText = formData.get('reviewText') as string

    // Validate required fields
    if (!reviewerName || !rating || !title || !reviewText || !tourId) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/tours/${tourSlug}?review=error` },
      })
    }

    // Normalize travelType to the expected union type
    const travelType = normalizeTravelType(rawTravelType)

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'reviews',
      data: {
        reviewerName,
        reviewerCountry,
        tour: tourId,
        rating,
        travelType, // now type-safe
        title,
        reviewText,
        status: 'pending',
        publishedOnFrontend: false,
        source: 'website',
      },
    })

    return new Response(null, {
      status: 302,
      headers: { Location: `/tours/${tourSlug}?review=submitted` },
    })
  } catch (error: any) {
    console.error('Review error:', error)
    return new Response(null, {
      status: 302,
      headers: { Location: '/?review=error' },
    })
  }
}