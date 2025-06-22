import { useEffect, useState, useMemo, memo } from 'react'
import AOS from 'aos'
import { useScrollAnimation } from '../hooks/useAnimations'
import { useTypewriter } from '../hooks/useTypewriter'

const Hero = () => {
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
    // Initialize AOS with better synchronization
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
    
    // Check if screen is mobile size - updated for better laptop support
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280) // Hide scroll indicator on screens < 1280px (only show on larger desktops)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Memoize parallax transform to avoid recalculating on every render
  const parallaxTransform = useMemo(() => 
    `translateY(${scrollY * 0.5}px)`, [scrollY]
  )

  return (
    <section id="home" className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Low Poly Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Low Poly Geometric Shapes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="poly-bg-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="poly-bg-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="poly-bg-3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Large Low Poly Triangles */}
          <polygon points="0,0 300,200 0,400" fill="url(#poly-bg-1)" />
          <polygon points="1200,0 900,300 1200,600" fill="url(#poly-bg-2)" />
          <polygon points="400,0 700,150 500,400" fill="url(#poly-bg-3)" />
          <polygon points="600,400 1000,500 800,800" fill="url(#poly-bg-1)" />
          <polygon points="0,500 400,600 200,800" fill="url(#poly-bg-2)" />
          <polygon points="300,100 600,50 450,350" fill="url(#poly-bg-3)" />
        </svg>
        
        {/* Floating Low Poly Elements */}
        <div className="absolute top-20 left-20">
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100"
            className="animate-spin"
            style={{ animationDuration: '15s' }}
          >
            <polygon points="50,10 80,40 50,70 20,40" fill="url(#poly-bg-1)" />
          </svg>
        </div>
        
        <div className="absolute top-40 right-32">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 80 80"
            className="animate-bounce"
            style={{ animationDuration: '12s' }}
          >
            <polygon points="40,5 70,25 60,55 20,55 10,25" fill="url(#poly-bg-2)" />
          </svg>
        </div>
        
        <div className="absolute bottom-32 left-40">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120"
            className="animate-pulse"
            style={{ animationDuration: '18s' }}
          >
            <polygon points="60,10 100,35 85,75 35,75 20,35" fill="url(#poly-bg-3)" />
          </svg>
        </div>
        
        <div className="absolute top-60 left-1/2">
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 60 60"
            className="animate-spin"
            style={{ animationDuration: '10s', animationDirection: 'reverse' }}
          >
            <polygon points="30,5 50,20 45,40 15,40 10,20" fill="url(#poly-bg-1)" />
          </svg>
        </div>
      </div>

      {/* Original Parallax Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ transform: parallaxTransform }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-6 xl:gap-8 items-center">
          {/* Text Content */}
          <div 
            data-aos="fade-right" 
            data-aos-delay="0"
            data-aos-duration="800"
            className="text-center lg:text-left order-2 lg:order-1 w-full lg:max-w-none lg:col-span-7"
          >
            <h1 
              data-aos="fade-up" 
              data-aos-delay="200"
              data-aos-duration="700"
              className="hero-creative-gradient text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 lg:mb-5 relative leading-tight text-center lg:text-left"
            >
              <div className="flex items-baseline justify-center lg:justify-start">
                <span 
                  className="prismatic-text whitespace-nowrap font-extrabold"
                  data-text={nameText}
                >
                  {nameText}
                </span>
                <span 
                  className="text-purple-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold blinking-cursor animate-pulse"
                  style={{ marginLeft: '2px' }}
                >
                  |
                </span>
              </div>
            </h1>
            
            {/* Tagline/Description Section */}
            <div
              data-aos="fade-up" 
              data-aos-delay="400"
              data-aos-duration="600"
              className="mb-4 sm:mb-6 lg:mb-8"
            >
              <p 
                className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed text-center lg:text-left max-w-2xl mx-auto lg:mx-0 mb-4 sm:mb-6"
              >
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">intelligent AI solutions</span> that solve real-world challenges.
              </p>

              {/* Enhanced Tags Section - Mobile Optimized */}
              <div className="space-y-3 lg:space-y-4">
                {/* Combined Primary Role and Skills Container */}
                <div 
                  data-aos="fade-up" 
                  data-aos-delay="600"
                  data-aos-duration="500"
                  className="flex flex-wrap gap-2 lg:gap-3 items-center justify-center lg:justify-start"
                >
                  {/* Primary Role - Mobile Optimized */}
                  <div 
                    className="relative inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white text-xs sm:text-sm rounded-lg font-semibold shadow-lg overflow-hidden hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-pulse"
                      style={{ animationDuration: '2s', animationDelay: '1s' }}
                    />
                    <span className="relative z-10 flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 24 24">
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
                  </div>
                  
                  {/* Skills Tags - Mobile Optimized */}
                  <span 
                    className="group relative inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-[10px] sm:text-xs rounded-lg border border-blue-200 font-medium shadow-sm hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                      </svg>
                      Agentic AI Enthusiast
                    </span>
                  </span>
                  
                  <span 
                    className="group relative inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 text-[10px] sm:text-xs rounded-lg border border-purple-200 font-medium shadow-sm hover:scale-105 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors duration-200 flex items-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 mr-1 sm:mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                      </svg>
                      Data Scientist
                    </span>
                  </span>
                </div>
                
                {/* Education Tag - Mobile Optimized */}
                <div 
                  data-aos="fade-up" 
                  data-aos-delay="800"
                  data-aos-duration="500"
                  className="flex items-center justify-center lg:justify-start"
                >
                  <span 
                    className="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-xs sm:text-sm rounded-xl border border-gray-200 font-medium shadow-sm hover:scale-102 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gray-500 group-hover:text-gray-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    <span className="group-hover:text-gray-800 transition-colors">
                      <span className="hidden sm:inline">Telkom University • Undergraduate Data Science</span>
                      <span className="sm:hidden">Telkom University • Data Science</span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mobile Optimized CTA Buttons */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="1000"
              data-aos-duration="600"
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a 
                href="#work"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:scale-105 hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-pulse"
                  style={{ animationDuration: '2s', animationDelay: '2s' }}
                />
                <span className="relative z-10 flex items-center text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View My Work
                </span>
              </a>
              
              <a 
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl transition-all duration-300 bg-white hover:bg-gray-50 hover:scale-105 hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center group-hover:text-gray-800 transition-colors text-sm sm:text-base">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Get In Touch
                </span>
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div 
            data-aos="fade-left" 
            data-aos-delay="500"
            className="relative flex justify-center order-1 lg:order-2 lg:col-span-3"
          >
            <div 
              className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 relative bg-gradient-to-br from-blue-50 to-indigo-100">
                <img 
                  src="/photo_profile.png" 
                  alt="Muhammad Ammar Ridho"
                  className="w-full h-full object-cover relative z-10"
                  style={{ objectPosition: '50% 20%' }}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    console.log('Image failed to load');
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => console.log('Image loaded successfully')}
                />
              </div>
              
              {/* Decorative Elements */}
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl -z-10 animate-spin"
                style={{ animationDuration: '20s' }}
              />
              <div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full -z-10 animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              <div 
                className="absolute top-1/2 -left-8 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-xl -z-10 animate-bounce"
                style={{ animationDuration: '8s' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Only show on desktop */}
      {!isMobile && (
        <div 
          data-aos="fade-up" 
          data-aos-delay="1500"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <div 
              className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default memo(Hero)
