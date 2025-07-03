'use client'

import React, { useEffect, useState } from 'react'

const SymbolRoller = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const symbols = ['$', '€']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % symbols.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="symbol-roller inline-flex flex-col overflow-hidden h-[1.1em] relative" style={{ opacity: 1 }}>


      <span
        className={`roller-track transition-transform duration-500 ease-in-out`}
        style={{ transform: `translateY(-${currentIndex * 50}%)`, opacity: 1 }}
      >
        {symbols.map((symbol, index) => (
          <span key={symbol} className="roller-item h-[1.1em] flex items-center" style={{ opacity: 1 }}>
            {symbol}
          </span>
        ))}
      </span>
    </span>
  )
}

export default SymbolRoller
