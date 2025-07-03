'use client'

import React, { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { FaChevronDown } from 'react-icons/fa'
import { X } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check } from 'lucide-react'
import Logo from '@/components/features/logo/components/Logo'
import { useIsLoggedIn } from '@/stores/userStore'
import { useCustomLoginModal } from '@/hooks/useCustomLoginModal'
import CustomLogin from '@/components/features/auth/CustomLogin/CustomLogin'
import { languages } from 'utils/constants'
import { ENV_CONFIG } from '@/config/env'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  // Get login state and login modal controls
  const isLoggedIn = useIsLoggedIn()
  const { isOpen: isLoginModalOpen, openModal: openLoginModal, closeModal: closeLoginModal } = useCustomLoginModal()

  // Handle login by opening the modal
  const handleLogin = () => {
    openLoginModal()
  }

  // Handle language change
  const handleLanguageChange = (language: (typeof languages)[0]) => {
    setSelectedLanguage(language)
    // Here you would implement actual language change logic
    // For example: i18n.changeLanguage(language.code)
  }

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed lg:px-10 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="py-4 mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="block">
              <Logo height={40} />
            </a>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 text-[14px] font-medium text-black/80 transition-colors duration-200 ease-in-out tracking-[-0.01em] py-2 relative">
            <Link href="#features" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
              Testimonials
            </Link>
            {/* <Link href="#pricing" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
              Pricing
            </Link> */}
            <Link to="/help-center" className="text-gray-800 hover:text-blue-600 transition-colors font-semibold">
              FAQ
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Popover>
              <PopoverTrigger className="flex items-center space-x-1 cursor-pointer text-[14px] font-medium text-black/80 transition-colors mr-4">
                <span className="text-gray-800 font-medium">{selectedLanguage.code.toUpperCase()}</span>
                <FaChevronDown className="h-3 w-3 text-gray-600" />
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1">
                <div className="flex flex-col">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => handleLanguageChange(language)}
                    >
                      <span>{language.name}</span>
                      {selectedLanguage.code === language.code && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 active:scale-[0.98] text-[15px] tracking-tight"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={handleLogin}
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/70 focus:ring-offset-2 active:scale-[0.98] text-[15px] tracking-tight"
              >
                Log In
              </button>
            )}
          </div>

          <button
            className="block lg:hidden relative w-8 h-6 focus:outline-none right-2 w-[26px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`absolute h-[1.5px] w-full bg-gray-800 transform transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 top-3' : 'top-0'
              }`}
            ></span>
            <span
              className={`absolute h-[1.5px] w-full bg-gray-800 top-2 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`absolute h-[1.5px] w-full bg-gray-800 transform transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 top-3' : 'top-4'
              }`}
            ></span>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 w-full h-screen flex justify-center items-center transition-opacity transition-visibility z-50 duration-300"
          style={{
            background: 'var(--glass-background)',
            backdropFilter: 'var(--glass-blur) var(--glass-saturate)',
            WebkitBackdropFilter: 'var(--glass-blur) var(--glass-saturate)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="w-full max-w-[400px] flex flex-col items-center gap-4 py-12 px-8 h-full relative">
            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close menu"
            >
              <X size={20} className="text-gray-800" />
            </button>

            <nav className="mobile-nav-links">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
                Testimonials
              </a>
              {/* <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a> */}
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
            </nav>

            <div className="flex flex-col space-y-4 w-full">
              <div className="flex items-center space-x-1 cursor-pointer justify-center">
                <span className="text-gray-800">EN</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  className="px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-center hover:bg-blue-50 transition-colors w-full"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogin()
                  }}
                  className="px-5 py-3 border border-blue-600 text-blue-600 rounded-full text-center hover:bg-blue-50 transition-colors w-full"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <CustomLogin isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  )
}

export default Header
