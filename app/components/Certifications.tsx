import { FaCertificate } from 'react-icons/fa'

const certifications = [
  "Advanced SQL for Query Tuning and Performance Optimization",
  "Learning Data Analytics: 1 Foundations",
  "Power BI: Integrating AI and Machine Learning",
  "SQL for Data Analysis",
  "Designing Highly Scalable and Highly Available SQL Databases"
]

export default function Certifications() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Certifications</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} 
                   className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition 
                            flex items-start space-x-3 border border-gray-100">
                <FaCertificate className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}