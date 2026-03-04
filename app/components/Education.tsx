import { FaGraduationCap, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa'

const education = [
  {
    degree: "Master's degree in Automation and IT",
    institution: "Cologne University of Applied Sciences",
    period: "October 2022 - February 2026",
    location: "Cologne, Germany"
  },
  {
    degree: "Bachelor's degree in Electrical and Electronics Engineering",
    institution: "Riphah International University",
    period: "September 2017 - August 2021",
    location: "Pakistan"
  }
]

export default function Education() {
  return (
    <section id="education" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Education</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <div className="flex items-start">
                <FaGraduationCap className="text-blue-600 text-2xl mr-4 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-lg text-blue-600 mb-2">{edu.institution}</p>
                  <div className="flex flex-wrap gap-4 text-gray-500">
                    <span className="flex items-center">
                      <FaCalendar className="mr-2" />
                      {edu.period}
                    </span>
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      {edu.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}