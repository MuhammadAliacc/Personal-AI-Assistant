'use client'

import { useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Summary from './components/Summary'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Footer from './components/Footer'
import OpenRouterChatbot from './components/OpenRouterChatbot'

export default function Home() {
   const chatbotRef = useRef<{ openChat: () => void } | null>(null)
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

  const handleOpenChat = () => {
    if (chatbotRef.current) {
      chatbotRef.current.openChat()
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero onOpenChat={handleOpenChat} />
      <Summary />
      <Experience />
      <Skills />
      <Certifications />
      <Education />
      <Footer />
      <OpenRouterChatbot ref={chatbotRef} />
    </main>
  )
}