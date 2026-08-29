import { getPayload } from 'payload'
import config from '@payload-config'

// Temporary manual type — payload-types.ts can't regenerate right now
// because of a known Windows bug in Payload's CLI. Delete this type and
// go back to normal inference once that's fixed.
type World = {
  id: string
  name: string
  tagline?: string
  order?: number
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'worlds' as any,
    sort: 'order',
  })
  const worlds = result.docs as unknown as World[]

  return (
    <main className="min-h-screen bg-ground text-ink font-body">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-16">
        <h1 className="font-display text-4xl md:text-6xl mb-2">VYRELLE</h1>
        <p className="text-ink-muted mb-16">Adorn Every Layer</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worlds.map((world) => (
            <div key={world.id} className="bg-surface border border-line rounded-lg p-6">
              <h2 className="font-display text-2xl mb-2">{world.name}</h2>
              <p className="text-ink-muted">{world.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}