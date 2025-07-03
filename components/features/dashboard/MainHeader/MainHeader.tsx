import React, { lazy, Suspense } from 'react'
import { AccountStatusCta } from '@/components/features/membership/AccountStatusCta/AccountStatusCta'
import { AccountStatusBadge } from '@/components/features/membership/AccountStatusBadge/AccountStatusBadge'
import { MainHeaderGreeting } from '@/components/features/dashboard/MainHeaderGreeting/MainHeaderGreeting'
import { BaseHeaderNotifications } from '@/components/shared/ui/BaseHeaderNotifications/BaseHeaderNotifications'
import { useIsMobile } from '@/hooks/use-mobile'
import { Card, CardContent } from '@/components/ui/card'

const MainHeaderTime = lazy(() => import('@/components/features/dashboard/MainHeaderTime/MainHeaderTime'))

export const MainHeader = () => {
  const isMobile = useIsMobile()

  return (
    <Card>
      <CardContent className={'flex flex-row justify-between'}>
        <div className="flex items-start gap-6">
          <div className="flex flex-col gap-2">
            <MainHeaderGreeting />
            <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground text-xs flex-wrap">
              <Suspense fallback={<div>Loading...</div>}>
                <MainHeaderTime />
              </Suspense>
              <div className={`flex items-center gap-1.5 ${isMobile ? 'w-full justify-between' : 'w-auto justify-start'}`}>
                <AccountStatusCta />
                {isMobile && <AccountStatusBadge />}
              </div>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="flex items-center gap-4">
            <AccountStatusBadge />
            <BaseHeaderNotifications />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
