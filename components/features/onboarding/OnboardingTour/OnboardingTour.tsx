'use client'

import { useSetState } from 'react-use'
import Joyride, { CallBackProps, STATUS, Step, TooltipRenderProps } from 'react-joyride'
import { useIsLoggedIn, useIsOnboarding, useUserActions } from '@/stores/userStore'
import { useEffect } from 'react'

interface State {
  run: boolean
  steps: Step[]
}

const TOUR_STEPS: Step[] = [
  {
    target: 'body',
    title: 'Welcome to VaultLeap!',
    content: "Welcome to VaultLeap! Your account is set up and ready to go. Let's take a quick tour of your dashboard.",
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: 'body',
    title: 'USD to USDC Dashboard',
    content:
      'This is your main dashboard where everything happens - receive payments, send money globally, and manage your US/EU banking presence, all from one secure hub.',
    placement: 'center',
  },
  {
    target: '.transactions',
    title: 'Transactions',
    content:
      'All your money movements appear here - incoming client payments, conversions, and withdrawals. Green means money in, red shows transfers out.',
    placement: 'left',
  },
  {
    target: '.products',
    title: 'Your VaultLeap Products',
    content:
      "These are your enabled VaultLeap features. As you activate premium options, they'll appear here for easy access to all your financial tools.",
    placement: 'top',
  },
  // {
  //   target: '.premium-products',
  //   title: 'Premium Onchain Products',
  //   content:
  //     'As your business grows, activate these premium features to manage complex payment flows, split income with teams, or accept merchant payments.',
  //   placement: 'top',
  // },
  {
    target: '.checklist',
    title: "You're all set!",
    content: "You're making great progress! Complete each step to unlock the full power of borderless banking and currency protection.",
    placement: 'bottom',
  },
]

const CustomTooltip = ({ index, size, step, backProps, primaryProps, tooltipProps }: TooltipRenderProps) => {
  const primaryColor = '#007AFF'
  const greyColor = '#E5E7EB'

  return (
    <div
      {...tooltipProps}
      style={{
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: '20px',
        width: '100%',
        maxWidth: '320px',
        color: '#333',
        border: `2px solid ${primaryColor}`,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {step.title && <h2 style={{ margin: 0 }}>{step.title}</h2>}
      <div style={{ padding: '10px 0' }}>{step.content}</div>
      <div
        style={{
          marginTop: '15px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            width: '100%',
          }}
        >
          {index > 0 ? (
            <>
              <button
                {...backProps}
                style={{
                  backgroundColor: '#F3F4F6',
                  border: `1px solid ${greyColor}`,
                  borderRadius: 6,
                  color: primaryColor,
                  cursor: 'pointer',
                  fontSize: 14,
                  padding: '8px 16px',
                  flex: 1,
                }}
              >
                {backProps.title}
              </button>
              <button
                {...primaryProps}
                style={{
                  backgroundColor: primaryColor,
                  border: 0,
                  borderRadius: 6,
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 14,
                  padding: '8px 16px',
                  flex: 2,
                }}
              >
                {primaryProps.title}
              </button>
            </>
          ) : (
            <button
              {...primaryProps}
              style={{
                backgroundColor: primaryColor,
                border: 0,
                borderRadius: 6,
                color: '#fff',
                cursor: 'pointer',
                fontSize: 14,
                padding: '8px 16px',
                width: '100%',
              }}
            >
              {primaryProps.title}
            </button>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {Array.from({ length: size }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: i === index ? primaryColor : greyColor,
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export const OnboardingTour = () => {
  const [{ run, steps }, setState] = useSetState<State>({
    run: false,
    steps: TOUR_STEPS,
  })

  const isLoggedIn = useIsLoggedIn()
  const isOnboarding = useIsOnboarding()
  const { setOnboarding } = useUserActions()

  useEffect(() => {
    if (isLoggedIn && isOnboarding) {
      setState({ run: true })
    }
  }, [isLoggedIn, isOnboarding])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setState({ run: false })
      // Set onboarding to false when tour is completed
      setOnboarding(false)
    }

    // Add skip functionality
    if (type === 'tour:end') {
      setState({ run: false })
      // Set onboarding to false when tour is skipped
      setOnboarding(false)
    }
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      {run && (
        <Joyride
          steps={steps}
          run={run}
          continuous
          tooltipComponent={CustomTooltip}
          locale={{
            back: 'Previous',
            close: 'Skip',
            last: 'Finish',
            next: 'Next',
            skip: 'Skip Tour',
          }}
          styles={{
            options: {
              primaryColor: '#007AFF',
              backgroundColor: '#fff',
              textColor: '#333',
              width: 320,
              zIndex: 10000,
            },
          }}
          floaterProps={{
            disableAnimation: true,
            hideArrow: true,
            styles: {
              options: {
                zIndex: 10001,
              },
            },
          }}
          callback={handleJoyrideCallback}
          disableOverlayClose
          spotlightPadding={5}
          showSkipButton
        />
      )}
    </>
  )
}
