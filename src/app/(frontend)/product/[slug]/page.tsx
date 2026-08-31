import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import ProductDetail from './ProductDetail'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products' as any,
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  const product = result.docs[0]

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product as any} />
}