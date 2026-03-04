'use client'

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileDownload } from 'react-icons/fa'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Muhammad Ali
              </span>
            </h1>

            <div className="text-2xl lg:text-3xl text-gray-700 mb-6 h-20">
              <TypeAnimation
                sequence={[
                  'ML/AI Engineering',
                  1500,
                  'Agentic AI',
                  1500,
                  'RAG & GenAI',
                  1500,
                  'AWS Cloud Architecture',
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-semibold text-gradient"
              />
            </div>

            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
              Building production-grade AI systems that solve real-world problems. 
              Specialized in Agentic AI, RAG, and Generative AI technologies.
            </p>

            {/* Location and contact */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <HiOutlineLocationMarker className="text-blue-600 mr-2" />
                <span>Cologne, Germany</span>
              </div>
              <div className="flex items-center text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <FaPhone className="text-blue-600 mr-2" />
                <span>+49 176 97712721</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <span className="relative z-10 flex items-center">
                  Get In Touch
                  <FaEnvelope className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.a>

              <motion.a
                href="#experience"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-blue-600"
              >
                View My Work
              </motion.a>

              {/* <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all flex items-center"
              >
                <FaFileDownload className="mr-2" />
                Resume
              </motion.a> */}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4 mt-8">
              {[
                { icon: FaGithub, link: 'https://github.com/MuhammadAliacc', color: 'hover:text-gray-900' },
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
                  className={`bg-white p-3 rounded-full shadow-md hover:shadow-xl transition-all ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right content - Profile Image */}
            <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
            >
            <div className="relative w-80 h-80 mx-auto border border-red-500">
              <div className="absolute inset-4 bg-white rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="DP.jpg"
                  alt="Muhammad Ali"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Floating tech badges (keep these as they are) */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg"
            >
                <span className="text-blue-600 font-semibold">🤖 LLM</span>
            </motion.div>
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-full shadow-lg"
            >
                <span className="text-indigo-600 font-semibold">⚡ RAG</span>
            </motion.div>
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                className="absolute top-1/2 -right-12 bg-white px-4 py-2 rounded-full shadow-lg"
            >
                <span className="text-purple-600 font-semibold">🚀 GenAI</span>
            </motion.div>
            </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  )
}