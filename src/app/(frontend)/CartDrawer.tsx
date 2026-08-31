'use client'

import { useCart } from './CartContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={closeCart} />
      <div className="relative bg-surface w-full max-w-md h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-line">
          <h2 className="font-display text-2xl">Your Bag ({items.length})</h2>
          <button onClick={closeCart} className="text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 && <p className="text-ink-muted">Your bag is empty.</p>}
          {items.map((item) => (
            <div key={`${item.productId}-${item.colour}-${item.size}`} className="flex gap-4 mb-6">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              )}
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-ink-muted">
                  {item.colour} {item.size ? `/ ${item.size}` : ''}
                </p>
                <p className="text-sm">₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.productId, item.colour, item.size, item.quantity - 1)}
                    className="w-6 h-6 border border-line rounded"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.colour, item.size, item.quantity + 1)}
                    className="w-6 h-6 border border-line rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.productId, item.colour, item.size)}
                    className="text-xs underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-line">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-medium">₹{subtotal}</span>
          </div>
          <button className="w-full bg-accent text-white py-3 rounded-md font-medium">Checkout</button>
        </div>
      </div>
    </div>
  )
}