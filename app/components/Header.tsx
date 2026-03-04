'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}>
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg md:text-xl font-bold text-gray-800">
              Muhammad Ali
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, '#about')}
                className="text-gray-600 hover:text-blue-600 transition cursor-pointer text-sm lg:text-base"
              >
                About
              </a>
              <a 
                href="#experience" 
                onClick={(e) => handleNavClick(e, '#experience')}
                className="text-gray-600 hover:text-blue-600 transition cursor-pointer text-sm lg:text-base"
              >
                Experience
              </a>
              <a 
                href="#skills" 
                onClick={(e) => handleNavClick(e, '#skills')}
                className="text-gray-600 hover:text-blue-600 transition cursor-pointer text-sm lg:text-base"
              >
                Skills
              </a>
              <a 
                href="#education" 
                onClick={(e) => handleNavClick(e, '#education')}
                className="text-gray-600 hover:text-blue-600 transition cursor-pointer text-sm lg:text-base"
              >
                Education
              </a>
            </div>

            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-gray-900 transition">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/muhammad-ali-233a161b1" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-600 hover:text-blue-700 transition">
                <FaLinkedin size={18} />
              </a>
              <a href="mailto:muhammadaliacc@gmail.com" 
                 className="text-gray-600 hover:text-red-600 transition">
                <FaEnvelope size={18} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <a 
                  href="#about" 
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="text-gray-600 hover:text-blue-600 transition py-2"
                >
                  About
                </a>
                <a 
                  href="#experience" 
                  onClick={(e) => handleNavClick(e, '#experience')}
                  className="text-gray-600 hover:text-blue-600 transition py-2"
                >
                  Experience
                </a>
                <a 
                  href="#skills" 
                  onClick={(e) => handleNavClick(e, '#skills')}
                  className="text-gray-600 hover:text-blue-600 transition py-2"
                >
                  Skills
                </a>
                <a 
                  href="#education" 
                  onClick={(e) => handleNavClick(e, '#education')}
                  className="text-gray-600 hover:text-blue-600 transition py-2"
                >
                  Education
                </a>
                <div className="flex space-x-4 pt-2">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-gray-900 transition">
                    <FaGithub size={20} />
                  </a>
                  <a href="https://linkedin.com/in/muhammad-ali-233a161b1" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-600 hover:text-blue-700 transition">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="mailto:muhammadaliacc@gmail.com" 
                     className="text-gray-600 hover:text-red-600 transition">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  )
}