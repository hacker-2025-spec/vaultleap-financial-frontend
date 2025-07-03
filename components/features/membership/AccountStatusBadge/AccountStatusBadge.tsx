'use client'

import { Badge } from '@/components/ui/badge'

export const AccountStatusBadge = () => {
  // TEMPORARILY DISABLED: Premium features are hidden until implementation is complete
  // TODO: Re-enable premium badge display when premium features are ready
  // Original code commented below for future reactivation

  /*
  const isPremium = useSelector(userSelectors.selectIsPremiumAccount)

  return (
    <Badge
      variant="outline"
      className={`
        flex items-center justify-center gap-1 py-1 px-3 sm:px-4
        text-[10px] sm:text-xs font-semibold rounded-full ml-auto md:ml-0
        ${isPremium
          ? 'bg-amber-100/50 text-amber-800 border-amber-200/50'
          : 'bg-muted/50 text-muted-foreground border-border'
        }
      `}
    >
      {isPremium ? (
        <>
          <Star className="h-3.5 w-3.5" />
          Premium account
        </>
      ) : (
        'Standard Account'
      )}
    </Badge>
  )
  */

  // TEMPORARY: Always show Standard account until premium features are implemented
  return (
    <Badge
      variant="outline"
      className="flex items-center justify-center gap-1 py-1 px-3 sm:px-4 text-[10px] sm:text-xs font-semibold rounded-full ml-auto md:ml-0 bg-muted/50 text-muted-foreground border-border"
    >
      Standard Account
    </Badge>
  )
}
