'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RequestStatus } from '@/store/store.types'
import { userActions } from '@/store/user/user.slice'
import { LoaderComponent } from '../../../layout/Loader/index'
import { userSelectors } from '@/store/user/user.selectors'

import { DashboardReportsComponent } from './Reports.component'
import { RequestTaxFormModal } from '@/components/features/tax/RequestTaxFormModal/RequestTaxFormModal'

export const DashboardReportsContainer: React.FC = () => {
  const dispatch = useDispatch()

  const taxFormId = useSelector(userSelectors.selectTaxFormId)
  const taxForms = useSelector(userSelectors.selectUserTaxForms)
  const taxFormsStatus = useSelector(userSelectors.selectUserTaxFormsStatus)
  const downloadModalOpen = useSelector(userSelectors.selectDownloadModalOpen)
  const isRequestAccessLoading = useSelector(userSelectors.selectIsRequestAccessLoading)

  React.useEffect(() => {
    dispatch(userActions.fetchUserTaxForms())
  }, [dispatch])

  const handleRequestAccess = React.useCallback(
    (taxFormId: string) => {
      console.log('Requested access tax document', taxFormId)
      dispatch(userActions.requestAccessTaxDocument(taxFormId))
    },
    [dispatch]
  )

  const handleClose = () => dispatch(userActions.hideDownloadModalOpen())

  if (taxFormsStatus !== RequestStatus.Succeeded) {
    return <LoaderComponent />
  }

  return (
    <>
      <DashboardReportsComponent
        taxForms={taxForms}
        taxFormId={taxFormId}
        handleRequestAccess={handleRequestAccess}
        isRequestAccessLoading={isRequestAccessLoading}
      />

      {
        downloadModalOpen &&
        <RequestTaxFormModal
          close={handleClose}
          taxFormId={taxFormId}
        />
      }
    </>
  )
}
