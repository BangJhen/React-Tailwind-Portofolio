// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger } from '../hooks/useAnimations'

const About = () => {
  const [aboutRef, aboutVisible] = useScrollTrigger(0.3)
  const [skillsRef, skillsVisible] = useScrollTrigger(0.2)

  const skills = [
    { name: 'UI/UX Design', level: 95 },
    { name: 'React Development', level: 90 },
    { name: 'Mobile Development', level: 85 },
    { name: 'Web Development', level: 92 },
    { name: 'Brand Identity', level: 88 }
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
            
            <motion.div 
              ref={skillsRef}
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate={skillsVisible ? "visible" : "hidden"}
            >
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="skill-item"
                  variants={itemVariants}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={skillsVisible ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.2 + 0.5,
                        ease: "easeOut" 
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop&crop=face" 
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
            </motion.div>
            <motion.div 
              className="absolute top-4 right-4 w-72 h-72 bg-blue-200 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aboutVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-200 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aboutVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
