import { createFileRoute } from '@tanstack/react-router'
import SupportPage from '@/views/Support/Support.page'

export const Route = createFileRoute('/_protected/support')({
  component: Support,
})

function Support() {
  return <SupportPage />
}
