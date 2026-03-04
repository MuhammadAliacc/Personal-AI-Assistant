'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 md:pt-0">
      {/* Animated background elements - hidden on mobile */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float hidden md:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float hidden md:block" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay - lighter on mobile */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 md:opacity-20"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <p className="text-blue-600 font-semibold mb-3 md:mb-4 tracking-wider text-sm md:text-base">WELCOME TO MY PORTFOLIO</p>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Muhammad Ali
              </span>
            </h1>

            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-4 md:mb-6 h-16 md:h-20">
              <TypeAnimation
                sequence={[
                  'ML/AI Engineer',
                  2000,
                  'Agentic AI Specialist',
                  2000,
                  'RAG & GenAI Expert',
                  2000,
                  'AWS Cloud Architect',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-semibold text-gradient"
              />
            </div>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 lg:px-0">
              Building production-grade AI systems that solve real-world problems. 
              Specialized in Agentic AI, RAG, and Generative AI technologies.
            </p>

            {/* Location and contact - stacked on mobile */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-6 mb-6 md:mb-8 px-4 lg:px-0">
              <div className="flex items-center justify-center text-gray-600 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm text-sm md:text-base">
                <HiOutlineLocationMarker className="text-blue-600 mr-2 flex-shrink-0" />
                <span>Cologne, Germany</span>
              </div>
              <div className="flex items-center justify-center text-gray-600 bg-white/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full shadow-sm text-sm md:text-base">
                <FaPhone className="text-blue-600 mr-2 flex-shrink-0" />
                <span>+49 176 97712721</span>
              </div>
            </div>

            {/* CTA Buttons - stacked on mobile */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 px-4 lg:px-0">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get In Touch
                  <FaEnvelope className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.a>

              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-blue-600 text-sm md:text-base"
              >
                View My Work
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 md:py-4 bg-gray-800 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-sm md:text-base"
              >
                <FaFileDownload className="mr-2" />
                Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 mt-6 md:mt-8">
              {[
                { icon: FaGithub, link: 'https://github.com', color: 'hover:text-gray-900' },
                { icon: FaLinkedin, link: 'https://linkedin.com/in/muhammad-ali-233a161b1', color: 'hover:text-blue-700' },
                { icon: FaEnvelope, link: 'mailto:muhammadaliacc@gmail.com', color: 'hover:text-red-600' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-white p-2 md:p-3 rounded-full shadow-md hover:shadow-xl transition-all ${social.color}`}
                >
                  <social.icon size={16} className="md:w-5 md:h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative mt-8 lg:mt-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto">
              {/* Animated rings - smaller on mobile */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse-slow"></div>
              <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-spin-slow"></div>
              <div className="absolute inset-2 sm:inset-4 bg-white rounded-full overflow-hidden shadow-2xl">
                <Image 
                  src="/ali.jpg" 
                  alt="Muhammad Ali"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating tech badges - adjusted for mobile */}
            {/* Floating tech badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 left-0 bg-white px-3 py-1 rounded-full shadow-lg text-xs md:text-sm"
            >
              <span className="text-blue-600 font-semibold">🤖 LLM</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
              className="absolute -bottom-6 left-0 bg-white px-3 py-1 rounded-full shadow-lg text-xs md:text-sm"
            >
              <span className="text-indigo-600 font-semibold">⚡ RAG</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              className="absolute top-1/2 -right-6 bg-white px-3 py-1 rounded-full shadow-lg text-xs md:text-sm"
            >
              <span className="text-purple-600 font-semibold">🚀 GenAI</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}