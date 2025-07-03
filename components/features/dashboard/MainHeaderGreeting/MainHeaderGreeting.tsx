'use client'

import { getGreeting } from '@/utils/greeting'
import { Typography } from '@/components/ui/typography'
import { useUserCustomerDetails } from '@/api/user/userQueries'

export const MainHeaderGreeting = () => {
  const { data: userData } = useUserCustomerDetails()
  const name = userData?.name
  const email = userData?.email

  return <Typography variant={'h3'}>{getGreeting(name, email) || ''}</Typography>
}
