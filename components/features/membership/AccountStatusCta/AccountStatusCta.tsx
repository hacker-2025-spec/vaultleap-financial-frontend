'use client'

export const AccountStatusCta = () => {
  // TEMPORARILY HIDDEN: Premium upgrade CTA disabled until premium features are implemented
  // TODO: Re-enable upgrade button when premium features are ready
  // Original code commented below for future reactivation

  /*
  const isPremium = useSelector(userSelectors.selectIsPremiumAccount)

  if (isPremium) return null

  const upgradeStatus = () => {}

  return (
    <Button
      variant="link"
      size="sm"
      className="h-auto p-0 text-xs font-medium text-primary hover:text-primary/80"
      onClick={upgradeStatus}
    >
      <Star className="h-3.5 w-3.5 mr-1" />
      Upgrade
    </Button>
  )
  */

  // TEMPORARY: Hide upgrade CTA until premium features are implemented
  return null
}
