'use client'

import { motion } from 'framer-motion'
import { 
  SiPython, 
  SiTensorflow, 
  SiPytorch, 
  SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiApachespark,
  SiTableau,
  SiPowerbi
} from 'react-icons/si'
import { TbBrandOpenai } from 'react-icons/tb'
import { FaRobot, FaBrain, FaCloud, FaDatabase } from 'react-icons/fa'
import { ReactNode } from 'react'

interface Skill {
  name: string;
  level: number;
  icon: ReactNode;
}

interface SkillCategory {
  title: string;
  icon: ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: <FaBrain className="text-blue-600" />,
    skills: [
      { name: "Large Language Models", level: 85, icon: <TbBrandOpenai /> },
      { name: "Retrieval-Augmented Generation", level: 90, icon: <FaRobot /> },
      { name: "Generative AI", level: 90, icon: <FaBrain /> },
      { name: "TensorFlow/PyTorch", level: 95, icon: <SiTensorflow /> },
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: <FaCloud className="text-purple-600" />,
    skills: [
      { name: "AWS Cloud", level: 80, icon: <SiAmazonaws /> },
      { name: "Docker/Kubernetes", level: 85, icon: <SiDocker /> },
      { name: "CI/CD Pipelines", level: 90, icon: <SiKubernetes /> },
      { name: "MLOps", level: 80, icon: <SiApachespark /> },
    ]
  },
  {
    title: "Data Engineering",
    icon: <FaDatabase className="text-green-600" />,
    skills: [
      { name: "ETL Pipelines", level: 92, icon: <SiApachespark /> },
      { name: "SQL Databases", level: 95, icon: <SiPostgresql /> },
      { name: "NoSQL Databases", level: 80, icon: <SiMongodb /> },
      { name: "Data Warehousing", level: 88, icon: <SiRedis /> },
    ]
  },
  {
    title: "Data Analytics",
    icon: <FaDatabase className="text-orange-600" />,
    skills: [
      { name: "Power BI", level: 85, icon: <SiPowerbi /> },
      { name: "Data Visualization", level: 92, icon: <SiTableau /> },
      { name: "Statistical Analysis", level: 88, icon: <SiPython /> },
    ]
  }
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expertise across AI, Cloud, and Data Engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-blue-600 mr-2">{skill.icon}</span>
                        <span className="text-gray-700 font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill badges */}
        <div className="absolute top-20 left-10 opacity-20 hidden lg:block">
          <div className="text-8xl animate-spin-slow">⚡</div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 hidden lg:block">
          <div className="text-8xl animate-bounce">🤖</div>
        </div>
      </div>
    </section>
  )
}