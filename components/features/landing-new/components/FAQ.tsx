'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface faqProps {
  question: string
  answer: string
}

const faqs: faqProps[] = [
  {
    question: 'How fast are transfers?',
    answer:
      'Instant ACH: 1-2 hours. Traditional ACH/wires: 1-2 business days. Blockchain transfers: near-instant. No manual approval queues — just direct, predictable settlement.',
  },
  {
    question: 'Available outside US/Europe?',
    answer:
      'Yes — available in 150+ countries with no US/EU residency required. Just valid ID and quick verification. Perfect for global freelancers, founders, and remote workers needing stable financial infrastructure.',
  },
  {
    question: 'Is VaultLeap regulated?',
    answer:
      'We follow strict AML/KYC standards and meet international compliance requirements. As a self-custodial platform, user funds remain under your control while moving through secure rails. Built to uphold regulatory standards without legacy limitations.',
  },
  {
    question: 'How do I withdraw to my bank?',
    answer:
      'Open Pay & Transfer, enter your bank details, initiate transfer. Your stablecoin balance converts automatically, with funds arriving in 1-2 business days. No forms, no waiting rooms — just direct money movement.',
  },
  {
    question: 'Need a crypto wallet?',
    answer:
      'No — we generate a secure, self-custodial wallet automatically. No seed phrases or complex setup. Login with email/device, protected by encrypted key management and biometric recovery. Crypto infrastructure with a modern banking experience.',
  },
  {
    question: 'What are stablecoins?',
    answer:
      'Digital assets pegged 1:1 to currencies like USD. VaultLeap uses stablecoins because they combine fiat reliability with blockchain flexibility. Your money moves faster, stays global, and remains accessible without crypto volatility.',
  },
]

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="faq"
      className="py-10 sm:py-20 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden bg-faq xl:h-[100vh] section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(37,99,235,0.1),transparent_50%),radial-gradient(circle_at_65%_35%,rgba(204,153,255,0.08),transparent_40%),radial-gradient(circle_at_35%_65%,rgba(204,153,255,0.06),transparent_40%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[30px] sm:text-[40px] font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="faq-container glass-container bg-white/20 backdrop-blur-xl border border-white/50 rounded-3xl p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-8 shadow-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item mb-4 h-full flex flex-col" aria-labelledby={`faq-question-${index + 1}`} role="region">
                <div
                  className={`faq-question bg-white/15 border border-white/30 rounded-2xl p-6 xl:p-8 cursor-pointer flex justify-between items-center font-medium text-lg leading-relaxed transition-all duration-300 flex-none shadow-sm h-25 text-black hover:bg-white/25 hover:-translate-y-0.5 hover:shadow-md focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 ${
                    openIndex === index ? 'active' : ''
                  }`}
                  id={`faq-question-${index + 1}`}
                  aria-expanded={openIndex === index}
                  tabIndex={0}
                  role="button"
                  onClick={() => toggleFAQ(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleFAQ(index)
                    }
                  }}
                >
                  <span className="flex-1 pr-4 text-black font-medium">{faq.question}</span>
                  <motion.i
                    className="fas fa-chevron-down text-blue-600 transition-transform duration-300 flex-none mt-1 text-lg"
                    aria-hidden="true"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer flex-1 overflow-hidden bg-white/10 rounded-b-2xl -mt-1.5 px-6 xl:px-8 border border-white/30 border-t-0 opacity-0"
                      initial={{
                        maxHeight: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      animate={{
                        maxHeight: '800px',
                        opacity: 1,
                        paddingTop: '2rem',
                        paddingBottom: '2rem',
                      }}
                      exit={{
                        maxHeight: 0,
                        opacity: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                      transition={{ duration: 0.1, ease: 'easeInOut' }}
                    >
                      <p className="m-0 text-lg leading-relaxed text-gray-600 max-w-full break-words">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ
