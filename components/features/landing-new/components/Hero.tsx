'use client'

import React, { useEffect, useState } from 'react'
import VaultCard from '@/components/features/landing-new/components/VaultCard'
import { useCustomLoginModal } from '@/hooks/useCustomLoginModal'
import CustomLogin from '@/components/features/auth/CustomLogin/CustomLogin'

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currencyPosition, setCurrencyPosition] = useState(0)
  const { openModal: openLoginModal } = useCustomLoginModal()

  useEffect(() => {
    // Animate in elements after mount
    setTimeout(() => {
      setIsVisible(true)
    }, 100)
  }, [])

  useEffect(() => {
    // Currency roller animation
    const interval = setInterval(() => {
      setCurrencyPosition((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-hero min-h-screen flex items-center relative overflow-hidden pt-[130px] section">
      <div className="container mx-auto px-4">
        <div className="flex lg:flex-row items-center justify-between gap-10 flex-col-reverse gap-10 mb-[32px]">
          <div
            className={`lg:w-1/2 max-w-full text-center transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            } mb-[32px]`}
          >
            <h1 className="text-[32px] sm:text-[52px] md:text-[60px] lg:text-[70px] font-bold text-gray-900 mb-0 sm:mb-4">
              A{' '}
              <span className="currency-roller">
                <span className={`roller-track position-${currencyPosition}`}>
                  <span className="roller-item">USD</span>
                  <span className="roller-item">EUR</span>
                </span>
              </span>
              <span className="account-text">Account.</span>
            </h1>
            <h1 className="text-[32px] sm:text-[52px] md:text-[60px] lg:text-[70px] font-bold text-gray-900 mb-4 sm:mb-6">For Anyone.</h1>
            <p className="text-base sm:text-xl text-gray-700 mb-4 sm:mb-8 max-w-[500px] text-[17px] lg:text-left">
              The fastest way to hold, move, and get paid in USD/EUR. Powered by Stablecoin
            </p>
            <button
              onClick={openLoginModal}
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shimmer lg:w-full"
            >
              Create Your Account
            </button>
          </div>

          <div
            className={`lg:w-1/2 transition-all duration-1000 delay-300 w-full md:w-[512px] transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <VaultCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
