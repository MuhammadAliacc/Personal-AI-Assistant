export default function Summary() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              Data engineer with practical experience from a two-year research project at TH Köln, where I built end-to-end data pipelines on AWS and developed reinforcement learning models for real building controls. My focus is on scalable cloud solutions and ETL workflows.
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