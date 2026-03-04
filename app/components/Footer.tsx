import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Muhammad Ali</h3>
              <p className="text-gray-400 mb-4">
                ML/AI Engineer specializing in Agentic AI, RAG, and Generative AI solutions.
              </p>
              <div className="flex space-x-4">
                <a href="https://linkedin.com/in/muhammad-ali-233a161b1" target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-white transition">
                  <FaLinkedin size={24} />
                </a>
                <a href="mailto:muhammadaliacc@gmail.com"
                   className="text-gray-400 hover:text-white transition">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <FaPhone className="mr-3" />
                  <span>+49 176 97712721</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaEnvelope className="mr-3" />
                  <a href="mailto:muhammadaliacc@gmail.com" className="hover:text-white transition">
                    muhammadaliacc@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaLinkedin className="mr-3" />
                  <a href="https://linkedin.com/in/muhammad-ali-233a161b1" target="_blank" rel="noopener noreferrer"
                     className="hover:text-white transition">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Muhammad Ali. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}