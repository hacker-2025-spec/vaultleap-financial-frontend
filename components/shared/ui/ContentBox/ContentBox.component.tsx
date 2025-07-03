'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { InfoIcon, InfoIconWhite } from '@/components/shared/icons/index'
import type { ContentBoxComponentProps } from './ContentBox.types'

export const ContentBoxComponent: React.FC<ContentBoxComponentProps> = ({
  children,
  tooltipText,
  tooltipVariant = 'default',
  showWhiteTooltip = false,
  variant,
  placement = 'top',
  className,
  ...props
}) => {
  // Map variant to Tailwind classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'transparent':
        return 'bg-transparent p-0 border-0'
      case 'dark':
        return 'bg-[#1E5594] p-5 border-8 border-primary-light rounded-[10px]'
      case 'darker':
        return 'bg-[#0c5186] p-4 md:p-6 shadow-md rounded-[10px] border-0 relative w-[calc(100%-20px)] before:content-[""] before:absolute before:-top-[10px] before:-left-[9px] before:p-0 before:w-[calc(100%+20px)] before:h-[calc(100%+20px)] before:rounded-[10px] before:bg-[#0c5186] before:-z-10'
      case 'light':
        return 'bg-[#1279c7] p-4 md:p-6 rounded-[10px] border-0 w-full text-white'
      case 'creator':
        return 'bg-[#1279c7] p-4 md:p-6 rounded-[10px] border-0 w-full'
      case 'black':
        return 'bg-[#30343B] p-4 md:p-6 shadow-md rounded-[10px] border-0 relative left-[9px] w-[calc(100%-20px)] before:content-[""] before:absolute before:-top-[10px] before:-left-[9px] before:p-[10px] before:w-[calc(100%+20px)] before:h-[calc(100%+20px)] before:rounded-[10px] before:bg-[#20252C] before:-z-10'
      case 'containerBlack':
        return 'bg-[#2A2D33] p-4 rounded-[10px] border-0 w-[calc(100%+30px)]'
      case 'default':
      default:
        return 'bg-[#144465] p-4 md:p-6 text-[#bfbfbf] rounded-[10px] border-0 w-full'
    }
  }

  // Map tooltip placement to shadcn side
  const getSide = () => {
    switch (placement) {
      case 'top': return 'top'
      case 'bottom': return 'bottom'
      case 'left': return 'left'
      case 'right': return 'right'
      default: return 'top'
    }
  }

  return (
    <div className={cn(
      'w-full flex flex-col items-center relative',
      getVariantClasses(),
      className
    )} {...props}>
      {tooltipText && (
        <div className="absolute top-1 right-1 z-[1000]">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-transparent"
                >
                  {!showWhiteTooltip ? <InfoIcon size={20} /> : <InfoIconWhite size={20} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side={getSide()}
                className="max-w-[684px] p-0 bg-transparent border-0"
              >
                <div className={cn(
                  'text-sm whitespace-pre-wrap',
                  getVariantClasses()
                )}>
                  {tooltipText}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      <div className="flex items-center w-full z-[100]">
        {children}
      </div>
    </div>
  )
}
