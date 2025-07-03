'use client'

import React from 'react'
import { motion } from 'framer-motion'
import InfoCard from '@/components/features/landing-new/components/shared/InfoCard'

interface featureProps {
  icon: string
  title: string
  description: string
  theme: string
}

const features: featureProps[] = [
  {
    icon: 'attach_money',
    title: 'USD Account',
    description: 'US account number, routing & wire details',
    theme: 'blue',
  },
  {
    icon: 'euro_symbol',
    title: 'EUR Account',
    description: 'Full EU account details with IBAN & SWIFT',
    theme: 'blue',
  },
  {
    icon: 'token',
    title: 'Stablecoin Conversion',
    description: 'Fiat-to-Stablecoin and Stablecoin-to-fiat conversions',
    theme: 'blue',
  },
  {
    icon: 'swap_horiz',
    title: 'Global Transfers',
    description: 'ACH, SEPA, blockchain, wire',
    theme: 'blue',
  },
]

const CoreFeatures: React.FC = () => {
  return (
    <section
      id="modern-tools"
      className="py-5 sm:py-20 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden bg-modern-tools lg:h-[100vh] section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(112,178,255,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(148,198,255,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="px-6 my-4 xl:mt-20 mx-auto px-4 relative z-10 max-w-[1280px]">
        <motion.div
          className="text-center mb-5 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[28px] sm:text-[40px] font-bold text-gray-900 mb-4">
            Everything You Need to Get Paid, Hold Currency, and Move Money
          </h2>
        </motion.div>

        <InfoCard features={features} />
      </div>
    </section>
  )
}

export default CoreFeatures
