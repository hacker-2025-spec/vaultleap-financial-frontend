'use client'

import React, { useEffect, useRef } from 'react'
import { FaMoneyBillWave, FaExchangeAlt, FaShieldAlt, FaGlobe, FaRegCreditCard, FaRegClock } from 'react-icons/fa'

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    animatedElements?.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      animatedElements?.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  const features = [
    {
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      title: 'Real USD/EUR Accounts',
      description: 'Get actual bank account details for receiving payments globally',
      delay: 0,
    },
    {
      icon: <FaExchangeAlt className="w-6 h-6" />,
      title: 'Automatic Conversion',
      description: 'Deposits automatically convert to digital dollars (USDC)',
      delay: 200,
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'Self-Custody',
      description: 'You control your funds with non-custodial wallets',
      delay: 400,
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: 'Global Access',
      description: 'Use your account from anywhere in the world',
      delay: 100,
    },
    {
      icon: <FaRegCreditCard className="w-6 h-6" />,
      title: 'Easy Payments',
      description: 'Send and receive payments with minimal fees',
      delay: 300,
    },
    {
      icon: <FaRegClock className="w-6 h-6" />,
      title: 'Instant Transfers',
      description: 'Move money in seconds, not days',
      delay: 500,
    },
  ]

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll opacity-0 transition-opacity duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solve Your Global Money Challenges</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            VaultLeap combines the stability of traditional banking with the speed and flexibility of digital currencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`backdrop-blur-md bg-white border border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll opacity-0 transition-opacity duration-1000`}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <div className="bg-primary/10 p-3 rounded-lg text-primary inline-block mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
