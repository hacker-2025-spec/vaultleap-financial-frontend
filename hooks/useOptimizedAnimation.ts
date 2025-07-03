import { useCallback, useRef, useEffect } from 'react'

interface UseOptimizedAnimationOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

export const useOptimizedAnimation = (options: UseOptimizedAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '-50px 0px -50px 0px', once = true, delay = 0 } = options

  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        if (delay > 0) {
          setTimeout(() => setIsVisible(true), delay)
        } else {
          setIsVisible(true)
        }

        if (once && observerRef.current) {
          observerRef.current.unobserve(entry.target)
        }
      } else if (!once) {
        setIsVisible(false)
      }
    },
    [delay, once]
  )

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersection, threshold, rootMargin])

  return { elementRef, isVisible }
}
