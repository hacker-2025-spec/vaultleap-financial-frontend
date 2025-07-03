'use client'

import { userSelectors } from '@/store/user/user.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { SectionCard } from '@/components/layout/SectionCard/SectionCard'
import { SubSection } from '@/components/layout/SubSection/SubSection'
import { VaultCard } from '../VaultCard/VaultCard'

import { useEffect } from 'react'
import { userActions } from '@/store/user/user.slice'
import { CreateVaultModalButton } from '@/components/features/vaults/CreateVaultModalButton/CreateVaultModalButton'

export const VaultsSection = () => {
  const dispatch = useDispatch()
  const vaults = useSelector(userSelectors.selectUserVaultsNew)

  useEffect(() => {
    dispatch(userActions.fetchUserVaultsNew())
  }, [])

  return (
    <SectionCard>
      <SubSection
        title={
          <>
            <span>Vault Hub</span>
            <CreateVaultModalButton />
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4.5 md:gap-6 mt-4">
          {vaults.map((vault) => (
            <VaultCard key={vault.vaultAddress} vault={vault} />
          ))}
        </div>
      </SubSection>
    </SectionCard>
  )
}
