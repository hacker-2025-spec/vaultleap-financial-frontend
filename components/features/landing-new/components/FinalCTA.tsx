'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCustomLoginModal } from '@/hooks/useCustomLoginModal'

const FinalCTA: React.FC = () => {
  const [showCookieNotice, setShowCookieNotice] = useState(true)
  const { openModal: openLoginModal } = useCustomLoginModal()

  const handleCookieAccept = () => {
    setShowCookieNotice(false)
  }

  const handleCookieDecline = () => {
    setShowCookieNotice(false)
  }

  return (
    <div className="final-cta bg-cta relative z-10 p-0 min-h-fit flex flex-col justify-center items-center overflow-hidden bg-transparent text-blue-600 h-fit">
      <div className="w-full mx-auto px-6 relative z-10 h-full">
        {/* Final CTA Content */}
        <div className="final-cta-content max-w-2xl mx-auto text-center mt-20 sm:mt-40 mb-100 sm:mb-80">
          <motion.h2
            className="final-cta-title mb-2 sm:mb-6 text-[30px] sm:text-[40px] !text-[#1C1C1E] font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Create Your Account?
          </motion.h2>
          <motion.p
            className="final-cta-subtitle mb-4 sm:mb-8 text-base sm:text-lg text-gray-600/80"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            No commitment. Get started in minutes.
          </motion.p>
          <motion.button
            onClick={openLoginModal}
            className="final-cta-button inline-block text-lg px-8 py-4 font-semibold tracking-wide shadow-[0_10px_25px_rgba(0,102,255,0.3)] transition-all duration-300 w-auto rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-0 relative overflow-hidden z-10 text-center text-white hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,102,255,0.4)] hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-600 active:translate-y-0.5 active:shadow-[0_5px_15px_rgba(0,102,255,0.3)] before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-700 before:-z-10 hover:before:left-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Create Your Account
          </motion.button>
        </div>
      </div>

      {/* Cookie Notice */}
      {showCookieNotice && (
        <motion.div
          className="cookie-notice fixed bottom-0 left-0 right-0 bg-gray-50/90 backdrop-blur-3xl border-t border-black/10 px-6 py-4 flex flex-row items-center justify-between z-50 font-system shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          id="cookie-notice"
        >
          <p className="cookie-text text-xs sm:text-sm text-gray-900 m-0 flex-1 max-w-3xl leading-relaxed font-normal">
            VaultLeap uses cookies, analytics and similar technologies to improve your experience.{' '}
            <a href="#" className="text-blue-700 no-underline hover:opacity-90">
              About our cookies
            </a>
          </p>
          <div className="cookie-actions flex-col sm:flex-row flex gap-3 flex-shrink-0 ml-8">
            <button
              className="btn btn-outline bg-transparent border border-blue-700 text-blue-700 text-xs sm:text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition-all duration-200 min-w-30 text-center hover:bg-blue-700/10"
              id="cookie-decline"
              onClick={handleCookieDecline}
            >
              Manage Cookies
            </button>
            <button
              className="btn btn-primary bg-blue-700 text-white border-0 text-xs sm:text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition-all duration-200 min-w-30 text-center hover:bg-blue-800"
              id="cookie-accept"
              onClick={handleCookieAccept}
            >
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FinalCTA
