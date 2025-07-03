'use client'

import { cn } from '@/lib/utils'

export const getShareTemplateBoxStyles = ({
  isActive,
  comingSoon,
  disabled,
}: {
  isActive: boolean
  comingSoon: boolean
  disabled: boolean
}) => {
  return cn(
    'relative box-border flex flex-col gap-8 lg:gap-4 p-4 md:p-6 rounded-[10px] border-0 w-full',
    isActive ? 'bg-[#1279c7]' : 'bg-[#0c5186]',
    !comingSoon && 'cursor-pointer hover:bg-[#2595EB]',
    disabled && 'pointer-events-none opacity-50',
    'before:content-[""] before:absolute before:-top-[3px] before:-left-[3px] before:-right-[3px] before:-bottom-[3px] before:rounded-[13px] before:bg-gradient-to-r before:from-[rgba(0,180,216,0.3)] before:via-[#00CAB8] before:to-[rgba(0,180,216,0.3)] before:bg-[length:200%_200%] before:-z-10',
    isActive
      ? 'before:opacity-100 before:animate-[borderGlow_4s_linear_infinite] before:brightness-120'
      : 'before:opacity-0',
    'hover:before:opacity-100 hover:before:animate-[borderGlow_4s_linear_infinite] hover:before:brightness-120',
    'hover:after:content-[""] hover:after:absolute hover:after:bg-white/10 hover:after:w-full hover:after:h-full hover:after:rounded-[10px] hover:after:z-[100] hover:after:-top-[10px] hover:after:-left-[9px] hover:after:opacity-10'
  )
}

export const comingSoonStyles = 'text-white text-sm text-center absolute top-2 right-2'
export const premiumOnlyStyles = 'text-white text-sm text-center absolute top-2 right-2'
export const titleStyles = 'text-white text-2xl text-center lg:leading-[120%]'
export const descriptionStyles = 'text-white text-sm text-center'
