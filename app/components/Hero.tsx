'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileDownload, FaArrowRight } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 md:pt-0">
      {/* Sophisticated animated background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Gradient orbs with reduced opacity for subtlety */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse-slow hidden md:block"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl animate-pulse-slow hidden md:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow hidden md:block" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Minimalist grid overlay */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            {/* Subtle badge
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-700">Available for opportunities</span>
            </motion.div> */}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Muhammad Ali
              </span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl text-slate-600 mb-6 h-16 md:h-20 font-light">
              <TypeAnimation
                sequence={[
                  'ML/Data Engineering',
                  1000,
                  'AWS Cloud Solutions',
                  1000,
                  'Kubernetes & CI/CD',
                  1000,
                  'ETL/ELT Pipelines',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-medium text-blue-600"
              />
            </div>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building ETL and ELT pipelines on Cloud platforms to solve real world data challenges.
              Specialized in <span className="font-semibold text-slate-800">ETL/ELT, CI/CD pipelines,</span> and
              <span className="font-semibold text-slate-800"> cloud data engineering</span>.
            </p>

            {/* Location and contact - refined */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mb-8">
              <div className="flex items-center justify-center text-slate-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/60 text-sm">
                <HiOutlineLocationMarker className="text-blue-500 mr-2" size={16} />
                <span>Hurth, Germany</span>
              </div>
              <div className="flex items-center justify-center text-slate-600 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/60 text-sm">
                <FaPhone className="text-blue-500 mr-2" size={14} />
                <span>+49 176 97712721</span>
              </div>
            </div>

            {/* CTA Buttons - refined */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get In Touch
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#experience"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-slate-200 hover:border-blue-200"
              >
                View My Work
              </motion.a>
            </div>

            {/* Social Links - refined */}
            <div className="flex justify-center lg:justify-start space-x-3 mt-8">
              {[
                { icon: FaGithub, link: 'https://github.com', label: 'GitHub' },
                { icon: FaLinkedin, link: 'https://linkedin.com/in/muhammad-ali-233a161b1', label: 'LinkedIn' },
                { icon: FaEnvelope, link: 'mailto:muhammadaliacc@gmail.com', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-slate-200 hover:border-blue-200"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right content - Profile Image with enhanced design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative mt-8 lg:mt-0"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 mx-auto">
              {/* Enhanced animated rings */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-400/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Main image container */}
              <div className="absolute inset-4 bg-blue rounded-full overflow-hidden shadow-2xl ring-4 ring-blue/50">
                <div className="relative w-full h-full">
                  <Image 
                    src="/DP_2.jpeg" 
                    alt="Muhammad Ali"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 384px"
                  />
                </div>
              </div>

              {/* Floating tech badges - refined */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-blue-100 text-sm font-medium text-blue-700"
              >
                <span className="flex items-center gap-1">
                  <span className="text-base"></span> ETL/ELT
                </span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-indigo-100 text-sm font-medium text-indigo-700"
              >
                <span className="flex items-center gap-1">
                  <span className="text-base"></span> Cloud Solutions
                </span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
                className="absolute top-1/2 -right-8 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-purple-100 text-sm font-medium text-purple-700"
              >
                <span className="flex items-center gap-1">
                  <span className="text-base"></span> AWS 
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - refined */}
      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
        <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}