'use client'

import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export const BaseHeaderNotifications = () => {
  const openNotificationList = () => {}

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 bg-black/10 hover:bg-black/20 rounded-full"
        onClick={openNotificationList}
      >
        <Bell className="h-5 w-5 text-foreground" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
          4
        </span>
      </Button>
    </div>
  )
}
