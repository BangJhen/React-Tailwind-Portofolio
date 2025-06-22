import { useState, useEffect, memo, useMemo } from 'react'
import LazyImage from './LazyImage'
import AOS from 'aos'
import 'aos/dist/aos.css'

const SelectedWork = () => {
  const [activeFilter, setActiveFilter] = useState('All')

  // Initialize AOS with better synchronization
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99
    })
  }, [])
  
  // Memoize projects data to prevent recreation
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Sentiment Analysis With Qwen2.5 Evaluation",
      year: "2025",
      category: ["NLP", "LLM", "Python"],
      image: "/sentiment_analysis_project_img.png",
      description: "AI-powered sentiment analysis tool",
      href:"https://sentiment-analysis-with-qwen.streamlit.app"
    }
  ], [])

//   const filters = ['All', 'MACHINE LEARNING', 'WEB DEV', 'COMPUTER VISION']
  // Memoize filters array
  const filters = useMemo(() => [], [])

  // Memoize filtered projects to avoid recalculation on every render
  const filteredProjects = useMemo(() => 
    activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category.includes(activeFilter)),
    [activeFilter, projects]
  )

  // Memoize click handler to prevent recreation
  const handleProjectClick = useMemo(() => (href) => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <section id="work" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-12 lg:mb-16"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="0"
        >
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 lg:mb-4"
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="600"
            >
              Project<br />
            </h2>
            <button 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white text-sm sm:text-base rounded-full hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="500"
            >
              See All
            </button>
          </div>
          
          {/* Filter buttons */}
          <div 
            className="lg:w-2/3"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-duration="600"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 lg:mb-8">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-aos="zoom-in"
                  data-aos-delay={600 + index * 50}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid - Minimalist Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              data-index={index}
              className="group cursor-pointer hover:-translate-y-2 transition-all duration-300"
              onClick={() => handleProjectClick(project.href)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                {/* Smaller Image */}
                <div 
                  className="relative overflow-hidden group-hover:scale-102 transition-transform duration-200"
                >
                  <div className="aspect-[4/3] relative">
                    <LazyImage
                      src={project.image} 
                      alt={project.title}
                      className="absolute inset-0"
                      style={{ width: '100%', height: '100%' }}
                    />
                    {/* Minimalist hover overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <div 
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Compact Content */}
                <div 
                  className="p-4"
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 200}
                >
                  {/* Title and Year */}
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Tags - More compact */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.category.map((cat, catIndex) => (
                      <span 
                        key={cat}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-600 border border-gray-100 opacity-0 scale-80 animate-fadeIn"
                        style={{ 
                          animationDelay: `${index * 100 + 300 + catIndex * 50}ms`,
                          animationFillMode: 'forwards'
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Year and Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {project.year}
                    </span>
                    <div 
                      className="flex items-center text-gray-500 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span className="text-xs font-medium">View</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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

export default memo(SelectedWork)
