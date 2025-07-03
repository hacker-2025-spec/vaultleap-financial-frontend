'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface stepProps {
  number: number
  title: string
  description: string
}

const steps: stepProps[] = [
  {
    number: 1,
    title: 'Sign Up',
    description: 'Fast ID verification',
  },
  {
    number: 2,
    title: 'Get Your Accounts',
    description: 'Banking details ready immediately',
  },
  {
    number: 3,
    title: 'Receive Payments',
    description: 'Accept payments globally',
  },
  {
    number: 4,
    title: 'Use Your Money',
    description: 'Transfer with low fees',
  },
]

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="how-it-works"
      className="py-5 sm:py-20 bg-gradient-to-br from-yellow-50 to-green-50 relative overflow-hidden min-h-screen flex items-center bg-how section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(22,163,74,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-[30px] sm:text-[40px] font-bold text-gray-900 mb-10 sm:mb-34 md:mb-40 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get Started in Four Steps
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Horizontal line connecting all steps */}
          <div
            className="hidden md:block h-2 bg-gradient-to-r from-[rgba(52,120,246,0.2)] to-[rgba(52,120,246,0.4)] 
             absolute top-[26px] left-[8%] right-[8%] z-10 rounded-[10px]
             shadow-[0_3px_10px_rgba(0,102,255,0.15)] backdrop-blur-[5px]
             border border-[rgba(255,255,255,0.4)] origin-left
             animate-expandLine"
            style={{
              WebkitBackdropFilter: 'blur(5px)',
            }}
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-10 h-10 sm:w-[60px] sm:h-[60px] mx-auto mb-4 rounded-full flex items-center justify-center text-xl font-bold relative z-10 transition-colors duration-300 ${
                    activeStep === index ? 'bg-[#3478F6] text-white shadow-lg' : 'bg-white text-[#3478F6] border-2 border-white'
                  }`}
                  animate={{
                    scale: activeStep === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
