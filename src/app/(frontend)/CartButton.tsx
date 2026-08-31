'use client'

import { useCart } from './CartContext'

export default function CartButton() {
  const { items, openCart } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <button
      onClick={openCart}
      className="fixed top-6 right-6 z-40 bg-surface border border-line rounded-full w-12 h-12 flex items-center justify-center shadow-sm"
    >
      🛍️
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  )
}