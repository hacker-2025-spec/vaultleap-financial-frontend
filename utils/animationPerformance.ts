// Performance monitoring for animations
export const measureAnimationPerformance = (animationName: string) => {
  const startTime = performance.now()

  return () => {
    const endTime = performance.now()
    const duration = endTime - startTime

    if (duration > 16) {
      // 60fps threshold
      console.warn(`Animation "${animationName}" took ${duration.toFixed(2)}ms, may cause jank`)
    }
  }
}

// Debounce function for scroll events
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for performance-critical events
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
