import React from 'react'

import Hero from '@/components/features/landing-new/components/Hero'
import CoreFeatures from '@/components/features/landing-new/components/CoreFeatures'
import Personas from '@/components/features/landing-new/components/Personas'
import SolveSection from '@/components/features/landing-new/components/SolveSection'
import HowItWorks from '@/components/features/landing-new/components/HowItWorks'
import Testimonials from '@/components/features/landing-new/components/Testimonials'
import FAQ from '@/components/features/landing-new/components/FAQ'
import FinalCTA from '@/components/features/landing-new/components/FinalCTA'
import { BasicAuthProvider } from '@/components/providers/BasicAuthProvider'
import { ENV_CONFIG } from '@/config/env'

import 'styles/NewLandingPage.css'
import 'styles/optimized-animations.css'

const NewLandingPage: React.FC = () => {
  // Check if basic auth should be disabled
  // Disable on local and production environments, only enable on stage
  const isBasicAuthDisabled =
    import.meta.env.VITE_DISABLE_BASIC_AUTH === 'true' || ENV_CONFIG.environment === 'local' || ENV_CONFIG.environment === 'production'
  console.log('env', ENV_CONFIG)

  const landingPageContent = (
    <div className="new-landing-page">
      <Hero />
      <CoreFeatures />
      <Personas />
      <SolveSection />
      {/* <SuperchargeSection /> */}
      <HowItWorks />
      {/* <Pricing /> */}
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  )

  // Conditionally wrap with BasicAuthProvider only when needed
  if (isBasicAuthDisabled) {
    console.log(`NewLandingPage: Basic auth disabled for environment: ${ENV_CONFIG.environment}`)
    return landingPageContent
  }

  return <BasicAuthProvider>{landingPageContent}</BasicAuthProvider>
}

export default NewLandingPage
