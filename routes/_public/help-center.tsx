import { createFileRoute } from '@tanstack/react-router'
import { HelpCenterPage } from '@/views/HelpCenter/HelpCenter.page'

export const Route = createFileRoute('/_public/help-center')({
  component: HelpCenter,
})

function HelpCenter() {
  return <HelpCenterPage />
}
