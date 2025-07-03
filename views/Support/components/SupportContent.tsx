'use client'

import React from 'react'
import { ChatWithSupport } from './ChatWithSupport'
import { SupportTicketForm } from './SupportTicketForm'
import { HelpCenter } from './HelpCenter'

export const SupportContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl font-bold text-foreground m-0">
        Support
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChatWithSupport />
        <SupportTicketForm />
      </div>

      <HelpCenter />
    </div>
  )
}
