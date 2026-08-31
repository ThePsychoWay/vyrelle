'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItem = {
  productId: string
  slug: string
  title: string
  imageUrl: string
  colour?: string
  size?: string
  price: number
  quantity: number
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (productId: string, colour?: string, size?: string) => void
  updateQuantity: (productId: string, colour: string | undefined, size: string | undefined, quantity: number) => void
  openCart: () => void
  closeCart: () => void
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  // Read whatever was saved from last time, once, when the site first loads
  useEffect(() => {
    const saved = localStorage.getItem('vyrelle-cart')
    if (saved) setItems(JSON.parse(saved))
    setHasLoaded(true)
  }, [])

  // Save to localStorage every time the cart changes — but not before that first load finishes
  useEffect(() => {
    if (hasLoaded) localStorage.setItem('vyrelle-cart', JSON.stringify(items))
  }, [items, hasLoaded])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.colour === newItem.colour && i.size === newItem.size,
      )
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (productId: string, colour?: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.colour === colour && i.size === size)))
  }

  const updateQuantity = (
    productId: string,
    colour: string | undefined,
    size: string | undefined,
    quantity: number,
  ) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.colour === colour && i.size === size
          ? { ...i, quantity: Math.max(1, quantity) }
          : i,
      ),
    )
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside a CartProvider')
  return context
}