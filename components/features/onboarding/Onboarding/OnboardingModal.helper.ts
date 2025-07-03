const ONBARDING_COMPLETE_KEY = 'complete_auth_onboarding'
const windowCheck = () => typeof window !== 'undefined'

export const setOnboardingCompleted = () => localStorage.setItem(ONBARDING_COMPLETE_KEY, 'true')
export const checkIsOnboardingCompleted = () => windowCheck() && localStorage.getItem(ONBARDING_COMPLETE_KEY) === 'true'
export const clearIsOnboardingCompleted = () => windowCheck() && localStorage.removeItem(ONBARDING_COMPLETE_KEY)
