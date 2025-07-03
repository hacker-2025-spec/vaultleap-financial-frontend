import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useCallback } from 'react'

import NewLandingPage from '@/views/NewLandingPage/NewLandingPage'

export const Route = createFileRoute('/_public/')({
  component: Index,
})

function Index() {
  // Optimized scroll animation handler with throttling
  const handleScrollAnimations = useCallback(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll')

    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-fade-in')
      }
    })
  }, [])

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false

    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollAnimations()
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check for elements in view on load
    handleScrollAnimations()

    // Add throttled scroll event listener
    window.addEventListener('scroll', throttledScrollHandler, { passive: true })

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler)
    }
  }, [handleScrollAnimations])

  return <NewLandingPage />
}
