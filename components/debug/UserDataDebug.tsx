import { useUserCustomerDetails } from '@/api/user/userQueries'
import { useTosStatus, useKycStatus, useUserInfo } from '@/stores/userStore'

/**
 * Debug component to show user data sync status
 * Remove this component in production
 */
export const UserDataDebug = () => {
  const { data: userData, isLoading, error } = useUserCustomerDetails()
  const tosStatus = useTosStatus()
  const kycStatus = useKycStatus()
  const userInfo = useUserInfo()

  // Commented out for production
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   return (
  //     <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg text-xs max-w-sm z-50">
  //       <h3 className="font-bold mb-2">User Data Sync Debug</h3>
  //
  //       <div className="space-y-1">
  //         <div>
  //           <strong>API Status:</strong> {isLoading ? 'Loading...' : error ? 'Error' : 'Loaded'}
  //         </div>
  //
  //         <div>
  //           <strong>TOS Status:</strong> {tosStatus}
  //         </div>
  //
  //         <div>
  //           <strong>KYC Status:</strong> {kycStatus}
  //         </div>
  //
  //         <div>
  //           <strong>Has Customer:</strong> {userData?.customer ? 'Yes' : 'No'}
  //         </div>
  //
  //         <div>
  //           <strong>Has Bridge KYC:</strong> {userData?.bridgeKyc ? 'Yes' : 'No'}
  //         </div>
  //
  //         <div>
  //           <strong>Customer TOS:</strong> {userData?.customer?.has_accepted_terms_of_service ? 'Accepted' : 'Not Accepted'}
  //         </div>
  //
  //         <div>
  //           <strong>Bridge TOS:</strong> {userData?.bridgeKyc?.tos_status || 'None'}
  //         </div>
  //
  //         <div>
  //           <strong>Bridge KYC:</strong> {userData?.bridgeKyc?.kyc_status || 'None'}
  //         </div>
  //
  //         <div>
  //           <strong>Store User:</strong> {userInfo ? 'Set' : 'Not Set'}
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return null
}

export default UserDataDebug
