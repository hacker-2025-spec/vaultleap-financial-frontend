import React from 'react'
import { useUserDataSync } from '@/api/user/userQueries'

/**
 * Provider component that syncs user data from the API to the userStore
 * This ensures TOS status, KYC status, and user info are always up to date
 */
export const UserDataSyncProvider = ({ children }: { children: React.ReactNode }) => {
  // Always call the hook - it handles the isLoggedIn check internally
  useUserDataSync()

  return <>{children}</>
}

export default UserDataSyncProvider
