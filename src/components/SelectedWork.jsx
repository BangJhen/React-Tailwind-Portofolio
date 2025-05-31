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
      title: "ZENPOINT",
      year: "2024",
      category: ["UI DESIGN", "WEB DEV"],
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop",
      description: "Discover Our Inspiring Mission",
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      title: "PAYU",
      year: "2024",
      category: ["UI DESIGN", "WEB DEV"],
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=600&h=400&fit=crop",
      description: "Available now on the platform",
      color: "from-amber-400 to-orange-400"
    },
    {
      id: 3,
      title: "COMPAI",
      year: "2024",
      category: ["UI DESIGN", "MOBILE DEV", "WEB DEV"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      description: "Your pocket companion",
      color: "from-gray-600 to-gray-800"
    },
    {
      id: 4,
      title: "CHATPIC.AI",
      year: "2024",
      category: ["UI DESIGN", "MOBILE DEV"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      description: "AI-powered communication platform",
      color: "from-purple-400 to-pink-400"
    }
  ]

//   const filters = ['All', 'MACHINE LEARNING', 'WEB DEV', 'COMPUTER VISION']
  const filters = []


  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter))

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
              className="group cursor-pointer card-hover"
              initial={{ opacity: 0, y: 60 }}
              animate={visibleProjects.has(index) ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut",
                delay: index * 0.1 
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div 
                  className={`h-64 bg-gradient-to-br ${project.color} relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <motion.h3 
                        className="text-xl font-semibold mb-2"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.description}
                      </motion.h3>
                      <motion.div 
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg mx-auto"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
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
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className="text-gray-500 text-sm">{project.year}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.category.map((cat, catIndex) => (
                      <motion.span 
                        key={cat}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          cat === 'UI DESIGN' ? 'bg-cyan-100 text-cyan-700' :
                          cat === 'WEB DEV' ? 'bg-gray-100 text-gray-700' :
                          'bg-blue-100 text-blue-700'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={visibleProjects.has(index) ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.4 + catIndex * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {cat}
                      </motion.span>
                    ))}
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
