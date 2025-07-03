'use client'

import { Userbar } from '@/components/features/auth/Userbar/Userbar'
import { SideBarTop } from '@/components/layout/SidebarHeader/SideBarTop'
import { MainSidebarMenu } from '@/components/layout/MainSidebarMenu/MainSidebarMenu'
import { SidebarFooter } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
} from '@/components/ui/sidebar'

export const MainSidebar = () => {

  return (
      <Sidebar className="bg-background/70">
        <SideBarTop />
        <SidebarContent>
          <MainSidebarMenu />
        </SidebarContent>
        <SidebarFooter>
          <Userbar />
        </SidebarFooter>
      </Sidebar>
  )
}
