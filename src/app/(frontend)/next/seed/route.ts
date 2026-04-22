import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as nextHeaders } from 'next/headers'

export const maxDuration = 60

// GET: Create the very first admin user (only works on empty DB)
export async function GET(): Promise<Response> {
  const payload = await getPayload({ config })

  // Check if any users exist
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  })

  if (existingUsers.totalDocs > 0) {
    return Response.json({
      success: false,
      message: 'Users already exist. Use /admin/login to sign in.',
    })
  }

  // Create first admin user
  try {
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@safaritrails.com',
        password: 'SafariAdmin2025!',
        name: 'Safari Admin',
      },
      overrideAccess: true,
    })

    return Response.json({
      success: true,
      message: '✅ Admin user created! Go to /admin/login',
      credentials: {
        email: 'admin@safaritrails.com',
        password: 'SafariAdmin2025!',
        adminUrl: 'http://localhost:3000/admin/login',
      },
    })
  } catch (e: any) {
    return Response.json({ success: false, error: e?.message }, { status: 500 })
  }
}

// POST: Full seed (requires auth) — seeds tours into DB
export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await nextHeaders()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden. Must be logged in.', { status: 403 })
  }

  try {
    const { seedTours } = await import('@/endpoints/seed/tours')
    await seedTours(payload)
    return Response.json({ success: true, message: '✅ Tours seeded successfully!' })
  } catch (e: any) {
    payload.logger.error({ err: e, message: 'Error seeding tours' })
    return Response.json({ success: false, error: e?.message }, { status: 500 })
  }
}
