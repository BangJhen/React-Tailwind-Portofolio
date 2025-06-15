import { useState, useEffect, memo, useMemo } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect and active section detection
  useEffect(() => {
    const handleScroll = () => {
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
    }
    
    handleScroll() // Check initial state
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Memoize scroll function to prevent recreation
  const scrollToSection = useMemo(() => (sectionId, event) => {
    event.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
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
      className={`fixed w-full enhanced-backdrop z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-200' 
          : 'bg-white/90 border-b border-gray-100'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Profile */}
          <motion.div 
            className="flex items-center space-x-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="relative"
            >
              {/* Low Poly Logo */}
              <div className="w-10 h-10 relative">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 40 40" 
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
                  
                  {/* Low Poly Triangles */}
                  <polygon 
                    points="20,2 35,15 20,20" 
                    fill="url(#poly-gradient-1)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="20,2 5,15 20,20" 
                    fill="url(#poly-gradient-2)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="5,15 20,20 10,30" 
                    fill="url(#poly-gradient-3)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="20,20 35,15 30,30" 
                    fill="url(#poly-gradient-1)"
                    className="transition-all duration-300 group-hover:opacity-80"
                  />
                  <polygon 
                    points="10,30 20,20 30,30" 
                    fill="url(#poly-gradient-2)"
                    className="transition-all duration-300 group-hover:opacity-90"
                  />
                  <polygon 
                    points="10,30 20,38 30,30" 
                    fill="url(#poly-gradient-3)"
                    className="transition-all duration-300 group-hover:opacity-85"
                  />
                </svg>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              
              <motion.div 
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white status-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div className="hidden sm:block">
              <motion.h1 
                className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent"
                whileHover={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 2 }}
              >
                Ammar Ridho
              </motion.h1>
              <motion.p 
                className="text-xs text-gray-500 -mt-0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                AI Engineer
              </motion.p>
            </motion.div>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <motion.a
                    href={item.href}
                    onClick={(e) => scrollToSection(item.id, e)}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group ${
                      activeSection === item.id 
                        ? 'text-blue-600 bg-blue-50 shadow-sm' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span 
                      className={`text-lg transition-opacity duration-300 ${
                        activeSection === item.id 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                      animate={{ 
                        rotate: hoveredItem === item.name || activeSection === item.id ? [0, 10, -10, 0] : 0,
                        scale: activeSection === item.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="relative z-10">{item.name}</span>
                    
                    {/* Underline Effect - Only for non-active items on hover */}
                    {activeSection !== item.id && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-0 group-hover:w-full"
                        initial={{ width: '0%' }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Active Section Checkpoint Indicator */}
                    <AnimatePresence>
                      {activeSection === item.id && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-white shadow-sm"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
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
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.name}
                  href={item.href} 
                  className={`group flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                  }`}
                  onClick={(e) => {
                    scrollToSection(item.id, e)
                    setIsMenuOpen(false)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span 
                    className="text-xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={{ 
                      scale: activeSection === item.id ? 1.1 : 1,
                      rotate: activeSection === item.id ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="flex-1">{item.name}</span>
                  <motion.div 
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-blue-500 scale-100 opacity-100' 
                        : 'bg-blue-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: activeSection === item.id ? 1 : 0,
                      opacity: activeSection === item.id ? 1 : 0
                    }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  {/* Active checkpoint indicator for mobile */}
                  <AnimatePresence>
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute right-1 top-1 w-2 h-2 bg-blue-500 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default memo(Header)
