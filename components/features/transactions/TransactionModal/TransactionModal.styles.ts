'use client'

import { cn } from '@/lib/utils'

// Animation keyframes
export const sonarPingAnimation = 'animate-ping'

// Helper functions for conditional styling
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-500'
    case 'SUCCESS':
      return 'bg-green-600'
    default:
      return 'bg-red-500'
  }
}

export const getStageTextStyles = (isDone?: boolean, isActive?: boolean, isError?: boolean) => {
  return cn(
    'font-inter',
    isDone ? 'text-gray-200' : 'text-gray-200',
    isActive && 'text-white',
    isError && 'text-red-500'
  )
}

export const getProgressDotStyles = (isActive?: boolean, isDone?: boolean) => {
  return cn(
    'w-[15px] h-[15px] rounded-full relative -left-[25px] flex items-center justify-center mr-2',
    isDone ? 'bg-green-600' : isActive ? 'bg-green-400' : 'bg-green-800',
    isActive && 'before:content-[""] before:absolute before:w-[15px] before:h-[15px] before:rounded-full before:bg-green-600/50 before:animate-ping'
  )
}

export const getProgressLineStyles = (stages: number, currentStageIndex: number) => {
  const heightPercentage = ((currentStageIndex + 1) / stages) * 100
  
  return cn(
    'absolute left-[-19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white from-50% to-transparent to-50% bg-[length:2px_10px]',
    'before:content-[""] before:absolute before:left-0 before:top-0 before:w-[2px]',
    `before:h-[${heightPercentage}%] before:bg-green-600 before:transition-all before:duration-300`
  )
}
