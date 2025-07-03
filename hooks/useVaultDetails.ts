import { dashboardSelectors } from '@/store/dashboard/dashboard.selectors'
import { dashboardActions } from '@/store/dashboard/dashboard.slice'
import { RequestStatus } from '@/store/store.types'
import { VaultUserRole } from '@/store/user/user.types'
import { useDispatch, useSelector } from 'react-redux'

export const useVaultDetails = (vaultId: string) => {
  const dispatch = useDispatch()
  const vaultDetails = useSelector(dashboardSelectors.selectVaultDetailsById(vaultId))
  const fetchVaultDetailsStatus = useSelector(dashboardSelectors.selectFetchVaultDetailsStatus)
  const fetchVaultDetails = (role: VaultUserRole) => {
    dispatch(dashboardActions.fetchVaultDetails({ id: vaultId, role }))
  }
  const isLoading = fetchVaultDetailsStatus === RequestStatus.Loading
  const isUpdating = Boolean(vaultDetails) && isLoading
  return {
    fetchVaultDetails,
    vaultDetails,
    isLoading,
    isUpdating,
  }
}
