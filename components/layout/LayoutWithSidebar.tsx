import React, { PropsWithChildren } from 'react'

import { MainSidebar } from '@/components/layout/MainSidebar/MainSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className={'w-full px-4 sm:px-10 py-5 flex gap-2 flex-col bg-slate-100'}>
        <SidebarTrigger className="relative -left-1" />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default MainLayout
