'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

interface UnifiedAnimateOnScrollProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  once?: boolean
}

const UnifiedAnimateOnScroll = ({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 20,
  duration = 0.6,
  once = true,
}: UnifiedAnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    margin: '-100px 0px -100px 0px',
    amount: 0.1,
  })

  const getInitialState = useCallback(() => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance }
      case 'down':
        return { opacity: 0, y: -distance }
      case 'left':
        return { opacity: 0, x: distance }
      case 'right':
        return { opacity: 0, x: -distance }
      case 'fade':
      default:
        return { opacity: 0 }
    }
  }, [direction, distance])

  const getAnimateState = useCallback(() => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'fade':
      default:
        return { opacity: 1 }
    }
  }, [direction])

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay: delay / 1000, // Convert ms to seconds
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default UnifiedAnimateOnScroll
