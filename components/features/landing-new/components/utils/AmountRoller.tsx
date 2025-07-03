'use client'

import React, { useEffect, useState } from 'react'

const AmountRoller = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const amounts = ['24,586.75', '22,674.38']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % amounts.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="amount-roller inline-flex flex-col overflow-hidden h-[1.1em] relative" style={{ opacity: 1 }}>

      <span
        className={`roller-track transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateY(-${currentIndex * 50}%)`, opacity: 1 }}
      >
        {amounts.map((amount, index) => (
          <span key={amount} className="roller-item h-[1.1em] flex items-center" style={{ opacity: 1 }}>
            {amount}
          </span>
        ))}
      </span>
    </span>
  )
}

export default AmountRoller
