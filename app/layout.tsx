import type { Metadata } from "next"
import localFont from "next/font/local"
import { Theme } from "@radix-ui/themes"
import bg from '../public/background.jpeg'
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Calculadora - Division de gastos",
  description: "App utilitaria para division de gastos",
}

export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme
          accentColor="orange"
          grayColor="slate"
          // appearance="dark"
          radius="full"
          style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}
        >
          {children}
        </Theme>
      </body>
    </html>
  )
}
