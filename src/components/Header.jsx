import { useState, useEffect, memo, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"

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
    <motion.nav 
      className={`fixed w-full z-50 ${
        isScrolled ? 'top-4' : 'top-0'
      }`}
      style={{ left: 0, right: 0 }}
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        top: isScrolled ? '16px' : '0px'
      }}
      transition={{ 
        y: { duration: 0.6, ease: "easeOut" },
        top: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      <div className={`transition-all duration-500 ease-out ${
        isScrolled ? 'w-full flex justify-center px-4 sm:px-6 lg:px-8' : 'w-full px-0'
      }`}>
        {/* Header Container - Floating when scrolled, attached when at top */}
        <motion.div 
          className={`floating-header relative ${isScrolled ? 'is-floating' : ''}`}
          animate={{
            width: isScrolled ? '896px' : '100%',
            maxWidth: isScrolled ? '896px' : '100%',
            borderRadius: isScrolled ? '9999px' : '0px',
            paddingLeft: isScrolled ? '24px' : '24px',
            paddingRight: isScrolled ? '24px' : '24px',
            paddingTop: isScrolled ? '12px' : '8px',
            paddingBottom: isScrolled ? '12px' : '8px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)',
            boxShadow: isScrolled 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
              : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: isScrolled 
              ? '1px solid rgba(229, 231, 235, 0.5)' 
              : '0px solid transparent',
            borderBottom: isScrolled 
              ? '1px solid rgba(229, 231, 235, 0.5)' 
              : '1px solid rgba(229, 231, 235, 0.5)',
            margin: isScrolled ? '0 auto' : '0',
            scale: isScrolled ? 1 : 1,
            y: 0
          }}
          transition={{ 
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
            width: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            borderRadius: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            padding: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            boxShadow: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
            border: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            backgroundColor: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          }}
          // Add subtle scale animation on hover for floating state
          whileHover={isScrolled ? { scale: 1.02 } : {}}
          style={{
            transformOrigin: 'center',
            cursor: isScrolled ? 'default' : 'default'
          }}
        >
          <motion.div 
            className="flex items-center"
            animate={{
              height: isScrolled ? '48px' : '48px'
            }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
          {/* Logo with Profile - Positioned more towards center but still left */}
          <motion.div 
            className="flex items-center space-x-2 group cursor-pointer ml-4 md:ml-6 lg:ml-8"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            animate={{
              scale: isScrolled ? 0.9 : 0.95,
              x: isScrolled ? -8 : 0,
              opacity: 1
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 0.4 },
              x: { duration: 0.5 },
              opacity: { duration: 0.3 }
            }}
            whileHover={{ scale: isScrolled ? 0.92 : 0.97 }}
            whileTap={{ scale: isScrolled ? 0.88 : 0.93 }}
          >
            {/* ...existing logo code... */}
            <motion.div 
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
              
              <motion.div 
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-white status-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div className="hidden sm:block">
              <motion.h1 
                className="text-base font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent"
                whileHover={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 2 }}
              >
                Ammar Ridho
              </motion.h1>
              <motion.p 
                className="text-xs text-gray-500 -mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                AI Engineer
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Desktop Menu - Navigation Pills positioned to the right */}
          <motion.div 
            className="hidden md:flex flex-1 justify-end mr-4 md:mr-6 lg:mr-8"
            animate={{
              scale: isScrolled ? 0.95 : 0.98,
              x: isScrolled ? 8 : 0
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* ...existing desktop navigation code... */}
            <motion.div 
              className="nav-pills-container flex items-center space-x-1 rounded-full px-3 py-1.5"
              animate={{
                backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`relative px-3 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 group text-sm min-w-max ${
                      activeSection === item.id 
                        ? 'bg-gray-200/40 backdrop-blur-md text-gray-800 shadow-lg' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-white/60 hover:backdrop-blur-sm'
                    }`}
                  >
                    <span className="text-sm mr-1.5">
                      {item.icon}
                    </span>
                    <span 
                      className="font-medium" 
                      style={{
                        color: activeSection === item.id ? '#1f2937' : '#374151',
                        fontSize: '13px'
                      }}
                    >
                      {item.name}
                    </span>
                    
                    {/* Active Section Indicator */}
                    <AnimatePresence>
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full shadow-sm"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile menu button - Positioned on the right side */}
          <motion.div 
            className="md:hidden flex-1 flex justify-end mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.svg>
            </motion.button>
          </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu-floating absolute top-full left-0 right-0 mt-2 mx-4 sm:mx-6 lg:mx-8 max-w-4xl xl:mx-auto bg-white/95 border border-gray-200/50 rounded-3xl shadow-xl z-50"
            initial={{ opacity: 0, height: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.4, 0, 0.2, 1],
              scale: { duration: 0.2 },
              opacity: { duration: 0.2 }
            }}
          >
            <div className="px-6 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className={`mobile-nav-item group flex items-center space-x-4 px-4 py-3 rounded-2xl font-medium transition-all duration-200 cursor-pointer touch-manipulation ${
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
                  <span className="text-xl">
                    {item.icon}
                  </span>
                  <span className="flex-1" style={{color: 'inherit'}}>{item.name}</span>
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default memo(Header)
