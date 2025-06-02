import { useEffect, useState, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollAnimation } from '../hooks/useAnimations'
import { useTypewriter } from '../hooks/useTypewriter'

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const scrollY = useScrollAnimation()
  
  // Typewriter effect for the name - memoized to prevent re-initialization
  const name = useMemo(() => "Muhammad Ammar Ridho", [])
  const { displayText: nameText } = useTypewriter(name, 100, 800)

  // Debug logging
  // useEffect(() => {
  //   console.log('nameText:', nameText, 'length:', nameText.length)
  // }, [nameText])

  useEffect(() => {
    setIsLoaded(true)
    
    // Check if screen is mobile size - updated for better laptop support
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280) // Hide scroll indicator on screens < 1280px (only show on larger desktops)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
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
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left order-2 lg:order-1 w-full lg:max-w-none lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.h1 
              variants={itemVariants}
              className="hero-creative-gradient text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-5 relative leading-tight text-center lg:text-left"
            >
              <div className="flex items-baseline justify-center lg:justify-start">
                <span 
                  className="prismatic-text whitespace-nowrap font-extrabold"
                  data-text={nameText}
                >
                  {nameText}
                </span>
                <motion.span 
                  className="text-purple-500 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold blinking-cursor"
                  style={{ marginLeft: '2px' }}
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
            
            {/* Tagline/Description Section */}
            <motion.div
              variants={itemVariants}
              className="mb-6 lg:mb-8"
            >
              <motion.p 
                className="text-lg sm:text-xl lg:text-xl text-gray-600 leading-relaxed text-center lg:text-left max-w-2xl mx-auto lg:mx-0 mb-6"
                variants={itemVariants}
              >
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">intelligent AI solutions</span> that solve real-world challenges.
              </motion.p>

              {/* Enhanced Tags Section - Primary Role and Skills in Same Line */}
              <motion.div className="space-y-4">
                {/* Combined Primary Role and Skills Container */}
                <motion.div 
                  className="flex flex-wrap gap-3 items-center justify-center lg:justify-start"
                  variants={itemVariants}
                >
                  {/* Primary Role - Rescaled Design */}
                  <motion.div 
                    className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white text-sm rounded-lg font-semibold shadow-lg overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                      animate={{ 
                        x: [-100, 200],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                    <span className="relative z-10 flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.5 2 5.5 4.5 5 8C4.8 9.2 5.2 10.5 6 11.5C6.5 12.2 6.8 13 6.8 13.8C6.8 15.5 8.3 17 10 17H14C15.7 17 17.2 15.5 17.2 13.8C17.2 13 17.5 12.2 18 11.5C18.8 10.5 19.2 9.2 19 8C18.5 4.5 15.5 2 12 2Z"/>
                        <path d="M9 19C9 20.1 9.9 21 11 21H13C14.1 21 15 20.1 15 19V18H9V19Z"/>
                        <circle cx="9" cy="8" r="1"/>
                        <circle cx="15" cy="8" r="1"/>
                        <circle cx="10" cy="11" r="0.8"/>
                        <circle cx="14" cy="11" r="0.8"/>
                        <circle cx="12" cy="13" r="0.8"/>
                        <path d="M8 9C8.5 9.5 9 10 9.5 10.5"/>
                        <path d="M16 9C15.5 9.5 15 10 14.5 10.5"/>
                        <path d="M11 12C11.3 12.3 11.7 12.7 12 13"/>
                        <path d="M13 12C12.7 12.3 12.3 12.7 12 13"/>
                      </svg>
                      ML/AI Engineer
                    </span>
                  </motion.div>
                  
                  {/* Skills Tags - Smaller Size */}
                  <motion.span 
                    className="group relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs rounded-lg border border-blue-200 font-medium shadow-sm"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center">
                      <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      Agentic AI Enthusiast
                    </span>
                  </motion.span>
                  
                  <motion.span 
                    className="group relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 text-xs rounded-lg border border-purple-200 font-medium shadow-sm"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center">
                      <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Data Scientist
                    </span>
                  </motion.span>
                </motion.div>
                
                {/* Education Tag - Enhanced */}
                <motion.div 
                  className="flex items-center justify-center lg:justify-start"
                  variants={itemVariants}
                >
                  <motion.span 
                    className="group inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm rounded-xl border border-gray-200 font-medium shadow-sm"
                    whileHover={{ scale: 1.02, y: -1 }}
                  >
                    <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    <span className="group-hover:text-gray-800 transition-colors">
                      Telkom University • Undergraduate Data Science
                    </span>
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Enhanced CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a 
                href="#work"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 overflow-hidden shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    x: [-100, 200],
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                <span className="relative z-10 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View My Work
                </span>
              </motion.a>
              
              <motion.a 
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl transition-all duration-300 bg-white hover:bg-gray-50"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  borderColor: "#6b7280",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center group-hover:text-gray-800 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Get In Touch
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="relative flex justify-center order-1 lg:order-2 lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 relative bg-gradient-to-br from-blue-50 to-indigo-100">
                <img 
                  src="/photo_profile.png" 
                  alt="Muhammad Ammar Ridho"
                  className="w-full h-full object-cover relative z-10"
                  style={{ objectPosition: '50% 20%' }}
                  onError={(e) => {
                    console.log('Image failed to load');
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                />
              </div>
              
              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl -z-10"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl -z-10"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Only show on desktop */}
      {!isMobile && (
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
      )}
    </section>
  )
}

export default Hero
