import { useState, useEffect, useRef, memo, useMemo } from "react"
import { getAllSkills } from '../data/skillsUtils'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  
  // Memoize skills data to prevent unnecessary recalculations
  const skills = useMemo(() => getAllSkills(), [])
  
  const sectionRefs = useRef([])

  // Initialize AOS with better synchronization
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 0,
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99
    })
  }, [])

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
            data-aos-duration="800"
            data-aos-delay="0"
          >
            {/* Mobile Optimized Section Header */}
            <div 
              className="relative mb-6 lg:mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
            >
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 leading-tight"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="700"
              >
                About Me
              </h2>
              
              {/* Responsive decorative accent line */}
              <div 
                className="mt-2 lg:mt-4 w-16 sm:w-20 lg:w-24 h-1 lg:h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                data-aos="scale-x"
                data-aos-delay="400"
                data-aos-duration="500"
              />
              
              {/* Mobile optimized background text decoration */}
              <div className="absolute -top-2 lg:-top-4 -left-2 lg:-left-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-purple-100/30 -z-10 select-none">
                About
              </div>
            </div>

            {/* Mobile Optimized Content Container */}
            <div 
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/20"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="700"
            >
              {/* Mobile optimized content paragraphs */}
              <p 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-5 lg:mb-6 leading-relaxed font-medium"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="600"
              >
                I'm a passionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-semibold">Artificial Intelligence Engineer</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">Web Developer</span> with over 1 year of experience creating innovative solutions that bridge technology and human needs.
              </p>
              
              <p 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-5 lg:mb-6 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="600"
              >
                My expertise spans <strong className="text-gray-900">Time Series Forecasting</strong> competitions, where I've applied cutting-edge methods and techniques. I've also gained hands-on experience implementing AI solutions, including <strong className="text-gray-900">Computer Vision for music control through hand gestures</strong> - a project that showcases my ability to translate complex AI concepts into practical applications.
              </p>

              <p 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 mb-6 sm:mb-7 lg:mb-8 leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="700"
                data-aos-duration="600"
              >
                Currently, I'm deeply focused on <strong className="text-gray-900">Large Language Models (LLMs)</strong> and their transformative potential. I'm working on developing a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold">personalized AI Assistant</span> that leverages Transformer-based models to understand and adapt to user-specific language patterns and communication styles.
              </p>

              {/* Mobile optimized stats */}
              <div 
                className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-6 sm:mt-7 lg:mt-8 pt-4 sm:pt-5 lg:pt-6 border-t border-gray-200/50"
                data-aos="fade-up"
                data-aos-delay="800"
                data-aos-duration="600"
              >
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">1+</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI/ML</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">Specialization</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className="relative space-y-6"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            {/* Mobile Optimized Skills Header */}
            <div 
              className="relative mb-6 lg:mb-8"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="600"
            >
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 mb-3 lg:mb-4"
                data-aos="fade-up"
                data-aos-delay="500"
                data-aos-duration="700"
              >
                Skills & Expertise
              </h3>
              
              {/* Responsive decorative line for skills section */}
              <div 
                className="w-14 sm:w-16 lg:w-20 h-0.5 lg:h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                data-aos="scale-x"
                data-aos-delay="700"
                data-aos-duration="500"
              />
              
              {/* Mobile optimized background decoration */}
              <div className="absolute -top-1 lg:-top-2 -right-2 lg:-right-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-blue-100/20 -z-10 select-none">
                Skills
              </div>
            </div>
            
            {/* Interactive Skills Grid - Mobile Optimized */}
            <div 
              className="space-y-6 lg:space-y-8"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="700"
            >
              {/* Skills Grid - Responsive 2 Column Layout */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="group cursor-pointer"
                    data-aos="zoom-in"
                    data-aos-delay={800 + (index * 50)}
                    data-aos-duration="500"
                    onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  >
                    <div className={`relative overflow-hidden rounded-xl lg:rounded-2xl transition-all duration-500 transform ${
                      selectedSkill === skill 
                        ? 'ring-2 lg:ring-3 ring-blue-400/70 ring-offset-2 lg:ring-offset-4 ring-offset-slate-50 scale-105 shadow-xl lg:shadow-2xl' 
                        : 'hover:scale-[1.02] lg:hover:scale-[1.03] hover:shadow-lg lg:hover:shadow-xl hover:-translate-y-0.5 lg:hover:-translate-y-1'
                    }`}>
                      
                      {/* Mobile Optimized Background */}
                      <div className="relative h-24 sm:h-28 lg:h-36 bg-gradient-to-br from-white via-gray-50 to-slate-100 p-2 sm:p-3 lg:p-4 border border-gray-200/50 group-hover:border-gray-300/70 transition-all duration-300">
                        
                        {/* Simplified Background Pattern for Mobile */}
                        <div className="absolute inset-0">
                          {/* Gradient overlay matching skill color */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                          
                          {/* Reduced mesh pattern for mobile */}
                          <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] group-hover:opacity-[0.04] lg:group-hover:opacity-[0.06] transition-opacity duration-300">
                            <div className="h-full w-full" style={{
                              backgroundImage: `
                                linear-gradient(45deg, #000 1px, transparent 1px),
                                linear-gradient(-45deg, #000 1px, transparent 1px)
                              `,
                              backgroundSize: '15px 15px'
                            }}></div>
                          </div>
                          
                          {/* Smaller floating elements for mobile */}
                          <div className="absolute top-2 right-2 lg:top-3 lg:right-4 w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-300" />
                          <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-3 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300" />
                          <div className="absolute top-1/2 right-3 lg:right-6 w-0.5 h-4 lg:w-1 lg:h-8 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full opacity-10 group-hover:opacity-25 transform -rotate-12 group-hover:rotate-12 transition-all duration-300" />
                        </div>
                        
                        {/* Mobile Optimized Content */}
                        <div className="relative z-10 h-full flex flex-col justify-between">
                          
                          {/* Top Section - Smaller Icon for Mobile */}
                          <div className="flex items-start justify-start">
                            {/* Responsive Icon */}
                            <div className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-md lg:shadow-lg border border-white/50 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                              <span className="text-xs sm:text-sm lg:text-lg font-bold text-white drop-shadow-md">
                                {skill.icon}
                              </span>
                            </div>
                          </div>
                          
                          {/* Bottom Section - Responsive Text */}
                          <div className="flex-1 flex flex-col justify-end pt-1 lg:pt-2">
                            <h4 className="text-xs sm:text-sm lg:text-base font-bold leading-tight text-gray-800 mb-0.5 lg:mb-1 line-clamp-2 group-hover:text-gray-900 transition-colors duration-300">
                              {skill.name}
                            </h4>
                            
                            {/* Responsive Status indicator */}
                            <div className="flex items-center space-x-1 lg:space-x-1.5">
                              <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-300" />
                              <span className="text-[10px] sm:text-xs text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">Active</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Responsive bottom accent */}
                        <div className={`absolute bottom-0 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r ${skill.color} opacity-30 group-hover:opacity-60 group-hover:h-1 lg:group-hover:h-1.5 transition-all duration-300`} />
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile Responsive Visual Elements */}
              <div 
                className="relative mt-8 lg:mt-12"
                data-aos="fade-up"
                data-aos-delay="1200"
                data-aos-duration="600"
              >
                {/* Responsive decorative line with dots */}
                <div 
                  className="flex items-center justify-center space-x-1.5 lg:space-x-2"
                  data-aos="zoom-in"
                  data-aos-delay="1300"
                  data-aos-duration="500"
                >
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-purple-400/40" />
                  <div className="w-12 sm:w-16 lg:w-20 h-0.5 bg-gradient-to-r from-purple-400/40 to-blue-400/40" />
                  <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-blue-400/40" />
                  <div className="w-12 sm:w-16 lg:w-20 h-0.5 bg-gradient-to-r from-blue-400/40 to-purple-400/40" />
                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-purple-400/40" />
                </div>
                
                {/* Mobile optimized skill count indicator */}
                <div 
                  className="text-center mt-3 lg:mt-4"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                  data-aos-duration="500"
                >
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {skills.length} Core Skills • Click to explore
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Optimized Modal for Skill Description */}
        {selectedSkill && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-[60] p-2 sm:p-4 animate-fadeIn"
            onClick={closeModal}
          >
            <div 
              className="bg-white/98 backdrop-blur-2xl rounded-2xl lg:rounded-3xl max-w-4xl w-full max-h-[95vh] lg:max-h-[90vh] shadow-2xl border border-white/30 overflow-hidden animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Optimized Modal Header */}
              <div className={`relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br ${selectedSkill.color} overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-slideRight" />
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 flex-1 min-w-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-2xl lg:rounded-3xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/30 animate-pulse flex-shrink-0">
                      <span className="text-xl sm:text-3xl lg:text-5xl drop-shadow-lg">{selectedSkill.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-white drop-shadow-lg mb-1 lg:mb-2 line-clamp-2">
                        {selectedSkill.name}
                      </h3>
                      <div className="w-12 sm:w-16 lg:w-20 h-1 lg:h-1.5 bg-white/60 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Mobile Optimized close button */}
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-xl border border-white/20 hover:scale-110 hover:rotate-90 flex-shrink-0"
                    aria-label="Close skill description"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Optimized Modal Content */}
              <div className="p-4 sm:p-6 lg:p-8 max-h-[70vh] lg:max-h-[60vh] overflow-y-auto modal-content-fade">
                {/* Debug: Ensure selectedSkill exists */}
                {selectedSkill && (
                  <>
                    {/* Mobile Optimized Summary Section */}
                    <div 
                      className="mb-6 lg:mb-8 p-4 sm:p-5 lg:p-6 bg-gradient-to-r from-gray-50/80 to-gray-100/60 backdrop-blur-sm rounded-xl lg:rounded-2xl border border-gray-200/50"
                      style={{ animationDelay: '0.1s' }}
                    >
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4 flex items-center">
                        <div className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg lg:rounded-xl bg-gradient-to-br ${selectedSkill.color} mr-2 lg:mr-3 shadow-md flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xs sm:text-sm text-white font-bold">📋</span>
                        </div>
                        Overview
                      </h4>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                        {selectedSkill.summary || "No summary available"}
                      </p>
                    </div>

                    {/* Mobile Optimized Sections */}
                    <div className="space-y-4 lg:space-y-6">
                      {selectedSkill.sections && selectedSkill.sections.length > 0 ? (
                        selectedSkill.sections.map((section, index) => (
                            <div
                              key={index}
                              ref={el => sectionRefs.current[index] = el}
                              className="bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-100/60 hover:border-purple-200/60 transition-all duration-300 shadow-sm hover:shadow-lg modal-content-fade"
                              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                            >
                              {/* Mobile Optimized Section Header */}
                              <div className="flex items-center space-x-3 lg:space-x-4 mb-3 lg:mb-4">
                                <div 
                                  className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 flex-shrink-0`}
                                >
                                  <span className="text-xs sm:text-sm font-bold text-white">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                                    {section.title || `Section ${index + 1}`}
                                  </h4>
                                  <div className={`w-8 sm:w-10 lg:w-12 h-0.5 bg-gradient-to-r ${selectedSkill.color} rounded-full`} />
                                </div>
                              </div>
                              
                              {/* Mobile Optimized Section Description */}
                              <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-11 sm:pl-12 lg:pl-14">
                                {section.description || "No description available"}
                              </p>
                            </div>
                        ))
                      ) : (
                        <div className="text-center py-6 lg:py-8">
                          <p className="text-sm sm:text-base text-gray-500">No detailed sections available for this skill.</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Mobile Optimized Footer */}
                    <div 
                      className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200/60 text-center"
                    >
                      <p className="text-xs sm:text-sm text-gray-500 italic">
                        Click outside or press ESC to close
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(About)
