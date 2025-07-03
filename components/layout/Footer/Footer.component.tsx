'use client'

import React from 'react'
import Link from 'next/link'
import { Discord, Twitter } from '@/components/shared/icons/index'
import { SectionLayoutComponent } from '@/components/layout/SectionLayout/index'
import type { FooterComponentProps } from './Footer.types'
import { TWITTER_URL } from '@/config/config'
import { cn } from '@/lib/utils'

export const FooterComponent: React.FC<FooterComponentProps> = ({ hasSocials, className, ...props }) => {
  return (
    <SectionLayoutComponent>
      <div
        className={cn(
          "flex flex-row justify-between items-center py-3 md:flex-row-reverse md:w-full md:items-end md:gap-4",
          className
        )}
        {...props}
      >
        <div className={cn(
          "w-full flex flex-row justify-between items-center gap-1 flex-5",
          !hasSocials && "items-start w-auto"
        )}>
          <div className="w-full flex flex-row justify-start items-center gap-1 flex-1">
            <span className="text-white text-sm font-inter">ⓒ </span>
            <span className="text-white text-sm font-inter">2023 - 2025 Klydo, LLC.</span>
          </div>
          {hasSocials && (
            <div className="flex flex-row justify-center items-center gap-4 h-16 -mr-[45px] z-10 md:justify-end md:gap-4 md:mr-0">
              <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="h-[37px]">
                <Twitter size={37} />
              </a>
              <a href="https://discord.gg/EJnaJDxj3k" target="_blank" rel="noopener noreferrer" className="h-[37px]">
                <Discord size={37} style={{ marginTop: 1 }} />
              </a>
            </div>
          )}
        </div>
        <div className="flex flex-row gap-2 justify-end w-full flex-5 md:w-auto">
          <Link
            href="/faq"
            className="text-white text-sm font-inter no-underline hover:text-[#F0F0F0] active:text-[#E0E0E0]"
          >
            Help Center
          </Link>
          <span className="text-white text-sm font-inter">|</span>
          <Link
            href="/terms-of-service"
            className="text-white text-sm font-inter no-underline hover:text-[#F0F0F0] active:text-[#E0E0E0]"
          >
            Terms Of Service
          </Link>
          <span className="text-white text-sm font-inter">|</span>
          <Link
            href="/privacy-policy"
            className="text-white text-sm font-inter no-underline hover:text-[#F0F0F0] active:text-[#E0E0E0]"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </SectionLayoutComponent>
  )
}
