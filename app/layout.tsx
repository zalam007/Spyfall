import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spyfall - Party Game',
  description: 'A fun party game where players try to figure out who the spy is!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-game bg-gradient-to-br from-blue-900 to-purple-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
