'use client'

import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Footer from './components/Footer'

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links with proper validation
    const handleAnchorClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement
      const href = target.getAttribute('href')
      
      // Skip if href is null, empty, or just '#'
      if (!href || href === '#' || href === '') {
        return
      }
      
      // Check if it's a valid anchor link (starts with # and has more than just #)
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }

    const anchors = document.querySelectorAll('a[href^="#"]')
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick as EventListener)
    })

    // Cleanup
    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick as EventListener)
      })
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Summary />
      <Experience />
      <Skills />
      <Certifications />
      <Education />
      <Footer />
    </main>
  )
}