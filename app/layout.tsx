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
  title: "Cuentas Claras - Calculadora de Gastos Compartidos | Split Event Costs",
  description: "Cuentas Claras: calculadora gratuita online para dividir gastos en eventos, viajes y salidas grupales. Porque cuentas claras conservan la amistad. Free expense splitter tool for events, trips, and group activities.",
  keywords: ["cuentas claras", "calculadora gastos", "dividir cuentas", "split expenses", "expense calculator", "split bill", "calculadora eventos", "divisor de gastos", "compartir gastos", "event cost calculator", "group expenses", "cuentas claras conservan amistad", "Nico Moccagatta", "Nicolas Moccagatta"],
  authors: [{ name: "Nicolas Moccagatta", url: "https://www.nicomoccagatta.com" }],
  creator: "Nicolas Moccagatta",
  publisher: "Nicolas Moccagatta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    url: 'https://cc.nicomoccagatta.com/',
    siteName: 'Cuentas Claras',
    title: 'Cuentas Claras - Calculadora de Gastos Compartidos',
    description: 'Cuentas Claras: herramienta gratuita para dividir gastos en eventos, viajes y salidas grupales. Porque cuentas claras conservan la amistad. Free tool to split expenses for events, trips, and group outings.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cuentas Claras - Calculadora de Gastos Compartidos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuentas Claras - Calculadora de Gastos Compartidos',
    description: 'Cuentas Claras: divide gastos fácilmente en eventos y viajes grupales. Cuentas claras conservan la amistad. Free expense splitter for group events and trips.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://cc.nicomoccagatta.com'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
} : Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
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
        <script
          defer
          src='https://static.cloudflareinsights.com/beacon.min.js'
          data-cf-beacon='{"token": "85f30133b58847ceb11a94ccf67946b4"}'
        ></script>
      </body>
    </html>
  )
}
