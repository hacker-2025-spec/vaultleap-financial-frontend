'use client'

import { Link } from '@tanstack/react-router'
import Logo from '@/components/features/logo/components/Logo'

const LandingFooter: React.FC = () => {
  return (
    <div className="integrated-footer pt-8 pb-4 border-t border-white/10 w-full bg-white/5 backdrop-blur-2xl font-inter absolute bottom-[0px] z-[10] overflow-hidden">
      <div className="container w-full max-w-7xl mx-auto px-6 flex flex-col">
        <div className="footer-links-wrapper flex justify-between gap-4 sm:gap-8 mb-6">
          <div className="footer-brand flex flex-col items-center jsutify-center gap-3">
            <Logo />

            <div className="social-links flex gap-2 sm:gap-3 mt-0">
              <a
                href="https://x.com/Vaultleap"
                aria-label="Twitter"
                className="text-blue-600 text-lg transition-all duration-300 p-0 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter text-blue-600"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/103795979/"
                aria-label="LinkedIn"
                className="text-blue-600 text-lg transition-all duration-300 p-0 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin text-blue-600"></i>
              </a>
              <a
                href="https://www.instagram.com/vaultleap?igsh=NTc4MTIwNjQ2YQ=="
                aria-label="Instagram"
                className="text-blue-600 text-lg transition-all duration-300 p-0 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-blue-600"></i>
              </a>
              <a
                href="https://medium.com/@klydo"
                aria-label="Medium"
                className="text-blue-600 text-lg transition-all duration-300 p-0 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-medium text-blue-600"></i>
              </a>
            </div>
          </div>

          <div className="footer-links flex justify-end gap-2 sm:gap-5">
            <div className="footer-links-column flex flex-col justify-end gap-3 min-w-20 sm:min-w-30">
              <a className="link-footer font-bold">Company</a>
              <a
                href="https://app.vanta.com/klydo.io/trust/gnk6xq50u88m520gcbb6t"
                className="link-footer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trust Center
              </a>
              <Link to="/help-center" className="link-footer">
                Help Center
              </Link>
            </div>

            <div className="footer-links-column flex flex-col justify-end gap-3 min-w-20 sm:min-w-30">
              <a className="link-footer font-bold">Legal</a>
              <Link to="/terms-of-service" className="link-footer cursor-pointer">
                Terms of Service
              </Link>
              <Link to="/privacy-policy" className="link-footer  cursor-pointer">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full text-center mt-2">
          <span className="text-xs text-black/80">© 2023 - 2025 Klydo, LLC. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}

export default LandingFooter
