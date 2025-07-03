import React from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/ui/typography'
import type { ShareTemplateBoxComponentProps } from './ShareTemplateBox.types'
import {
  getShareTemplateBoxStyles,
  comingSoonStyles,
  premiumOnlyStyles,
  titleStyles,
  descriptionStyles
} from './ShareTemplateBox.styles'
import { useSelector } from 'react-redux'
import { userSelectors } from '@/store/user/user.selectors'

export const ShareTemplateBoxComponent: React.FC<ShareTemplateBoxComponentProps> = ({
  title,
  description,
  comingSoon,
  isActive,
  isPremiumOnly,
  className,
  ...props
}) => {
  const isPremiumAccount = useSelector(userSelectors.selectIsPremiumAccount)
  const notAllowed = isPremiumOnly && !isPremiumAccount
  const disabled = notAllowed

  if (isPremiumOnly && !isPremiumAccount) return null

  return (
    <div
      className={cn(
        getShareTemplateBoxStyles({ isActive, comingSoon, disabled }),
        className
      )}
      {...props}
    >
      {comingSoon ? (
        <div className={comingSoonStyles}>COMING SOON</div>
      ) : (
        isPremiumOnly && <div className={cn(premiumOnlyStyles, "text-[10px] sm:text-sm")}>PREMIUM ONLY</div>
      )}
      <Typography variant="h4" className={titleStyles}>{title}</Typography>
      <Typography variant="p" className={descriptionStyles}>{description}</Typography>
    </div>
  )
}
