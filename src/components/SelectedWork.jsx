import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger, useStaggerAnimation } from '../hooks/useAnimations'

const SelectedWork = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [headerRef, headerVisible] = useScrollTrigger(0.2)
  const [projectsRef, visibleProjects] = useStaggerAnimation(4, 200)
  
  const projects = [
    {
      id: 1,
      title: "Sentiment Analysis With Qwen2.5 Evaluation",
      year: "2025",
      category: ["NLP", "LLM", "Python"],
      image: "/sentiment_analysis_project_img.png",
      description: "AI-powered sentiment analysis tool",
      href:"https://sentiment-analysis-with-qwen.streamlit.app"
    }
  ]

//   const filters = ['All', 'MACHINE LEARNING', 'WEB DEV', 'COMPUTER VISION']
  const filters = []


  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))

  const handleProjectClick = (href) => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={headerVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Project<br />
            </motion.h2>
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={headerVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See All
            </motion.button>
          </div>
          
          {/* Filter buttons */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 50 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-3 mb-8">
              {filters.map((filter, index) => (
                <motion.button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              data-index={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              animate={visibleProjects.has(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
              whileHover={{ y: -5 }}
              onClick={() => handleProjectClick(project.href)}
            >
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[16/10] relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div 
                        className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0 }}
                  animate={visibleProjects.has(index) ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <span className="text-gray-400 text-xs font-medium ml-4 flex-shrink-0 bg-gray-100 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.category.map((cat, catIndex) => (
                      <motion.span 
                        key={cat}
                        className="px-3 py-1 text-xs font-medium rounded border border-gray-200 text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={visibleProjects.has(index) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.4 + catIndex * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>

                  {/* Project link indicator */}
                  <div className="flex items-center mt-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                    <span className="text-xs font-medium uppercase tracking-wide">View Project</span>
                    <motion.svg 
                      className="w-3 h-3 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      animate={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SelectedWork
