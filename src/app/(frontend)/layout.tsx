import React from 'react'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import './styles.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata = {
  description: 'VYRELLE — Adorn Every Layer',
  title: 'VYRELLE',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}