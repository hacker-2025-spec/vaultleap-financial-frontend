import { createFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/views/Settings/Settings.page'

export const Route = createFileRoute('/_protected/settings')({
  component: Settings,
})

function Settings() {
  return <SettingsPage />
}
