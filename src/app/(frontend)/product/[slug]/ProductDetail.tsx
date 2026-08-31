'use client'

import { useState } from 'react'

type Variant = {
  sku: string
  colour?: string
  colourHex?: string
  size?: string
  price: number
  mrp?: number
  stock: number
}
type ProductImage = { image: { url: string } | string }
type Product = {
  id: string
  title: string
  shortDescription?: string
  highlights?: { point: string }[]
  images?: ProductImage[]
  variants?: Variant[]
}

export default function ProductDetail({ product }: { product: Product }) {
  const variants = product.variants || []
  const colours = Array.from(new Set(variants.map((v) => v.colour).filter(Boolean)))
  const sizes = Array.from(new Set(variants.map((v) => v.size).filter(Boolean)))

  const [selectedColour, setSelectedColour] = useState(colours[0] || '')
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '')

  const selectedVariant = variants.find(
    (v) => v.colour === selectedColour && v.size === selectedSize,
  )
  const images = product.images || []

  return (
    <main className="min-h-screen bg-ground text-ink font-body pb-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-8 grid md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          {images.map((img, i) => {
            const url = typeof img.image === 'object' && img.image ? img.image.url : ''
            return url ? (
              <img key={i} src={url} alt={product.title} className="w-full rounded-lg object-cover" />
            ) : null
          })}
          {images.length === 0 && <div className="aspect-[3/4] bg-surface-alt rounded-lg" />}
        </div>

        <div>
          <h1 className="font-display text-3xl mb-2">{product.title}</h1>

          {selectedVariant ? (
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-xl font-medium">₹{selectedVariant.price}</span>
              {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                <span className="text-ink-muted line-through">₹{selectedVariant.mrp}</span>
              )}
            </div>
          ) : (
            <p className="text-ink-muted mb-6">Select options to see price</p>
          )}

          {colours.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">COLOUR: {selectedColour}</p>
              <div className="flex gap-2">
                {colours.map((c) => {
                  const swatch = variants.find((v) => v.colour === c)?.colourHex || '#ccc'
                  return (
                    <button
                      key={c}
                      onClick={() => setSelectedColour(c!)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColour === c ? 'border-accent' : 'border-line'}`}
                      style={{ backgroundColor: swatch }}
                      aria-label={c}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">SIZE</p>
              <div className="flex gap-2">
                {sizes.map((s) => {
                  const variantForSize = variants.find((v) => v.size === s && v.colour === selectedColour)
                  const outOfStock = !variantForSize || variantForSize.stock === 0
                  return (
                    <button
                      key={s}
                      onClick={() => !outOfStock && setSelectedSize(s!)}
                      disabled={outOfStock}
                      className={`px-4 py-2 border rounded-md text-sm ${selectedSize === s ? 'border-accent bg-accent-tint' : 'border-line'} ${outOfStock ? 'opacity-40 line-through cursor-not-allowed' : ''}`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {product.shortDescription && <p className="text-ink-muted mb-6">{product.shortDescription}</p>}

          {product.highlights && product.highlights.length > 0 && (
            <ul className="list-disc list-inside text-sm text-ink-muted mb-6 space-y-1">
              {product.highlights.map((h, i) => (
                <li key={i}>{h.point}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-line px-4 py-3 flex items-center justify-between md:hidden">
        <span className="font-medium">{selectedVariant ? `₹${selectedVariant.price}` : '—'}</span>
        <button className="bg-accent text-white px-8 py-3 rounded-md font-medium">Add to Bag</button>
      </div>
    </main>
  )
}