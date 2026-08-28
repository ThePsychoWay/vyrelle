import { getPayload } from 'payload'
import config from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const { docs: worlds } = await payload.find({
    collection: 'worlds',
    sort: 'order',
  })

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>VYRELLE</h1>
      <p>Adorn Every Layer</p>

      <div style={{ display: 'grid', gap: '24px', marginTop: '40px' }}>
        {worlds.map((world) => (
          <div key={world.id} style={{ border: '1px solid #E8E2D9', padding: '16px' }}>
            <h2>{world.name}</h2>
            <p>{world.tagline}</p>
          </div>
        ))}
      </div>
    </main>
  )
}