'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Headphones } from 'lucide-react'

export const ChatWithSupport: React.FC = () => {
  return (
    <Card className="flex flex-col gap-6 h-full">
      <CardContent className="flex flex-col gap-6 h-full">
        <div className="flex items-center gap-3">
          <Headphones className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground m-0">
            Chat with Support
          </h2>
        </div>

        <p className="text-base text-muted-foreground leading-relaxed">
          Need immediate assistance? Join our Discord community where our support team is available to help you with any questions or issues you might have.
        </p>

        <div className="mt-auto">
          <Button
            onClick={() => window.open('https://discord.gg/EJnaJDxj3k', '_blank')}
            className="w-full sm:w-auto h-11 text-base"
          >
            Join Discord
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
