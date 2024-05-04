import type { Metadata } from "next"
import { PT_Serif } from "next/font/google"
import { PT_Sans } from "next/font/google"
import "./globals.css"

const pt_serif = PT_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
})

const pt_sans = PT_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-pt-sans",
})

export const metadata: Metadata = {
  title: "Inverse Matrix",
  description: "Inverse of a Matrix using the Gaussian Elimination Method",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${pt_serif.variable} ${pt_sans.variable}`}>
      <body className={`bg-zinc-200`}>{children}</body>
    </html>
  )
}
