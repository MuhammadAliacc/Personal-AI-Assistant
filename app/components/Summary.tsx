export default function Summary() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Data Engineer mit praktischer Erfahrung aus einem zweijährigen Forschungsprojekt an der TH Köln, wo ich End-to-End-Datenpipelines auf AWS gebaut und Reinforcement-Learning-Modelle für reale Gebäudesteuerungen entwickelt habe. Mein Fokus liegt auf skalierbaren Cloud-Lösungen und ETL Workflows.
            </p>
            
            <p className="font-semibold text-blue-600">
              Open to roles in ML/Data Engineering where I can make meaningful contributions to impactful, production-grade systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}