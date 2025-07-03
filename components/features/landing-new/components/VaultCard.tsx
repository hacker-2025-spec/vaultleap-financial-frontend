'use client'

import React, { useEffect, useState } from 'react'

const VaultCard: React.FC = () => {
  const [rollerPosition, setRollerPosition] = useState(0)

  // Currency roller animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRollerPosition((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-3xl shadow-2xl overflow-hidden w-full max-w-lg mx-auto bg-[rgba(255,255,255,.7)] backdrop-blur-[25px] backdrop-saturate-[180%]">
      <div className="py-4 sm:py-5 px-4 sm:px-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[rgba(28,28,30)] text-base font-semibold">Good afternoon, John Doe</div>
          <div className="text-xs font-semibold text-[rgb(10,102,194)] bg-[rgba(10,102,194,0.15)] rounded-xl px-2.5 py-1">Premium</div>
        </div>

        <div className="mb-2">
          <div className="text-xs text-[rgb(28,28,30)] mb-1 flex items-center backdrop-blur-sm w-fit font-medium gap-1.5 bg-[rgba(10,102,194,0.08)] px-2.5 py-0.5 rounded-md">
            <span className="inline-block w-[10px] h-[10px] bg-[rgb(10,102,194)] mr-1.5 rounded-[2px]"></span>
            <span>Available Balance</span>
          </div>

          <div className="text-4xl font-medium text-[3.6rem] my-7 flex items-center font-currency">
            <span className="inline-block relative w-[1em] h-[1.2em] overflow-hidden mr-[0.1em]">
              <span className={`roller-track position-${rollerPosition}`}>
                <span className="roller-item">$</span>
                <span className="roller-item">€</span>
              </span>
            </span>
            <span className="amount-roller">
              <span className={`roller-track position-${rollerPosition}`}>
                <span className="roller-item">24,586.75</span>
                <span className="roller-item">22,674.38</span>
              </span>
            </span>
          </div>

          <div className="flex space-x-3 mt-6 pb-2 border-b border-[rgba(0,0,0,.1)]">
            <button className="vaultcard-button">Deposit</button>
            <button className="vaultcard-button">Withdraw</button>
            <button className="vaultcard-button">Send</button>
          </div>
        </div>

        <div className="py-[6px]">
          <div className="mb-3">
            <div className="color-lblack font-[16px] font-semibold">USD Account</div>
          </div>

          <div className="backdrop-blur-sm rounded-xl p-4 border border-[rgba(0,102,255,.3)] shadow-lg shadow-[rgba(0,102,255,0.15)] bg-[rgba(255,255,255,.45)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="py-2 border-b border-[rgba(0,0,0,.05)]">
                <div className="banking-text">Account Name</div>
                <div className="banking-text-detail">John Doe</div>
              </div>
              <div className="py-2 border-b border-[rgba(0,0,0,.05)]">
                <div className="banking-text">Bank Name</div>
                <div className="banking-text-detail">Lead Bank</div>
              </div>
              <div className="py-2 border-b border-[rgba(0,0,0,.05)]">
                <div className="banking-text">Account Number</div>
                <div className="banking-text-detail">1234567890</div>
              </div>
              <div className="py-2 border-b border-[rgba(0,0,0,.05)]">
                <div className="banking-text">Routing Number</div>
                <div className="banking-text-detail">021000021</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultCard
