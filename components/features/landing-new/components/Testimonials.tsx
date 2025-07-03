'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface testimonialProps {
  quote: string
  author: {
    initials: string
    name: string
    role: string
  }
}

const testimonials: testimonialProps[] = [
  {
    quote:
      "Clients in the U.S. can pay me like a local business and I keep my earnings in stablecoin. It's simple, fast, and I don't lose money to currency swings anymore.",
    author: {
      initials: 'MS',
      name: 'Maria S.',
      role: 'Web Developer, Argentina',
    },
  },
  {
    quote:
      'I move between Bali, Lisbon, and Mexico City but my income stays stable. VaultLeap gives me a real USD account with instant access, no matter where I am.',
    author: {
      initials: 'AT',
      name: 'Andre T.',
      role: 'Creative Director, Remote',
    },
  },
  {
    quote:
      'We pay contractors in four countries monthly. With VaultLeap, we onboard them quickly and automate splits without spreadsheets.',
    author: {
      initials: 'LK',
      name: 'Lina K.',
      role: 'COO, Remote-first Startup',
    },
  },
]

const Testimonials: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="testimonials"
      className="py-10 sm:py-20 bg-gradient-to-br from-teal-50 to-cyan-50 relative overflow-hidden bg-testimonials md:h-[100vh] flex items-center section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(8,145,178,0.1),transparent_50%),radial-gradient(circle_at_65%_35%,rgba(255,191,71,0.08),transparent_40%),radial-gradient(circle_at_35%_65%,rgba(255,171,51,0.06),transparent_40%)] pointer-events-none bg-white/50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[30px] sm:text-[40px] font-bold text-gray-900 mb-4">What Our Users Say</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-card bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <p className="testimonial-quote text-gray-800">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e6f2ff] border-2 border-[#0066FF] flex items-center justify-center font-bold text-[#0066FF] text-base shadow-[0_2px_8px_rgba(0,102,255,0.15)] mr-4">
                  {testimonial.author.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.author.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
