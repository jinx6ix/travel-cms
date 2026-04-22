import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const DESTINATIONS: Record<string, any> = {
  kenya: {
    name: 'Kenya', flag: '🇰🇪', heroEmoji: '🦁',
    tagline: 'Home of the Great Migration',
    intro: 'Kenya is East Africa\'s most celebrated safari destination and the birthplace of the classic African safari. From the world-famous Maasai Mara — where 2 million wildebeest cross the Mara River — to elephant-studded Amboseli with its iconic Kilimanjaro backdrop, Kenya delivers wildlife encounters that define a lifetime.',
    description: 'Kenya offers extraordinary diversity: northern Kenya\'s remote Samburu with its rare species found nowhere else, the pink flamingo lakes of the Great Rift Valley, the rainforests of Kakamega, and the coral reefs and pristine beaches of the Swahili Coast. The country\'s infrastructure, experienced guiding community, and variety of accommodation make it the ideal first safari destination.',
    parks: [
      { name: 'Maasai Mara', desc: 'World\'s greatest wildlife spectacle. Great Migration July–Oct.', emoji: '🦁' },
      { name: 'Amboseli', desc: 'Africa\'s largest elephant herds with Kilimanjaro backdrop.', emoji: '🐘' },
      { name: 'Samburu', desc: 'Remote northern Kenya with 5 unique endemic species.', emoji: '🦒' },
      { name: 'Lake Nakuru', desc: 'Flamingo spectacle, white & black rhinos, and tree-climbing lions.', emoji: '🦩' },
      { name: 'Tsavo', desc: 'Kenya\'s largest park — red elephants, vast plains, Mt Kilimanjaro views.', emoji: '🌅' },
      { name: 'Nairobi NP', desc: 'World\'s only national park inside a capital city.', emoji: '🏙️' },
    ],
    highlights: ['Great Migration river crossings (Jul–Oct)', 'Big Five across multiple ecosystems', 'Diani Beach & Lamu Island', 'Maasai culture and village visits', 'Nairobi — vibrant cultural capital', 'Birdwatching: 1,100+ species'],
    bestTime: 'July to October for the Migration. January–March for calving season and fewer crowds. Year-round for general wildlife.',
    climate: 'Tropical highland (15–28°C). Main rains: April–May. Short rains: November.',
    capital: 'Nairobi', population: '53 million', currency: 'KES (1 USD ≈ 130 KES)',
    language: 'Swahili & English', visa: 'eTA required (~$50 USD, available online)',
    vaccinations: 'Yellow Fever (if coming from endemic country), Typhoid, Hepatitis A recommended. Malaria prophylaxis needed.',
    color: '#1a3a1a',
  },
  tanzania: {
    name: 'Tanzania', flag: '🇹🇿', heroEmoji: '🌅',
    tagline: 'Africa\'s Wildlife Paradise',
    intro: 'Tanzania is home to some of the world\'s most extraordinary wildlife ecosystems. The Serengeti — meaning "endless plains" in Maasai — stretches 30,000 sq km and supports the largest animal migration on Earth. The Ngorongoro Crater is the world\'s largest intact volcanic caldera, hosting the highest density of predators in Africa.',
    description: 'Beyond the iconic Northern Circuit, Tanzania\'s Southern Circuit reveals truly remote wilderness. Ruaha National Park has Tanzania\'s largest elephant and lion populations, while Selous Game Reserve — now Nyerere National Park — is Africa\'s largest protected area. For those wanting to summit the continent, Kilimanjaro offers the most accessible walk to 5,895m.',
    parks: [
      { name: 'Serengeti', desc: 'Africa\'s most famous park. Year-round wildlife, annual migration.', emoji: '🦁' },
      { name: 'Ngorongoro', desc: 'UNESCO World Heritage. Highest predator density in Africa.', emoji: '🦏' },
      { name: 'Tarangire', desc: 'Giant elephant herds and iconic ancient baobab trees.', emoji: '🐘' },
      { name: 'Kilimanjaro', desc: 'Africa\'s highest peak. Multiple routes, 5–9 day climbs.', emoji: '🏔️' },
      { name: 'Ruaha', desc: 'Tanzania\'s largest park — remote, wild, and spectacular.', emoji: '🌿' },
      { name: 'Selous (Nyerere)', desc: 'Africa\'s largest protected area. Boat safaris on the Rufiji.', emoji: '🚤' },
    ],
    highlights: ['Serengeti Big Cat sightings', 'Ngorongoro Crater descent', 'Kilimanjaro summit challenge', 'Zanzibar beach extension', 'Olduvai Gorge archaeology', 'Lake Manyara tree-climbing lions'],
    bestTime: 'June–October (dry season). January–March for Serengeti calving and fewer crowds. Avoid April–May (long rains).',
    climate: 'Tropical to highland (18–30°C depending on altitude).',
    capital: 'Dodoma (official) / Dar es Salaam (commercial)', population: '60 million', currency: 'TZS (1 USD ≈ 2,500 TZS)',
    language: 'Swahili & English', visa: 'On arrival or e-Visa (~$50 USD)',
    vaccinations: 'Yellow Fever certificate required. Malaria prophylaxis essential for most areas.',
    color: '#2d1a00',
  },
  uganda: {
    name: 'Uganda', flag: '🇺🇬', heroEmoji: '🦍',
    tagline: 'The Pearl of Africa',
    intro: 'Uganda earns its nickname — "The Pearl of Africa" — with extraordinary biodiversity. Home to half of the world\'s remaining mountain gorillas, Uganda offers the most accessible and affordable gorilla trekking experience. Uganda gorilla permits cost $700 vs $1,500 in Rwanda, making it exceptional value.',
    description: 'Beyond gorillas, Uganda offers remarkable wildlife diversity. Bwindi Impenetrable Forest and Mgahinga host 10 habituated gorilla families. Kibale National Park has the highest density of primates in Africa — 13 species including chimpanzees. Queen Elizabeth National Park offers the rare tree-climbing lions of Ishasha and a superb boat safari on the Kazinga Channel.',
    parks: [
      { name: 'Bwindi Impenetrable Forest', desc: 'UNESCO World Heritage. Home to ~400 mountain gorillas.', emoji: '🦍' },
      { name: 'Kibale National Park', desc: 'Best chimp tracking in Africa. 13 primate species.', emoji: '🐒' },
      { name: 'Queen Elizabeth NP', desc: 'Tree-climbing lions, hippos, and the Kazinga Channel.', emoji: '🦁' },
      { name: 'Mgahinga Gorilla NP', desc: 'Virunga volcanoes gorilla trekking and golden monkeys.', emoji: '🌋' },
      { name: 'Murchison Falls', desc: 'Nile squeezed through 7m gap. Superb game drives and boat trips.', emoji: '💧' },
      { name: 'Jinja (Source of the Nile)', desc: 'White water rafting and adventure activities.', emoji: '🚣' },
    ],
    highlights: ['Mountain gorilla trekking (best value!)', 'Chimpanzee tracking in Kibale', 'Tree-climbing lions in Ishasha', 'White water rafting on the Nile', 'Shoe-bill stork birdwatching', 'Lake Bunyonyi scenic retreat'],
    bestTime: 'June–September and December–February (dry seasons) for gorilla trekking. Year-round possible.',
    climate: 'Equatorial (15–28°C). Two rainy seasons: March–May and October–November.',
    capital: 'Kampala', population: '47 million', currency: 'UGX (1 USD ≈ 3,800 UGX)',
    language: 'English & Swahili (official)', visa: 'eVisa required (~$50 USD). East Africa Tourist Visa covers Uganda + Kenya + Rwanda',
    vaccinations: 'Yellow Fever required. Malaria prophylaxis essential. Typhoid recommended.',
    color: '#2d1a3a',
  },
  rwanda: {
    name: 'Rwanda', flag: '🇷🇼', heroEmoji: '🦍',
    tagline: 'Land of a Thousand Hills',
    intro: 'Rwanda has transformed into Africa\'s most forward-thinking luxury destination. Known for its extraordinary cleanliness, safety, and rapid development, Rwanda pairs its iconic mountain gorilla trekking with a compelling story of resilience and conservation leadership.',
    description: 'Rwanda gorilla permits at $1,500 per person reflect the premium experience and contribute directly to conservation. The encounter — one hour face-to-face with a habituated mountain gorilla family — is consistently rated as the most emotionally powerful wildlife experience in the world. Beyond gorillas, Rwanda offers chimpanzee tracking in Nyungwe Forest, the savanna wildlife of Akagera, and stunning lake scenery.',
    parks: [
      { name: 'Volcanoes National Park', desc: 'Premier gorilla trekking. Home to 5 habituated families.', emoji: '🦍' },
      { name: 'Nyungwe Forest', desc: 'Chimpanzees, colobus monkeys, and canopy walkway.', emoji: '🐒' },
      { name: 'Akagera National Park', desc: 'Big Five on Rwanda\'s eastern savanna. Recently restored.', emoji: '🦁' },
      { name: 'Lake Kivu', desc: 'Scenic lakeshore retreat. Swimming, kayaking, island hopping.', emoji: '🏝️' },
    ],
    highlights: ['Mountain gorilla trekking permit ($1,500)', 'Golden monkey tracking', 'Kigali — safest capital in Africa', 'Nyungwe canopy walkway', 'Dian Fossey Gorilla Fund visit', 'Memorial & reconciliation tourism'],
    bestTime: 'June–September and December–February. Gorilla trekking year-round but dry seasons are much easier.',
    climate: 'Highland tropical (12–27°C year-round due to altitude).',
    capital: 'Kigali', population: '13 million', currency: 'RWF (1 USD ≈ 1,300 RWF)',
    language: 'Kinyarwanda, French, English', visa: 'Visa on arrival for most nationalities. 30-day stay, extendable.',
    vaccinations: 'Yellow Fever certificate required. Malaria prophylaxis for lower altitudes.',
    color: '#1a2d3a',
  },
  ethiopia: {
    name: 'Ethiopia', flag: '🇪🇹', heroEmoji: '🏛️',
    tagline: 'Cradle of Mankind',
    intro: 'Ethiopia is Africa\'s most historically and culturally profound destination. With 11 UNESCO World Heritage Sites — more than any other African country — Ethiopia takes you on a journey through 3,000 years of continuous civilization, from the ancient Axumite Kingdom to the rock-hewn churches of Lalibela that defy explanation.',
    description: 'The Omo Valley in southern Ethiopia is one of the last places on Earth where ancient tribal cultures continue to live as they have for centuries. The Mursi tribe with their distinctive lip plates, the Hamar and their bull-jumping ceremony, and the Karo living along the banks of the Omo River offer a unique anthropological experience. Northern Ethiopia\'s historical circuit is a must for any serious traveller.',
    parks: [
      { name: 'Lalibela', desc: 'UNESCO. 11 rock-hewn churches carved from solid rock in the 12th century.', emoji: '⛪' },
      { name: 'Gondar', desc: 'Royal castles of the 17th century. The Camelot of Africa.', emoji: '🏰' },
      { name: 'Simien Mountains', desc: 'UNESCO. Dramatic escarpments, gelada baboons, Ethiopian wolves.', emoji: '🏔️' },
      { name: 'Omo Valley', desc: 'Ancient tribal cultures — Mursi, Hamar, Karo, Dassanach tribes.', emoji: '👥' },
      { name: 'Axum', desc: 'Ancient pre-Christian kingdom. Towering obelisks and royal tombs.', emoji: '🗿' },
      { name: 'Danakil Depression', desc: 'One of Earth\'s most alien landscapes. Active volcanoes and salt flats.', emoji: '🌋' },
    ],
    highlights: ['Lalibela rock churches (8th Wonder of the World)', 'Gondar medieval castles', 'Omo Valley tribal cultures', 'Simien Mountains trekking', 'Axum ancient obelisks', 'Addis Ababa — Africa\'s diplomatic capital'],
    bestTime: 'October–May (dry season). Avoid June–September (heavy rains). Ethiopian Christmas (Jan 7) and Timkat (Jan 19) are spectacular.',
    climate: 'Varies enormously (8–35°C). Highlands cooler; lowlands hot.',
    capital: 'Addis Ababa', population: '115 million (2nd most populous in Africa)', currency: 'ETB (1 USD ≈ 56 ETB)',
    language: 'Amharic (official) + 80+ other languages', visa: 'eVisa required (~$52 USD)',
    vaccinations: 'Yellow Fever required. Malaria prophylaxis for lowland areas. Typhoid and Hepatitis A recommended.',
    color: '#3a1a00',
  },
  zanzibar: {
    name: 'Zanzibar', flag: '🏝️', heroEmoji: '🏖️',
    tagline: 'Spice Island Paradise',
    intro: 'Zanzibar is the perfect complement to any East Africa safari. This semi-autonomous archipelago off Tanzania\'s coast offers powder-white beaches, crystal-clear turquoise lagoons, fascinating Swahili culture, and some of the Indian Ocean\'s finest diving and snorkelling. Most visitors combine Zanzibar with 5–6 days of mainland safari.',
    description: 'Zanzibar\'s UNESCO World Heritage Stone Town is a labyrinth of narrow alleys, carved wooden doors, and spice-scented markets that reflect 1,000 years of Indian Ocean trade history. The northern beaches of Nungwi and Kendwa offer swimming year-round (no seaweed), while the eastern beaches of Paje and Jambiani are ideal for kitesurfing. The spice tour, dolphin swimming, and Prison Island giant tortoises are not to be missed.',
    parks: [
      { name: 'Stone Town', desc: 'UNESCO World Heritage. 1,000 years of Swahili trading history.', emoji: '🕌' },
      { name: 'Nungwi Beach', desc: 'North coast. Powder sand, no seaweed, excellent swimming year-round.', emoji: '🏖️' },
      { name: 'Mnemba Atoll', desc: 'World-class snorkelling and diving. Dolphins, sea turtles, coral.', emoji: '🐠' },
      { name: 'Jozani Forest', desc: 'Protected forest home to the endemic Red Colobus monkey.', emoji: '🐒' },
      { name: 'Paje & Jambiani', desc: 'East coast. Kitesurfing capital. Traditional fishing villages.', emoji: '🪁' },
      { name: 'Prison Island', desc: 'Home to giant Aldabra tortoises, some over 100 years old.', emoji: '🐢' },
    ],
    highlights: ['Nungwi & Kendwa white sand beaches', 'UNESCO Stone Town exploration', 'Dolphin swimming in Kizimkazi', 'Spice plantation tour', 'Mnemba Atoll snorkelling', 'Sunset dhow cruise'],
    bestTime: 'June–October and December–February (dry seasons). Avoid March–May (long rains). Temperature is warm year-round (24–32°C).',
    climate: 'Tropical coastal. Hot and humid year-round. 24–32°C.',
    capital: 'Stone Town (Zanzibar City)', population: '1.8 million', currency: 'TZS (1 USD ≈ 2,500 TZS) · USD widely accepted',
    language: 'Swahili & English', visa: 'Same as Tanzania (on arrival or e-Visa)',
    vaccinations: 'Yellow Fever certificate if arriving from endemic country. Malaria prophylaxis recommended.',
    color: '#00213a',
  },
}

export async function generateStaticParams() {
  return Object.keys(DESTINATIONS).map(country => ({ country }))
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params
  const dest = DESTINATIONS[country]
  if (!dest) return {}
  return {
    title: `${dest.name} Safari Tours & Holidays | Safari Trails Africa`,
    description: `Discover ${dest.name} — ${dest.tagline}. ${dest.intro.slice(0, 140)}...`,
    robots: 'index,follow',
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params
  const dest = DESTINATIONS[country]
  if (!dest) notFound()

  const payload = await getPayload({ config })
  const tours = await payload.find({
    collection: 'tours',
    where: { and: [{ _status: { equals: 'published' } }, { countries: { contains: country } }] },
    sort: '-isFeatured,-isPopular',
    limit: 6, depth: 1,
  })

  const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'TouristDestination',
      name: dest.name, description: dest.intro,
      url: `${SITE_URL}/destinations/${country}`,
      touristType: 'Wildlife Enthusiasts, Cultural Tourists, Adventure Seekers',
      includesAttraction: dest.parks.map((p: any) => ({ '@type': 'TouristAttraction', name: p.name, description: p.desc })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Destinations', item: `${SITE_URL}/destinations` },
        { '@type': 'ListItem', position: 3, name: dest.name, item: `${SITE_URL}/destinations/${country}` },
      ],
    },
  ]

  return (
    <>
      {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}
      <main style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

        {/* HERO */}
        <div style={{ height: 520, background: `linear-gradient(135deg, ${dest.color}, ${dest.color}cc)`, display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 220, opacity: 0.12 }}>{dest.heroEmoji}</div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 24px 48px', width: '100%', color: 'white' }}>
            <nav style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 16, flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Home</Link><span>›</span>
              <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>Destinations</Link><span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>{dest.name}</span>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <span style={{ fontSize: 64 }}>{dest.flag}</span>
              <div>
                <h1 style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 6 }}>{dest.name}</h1>
                <p style={{ fontSize: 20, color: '#ffa500', fontWeight: 600 }}>{dest.tagline}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[`🗺️ ${tours.totalDocs} Tours Available`, `💰 From $${tours.docs[0] ? (tours.docs[0] as any).price?.amount?.toLocaleString() : '—'}`, `🌤️ ${dest.bestTime.split('.')[0]}`].map(b => (
                <span key={b} style={{ background: 'rgba(0,0,0,0.4)', padding: '6px 14px', borderRadius: 20, fontSize: 13, backdropFilter: 'blur(4px)' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 48, alignItems: 'start' }}>

          {/* LEFT */}
          <div>
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--foreground)', marginBottom: 20, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>About {dest.name}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)', marginBottom: 18 }}>{dest.intro}</p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--muted-foreground)' }}>{dest.description}</p>
            </section>

            {/* Top Parks */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--foreground)', marginBottom: 24, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Top Parks & Attractions</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {dest.parks.map((park: any) => (
                  <div key={park.name} style={{ padding: '20px', background: 'var(--muted)', borderRadius: 16, border: '1px solid var(--border)' }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{park.emoji}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--foreground)', marginBottom: 6 }}>{park.name}</h3>
                    <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{park.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section style={{ marginBottom: 48 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--foreground)', marginBottom: 20, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>Why Visit {dest.name}?</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {dest.highlights.map((h: string) => (
                  <div key={h} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--foreground)', lineHeight: 1.5, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: '#22c55e', fontWeight: 800, flexShrink: 0 }}>✓</span>{h}
                  </div>
                ))}
              </div>
            </section>

            {/* Tours */}
            {tours.docs.length > 0 && (
              <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--foreground)', marginBottom: 24, borderBottom: '3px solid #ffa500', display: 'inline-block', paddingBottom: 10 }}>
                  {dest.name} Tours ({tours.totalDocs})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {tours.docs.map((tour: any) => (
                    <div key={tour.id} style={{ display: 'flex', gap: 18, alignItems: 'center', padding: '18px', background: 'var(--muted)', borderRadius: 14, border: '1px solid var(--border)' }}>
                      <div style={{ width: 80, height: 80, borderRadius: 10, background: `linear-gradient(135deg, ${dest.color}, #2d5a27)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0, overflow: 'hidden' }}>
                        {tour.featuredImage?.url ? <img src={tour.featuredImage.url} alt={tour.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : dest.heroEmoji}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Link href={`/tours/${tour.slug}`} style={{ fontSize: 16, fontWeight: 700, color: 'var(--foreground)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>{tour.title}</Link>
                        <div style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted-foreground)', flexWrap: 'wrap' }}>
                          <span>📅 {tour.duration} days</span>
                          {tour.difficulty && <span>💪 {tour.difficulty}</span>}
                          {tour.rating > 0 && <span>⭐ {tour.rating.toFixed(1)}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--foreground)' }}>${(tour.price?.amount || 0).toLocaleString()}</div>
                        <Link href={`/tours/${tour.slug}`} style={{ fontSize: 13, color: '#ffa500', fontWeight: 700, textDecoration: 'none' }}>View →</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <Link href={`/tours?country=${country}`} style={{ padding: '12px 28px', background: '#1a3a1a', color: 'white', borderRadius: 50, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
                    View All {tours.totalDocs} {dest.name} Tours →
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'var(--muted)', borderRadius: 20, padding: '24px', border: '1px solid var(--border)', marginBottom: 16 }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--foreground)', marginBottom: 20, borderBottom: '2px solid #ffa500', paddingBottom: 8 }}>
                🌍 {dest.name} Quick Facts
              </h3>
              {[
                { icon: '🏛️', label: 'Capital', value: dest.capital },
                { icon: '👥', label: 'Population', value: dest.population },
                { icon: '💱', label: 'Currency', value: dest.currency },
                { icon: '🗣️', label: 'Language', value: dest.language },
                { icon: '🌤️', label: 'Best Time', value: dest.bestTime.split('.')[0] },
                { icon: '🌡️', label: 'Climate', value: dest.climate },
                { icon: '✈️', label: 'Visa', value: dest.visa },
                { icon: '💉', label: 'Vaccinations', value: dest.vaccinations },
              ].map(item => (
                <div key={item.label} style={{ paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 3 }}>{item.icon} {item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.4 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <Link href={`/tours?country=${country}`} style={{ display: 'block', textAlign: 'center', background: '#ffa500', color: 'white', padding: '16px', borderRadius: 14, textDecoration: 'none', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>
              🗺️ View {dest.name} Tours
            </Link>
            <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#1a3a1a', color: 'white', padding: '14px', borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: 15, marginBottom: 10 }}>
              💬 Plan My {dest.name} Trip
            </Link>
            <Link href="/destinations" style={{ display: 'block', textAlign: 'center', background: 'var(--muted)', color: 'var(--foreground)', padding: '12px', borderRadius: 14, textDecoration: 'none', fontWeight: 600, fontSize: 14, border: '1px solid var(--border)' }}>
              ← All Destinations
            </Link>
          </div>
        </div>

        <style>{`@media(max-width:900px){[style*="grid-template-columns: minmax(0,1fr) 320px"]{grid-template-columns:1fr !important}[style*="position: sticky; top: 100px"]{position:static !important}[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important}}`}</style>
      </main>
    </>
  )
}
