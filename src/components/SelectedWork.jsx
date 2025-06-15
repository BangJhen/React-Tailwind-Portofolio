import { useState, useEffect, memo, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger, useStaggerAnimation } from '../hooks/useAnimations'
import LazyImage from './LazyImage'

const SelectedWork = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(false)
  const [headerRef, headerVisible] = useScrollTrigger(0.2)
  const [projectsRef, visibleProjects] = useStaggerAnimation(4, 200)

  // Detect mobile layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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
    <section id="work" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16"
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          animate={isMobile ? { opacity: 1, y: 0 } : (headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 })}
          transition={isMobile ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
        >
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              animate={isMobile ? { opacity: 1, x: 0 } : (headerVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 })}
              transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            >
              Project<br />
            </motion.h2>
            <motion.button 
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={isMobile ? { opacity: 1, scale: 1 } : (headerVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 })}
              transition={isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
            >
              See All
            </motion.button>
          </div>
          
          {/* Filter buttons */}
          <motion.div 
            className="lg:w-2/3"
            initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            animate={isMobile ? { opacity: 1, x: 0 } : (headerVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 })}
            transition={isMobile ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
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
                  initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={isMobile ? { opacity: 1, y: 0 } : (headerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 })}
                  transition={isMobile ? { duration: 0 } : { duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Grid - Minimalist Design */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              data-index={index}
              className="group cursor-pointer"
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              animate={isMobile ? { opacity: 1, y: 0 } : (visibleProjects.has(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 })}
              transition={isMobile ? { duration: 0 } : { 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
              whileHover={isMobile ? {} : { y: -2 }}
              onClick={() => handleProjectClick(project.href)}
            >
              <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm">
                {/* Smaller Image */}
                <motion.div 
                  className="relative overflow-hidden"
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  transition={isMobile ? { duration: 0 } : { duration: 0.2 }}
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
                      <motion.div 
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
                        initial={isMobile ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                        whileHover={isMobile ? {} : { scale: 1, opacity: 1 }}
                        transition={isMobile ? { duration: 0 } : { duration: 0.15 }}
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Compact Content */}
                <motion.div 
                  className="p-4"
                  initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
                  animate={isMobile ? { opacity: 1 } : (visibleProjects.has(index) ? { opacity: 1 } : { opacity: 0 })}
                  transition={isMobile ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 + 0.2 }}
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
                      <motion.span 
                        key={cat}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 text-gray-600 border border-gray-100"
                        initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        animate={isMobile ? { opacity: 1, scale: 1 } : (visibleProjects.has(index) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 })}
                        transition={isMobile ? { duration: 0 } : { duration: 0.3, delay: index * 0.1 + 0.3 + catIndex * 0.05 }}
                      >
                        {cat}
                      </motion.span>
                    ))}
                  </div>

                  {/* Year and Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {project.year}
                    </span>
                    <motion.div 
                      className="flex items-center text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                      whileHover={isMobile ? {} : { x: 2 }}
                      transition={isMobile ? { duration: 0 } : { duration: 0.15 }}
                    >
                      <span className="text-xs font-medium">View</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
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

export default memo(SelectedWork)
