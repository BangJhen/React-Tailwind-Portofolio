// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useState } from "react"
import { useScrollTrigger } from '../hooks/useAnimations'

const About = () => {
  const [aboutRef, aboutVisible] = useScrollTrigger(0.3)
  const [skillsRef, skillsVisible] = useScrollTrigger(0.2)
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skills = [
    { 
      name: 'Web Programming', 
      icon: '💻', 
      color: 'from-blue-500 to-purple-600',
      description: 'Description for Web Programming - I will write later'
    },
    { 
      name: 'Design', 
      icon: '🎨', 
      color: 'from-pink-500 to-red-500',
      description: 'Description for Design - I will write later'
    },
    { 
      name: 'Troubleshooting', 
      icon: '🔧', 
      color: 'from-green-500 to-blue-500',
      description: 'Description for Troubleshooting - I will write later'
    },
    { 
      name: 'Artificial Intelligence', 
      icon: '🤖', 
      color: 'from-purple-500 to-indigo-600',
      description: 'Description for Artificial Intelligence - I will write later'
    },
    { 
      name: 'Machine Learning', 
      icon: '🧠', 
      color: 'from-orange-500 to-red-500',
      description: 'Description for Machine Learning - I will write later'
    },
    { 
      name: 'Computer Vision', 
      icon: '👁️', 
      color: 'from-cyan-500 to-blue-600',
      description: 'Description for Computer Vision - I will write later'
    },
    { 
      name: 'Prompting', 
      icon: '💬', 
      color: 'from-emerald-500 to-teal-600',
      description: 'Description for Prompting - I will write later'
    },
    { 
      name: 'Natural Language Processing', 
      icon: '🗣️', 
      color: 'from-violet-500 to-purple-600',
      description: 'Description for Natural Language Processing - I will write later'
    }
  ]

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
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={aboutVisible ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              About Me
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-6 text-justify"
            >
              I'm a passionate Artificial Intellegent, Web Developer with over 1 years of experience. 
            </motion.p>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 text-justify"
            >
            I have experience in Time Series Forecasting competitions, where I applied innovative methods and techniques. I also have hands-on experience in implementing AI solutions, such as using Computer Vision for music control through hand gestures.
            Currently, I’m deeply interested in Large Language Models (LLMs). 
            </motion.p>

              <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 text-justify"
            >
            Building upon my existing AI knowledge, I am working on a project that leverages Transformer-based models to develop a personalized AI Assistant tailored to user-specific language and communication styles.
            </motion.p>
          </motion.div>

          <motion.div 
            ref={skillsRef}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={skillsVisible ? "visible" : "hidden"}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 mb-8"
            >
              Skills & Expertise
            </motion.h3>
            
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
                  <div className={`relative p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border ${selectedSkill === skill ? 'border-gray-300 shadow-lg' : 'border-gray-100 group-hover:border-gray-200'}`}>
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} p-[1px] ${selectedSkill === skill ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                      <div className="w-full h-full bg-white rounded-2xl" />
                    </div>
                    
                    <div className="relative z-10 flex items-center space-x-4">
                      {/* Icon Container */}
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
                      
                      {/* Skill Name */}
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
                      
                      {/* Arrow Icon */}
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
                    
                    {/* Subtle Background Pattern */}
                    <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                      <div className={`w-full h-full bg-gradient-to-br ${skill.color} rounded-full transform translate-x-6 -translate-y-6`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>

        {/* Pop-out Modal for Skill Description */}
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`relative p-6 rounded-t-3xl bg-gradient-to-r ${selectedSkill.color}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <span className="text-3xl">{selectedSkill.icon}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white">{selectedSkill.name}</h3>
                  </div>
                  
                  {/* X Button - Clean white circle in top right */}
                  <motion.button
                    onClick={() => setSelectedSkill(null)}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-lg"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Skill Info Section */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-md`}>
                    <span className="text-xl text-white">{selectedSkill.icon}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">{selectedSkill.name}</h4>
                </div>

                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedSkill.description}
                  </p>
                </div>
                
                {/* Footer instruction */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500 italic text-center">
                    Click outside or press the × button to close
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
