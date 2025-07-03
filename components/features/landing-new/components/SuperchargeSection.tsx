'use client'

import React from 'react'
import { motion } from 'framer-motion'
import InfoCard from '@/components/features/landing-new/components/shared/InfoCard'

interface featureProps {
  icon: string
  title: string
  description: string
  theme: 'black' | 'white'
}

const features: featureProps[] = [
  {
    icon: 'receipt_long',
    title: 'TaxLink',
    description: 'Stress-free tax filing with automated reports',
    theme: 'black',
  },
  {
    icon: 'link',
    title: 'Payment Links',
    description: 'Simple payment links with no setup.',
    theme: 'black',
  },
  {
    icon: 'call_split',
    title: 'Auto-Split',
    description: 'Split deposits across multiple accounts.',
    theme: 'black',
  },
  {
    icon: 'swap_horiz',
    title: 'Profit Switch',
    description: 'Smart fund routing based on goals.',
    theme: 'black',
  },
]

const SuperchargeSection: React.FC = () => {
  return (
    <section
      id="modern-tools"
      className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden bg-showcase lg:h-[100vh] section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(112,178,255,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(148,198,255,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="px-6 mt-6 xl:mt-20 mx-auto px-4 relative z-10 max-w-[1280px]">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[40px] font-bold text-gray-900 mb-4">Supercharge Your Finances with Premium Tools</h2>
        </motion.div>

        <InfoCard features={features} />
      </div>
    </section>
  )
}

export default SuperchargeSection
