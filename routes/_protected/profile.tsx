import { createFileRoute } from '@tanstack/react-router'
import ProfilePage from '@/views/Profile/Profile.page'

export const Route = createFileRoute('/_protected/profile')({
  component: Profile,
})

function Profile() {
  return <ProfilePage />
}
