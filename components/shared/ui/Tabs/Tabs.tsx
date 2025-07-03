"use client"

import { ReactNode } from 'react'
import {
  Tabs as ShadcnTabs,
  TabsTrigger
} from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type TabButton = {
  content: ReactNode | string
  id: string
}

interface Props {
  tabs: TabButton[]
  active: TabButton['id']
  onChange: (id: TabButton['id']) => void
  className?: string
}

export const Tabs = ({ tabs, active, onChange, className }: Props) => {
  return (
    <div className={cn("relative z-10 border-b border-white/20", className)}>
      <ShadcnTabs value={active} onValueChange={onChange} className="flex-col gap-0">
        <div className="flex w-full">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "flex-1 rounded-none border-0 bg-transparent text-white/70 hover:text-white/90 px-5 py-4 text-sm font-semibold transition-colors relative",
                "data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                "after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-0.5 after:bg-transparent after:rounded-t-sm",
                "data-[state=active]:after:bg-white"
              )}
            >
              {tab.content}
            </TabsTrigger>
          ))}
        </div>

        {/* We're not using TabsContent here since the content is managed outside this component */}
      </ShadcnTabs>
    </div>
  )
}
