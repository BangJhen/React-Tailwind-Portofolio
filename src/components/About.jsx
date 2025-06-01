// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useState, useEffect } from "react"
import { useScrollTrigger } from '../hooks/useAnimations'

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

  const skills = [
    {
      name: "Programming",
      icon: "💻",
      color: "from-blue-500 to-purple-600",
      summary: "As a skilled programmer with a focus on AI engineering and backend systems, I work fluently across multiple languages to build robust and intelligent solutions. My experience spans across scripting, backend development, and machine learning pipelines.",
      sections: [
        {
          title: "Python",
          description: "Used extensively for machine learning, data preprocessing, and deep learning workflows. Proficient in handling time-series data, building LSTM-based imputation models, and managing structured datasets with libraries like pandas, NumPy, and TensorFlow."
        },
        {
          title: "JavaScript",
          description: "Applied mainly in web development, particularly in frontend interactions (React) and API communication. Strong understanding of asynchronous logic, DOM manipulation, and modern ECMAScript standards. Combined with TypeScript for type safety and scalability."
        },
        {
          title: "Golang",
          description: "Focused on high-performance backend services and concurrent systems. Used for developing fast, stateless APIs, microservices, and real-time data pipelines. Appreciated for its simplicity, performance, and strong typing in production environments."
        }
      ]
    },
    {
      name: "Design",
      icon: "🎨",
      color: "from-pink-500 to-red-500",
      summary: "Creating intuitive and visually appealing interfaces with a focus on user experience and modern design principles. My design approach combines aesthetic appeal with functional usability.",
      sections: [
        {
          title: "UI/UX Design",
          description: "Designing user interfaces that prioritize usability and visual hierarchy. Experience with wireframing, prototyping, and creating design systems that scale across different platforms and devices."
        },
        {
          title: "Frontend Development",
          description: "Translating designs into responsive, interactive web applications using modern CSS frameworks like Tailwind CSS, along with component-based architectures in React for maintainable and scalable interfaces."
        },
        {
          title: "Design Tools",
          description: "Proficient in industry-standard design tools including Figma for collaborative design work, Adobe Creative Suite for graphic design, and various prototyping tools for user testing and validation."
        }
      ]
    },
    {
      name: "Troubleshooting",
      icon: "🔧",
      color: "from-green-500 to-blue-500",
      summary: "Systematic problem-solving approach to identify, analyze, and resolve technical issues across different systems and platforms. Strong analytical skills for debugging complex software and hardware problems.",
      sections: [
        {
          title: "System Debugging",
          description: "Experienced in diagnosing and resolving system-level issues, including performance bottlenecks, memory leaks, and configuration problems across various operating systems and environments."
        },
        {
          title: "Code Debugging",
          description: "Proficient in using debugging tools, log analysis, and systematic testing approaches to identify and fix software bugs. Experience with various debugging techniques and error tracking systems."
        },
        {
          title: "Network & Infrastructure",
          description: "Skilled in troubleshooting network connectivity issues, server configurations, and deployment problems. Experience with monitoring tools and proactive issue prevention strategies."
        }
      ]
    },
    {
      name: "Artificial Intelligence",
      icon: "🤖",
      color: "from-purple-500 to-indigo-600",
      summary: "Developing intelligent systems and applications using cutting-edge AI technologies. Focus on practical AI implementations that solve real-world problems through machine learning and deep learning approaches.",
      sections: [
        {
          title: "Machine Learning Models",
          description: "Building and training various ML models including supervised, unsupervised, and reinforcement learning algorithms. Experience with model optimization, hyperparameter tuning, and deployment strategies."
        },
        {
          title: "Deep Learning",
          description: "Implementing neural networks for complex tasks using frameworks like TensorFlow and PyTorch. Specialized in computer vision, natural language processing, and time-series forecasting applications."
        },
        {
          title: "AI Integration",
          description: "Integrating AI models into production systems, creating APIs for model serving, and developing end-to-end AI pipelines. Focus on scalable and maintainable AI solutions."
        }
      ]
    },
    {
      name: "Machine Learning",
      icon: "🧠",
      color: "from-orange-500 to-red-500",
      summary: "Specialized in developing predictive models and data-driven solutions. Experience with the complete ML pipeline from data preprocessing to model deployment and monitoring.",
      sections: [
        {
          title: "Data Preprocessing",
          description: "Expert in data cleaning, feature engineering, and handling missing values using advanced techniques like LSTM-based imputation. Skilled in working with various data formats and large-scale datasets."
        },
        {
          title: "Model Development",
          description: "Building robust ML models for classification, regression, and forecasting tasks. Experience with ensemble methods, cross-validation, and statistical analysis to ensure model reliability."
        },
        {
          title: "Time Series Analysis",
          description: "Specialized in time series forecasting and analysis, with hands-on experience in competitions and real-world applications. Proficient in handling temporal data patterns and seasonal variations."
        }
      ]
    },
    {
      name: "Computer Vision",
      icon: "👁️",
      color: "from-cyan-500 to-blue-600",
      summary: "Developing visual recognition systems and image processing applications. Experience in creating practical CV solutions for real-world applications including gesture recognition and image analysis.",
      sections: [
        {
          title: "Image Processing",
          description: "Advanced techniques in image preprocessing, filtering, and enhancement. Experience with OpenCV and various computer vision libraries for image manipulation and analysis."
        },
        {
          title: "Object Detection",
          description: "Implementing object detection and recognition systems using deep learning models. Experience with YOLO, R-CNN variants, and custom detection pipelines for specific use cases."
        },
        {
          title: "Gesture Recognition",
          description: "Developed hand gesture recognition systems for music control applications, demonstrating practical implementation of computer vision in interactive systems and real-time processing."
        }
      ]
    },
    {
      name: "Prompting",
      icon: "💬",
      color: "from-emerald-500 to-teal-600",
      summary: "Expert in crafting effective prompts for AI language models to achieve optimal results. Deep understanding of prompt engineering techniques and AI model behavior optimization.",
      sections: [
        {
          title: "Prompt Engineering",
          description: "Developing sophisticated prompting strategies for various AI tasks including text generation, analysis, and problem-solving. Understanding of different prompting techniques and their applications."
        },
        {
          title: "AI Model Optimization",
          description: "Fine-tuning prompt strategies to maximize AI model performance and accuracy. Experience with different model architectures and their specific prompting requirements."
        },
        {
          title: "Conversational AI",
          description: "Designing prompts for conversational AI systems and chatbots. Focus on creating natural, context-aware interactions that provide value to users."
        }
      ]
    },
    {
      name: "Natural Language Processing",
      icon: "🗣️",
      color: "from-violet-500 to-purple-600",
      summary: "Building intelligent language processing systems with expertise in transformer models and large language models. Focus on developing personalized AI assistants and language understanding applications.",
      sections: [
        {
          title: "Language Models",
          description: "Working with transformer-based models and LLMs for various NLP tasks. Experience in model fine-tuning, training, and optimization for specific language processing requirements."
        },
        {
          title: "Text Analysis",
          description: "Implementing text classification, sentiment analysis, and information extraction systems. Skilled in preprocessing text data and building robust NLP pipelines."
        },
        {
          title: "Personalized AI",
          description: "Currently developing a personalized AI Assistant using transformer models, tailored to individual user communication styles and preferences. Focus on adaptive language understanding."
        }
      ]
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
            className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] shadow-2xl"
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
                    onClick={closeModal}
                    className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200 shadow-lg"
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

              {/* Modal Content */}
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
                      className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-300"
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
                <div className="mt-8 pt-6 border-t border-gray-100">
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
