import { redirect } from '@tanstack/react-router'
import { userQueryKeys } from '@/api/user'
import { getMe } from '@/client'

/**
 * Route guard that ensures a customer exists before allowing access to a route.
 * If customer is null, redirects to the loading page for onboarding.
 *
 * @param queryClient - TanStack Query client instance
 * @param routeName - Name of the route for logging purposes
 * @returns Promise that resolves with customer data or throws redirect
 */
export async function ensureCustomerExists(
  queryClient: any,
  routeName: string
): Promise<{ customerData: any }> {
  try {

    let customerData = { customer: null }
    // Ensure customer data is available and customer is not null
    try {
     customerData =  (await getMe())?.data 
    }catch(e)  {
      console.log(e)
    }
              

    // Check if customer exists - if not, redirect to loading page for onboarding
    if (!customerData?.customer) {
      console.log(`${routeName} route: Customer is null, redirecting to loading page for onboarding`)
      throw redirect({ to: '/loading', search: {
          redirect: location.href,
        } })
    }

    console.log(`${routeName} route: Customer exists, allowing access`)
    return { customerData }
  } catch (error) {
    console.error(`${routeName} route: Failed to verify customer data`, error)
    // If there's an error, redirect to loading page
    throw redirect({ to: '/loading' })
  }
}

/**
 * Route guard that redirects to dashboard if customer already exists.
 * Used on loading page to prevent users with existing customers from staying on loading.
 *
 * @param queryClient - TanStack Query client instance
 * @param routeName - Name of the route for logging purposes
 * @returns Promise that resolves if customer doesn't exist or throws redirect
 */
export async function redirectIfCustomerExists(
  queryClient: any,
  routeName: string
): Promise<{ customerData: any }> {
  try {
    // Ensure customer data is available
    queryClient.invalidateQueries({ queryKey: userQueryKeys.customerDetails() })  
    
    let customerData = { customer: null }
    // Ensure customer data is available and customer is not null
    try {
     customerData =  (await getMe())?.data 
    }catch(e)  {
      console.log(e)
    }
           

    // Check if customer exists - if yes, redirect to dashboard
    if (customerData?.customer) {
      console.log(`${routeName} route: Customer exists, redirecting to dashboard`)
      throw redirect({ to: routeName, search: {
          redirect: location.href,
        } })
    }

    console.log(`${routeName} route: Customer doesn't exist, allowing access to loading page`)
    return { customerData }
  } catch (error) {
    console.error(`${routeName} route: Failed to verify customer data`, error)
    // If there's an error, allow access to loading page (safer fallback)
    return { customerData: null }
  }
}
