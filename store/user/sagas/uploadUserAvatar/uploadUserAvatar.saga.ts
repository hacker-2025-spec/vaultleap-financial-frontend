import { authorizedApiCall } from '@/utils/httpClient'
import { userActions, UserActions } from '../../user.slice'
import { UserService } from '@klydo-io/getrewards-backend-api'
import { put } from 'typed-redux-saga'
import { pushNotification } from '@/utils/toast'

export function* uploadUserAvatarSaga({ payload }: UserActions['uploadUserAvatar']) {
  try {
    const { avatar } = payload

    const uploadResponse = yield* authorizedApiCall(UserService.uploadAvatar, { avatar })

    yield* put(userActions.uploadUserAvatarSuccess({ userDataResponse: uploadResponse }))
    pushNotification('Avatar successfully updated')
  } catch (error) {
    pushNotification('Avatar uploading failed', { variant: 'error' })
    console.error(error)
  }
}
