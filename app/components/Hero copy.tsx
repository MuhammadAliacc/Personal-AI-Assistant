'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-20 lg:pt-0">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      
      {/* Gradient orbs - refined */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
              👋 Available for opportunities
            </span>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Muhammad Ali
              </span>
            </h1>

            {/* Dynamic Title */}
            <div className="h-20 mb-6">
              <TypeAnimation
                sequence={[
                  'ML/AI Engineer',
                  2000,
                  'Agentic AI Specialist',
                  2000,
                  'RAG & GenAI Expert',
                  2000,
                  'Cloud AI Architect',
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700"
              />
            </div>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Architecting production-grade AI systems that drive business value. 
              Specializing in Agentic AI, RAG implementations, and scalable Generative AI solutions.
            </p>

            {/* Info Cards */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <HiOutlineLocationMarker className="text-blue-600 flex-shrink-0" size={18} />
                <span className="text-slate-600">Cologne, Germany</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200">
                <FaPhone className="text-blue-600 flex-shrink-0" size={16} />
                <span className="text-slate-600">+49 176 97712721</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
              >
                Get In Touch
                <FaEnvelope size={16} />
              </motion.a>

              <motion.a
                href="#experience"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-slate-700 font-medium rounded-lg shadow-lg shadow-slate-200/50 hover:shadow-xl border border-slate-200 hover:border-slate-300 transition-all duration-200"
              >
                View Portfolio
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-slate-800 text-white font-medium rounded-lg shadow-lg shadow-slate-800/20 hover:shadow-xl hover:bg-slate-900 transition-all duration-200 flex items-center gap-2"
              >
                <FaFileDownload size={16} />
                Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-3">
              {[
                { icon: FaGithub, href: 'https://github.com', label: 'GitHub', color: 'hover:bg-slate-100' },
                { icon: FaLinkedin, href: 'https://linkedin.com/in/muhammad-ali-233a161b1', label: 'LinkedIn', color: 'hover:bg-blue-50' },
                { icon: FaEnvelope, href: 'mailto:muhammadaliacc@gmail.com', label: 'Email', color: 'hover:bg-red-50' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className={`p-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:text-blue-600 ${social.color} transition-all duration-200 group`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Profile Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
                {/* Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl animate-gradient"></div>
                
                {/* Image */}
                <div className="absolute inset-[3px] bg-white rounded-2xl overflow-hidden">
                  <Image
                    src="/DP.jpg"
                    alt="Muhammad Ali"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200"
              >
                <span className="text-sm font-medium text-blue-600">🤖 Agentic AI</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200"
              >
                <span className="text-sm font-medium text-indigo-600">⚡ RAG Systems</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-12 -right-6 bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200"
              >
                <span className="text-sm font-medium text-purple-600">🚀 GenAI Solutions</span>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -top-6 left-12 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                <span className="text-sm font-medium">5+ Years Experience</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-blue-600 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}