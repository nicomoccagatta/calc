import HomeClient from "@/app/home-client"

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cuentas Claras",
    "alternateName": ["Calculadora de Gastos Compartidos", "Split Event Costs Calculator"],
    "description": "Cuentas Claras: calculadora gratuita online para dividir gastos en eventos, viajes y salidas grupales. Porque cuentas claras conservan la amistad. Free expense splitter tool for events, trips, and group activities.",
    "url": "https://cc.nicomoccagatta.com",
    "brand": {
      "@type": "Brand",
      "name": "Cuentas Claras",
      "slogan": "Cuentas claras conservan la amistad"
    },
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "author": {
      "@type": "Person",
      "name": "Nicolas Moccagatta",
      "email": "nicomoccagatta@gmail.com",
      "url": "https://www.nicomoccagatta.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Nicolas Moccagatta",
      "url": "https://www.nicomoccagatta.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Dividir gastos entre múltiples personas",
      "Calcular automáticamente deudas",
      "Agregar detalles bancarios",
      "Split expenses among multiple people",
      "Automatically calculate debts",
      "Add bank details"
    ],
    "inLanguage": ["es", "en"],
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Nicolas Moccagatta",
      "url": "https://www.nicomoccagatta.com"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient />
    </>
  )
}
