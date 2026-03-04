export default function Summary() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              AI Engineer with hands-on experience in developing and deploying scalable AI solutions in production environments. 
              Specializing in Agentic AI, Generative AI (GenAI), and Retrieval-Augmented Generation (RAG) systems. 
              Passionate about applying GenAI to real-world problems by building reliable, efficient, and user-focused AI systems.
            </p>
            
            <p>
              I have experience integrating LLM APIs, building embedding pipelines, working with vector databases, 
              and deploying AI services in cloud environments. My expertise also includes developing scalable data pipelines, 
              deploying machine learning models, and maintaining reliable AI services in production.
            </p>
            
            <p className="font-semibold text-blue-600">
              Open to roles in ML/AI Engineering, Applied AI, and LLM Engineering where I can make meaningful contributions 
              to impactful, production-grade AI systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}