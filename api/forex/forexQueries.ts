import { useQuery } from '@tanstack/react-query'
import { getUserForexRatesOptions } from '@/client/@tanstack/react-query.gen'
import { useIsLoggedIn } from '@/stores/userStore'

export const forexQueryKeys = {
  all: ['forex'] as const,
  userRates: () => [...forexQueryKeys.all, 'userRates'] as const,
}

// Hook to fetch forex rates for authenticated users
export const useForexRates = () => {
  const isLoggedIn = useIsLoggedIn()

  return useQuery({
    ...getUserForexRatesOptions(),
    queryKey: forexQueryKeys.userRates(),
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  })
}
