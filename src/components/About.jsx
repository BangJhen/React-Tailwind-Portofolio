// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { useScrollTrigger } from '../hooks/useAnimations'
import { getAllSkills } from '../data/skillsUtils'

const About = () => {
  const [aboutRef, aboutVisible] = useScrollTrigger(0.3)
  const [skillsRef, skillsVisible] = useScrollTrigger(0.2)
  const [selectedSkill, setSelectedSkill] = useState(null)

  // Scroll lock effect when modal is open
  useEffect(() => {
    if (selectedSkill) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        
        // Restore scroll position
        window.scrollTo(0, scrollY)
      }
    }
  }, [selectedSkill])

  // Enhanced close function with accessibility
  const closeModal = () => {
    setSelectedSkill(null)
  }

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedSkill) {
        closeModal()
      }
    }

    if (selectedSkill) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedSkill])

  // Import skills data from modular JSON files
  const skills = getAllSkills()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="about" className="relative py-20 min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 overflow-hidden">
      {/* Modern Background Design */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-gradient-to-br from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-purple-400/20 rounded-full animate-bounce delay-200"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400/30 rounded-sm transform rotate-45 animate-pulse delay-700"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-8 bg-gradient-to-b from-indigo-400/20 to-purple-400/20 rounded-full animate-pulse delay-1200"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={aboutVisible ? "visible" : "hidden"}
            className="relative"
          >
            {/* Enhanced Section Header */}
            <motion.div 
              variants={itemVariants}
              className="relative mb-8"
            >
              <motion.h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 leading-tight"
                whileHover={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  transition: { duration: 2 }
                }}
              >
                About Me
              </motion.h2>
              
              {/* Decorative accent line */}
              <motion.div 
                className="mt-4 w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={aboutVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              
              {/* Background text decoration */}
              <div className="absolute -top-4 -left-4 text-8xl md:text-9xl font-black text-purple-100/30 -z-10 select-none">
                About
              </div>
            </motion.div>

            {/* Enhanced Content Container */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              {/* Content paragraphs with improved typography */}
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium"
              >
                I'm a passionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">Artificial Intelligence Engineer</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">Web Developer</span> with over 1 year of experience creating innovative solutions that bridge technology and human needs.
              </motion.p>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
              >
                My expertise spans <strong className="text-gray-900">Time Series Forecasting</strong> competitions, where I've applied cutting-edge methods and techniques. I've also gained hands-on experience implementing AI solutions, including <strong className="text-gray-900">Computer Vision for music control through hand gestures</strong> - a project that showcases my ability to translate complex AI concepts into practical applications.
              </motion.p>

              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
              >
                Currently, I'm deeply focused on <strong className="text-gray-900">Large Language Models (LLMs)</strong> and their transformative potential. I'm working on developing a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">personalized AI Assistant</span> that leverages Transformer-based models to understand and adapt to user-specific language patterns and communication styles.
              </motion.p>

              {/* Enhanced stats or highlights */}
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200/50"
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">1+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI/ML</div>
                  <div className="text-sm text-gray-600 font-medium">Specialization</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            ref={skillsRef}
            className="relative space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={skillsVisible ? "visible" : "hidden"}
          >
            {/* Enhanced Skills Header */}
            <motion.div 
              variants={itemVariants}
              className="relative mb-8"
            >
              <motion.h3 
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-4"
              >
                Skills & Expertise
              </motion.h3>
              
              {/* Decorative line for skills section */}
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={skillsVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              
              {/* Background decoration */}
              <div className="absolute -top-2 -right-4 text-6xl md:text-7xl font-black text-blue-100/20 -z-10 select-none">
                Skills
              </div>
            </motion.div>
            
            {/* Enhanced Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-card group cursor-pointer"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                >
                  <div className={`relative p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border ${selectedSkill === skill ? 'border-purple-300 shadow-xl' : 'border-white/30 group-hover:border-purple-200'}`}>
                    {/* Enhanced Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} p-[1px] ${selectedSkill === skill ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                      <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl" />
                    </div>
                    
                    <div className="relative z-10 flex items-center space-x-4">
                      {/* Enhanced Icon Container */}
                      <motion.div 
                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.4 }
                        }}
                      >
                        <span className="text-xl text-white">
                          {skill.icon}
                        </span>
                      </motion.div>
                      
                      {/* Enhanced Skill Name */}
                      <div className="flex-1">
                        <h4 className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                          {skill.name}
                        </h4>
                        <motion.div 
                          className={`h-1 bg-gradient-to-r ${skill.color} rounded-full mt-2 ${selectedSkill === skill ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: selectedSkill === skill ? 1 : 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {/* Enhanced Arrow Icon */}
                      <motion.div 
                        className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                        animate={{ 
                          rotate: selectedSkill === skill ? 90 : 0,
                          x: selectedSkill === skill ? 0 : 0
                        }}
                        whileHover={{ x: selectedSkill === skill ? 0 : 3 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    {/* Enhanced Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                      <div className={`w-full h-full bg-gradient-to-br ${skill.color} rounded-full transform translate-x-6 -translate-y-6 blur-sm`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Pop-out Modal for Skill Description */}
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-lg rounded-3xl max-w-6xl w-full max-h-[90vh] shadow-2xl border border-white/20"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div className={`relative p-6 rounded-t-3xl bg-gradient-to-r ${selectedSkill.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{selectedSkill.icon}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                  </div>
                  
                  {/* Enhanced X Button */}
                  <motion.button
                    onClick={closeModal}
                    className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close skill description"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Summary */}
                <div className="mb-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedSkill.summary}
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                  {selectedSkill.sections?.map((section, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100/50 hover:border-gray-200 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Section Header */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-md`}>
                          <span className="text-sm font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">
                          {section.title}
                        </h4>
                      </div>
                      
                      {/* Section Description */}
                      <p className="text-gray-700 leading-relaxed text-base">
                        {section.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Footer instruction */}
                <div className="mt-8 pt-6 border-t border-gray-100/50">
                  <p className="text-sm text-gray-500 italic text-center">
                    Click outside, press ESC, or press the × button to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default About
