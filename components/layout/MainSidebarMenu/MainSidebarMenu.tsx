import { useLocation, useNavigate } from '@tanstack/react-router'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { Gauge, User, Shield, Gear, Wallet, Headset } from 'phosphor-react'

// Helper to render sidebar icons with consistent style
function renderSidebarIcon(IconComponent: React.ElementType, isActive: boolean) {
  return (
    <IconComponent
      weight="fill"
      className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'} group-hover:text-white`}
    />
  )
}

const sidebarMenuGroups = [
  [ // Group 1
    { label: 'Dashboard', icon: Gauge, href: '/dashboard' },
    // { label: 'Tax Center', icon: ListDashes, href: '/tax-center' },
  ],
  [ // Group 2
    { label: 'Profile', icon: User, href: '/profile' },
    { label: 'Security', icon: Shield, href: '/security' },
    { label: 'Settings', icon: Gear, href: '/settings' },
    { label: 'Wallet', icon: Wallet, href: '/wallet' },
  ],
  [ // Group 3 (Support, bottom)
    { label: 'Support', icon: Headset, href: '/support' },
  ]
]

import { useSidebar } from '@/components/ui/sidebar'

export const MainSidebarMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { isMobile, setOpenMobile } = useSidebar();

  const checkIsActive = (path: string): boolean => Boolean(pathname.includes(path));

  const handleMenuClick = async (href: string) => {
    if (pathname !== href) {
      await navigate({ to: href });
    }
    if (isMobile) setOpenMobile(false);
  };

  return (
    <div className="flex flex-col h-full">
      <SidebarGroup className="mt-16">
        <SidebarMenu className="mt-2 space-y-0">
          {sidebarMenuGroups[0].map(item => {
            const isActive = checkIsActive(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <button
                    type="button"
                    className="group flex flex-row items-center gap-2 w-full max-w-[180px] pl-4 mx-auto"
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {renderSidebarIcon(item.icon, isActive)}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarMenu className="mt-6 space-y-0">
          {sidebarMenuGroups[1].map(item => {
            const isActive = checkIsActive(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <button
                    type="button"
                    className="group flex flex-row items-center gap-2 w-full max-w-[180px] pl-4 mx-auto"
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {renderSidebarIcon(item.icon, isActive)}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup className="mt-auto">
        <SidebarMenu className="mb-2 space-y-0">
          {sidebarMenuGroups[2].map(item => {
            const isActive = checkIsActive(item.href);
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <button
                    type="button"
                    className="group flex flex-row items-center gap-2 w-full max-w-[180px] pl-4 mx-auto"
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {renderSidebarIcon(item.icon, isActive)}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
};