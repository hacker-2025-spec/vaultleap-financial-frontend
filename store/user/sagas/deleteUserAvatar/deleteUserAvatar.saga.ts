import { authorizedApiCall } from '@/utils/httpClient'
import { UserService } from '@klydo-io/getrewards-backend-api'
import { put } from 'typed-redux-saga'
import { userActions } from '../../user.slice'
import { pushNotification } from '@/utils/toast'

export function* deleteUserAvatarSaga() {
  try {
    const deleteResponse = yield* authorizedApiCall(UserService.deleteAvatar)
    yield* put(userActions.deleteUserAvatarSuccess({ userDataResponse: deleteResponse }))
    pushNotification('Avatar successfully deleted')
  } catch (error) {
    pushNotification('Avatar deleting failed', { variant: 'error' })
    console.error(error)
  }
}
