import React from "react"
import "@/styles/globals.css";
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="fixed w-full bg-neutral-100 z-20">
          <div className="flex flex-row p-4">
            <Link href="/">Habyt</Link>
          </div>
        </nav>
        <main className="pt-16">
          { children }
        </main>
      </body>
    </html>
  )
}