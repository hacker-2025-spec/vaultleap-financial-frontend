'use client'

import React, { useEffect, useState } from 'react'

const CurrencyRoller = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currencies = ['USD', 'EUR']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currencies.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="currency-roller inline-flex flex-col overflow-hidden h-[1.1em] relative">
      <div 
        className="roller-track transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${currentIndex * 50}%)` }}
      >
        {currencies.map((currency, index) => (
          <span 
            key={currency} 
            className="roller-item h-[1.1em] flex items-center text-brand-primary"
          >
            {currency}
          </span>
        ))}
      </div>
    </span>
  )
}

export default CurrencyRoller
