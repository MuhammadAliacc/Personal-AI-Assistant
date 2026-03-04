'use client'

import { motion } from 'framer-motion'
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa'
import { useState } from 'react'

const experiences = [
  {
    title: "Research Associate",
    company: "Cologne University of Applied Sciences",
    period: "November 2023 - December 2025",
    location: "Cologne, Germany",
    description: "Led development of scalable ML systems for smart building optimization.",
    achievements: [
      "Designed ML-based solutions for smart building optimization",
      "Built scalable data pipelines for real-world sensor data",
      "Developed cloud-native AWS workflows for end-to-end ML solutions",
      "Integrated LLMs and RAG-based systems into applications"
    ],
    thesis: {
      title: "Master Thesis Project",
      description:
        "Development of a Scalable Machine Learning Pipeline on AWS for Optimizing Building Heating Systems using Reinforcement Learning and Transfer Learning",
      highlights: [
        "Designed cloud-native ML platform on AWS",
        "Implemented modular forecasting pipeline",
        "Trained RL models for heating optimization",
        "Applied transfer learning for adaptation to unseen environments"
      ]
    },
    icon: "🔬",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Data Analyst",
    company: "Andromeda Technologies (Pvt) Ltd",
    period: "February 2022 - July 2022",
    location: "Islāmābād, Pakistan",
    achievements: [
      "Analyzed network performance and outage reports",
      "Tracked operational costs and visualized metrics",
      "Delivered data-driven insights to optimize operations"
    ],
    icon: "📊",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Student Internship",
    company: "WAPDA",
    period: "April 2019 - September 2019",
    location: "Chashma, Pakistan",
    achievements: [
      "Designed ETL pipeline for energy data",
      "Managed and optimized data warehouses",
      "Automated data ingestion workflows"
    ],
    icon: "⚡",
    color: "from-orange-500 to-red-500"
  }
]

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="experience" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            My professional journey in AI and Machine Learning
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-blue-600 z-10">
                <div className="w-full h-full rounded-full bg-gradient-to-r ${exp.color} animate-ping"></div>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-20 md:pl-0`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer ${
                    expandedIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  <div className={`p-6 bg-gradient-to-r ${exp.color} text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{exp.icon}</span>
                      <FaArrowRight className={`transform transition-transform ${
                        expandedIndex === index ? 'rotate-90' : ''
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                    <p className="text-white/90 text-lg mb-2">{exp.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/80">
                      <span className="flex items-center">
                        <FaCalendar className="mr-2" />
                        {exp.period}
                      </span>
                      <span className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{ height: expandedIndex === index ? 'auto' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6">
                      {exp.description && (
                        <p className="text-gray-600 mb-4 italic border-l-4 border-blue-600 pl-4">
                          {exp.description}
                        </p>
                      )}

                      {exp.thesis && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                          <h4 className="text-xl font-semibold text-gray-800 mb-3">
                            🎓 {exp.thesis.title}
                          </h4>

                          <p className="text-gray-600 mb-4 italic border-l-4 border-purple-500 pl-4">
                            {exp.thesis.description}
                          </p>

                          <ul className="space-y-2">
                            {exp.thesis.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-purple-600 mr-3 mt-1">•</span>
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                            <span className="text-gray-600">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}