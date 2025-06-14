// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useState, useEffect, useRef } from "react"
import { useScrollTrigger } from '../hooks/useAnimations'
import { getAllSkills } from '../data/skillsUtils'

const About = () => {
  const [aboutRef, aboutVisible] = useScrollTrigger(0.3)
  const [skillsRef, skillsVisible] = useScrollTrigger(0.2)
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [skills] = useState(getAllSkills())
  const sectionRefs = useRef([])
  const skillTiltRefs = useRef([])

  // Initialize skillTiltRefs when component mounts
  useEffect(() => {
    skillTiltRefs.current = new Array(skills.length).fill(null)
  }, [skills.length])

  // Initialize sectionRefs when selectedSkill changes
  useEffect(() => {
    if (selectedSkill?.sections) {
      sectionRefs.current = new Array(selectedSkill.sections.length).fill(null)
    }
  }, [selectedSkill])

  // Tilt effect functions
  const HANDLE_TILT_CHANGE_OLD = (element, e) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = (y - centerY) / 10
    const tiltY = (centerX - x) / 10

    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`
  }

  const RESET_TILT_OLD = (element) => {
    if (!element) return
    element.style.transform = 'translateZ(0)'
  }

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

  // Lightweight 3D tilt effect
  const handleTiltChange = (tiltRef, e) => {
    if (!tiltRef.current) return;
    
    const card = tiltRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Subtle rotation for 3D effect
    const rotateX = (mouseY / rect.height) * -8; // Reduced from -15 for lighter effect
    const rotateY = (mouseX / rect.width) * 8;   // Reduced from 15 for lighter effect
    
    // Apply transform with hardware acceleration
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Simple shadow for depth
    const shadowX = mouseX / 30;
    const shadowY = mouseY / 30;
    card.style.boxShadow = `${shadowX}px ${shadowY + 10}px 25px rgba(0, 0, 0, 0.12)`;
  };

  // Reset with smooth transition
  const resetTilt = (tiltRef) => {
    if (!tiltRef.current) return;
    
    tiltRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    tiltRef.current.style.boxShadow = '0px 8px 25px rgba(0, 0, 0, 0.08)';
    tiltRef.current.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)';
  };

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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={aboutRef} className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-24 items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={aboutVisible ? "visible" : "hidden"}
            className="relative lg:sticky lg:top-20"
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
             {/* Creative & Bold Skills Grid - Two Columns with Optimized Text */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
              {skills.map((skill, index) => {
                const tiltRef = { current: skillTiltRefs.current[index] };
                return (
                  <motion.div 
                    key={index} 
                    className="skill-card group cursor-pointer"
                    variants={itemVariants}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      transition: { 
                        duration: 0.15, 
                        type: "spring",
                        stiffness: 600,
                        damping: 20
                      } 
                    }}
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  >
                    <div 
                      ref={el => skillTiltRefs.current[index] = el}
                      className={`relative h-32 lg:h-36 w-full p-1 rounded-2xl overflow-hidden transition-all duration-500 ${
                        selectedSkill === skill 
                          ? 'ring-4 ring-purple-400/50 ring-offset-2 ring-offset-slate-50' 
                          : ''
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
                        willChange: 'transform',
                      }}
                      onMouseMove={(e) => handleTiltChange(tiltRef, e)}
                      onMouseLeave={() => resetTilt(tiltRef)}
                    >
                      {/* Dynamic Gradient Background */}
                      <div 
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-90 group-hover:opacity-100 transition-all duration-150 group-hover:brightness-110`}
                      />
                      
                      {/* Animated Pattern Overlay */}
                      <div className="absolute inset-0 rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 group-hover:from-white/15 group-hover:to-white/10 transition-all duration-150" />
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl transform translate-x-6 -translate-y-6 group-hover:scale-125 group-hover:bg-white/10 transition-transform duration-200" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-black/10 rounded-full blur-xl transform -translate-x-3 translate-y-3 group-hover:scale-110 group-hover:bg-black/5 transition-transform duration-150" />
                      </div>
                      
                      {/* Hexagonal Pattern */}
                      <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-150">
                        <div className="absolute top-3 right-4 w-4 h-4 bg-white transform rotate-45 rounded-sm group-hover:rotate-90 group-hover:scale-110 transition-transform duration-150" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 bg-white/60 transform rotate-12 rounded-sm group-hover:rotate-45 group-hover:scale-125 transition-transform duration-150" />
                        <div className="absolute top-1/2 left-6 w-2 h-2 bg-white/40 transform -rotate-45 rounded-full group-hover:rotate-0 group-hover:scale-150 transition-transform duration-150" />
                      </div>
                      
                      {/* Main Content - Optimized for Two Columns */}
                      <div className="relative z-10 h-full flex items-center justify-between p-3 lg:p-4 text-white">
                        {/* Left Section - Icon and Title */}
                        <div className="flex items-center space-x-2 lg:space-x-3 flex-1 min-w-0">
                          {/* Compact Icon */}
                          <motion.div 
                            className="relative flex-shrink-0"
                            whileHover={{ 
                              scale: 1.1,
                              rotate: 8,
                              transition: { duration: 0.12, type: "spring", stiffness: 400 }
                            }}
                          >
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-150">
                              <span className="text-sm lg:text-base font-bold drop-shadow-lg group-hover:scale-110 transition-transform duration-100">
                                {skill.icon}
                              </span>
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-lg bg-white/20 blur-lg group-hover:bg-white/40 group-hover:blur-xl transition-all duration-150" />
                          </motion.div>
                          
                          {/* Title and Status - Flexible Layout */}
                          <div className="flex-1 min-w-0 pr-1">
                            <motion.h4 
                              className="text-xs lg:text-sm font-bold leading-tight drop-shadow-md break-words hyphens-auto line-clamp-2 group-hover:text-white/95 transition-colors duration-100"
                              style={{ 
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                lineHeight: '1.1',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)'
                              }}
                              whileHover={{ scale: 1.01, x: 1 }}
                              transition={{ duration: 0.1 }}
                            >
                              {skill.name}
                            </motion.h4>
                            
                            {/* Status Indicator - Compact */}
                            <div className="flex items-center space-x-1 mt-0.5">
                              <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50 animate-pulse group-hover:bg-green-300 group-hover:shadow-green-300/70 group-hover:scale-125 transition-all duration-150" />
                              <span className="text-[10px] lg:text-xs font-medium text-white/70 uppercase tracking-wide group-hover:text-white/90 transition-colors duration-100">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right Section - Compact Arrow */}
                        <div className="flex items-center flex-shrink-0">
                          {/* Interactive Arrow - Smaller for Two Columns */}
                          <motion.div 
                            className="w-6 h-6 lg:w-7 lg:h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-100"
                            animate={{ 
                              rotate: selectedSkill === skill ? 180 : 0,
                              scale: selectedSkill === skill ? 1.05 : 1,
                            }}
                            whileHover={{ 
                              scale: 1.1,
                              rotate: selectedSkill === skill ? 225 : 45,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.1 }}
                          >
                            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white group-hover:scale-110 transition-transform duration-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Animated Border Effect */}
                      <div className="absolute inset-0 rounded-2xl">
                        <motion.div 
                          className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/50"
                          animate={{
                            borderColor: selectedSkill === skill 
                              ? ["rgba(255,255,255,0.5)", "rgba(255,255,255,0.8)", "rgba(255,255,255,0.5)"]
                              : "rgba(255,255,255,0.3)"
                          }}
                          transition={{
                            duration: 2,
                            repeat: selectedSkill === skill ? Infinity : 0,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      {/* Floating Particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <motion.div 
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/60"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${25 + i * 20}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              x: [0, 10, 0],
                              opacity: [0.3, 0.8, 0.3],
                              scale: [1, 1.5, 1],
                            }}
                            transition={{
                              duration: 3 + i * 0.5,
                              repeat: Infinity,
                              delay: index * 0.2 + i * 0.7,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Minimal decorative particle */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        <motion.div 
                          className={`absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r ${skill.color} opacity-30`}
                          style={{
                            right: '15%',
                            top: '20%',
                          }}
                          animate={{
                            y: [0, -4, 0],
                            opacity: [0.2, 0.5, 0.2],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Modern Modal for Skill Description */}
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white/98 backdrop-blur-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-white/30 overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div 
                className={`relative p-8 bg-gradient-to-br ${selectedSkill.color} overflow-hidden`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.div 
                      className="w-24 h-24 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30"
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-5xl drop-shadow-lg">{selectedSkill.icon}</span>
                    </motion.div>
                    <div>
                      <motion.h3 
                        className="text-4xl font-bold text-white drop-shadow-lg mb-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedSkill.name}
                      </motion.h3>
                      <motion.div 
                        className="w-20 h-1.5 bg-white/60 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />
                    </div>
                  </div>
                  
                  {/* Enhanced close button */}
                  <motion.button
                    onClick={closeModal}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl border border-white/20"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 90,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close skill description"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Modal Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {/* Summary Section */}
                <motion.div 
                  className="mb-8 p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-sm rounded-2xl border border-gray-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${selectedSkill.color} mr-3 shadow-md flex items-center justify-center`}>
                      <span className="text-sm text-white font-bold">📋</span>
                    </div>
                    Overview
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedSkill.summary}
                  </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                  {selectedSkill.sections?.map((section, index) => {
                    const sectionTiltRef = { current: sectionRefs.current[index] };
                    return (
                      <motion.div
                        key={index}
                        ref={el => sectionRefs.current[index] = el}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/60 hover:border-purple-200/60 transition-all duration-300 shadow-sm hover:shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        onMouseMove={(e) => handleTiltChange(sectionTiltRef, e)}
                        onMouseLeave={() => resetTilt(sectionTiltRef)}
                      >
                        {/* Section Header */}
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div 
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </motion.div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">
                              {section.title}
                            </h4>
                            <div className={`w-12 h-0.5 bg-gradient-to-r ${selectedSkill.color} rounded-full`} />
                          </div>
                        </div>
                        
                        {/* Section Description */}
                        <p className="text-gray-700 leading-relaxed text-base pl-14">
                          {section.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Footer */}
                <motion.div 
                  className="mt-8 pt-6 border-t border-gray-200/60 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-gray-500 text-sm italic">
                    Click outside or press ESC to close
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default About
