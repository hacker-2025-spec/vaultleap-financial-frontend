'use client'

import React, { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

const GlassCard = ({ children, className = '', onClick }: GlassCardProps) => {
  return (
    <div 
      className={`backdrop-blur-md bg-white/30 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default GlassCard
