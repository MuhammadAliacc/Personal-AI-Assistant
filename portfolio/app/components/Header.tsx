'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Muhammad Ali
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#about" 
              onClick={(e) => handleNavClick(e, '#about')}
              className="text-gray-600 hover:text-blue-600 transition cursor-pointer"
            >
              About
            </a>
            <a 
              href="#experience" 
              onClick={(e) => handleNavClick(e, '#experience')}
              className="text-gray-600 hover:text-blue-600 transition cursor-pointer"
            >
              Experience
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleNavClick(e, '#skills')}
              className="text-gray-600 hover:text-blue-600 transition cursor-pointer"
            >
              Skills
            </a>
            <a 
              href="#education" 
              onClick={(e) => handleNavClick(e, '#education')}
              className="text-gray-600 hover:text-blue-600 transition cursor-pointer"
            >
              Education
            </a>
          </div>

          <div className="flex items-center space-x-4">
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
      </nav>
    </header>
  )
}