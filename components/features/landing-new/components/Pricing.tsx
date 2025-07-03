'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Standard',
      monthlyPrice: '$0',
      yearlyPrice: '$0',
      subtitle: 'No base fee',
      features: [
        { name: 'Incoming Payment Fee', value: '0.75%' },
        { name: 'Outgoing Payment Fee', value: '0.50%' },
        {
          name: 'Transfer Fees (Included)',
          value: 'ACH, Same-Day ACH, SEPA, Blockchain Fees',
        },
        { name: 'SWIFT Transfer Fee', value: '$25 + 0.075% (pass-through)' },
        { name: 'Vault Features', value: 'Smart Vaults' },
        { name: 'TaxLink Access', value: '–' },
      ],
      cta: 'Get Started',
      ctaStyle: 'btn-outline',
      trial: '',
    },
    {
      name: 'Premium',
      monthlyPrice: '$19',
      yearlyPrice: '$179',
      subtitle: isYearly ? 'per year' : 'per month',
      features: [
        { name: 'Incoming Payment Fee', value: '0.50%' },
        { name: 'Outgoing Payment Fee', value: '0.25%' },
        {
          name: 'Transfer Fees (Included)',
          value: 'ACH, Same-Day ACH, Domestic Wire, SEPA, Blockchain Fees',
        },
        { name: 'SWIFT Transfer Fee', value: 'Free' },
        {
          name: 'Vault Features',
          value: 'Smart Vaults, Auto-Split, Profit Switch',
        },
        { name: 'TaxLink Access', value: 'Included' },
      ],
      cta: 'Try Premium Free',
      ctaStyle: 'btn-primary',
      trial: '14-day trial, no credit card required',
    },
    {
      name: 'Teams',
      monthlyPrice: '$49',
      yearlyPrice: '$470',
      subtitle: isYearly ? 'per year · Up to 3 people' : 'per month · Up to 3 people',
      features: [
        { name: 'Incoming Payment Fee', value: '0.50%' },
        { name: 'Outgoing Payment Fee', value: '0.25%' },
        {
          name: 'Transfer Fees (Included)',
          value: 'ACH, Same-Day ACH, Domestic Wire, SEPA, Blockchain Fees',
        },
        { name: 'SWIFT Transfer Fee', value: 'Free' },
        {
          name: 'Vault Features',
          value: 'Smart Vaults, Auto-Split, Profit Switch',
        },
        { name: 'TaxLink Access', value: 'Included' },
      ],
      cta: 'Start Team Trial',
      ctaStyle: 'btn-primary',
      trial: '14-day trial, no credit card required',
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-green-50 to-teal-50 relative overflow-hidden bg-comparison section">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(20,184,166,0.1),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(13,148,136,0.1),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[36px] font-bold text-gray-900 mb-8">Simple, Transparent Pricing</h2>

          {/* Billing Toggle */}
          <div
            className="flex items-center justify-center gap-2 text-sm text-[#1D1D1F] 
                bg-[rgba(237,245,255,0.5)] px-4 py-2 rounded-full 
                shadow-[0_1px_5px_rgba(0,0,0,0.05)] 
                border border-[rgba(0,102,255,0.1)] 
                backdrop-blur-[10px] max-w-[300px] m-auto"
          >
            <span className="text-gray-600">Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-5 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-[#34C759]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="text-gray-600">
              Yearly <span className="text-xs bg-[#0066FF] text-white px-2 py-1 rounded-full ml-1">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          className="max-w-[1000px] mx-auto overflow-x-auto px-0 py-1 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden bg-white/70 backdrop-blur-[20px] saturate-[180%] border border-white/30">
            <thead>
              <tr>
                <th className="w-1/5 text-left font-semibold border-b border-blue-600/10 text-[#1d1d1f] p-[13px_32px] text-sm"></th>
                {plans.map((plan, index) => (
                  <th key={index} className="w-1/4 font-semibold text-sm border-b border-blue-600/10 text-[#1d1d1f] p-[14px_32px]">
                    <div className="p-[12px_10px] relative text-center min-h-0 flex flex-col justify-center items-center rounded-lg">
                      <h3 className="text-[15px] !font-[500] mb-1 text-[#1D1D1F]">{plan.name}</h3>
                      <div className="text-[32px] font-semibold text-[#0066CC] leading-none mb-0.5 tracking-[-0.02em]">
                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </div>
                      <div className="text-[13px] text-[#86868B] inline-block ml-1 font-normal">{plan.subtitle}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((_, featureIndex) => (
                <tr key={featureIndex} className={`transition-all duration-200 h-[52px] bg-[rgba(237,245,255,1)]`}>
                  <td className="text-blue-700 font-normal text-left text-[13px] border-b border-black/5 leading-[1.35] align-middle tracking-[0.01em] p-[12px_32px]">
                    {plans[0].features[featureIndex].name}
                  </td>
                  {plans.map((plan, planIndex) => (
                    <td
                      key={planIndex}
                      className="text-center font-medium text-[13px] text-[#1d1d1f] border-b border-black/5 leading-[1.35] align-middle tracking-[0.01em] p-[12px_32px]"
                    >
                      {plan.features[featureIndex].value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-[12px_32px_12px] border-t border-blue-600/5"></td>
                {plans.map((plan, index) => (
                  <td key={index} className="p-[12px_32px_12px] border-t border-blue-600/5 text-center">
                    <a
                      href="#"
                      className={`block w-full mt-2 px-5 py-2 text-center text-sm font-medium rounded-lg transition-all duration-300 relative overflow-hidden ${
                        plan.ctaStyle === 'btn-primary'
                          ? 'text-white bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 hover:-translate-y-0.5 active:translate-y-0.5'
                          : 'border border-blue-600 text-blue-600 bg-transparent hover:-translate-y-0.5 hover:bg-blue-600/5 active:translate-y-0.5'
                      } ${!plan.trial && 'mb-4'}`}
                    >
                      {plan.cta}
                    </a>
                    {plan.trial && <p className="text-xs text-gray-600 mt-1 mb-0">{plan.trial}</p>}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing
