import { useState, useEffect, memo, useMemo } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect and active section detection with throttling
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          
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
  }, [])

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
      className={`fixed w-full z-50 header-slide-down ${
        isScrolled ? 'top-4' : 'top-0'
      }`}
      style={{ 
        left: 0, 
        right: 0,
        top: isScrolled ? '16px' : '0px',
        transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      data-aos="fade-down"
      data-aos-duration="600"
    >
      <div className={`transition-all duration-500 ease-out ${
        isScrolled ? 'w-full flex justify-center px-4 sm:px-6 lg:px-8' : 'w-full px-0'
      }`}>
        {/* Header Container - Floating when scrolled, attached when at top */}
        <div 
          className={`floating-header relative ${isScrolled ? 'is-floating' : ''}`}
        >
          <div 
            className="flex items-center"
            style={{
              height: isScrolled ? '48px' : '48px',
              transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
          {/* Logo with Profile - Positioned more towards center but still left */}
          <div 
            className={`flex items-center space-x-2 group cursor-pointer ml-4 md:ml-6 lg:ml-8 logo-container ${isScrolled ? 'is-scrolled' : ''}`}
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
          
          {/* Desktop Menu - Navigation Pills positioned to the right */}
          <div 
            className={`hidden md:flex flex-1 justify-end mr-4 md:mr-6 lg:mr-8 nav-pills-container ${isScrolled ? 'is-scrolled' : ''}`}
            data-aos="fade-left"
            data-aos-delay="300"
          >
            {/* ...existing desktop navigation code... */}
            <div 
              className="nav-pills-container flex items-center space-x-0.5 sm:space-x-1 rounded-full px-2 sm:px-3 py-1 sm:py-1.5"
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
                    className={`relative px-2 sm:px-3 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 group text-xs sm:text-sm min-w-max ${
                      activeSection === item.id 
                        ? 'bg-gray-200/40 backdrop-blur-md text-gray-800 shadow-lg' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:backdrop-blur-sm'
                    }`}
                  >
                    <span className="text-xs sm:text-sm mr-1.5">
                      {item.icon}
                    </span>
                    <span 
                      className="font-medium" 
                      style={{
                        color: activeSection === item.id ? '#1f2937' : '#374151',
                        fontSize: '12px'
                      }}
                    >
                      {item.name}
                    </span>
                    
                    {/* Active Section Indicator */}
                    {activeSection === item.id && (
                      <div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full shadow-sm active-indicator"
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button - Positioned on the right side */}
          <div 
            className="md:hidden flex-1 flex justify-end mr-4"
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
            <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-1 sm:space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className={`mobile-nav-item group flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 cursor-pointer touch-manipulation ${
                    activeSection === item.id
                      ? 'bg-gray-200/40 backdrop-blur-md text-gray-800 shadow-md'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 active:bg-gray-200'
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
                    color: activeSection === item.id ? '#1f2937' : '#374151',
                    minHeight: '48px' // Ensure minimum touch target size
                  }}
                >
                  <span className="text-lg sm:text-xl">
                    {item.icon}
                  </span>
                  <span className="flex-1 text-sm sm:text-base" style={{color: 'inherit'}}>{item.name}</span>
                  <div 
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-blue-400 scale-100 opacity-100' 
                        : 'bg-gray-400 scale-0 opacity-0'
                    }`}
                  />
                  
                  {/* Active checkpoint indicator for mobile */}
                  {activeSection === item.id && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full" />
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
