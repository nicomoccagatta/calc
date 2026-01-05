"use client"

import { useEffect, useState } from "react"

export default function BackgroundLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Preload background image after initial render
    const img = new Image()
    img.src = '/background.webp'
    img.onload = () => setLoaded(true)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundImage: loaded
          ? 'image-set(url("/background.webp") type("image/webp"), url("/background.jpeg") type("image/jpeg"))'
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in',
      }}
    />
  )
}
