import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'

// Temporary manual types — same known Windows CLI bug as before
type World = {
  id: string
  name: string
  seoH1?: string
  coverImage?: { url: string } | string
}
type Subcategory = {
  id: string
  name: string
}
type Product = {
  id: string
  title: string
  images?: { image: { url: string } | string }[]
  variants?: { price: number }[]
}

export default async function WorldPage({ params }: { params: Promise<{ world: string }> }) {
  const { world: worldSlug } = await params
  const payload = await getPayload({ config })

  const worldResult = await payload.find({
    collection: 'worlds' as any,
    where: { slug: { equals: worldSlug } },
    limit: 1,
  })
  const world = worldResult.docs[0] as unknown as World | undefined

  if (!world) {
    notFound()
  }

  const subcatsResult = await payload.find({
    collection: 'subcategories' as any,
    where: { world: { equals: world.id } },
    sort: 'order',
  })
  const subcategories = subcatsResult.docs as unknown as Subcategory[]

  const productsResult = await payload.find({
    collection: 'products' as any,
    where: { world: { equals: world.id } },
    depth: 1,
  })
  const products = productsResult.docs as unknown as Product[]

  const coverImageUrl =
    typeof world.coverImage === 'object' && world.coverImage ? world.coverImage.url : ''

  return (
    <main className="min-h-screen bg-ground text-ink font-body">
      {/* COVER */}
      <section className="relative h-[60vh] w-full flex items-end">
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt={world.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 px-4 md:px-20 pb-12 text-white">
          <p className="uppercase tracking-widest text-sm mb-2">{world.name}</p>
          <h1 className="font-display text-4xl md:text-6xl">{world.seoH1 || world.name}</h1>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-16">
        {/* SUBCATEGORY TILES */}
        {subcategories.length > 0 && (
          <div className="flex gap-4 overflow-x-auto mb-16">
            {subcategories.map((sub) => (
              <div
                key={sub.id}
                className="shrink-0 bg-surface-alt rounded-lg px-6 py-4 text-center min-w-[140px]"
              >
                <p className="font-medium">{sub.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const firstImage = product.images?.[0]?.image
            const imageUrl = typeof firstImage === 'object' && firstImage ? firstImage.url : ''
            const price = product.variants?.[0]?.price

            return (
              <div key={product.id}>
                <div className="aspect-[3/4] bg-surface-alt rounded-lg overflow-hidden mb-3">
                  {imageUrl && (
                    <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <p className="text-sm">{product.title}</p>
                {price && <p className="text-sm text-ink-muted">₹{price}</p>}
              </div>
            )
          })}
        </div>

        {products.length === 0 && (
          <p className="text-ink-muted text-center py-12">Nothing here yet.</p>
        )}
      </div>
    </main>
  )
}