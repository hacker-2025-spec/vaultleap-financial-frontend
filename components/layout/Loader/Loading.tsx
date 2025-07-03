import Logo from '@/components/features/logo/components/Logo'

export function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f5f7fa]">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-md">
        <Logo height={150} />
        <p className="mt-4 text-gray-600">Loading your account...</p>
        <p className="mt-2 text-sm text-gray-500">Fetching customer data</p>
      </div>
    </div>
  )
}
