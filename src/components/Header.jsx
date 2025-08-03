import { useState, useEffect, memo, useMemo } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect and active section detection with smoother throttling
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Add hysteresis to prevent flickering at the threshold
          const threshold = isScrolled ? 15 : 25 // Different thresholds for up/down
          
          if (Math.abs(currentScrollY - lastScrollY) > 5) { // Only update if significant scroll
            if (currentScrollY > threshold && !isScrolled) {
              setIsScrolled(true)
            } else if (currentScrollY <= threshold && isScrolled) {
              setIsScrolled(false)
            }
            lastScrollY = currentScrollY
          }
          
          // Section detection for active navigation
          const sections = ['home', 'about', 'work', 'contact']
          const offset = 100 // Offset for when to consider a section active
          
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId)
            if (element) {
              const rect = element.getBoundingClientRect()
              const isInViewport = rect.top <= offset && rect.bottom >= offset
              
              if (isInViewport) {
                setActiveSection(sectionId)
                break
              }
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }
    
    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolled]) // Add isScrolled as dependency

  // Memoize scroll function to prevent recreation
  const scrollToSection = useMemo(() => (sectionId, event) => {
    if (event) {
      event.preventDefault()
    }
    
    console.log('Scrolling to section:', sectionId)
    
    // Wait a bit to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      console.log('Found element:', element)
      
      if (element) {
        const headerHeight = 80 // Account for fixed header
        const rect = element.getBoundingClientRect()
        const elementPosition = window.pageYOffset + rect.top - headerHeight
        
        console.log('Element position:', elementPosition)
        
        // Try smooth scroll first
        try {
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          })
        } catch {
          // Fallback for older browsers or mobile issues
          console.log('Smooth scroll failed, using instant scroll')
          window.scrollTo(0, elementPosition)
        }
      } else {
        console.error('Element not found:', sectionId)
      }
    }, 10)
  }, [])

  // Memoize navigation items to prevent recreation
  const navItems = useMemo(() => [
    { name: 'Home', href: '#home', icon: '🏠', id: 'home' },
    { name: 'About', href: '#about', icon: '👤', id: 'about' },
    { name: 'Work', href: '#work', icon: '💼', id: 'work' },
    { name: 'Contact', href: '#contact', icon: '📧', id: 'contact' }
  ], [])

  return (
    <nav 
      className="fixed w-full z-50 header-slide-down"
      style={{ 
        left: 0, 
        right: 0,
        top: isScrolled ? '16px' : '0px',
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
      }}
      data-aos="fade-down"
      data-aos-duration="600"
    >
      <div 
        className="w-full transition-all duration-700 ease-out"
        style={{
          display: 'flex',
          justifyContent: isScrolled ? 'center' : 'stretch',
          paddingLeft: isScrolled ? '16px' : '0px',
          paddingRight: isScrolled ? '16px' : '0px',
          transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Header Container - Smooth floating transition */}
        <div 
          className="floating-header relative w-full"
          style={{
            maxWidth: isScrolled ? '1200px' : '100%',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
            backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
            borderRadius: isScrolled ? '24px' : '0px',
            boxShadow: isScrolled 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
              : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            transform: isScrolled ? 'scale(0.98)' : 'scale(1)',
          }}
        >
          <div 
            className="flex items-center w-full"
            style={{
              height: '64px',
              padding: isScrolled ? '8px 16px' : '12px 0px',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
          {/* Logo with Profile - Smooth scaling transition */}
          <div 
            className="flex items-center space-x-2 group cursor-pointer logo-container"
            style={{
              marginLeft: isScrolled ? '8px' : '16px',
              transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {/* ...existing logo code... */}
            <div 
              className="relative"
            >
              {/* Compact Low Poly Logo */}
              <div className="w-7 h-7 relative">
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 32 32" 
                  className="w-full h-full"
                >
                  {/* Low Poly Geometric Design */}
                  <defs>
                    <linearGradient id="poly-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <linearGradient id="poly-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <linearGradient id="poly-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  
                  {/* Compact Low Poly Triangles */}
                  <polygon 
                    points="16,3 28,12 16,16" 
                    fill="url(#poly-gradient-1)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="16,3 4,12 16,16" 
                    fill="url(#poly-gradient-2)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="4,12 16,16 8,24" 
                    fill="url(#poly-gradient-3)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="16,16 28,12 24,24" 
                    fill="url(#poly-gradient-1)"
                    className="transition-all duration-300 group-hover:opacity-80"
                  />
                  <polygon 
                    points="8,24 16,16 24,24" 
                    fill="url(#poly-gradient-2)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="8,24 16,30 24,24" 
                    fill="url(#poly-gradient-3)"
                    className="transition-all duration-300 group-hover:opacity-85"
                  />
                </svg>
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-15 blur-sm group-hover:opacity-25 transition-opacity duration-300"></div>
              </div>
              
              <div 
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white status-indicator"
              />
            </div>
            
            <div className="hidden sm:block">
              <h1 
                className="text-sm sm:text-base font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent"
              >
                Ammar Ridho
              </h1>
              <p 
                className="text-xs text-gray-500 -mt-1 animate-fadeIn"
                style={{ animationDelay: '0.3s' }}
              >
                AI Engineer
              </p>
            </div>
          </div>
          
          {/* Desktop Menu - Smooth scaling navigation */}
          <div 
            className="hidden md:flex flex-1 justify-end nav-pills-container"
            style={{
              marginRight: isScrolled ? '8px' : '16px',
              transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {/* ...existing desktop navigation code... */}
            <div 
              className="nav-pills-container flex items-center space-x-1 sm:space-x-2 rounded-full px-3 sm:px-4 py-2 sm:py-2.5"
              style={{
                backgroundColor: 'transparent',
                backdropFilter: 'blur(0px)',
                transition: 'all 0.4s ease-out',
                border: 'none',
                boxShadow: 'none'
              }}
            >
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className={`relative nav-item`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100 + 400}
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 sm:space-x-2.5 group text-sm sm:text-base min-w-max ${
                      activeSection === item.id 
                        ? 'bg-white/95 backdrop-blur-md text-gray-900 shadow-xl ring-2 ring-blue-200/50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/80 hover:backdrop-blur-sm hover:shadow-lg hover:ring-1 hover:ring-white/30'
                    }`}
                    style={{
                      minHeight: '44px',
                      fontSize: activeSection === item.id ? '14px' : '13px',
                      fontWeight: activeSection === item.id ? '600' : '500',
                      transform: activeSection === item.id ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <span className="text-base sm:text-lg mr-2">
                      {item.icon}
                    </span>
                    <span 
                      className="font-semibold tracking-wide" 
                      style={{
                        color: 'inherit',
                        fontSize: 'inherit',
                        letterSpacing: '0.025em'
                      }}
                    >
                      {item.name}
                    </span>
                    
                    {/* Active Section Indicator - Enhanced */}
                    {activeSection === item.id && (
                      <div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg active-indicator"
                        style={{
                          animation: 'pulse 2s infinite',
                          boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)'
                        }}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Smooth positioning */}
          <div 
            className="md:hidden flex-1 flex justify-end"
            style={{
              marginRight: isScrolled ? '8px' : '16px',
              transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
            data-aos="fade-in"
            data-aos-delay="500"
          >
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105 active:scale-95 mobile-menu-button ${isMenuOpen ? 'is-open' : ''}`}
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-floating absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-6 lg:mx-8 max-w-4xl xl:mx-auto bg-white/95 border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl z-50 mobile-menu"
          data-aos="zoom-in"
          data-aos-duration="300"
        >
            <div className="px-6 sm:px-8 pt-4 sm:pt-5 pb-5 sm:pb-7 space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className={`mobile-nav-item group flex items-center space-x-4 sm:space-x-5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-200 cursor-pointer touch-manipulation ${
                    activeSection === item.id
                      ? 'bg-white/95 backdrop-blur-md text-gray-900 shadow-xl ring-2 ring-blue-200/50'
                      : 'text-gray-700 hover:bg-white/60 hover:text-gray-900 active:bg-white/80 hover:shadow-lg hover:ring-1 hover:ring-white/30'
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log('Mobile menu item clicked:', item.name, 'ID:', item.id)
                    
                    // Close menu first for better UX
                    setIsMenuOpen(false)
                    
                    // Small delay to allow menu to start closing
                    setTimeout(() => {
                      scrollToSection(item.id, e)
                    }, 50)
                  }}
                  onTouchStart={(e) => {
                    // Simpler touch feedback
                    e.currentTarget.classList.add('touch-active')
                  }}
                  onTouchEnd={(e) => {
                    // Remove touch feedback
                    setTimeout(() => {
                      e.currentTarget.classList.remove('touch-active')
                    }, 150)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: activeSection === item.id ? '#111827' : '#374151',
                    minHeight: '56px', // Larger touch target
                    fontSize: activeSection === item.id ? '16px' : '15px',
                    fontWeight: activeSection === item.id ? '600' : '500',
                    transform: activeSection === item.id ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s ease-out'
                  }}
                >
                  <span className="text-xl sm:text-2xl">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-base sm:text-lg font-semibold tracking-wide" style={{color: 'inherit'}}>{item.name}</span>
                  <div 
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-100 opacity-100 shadow-lg' 
                        : 'bg-gray-400 scale-0 opacity-0'
                    }`}
                    style={{
                      boxShadow: activeSection === item.id ? '0 0 0 2px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  />
                  
                  {/* Active checkpoint indicator for mobile - Enhanced */}
                  {activeSection === item.id && (
                    <div 
                      className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg" 
                      style={{
                        animation: 'pulse 2s infinite',
                        boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)'
                      }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
    </nav>
  )
}

export default memo(Header)
