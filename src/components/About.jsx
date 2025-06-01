// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger } from '../hooks/useAnimations'

const About = () => {
  const [aboutRef, aboutVisible] = useScrollTrigger(0.3)
  const [skillsRef, skillsVisible] = useScrollTrigger(0.2)

  const skills = [
    { name: 'Web Programming', icon: '💻', color: 'from-blue-500 to-purple-600' },
    { name: 'Design', icon: '🎨', color: 'from-pink-500 to-red-500' },
    { name: 'Troubleshooting', icon: '🔧', color: 'from-green-500 to-blue-500' },
    { name: 'Artificial Intelligence', icon: '🤖', color: 'from-purple-500 to-indigo-600' },
    { name: 'Machine Learning', icon: '🧠', color: 'from-orange-500 to-red-500' },
    { name: 'Computer Vision', icon: '👁️', color: 'from-cyan-500 to-blue-600' },
    { name: 'Prompting', icon: '💬', color: 'from-emerald-500 to-teal-600' },
    { name: 'Natural Language Processing', icon: '🗣️', color: 'from-violet-500 to-purple-600' }
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
                  className="skill-card group"
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative p-5 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                    {/* Gradient Border Effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
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
                          className={`h-1 bg-gradient-to-r ${skill.color} rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {/* Arrow Icon */}
                      <motion.div 
                        className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
                        whileHover={{ x: 3 }}
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
      </div>
    </section>
  )
}

export default About
