import { getPayload } from 'payload'
import config from '@payload-config'

// Temporary manual types — same known Windows CLI bug as before
type World = {
  id: string
  name: string
  tagline?: string
}
type HomeGlobal = {
  heroImage: { url: string } | string
  heroHeadline: string
  heroSubline: string
  heroCtaText: string
  heroCtaLink: string
}

const trustItems = [
  { label: 'Free delivery above ₹799' },
  { label: 'Easy 7-day returns' },
  { label: 'COD available' },
  { label: 'Secure payments' },
]

export default async function HomePage() {
  const payload = await getPayload({ config })

  const worldsResult = await payload.find({ collection: 'worlds' as any, sort: 'order' })
  const worlds = worldsResult.docs as unknown as World[]

  const home = (await payload.findGlobal({
    slug: 'home' as any,
    depth: 1,
  })) as unknown as HomeGlobal

  const heroImageUrl = typeof home.heroImage === 'object' ? home.heroImage.url : ''

  return (
    <main className="min-h-screen bg-ground text-ink font-body">
      {/* HERO — single full-bleed image, one headline, one CTA. No carousel. */}
      <section className="relative h-screen w-full">
        <img
          src={heroImageUrl}
          alt={home.heroHeadline}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-4">
            {home.heroHeadline}
          </h1>
          <p className="text-white/90 mb-8 max-w-md">{home.heroSubline}</p>
          
            <a href={home.heroCtaLink}
            className="bg-accent text-white px-8 py-3 rounded-md font-medium"
          >
            {home.heroCtaText}
          </a>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-16">
        {/* WORLDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {worlds.map((world) => (
            <div key={world.id} className="bg-surface border border-line rounded-lg p-6">
              <h2 className="font-display text-2xl mb-2">{world.name}</h2>
              <p className="text-ink-muted">{world.tagline}</p>
            </div>
          ))}
        </div>

        {/* TRUST ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-line pt-12">
          {trustItems.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-sm text-ink-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}