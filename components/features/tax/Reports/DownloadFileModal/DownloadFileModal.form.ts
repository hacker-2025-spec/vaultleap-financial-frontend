import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { userActions } from '@/store/user/user.slice'
import { userSelectors } from '@/store/user/user.selectors'

import { DownloadFileModalForm } from './DownloadFileModal.types'

export const useDownloadFileModalForm = (taxFormId: string) => {
  const dispatch = useDispatch()
  const email = useSelector(userSelectors.selectUserEmailTruncated)
  const isLoading = useSelector(userSelectors.selectIsDownloadDocumentLoading)
  const isDownloadDocumentFailed = useSelector(userSelectors.selectIsDownloadDocumentFailed)

  const { control, handleSubmit } = useForm<DownloadFileModalForm>({
    defaultValues: {
      securityCode: ''
    },
    mode: 'onChange',
  })
  
  const onSubmit = () => {
    handleSubmit(
      (data) => {
        dispatch(userActions.downloadTaxDocument({ taxFormId, securityCode: data.securityCode }))
      },
      (errors) => {
        console.log('errors', errors)
      }
    )()
  }
  
  return {
    email,
    control,
    onSubmit,
    isLoading,
    isDownloadDocumentFailed,
  }
}
