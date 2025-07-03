'use client'

import { usePrivyLogout } from '@/hooks/usePrivyLogout'
import { LogoutConfirmationModal } from '@/components/features/auth/LogoutConfirmationModal/LogoutConfirmationModal'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { SidebarFooter } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { useUserCustomerDetails } from '@/api/user/userQueries'

export const Userbar = () => {
  const { data: userData, isLoading } = useUserCustomerDetails()
  const { logout } = usePrivyLogout()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const customAvatar = userData?.avatar
  const externalAvatar = userData?.avatar // Same field in the new API
  const email = userData?.email
  const name = userData?.name

  // Use name if available, otherwise use email for the avatar
  const avatarText = name || email || ''
  const avatarHolder = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatarText)}&background=0062CC&color=fff`
  const avatar = customAvatar || externalAvatar || avatarHolder

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    logout()
    setIsLogoutModalOpen(false)
  }

  return (
    <>
      <SidebarFooter className="mt-auto pt-4 border-t border-muted/20 bg-transparent">
  <div className="flex items-center gap-3 bg-white/90 rounded-xl shadow px-4 py-3 w-full max-w-xs mx-auto">
    {isLoading ? (
      <Skeleton className="h-10 w-10 rounded-full" />
    ) : (
      <Link to="/profile">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt="User" />
          <AvatarFallback>{avatarText.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
    )}
    <div className="flex flex-col flex-1 min-w-0 justify-center">
      {isLoading ? (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
      ) : (
        <>
          <span className="text-base font-semibold text-foreground truncate leading-tight">{name || email}</span>
          {name && <span className="text-xs text-muted-foreground truncate leading-snug">{email}</span>}
        </>
      )}
    </div>
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLogoutClick}
      className="h-8 w-8 rounded-full bg-muted/70 hover:bg-muted shadow-none transition-all duration-150 flex items-center justify-center ml-1"
      aria-label="Log out"
    >
      <LogOut size={18} className="text-muted-foreground" />
    </Button>
  </div>
</SidebarFooter>

      <LogoutConfirmationModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogoutConfirm} />
    </>
  )
}
