import { useState, useEffect, useRef, memo, useMemo } from "react"
import { getAllSkills } from '../data/skillsUtils'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  
  // Memoize skills data to prevent unnecessary recalculations
  const skills = useMemo(() => getAllSkills(), [])
  
  const sectionRefs = useRef([])
  const skillTiltRefs = useRef([])

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    })
  }, [])

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

  // Scroll lock effect and header blur when modal is open
  useEffect(() => {
    if (selectedSkill) {
      // Save current scroll position
      const scrollY = window.scrollY
      
      // Add class to body for header styling
      document.body.classList.add('modal-open')
      
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      // Cleanup function to restore scroll
      return () => {
        document.body.classList.remove('modal-open')
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-24 items-start">
          <div
            className="relative lg:sticky lg:top-20"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {/* Enhanced Section Header */}
            <div 
              className="relative mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2 
                className="text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 leading-tight"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                About Me
              </h2>
              
              {/* Decorative accent line */}
              <div 
                className="mt-4 w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                data-aos="scale-x"
                data-aos-delay="500"
              />
              
              {/* Background text decoration */}
              <div className="absolute -top-4 -left-4 text-8xl md:text-9xl font-black text-purple-100/30 -z-10 select-none">
                About
              </div>
            </div>

            {/* Enhanced Content Container */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              {/* Content paragraphs with improved typography */}
              <p 
                className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed font-medium"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                I'm a passionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">Artificial Intelligence Engineer</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">Web Developer</span> with over 1 year of experience creating innovative solutions that bridge technology and human needs.
              </p>
              
              <p 
                className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                My expertise spans <strong className="text-gray-900">Time Series Forecasting</strong> competitions, where I've applied cutting-edge methods and techniques. I've also gained hands-on experience implementing AI solutions, including <strong className="text-gray-900">Computer Vision for music control through hand gestures</strong> - a project that showcases my ability to translate complex AI concepts into practical applications.
              </p>

              <p 
                className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Currently, I'm deeply focused on <strong className="text-gray-900">Large Language Models (LLMs)</strong> and their transformative potential. I'm working on developing a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">personalized AI Assistant</span> that leverages Transformer-based models to understand and adapt to user-specific language patterns and communication styles.
              </p>

              {/* Enhanced stats or highlights */}
              <div 
                className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200/50"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">1+</div>
                  <div className="text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI/ML</div>
                  <div className="text-sm text-gray-600 font-medium">Specialization</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="relative space-y-6"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            {/* Enhanced Skills Header */}
            <div 
              className="relative mb-8"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Skills & Expertise
              </h3>
              
              {/* Decorative line for skills section */}
              <div 
                className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                data-aos="scale-x"
                data-aos-delay="500"
              />
              
              {/* Background decoration */}
              <div className="absolute -top-2 -right-4 text-6xl md:text-7xl font-black text-blue-100/20 -z-10 select-none">
                Skills
              </div>
            </div>
            
            {/* Creative & Bold Skills Grid - Two Columns with Optimized Text */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4">
              {skills.map((skill, index) => {
                const tiltRef = { current: skillTiltRefs.current[index] };
                return (
                  <div 
                    key={index} 
                    className="skill-card group cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
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
                          <div className="relative flex-shrink-0 hover:scale-110 hover:rotate-2 transition-all duration-300">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-150">
                              <span className="text-sm lg:text-base font-bold drop-shadow-lg group-hover:scale-110 transition-transform duration-100">
                                {skill.icon}
                              </span>
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-lg bg-white/20 blur-lg group-hover:bg-white/40 group-hover:blur-xl transition-all duration-150" />
                          </div>
                          
                          {/* Title and Status - Flexible Layout */}
                          <div className="flex-1 min-w-0 pr-1">
                            <h4 
                              className="text-xs lg:text-sm font-bold leading-tight drop-shadow-md break-words hyphens-auto line-clamp-2 group-hover:text-white/95 transition-colors duration-100 hover:scale-105"
                              style={{ 
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word',
                                lineHeight: '1.1',
                                fontSize: 'clamp(0.65rem, 1.5vw, 0.875rem)'
                              }}
                            >
                              {skill.name}
                            </h4>
                            
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
                          <div 
                            className={`w-6 h-6 lg:w-7 lg:h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 hover:scale-110 ${
                              selectedSkill === skill ? 'rotate-180 scale-105' : ''
                            }`}
                          >
                            <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white group-hover:scale-110 transition-transform duration-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated Border Effect */}
                      <div className="absolute inset-0 rounded-2xl">
                        <div 
                          className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 ${
                            selectedSkill === skill 
                              ? 'border-white/80 animate-pulse' 
                              : 'border-white/30 group-hover:border-white/50'
                          }`}
                        />
                      </div>
                      
                      {/* Floating Particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                        {[...Array(3)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-white/60 animate-bounce"
                            style={{
                              left: `${20 + i * 30}%`,
                              top: `${25 + i * 20}%`,
                              animationDelay: `${index * 0.2 + i * 0.7}s`,
                              animationDuration: `${3 + i * 0.5}s`
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Minimal decorative particle */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        <div 
                          className={`absolute w-0.5 h-0.5 rounded-full bg-gradient-to-r ${skill.color} opacity-30 animate-pulse`}
                          style={{
                            right: '15%',
                            top: '20%',
                            animationDelay: `${index * 0.3}s`,
                            animationDuration: '2.5s'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Modern Modal for Skill Description */}
        {selectedSkill && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-[60] p-4 animate-fadeIn"
            onClick={closeModal}
          >
            <div 
              className="bg-white/98 backdrop-blur-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-white/30 overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Modal Header */}
              <div className={`relative p-8 bg-gradient-to-br ${selectedSkill.color} overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-slideRight" />
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30 animate-pulse">
                      <span className="text-5xl drop-shadow-lg">{selectedSkill.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
                        {selectedSkill.name}
                      </h3>
                      <div className="w-20 h-1.5 bg-white/60 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Enhanced close button */}
                  <button
                    onClick={closeModal}
                    className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl border border-white/20 hover:scale-110 hover:rotate-90"
                    aria-label="Close skill description"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enhanced Modal Content */}
              <div className="p-8 max-h-[60vh] overflow-y-auto">
                {/* Summary Section */}
                <div 
                  className="mb-8 p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-sm rounded-2xl border border-gray-200/50"
                  data-aos="fade-up"
                  data-aos-delay="300"
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
                </div>

                {/* Sections */}
                <div className="space-y-6">
                  {selectedSkill.sections?.map((section, index) => {
                    const sectionTiltRef = { current: sectionRefs.current[index] };
                    return (
                      <div
                        key={index}
                        ref={el => sectionRefs.current[index] = el}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/60 hover:border-purple-200/60 transition-all duration-300 shadow-sm hover:shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay={index * 100 + 400}
                        onMouseMove={(e) => handleTiltChange(sectionTiltRef, e)}
                        onMouseLeave={() => resetTilt(sectionTiltRef)}
                      >
                        {/* Section Header */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div 
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300`}
                          >
                            <span className="text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </div>
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
                      </div>
                    );
                  })}
                </div>
                
                {/* Footer */}
                <div 
                  className="mt-8 pt-6 border-t border-gray-200/60 text-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <p className="text-gray-500 text-sm italic">
                    Click outside or press ESC to close
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(About)
