import { useEffect, useState, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollAnimation } from '../hooks/useAnimations'
import { useTypewriter } from '../hooks/useTypewriter'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const scrollY = useScrollAnimation()
  
  // Typewriter effect for the name - memoized to prevent re-initialization
  const name = useMemo(() => "Muhammad Ammar Ridho", [])
  const { displayText: nameText } = useTypewriter(name, 100, 800)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 relative"
          >
            <div className="gooey-marquee">
              <span className="gradient-text gooey-text">
                {nameText}
              </span>
              <motion.span 
                className="text-purple-600 text-4xl md:text-6xl font-bold ml-2"
                animate={{ 
                  opacity: [1, 1, 0, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                |
              </motion.span>
            </div>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Agentic AI Enthusiast | ML/AI Engineer and Data Scientist | Telkom University Data Science Student 
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="space-x-4"
          >
            <motion.a 
              href="#work"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-full transition-all duration-200"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#2563eb",
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a 
              href="#contact"
              className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full transition-all duration-200"
              whileHover={{ 
                scale: 1.05,
                borderColor: "#6b7280",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div 
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
