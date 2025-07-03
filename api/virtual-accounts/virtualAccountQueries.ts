import { useQuery } from '@tanstack/react-query'
import {
  getVirtualAccountsByAuth0IdOptions,
  getVirtualAccountByIdOptions
} from '@/client/@tanstack/react-query.gen'

export const useVirtualAccounts = () => {
  return useQuery(getVirtualAccountsByAuth0IdOptions())
}

export const useVirtualAccountById = (id: string) => {
  return useQuery(getVirtualAccountByIdOptions({
    path: { id }
  }))
}
