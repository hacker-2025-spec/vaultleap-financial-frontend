import { dashboardSelectors } from '@/store/dashboard/dashboard.selectors'
import { dashboardActions } from '@/store/dashboard/dashboard.slice'
import { useDispatch, useSelector } from 'react-redux'

export const useVaultDetailsInfoModal = () => {
  const dispatch = useDispatch()
  const modalInfo = useSelector(dashboardSelectors.selectVaultDetailsModalInfo)
  const open = (vaultId: string) => {
    dispatch(dashboardActions.openVaultDetailsInfoModal({ vaultId }))
  }
  const close = () => {
    dispatch(dashboardActions.closeVaultDetailsInfoModal())
  }
  return { modalInfo, open, close }
}
