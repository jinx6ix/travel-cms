import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const tourId = formData.get('tourId') as string
    const tourSlug = formData.get('tourSlug') as string
    const reviewerName = formData.get('reviewerName') as string
    const reviewerCountry = (formData.get('reviewerCountry') as string) || undefined
    const rating = Number(formData.get('rating'))
    const travelType = (formData.get('travelType') as string) || undefined
    const title = formData.get('title') as string
    const reviewText = formData.get('reviewText') as string

    if (!reviewerName || !rating || !title || !reviewText || !tourId) {
      return new Response(null, { status: 302, headers: { Location: `/tours/${tourSlug}?review=error` } })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'reviews',
      data: { reviewerName, reviewerCountry, tour: tourId, rating, travelType, title, reviewText, status: 'pending', publishedOnFrontend: false, source: 'website' },
    })
    return new Response(null, { status: 302, headers: { Location: `/tours/${tourSlug}?review=submitted` } })
  } catch (error: any) {
    console.error('Review error:', error)
    return new Response(null, { status: 302, headers: { Location: '/?review=error' } })
  }
}
