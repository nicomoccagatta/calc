import { useState, useEffect } from 'react'

export const useTranslationDetection = () => {
  const [isAutoTranslating, setIsAutoTranslating] = useState(false)

  useEffect(() => {
    let detectionElement: HTMLElement | null = null
    let intervalId: number | null = null
    let currentTranslatingState = false

    const checkTranslation = (): boolean => {
      if (!detectionElement) return false

      const expectedText = 'Hello'
      const actualText = detectionElement.textContent || ''

      // If the text doesn't match what we set, browser translation is active
      return actualText !== expectedText
    }

    const updateTranslationStatus = () => {
      const nowTranslating = checkTranslation()

      if (currentTranslatingState !== nowTranslating) {
        currentTranslatingState = nowTranslating
        setIsAutoTranslating(nowTranslating)

        if (nowTranslating) {
          console.log('[i18n] Browser auto-translation detected, disabling locale switcher')
        } else {
          console.log('[i18n] Browser auto-translation no longer detected, enabling locale switcher')
        }
      }
    }

    // Create a hidden detection element with known text
    detectionElement = document.createElement('div')
    detectionElement.textContent = 'Hello'
    detectionElement.style.position = 'absolute'
    detectionElement.style.left = '-9999px'
    detectionElement.style.visibility = 'hidden'
    detectionElement.setAttribute('aria-hidden', 'true')
    document.body.appendChild(detectionElement)

    // Check periodically if the content has been translated
    intervalId = window.setInterval(updateTranslationStatus, 1000)

    // Initial check
    setTimeout(updateTranslationStatus, 100)

    // Cleanup
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
      if (detectionElement && detectionElement.parentNode) {
        detectionElement.parentNode.removeChild(detectionElement)
      }
    }
  }, [])

  return {
    isAutoTranslating
  }
}
