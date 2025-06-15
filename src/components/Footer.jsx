// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { memo, useMemo } from 'react'
import { useScrollTrigger } from '../hooks/useAnimations'

const Footer = () => {
  const [footerRef, footerVisible] = useScrollTrigger(0.2)
  
  // Memoize current year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200/50 py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={footerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          {/* Logo/Brand Section */}
          <motion.div 
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={footerVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Compact Logo */}
            <div className="w-6 h-6 relative">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 32 32" 
                className="w-full h-full"
              >
                {/* ...existing logo gradients and paths... */}
                <defs>
                  <linearGradient id="footer-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient id="footer-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <linearGradient id="footer-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                
                <polygon 
                  points="16,3 28,12 16,16" 
                  fill="url(#footer-gradient-1)"
                  className="opacity-90"
                />
                <polygon 
                  points="16,3 4,12 16,16" 
                  fill="url(#footer-gradient-2)"
                  className="opacity-90"
                />
                <polygon 
                  points="4,12 16,16 8,24" 
                  fill="url(#footer-gradient-3)"
                  className="opacity-90"
                />
                <polygon 
                  points="16,16 28,12 24,24" 
                  fill="url(#footer-gradient-1)"
                  className="opacity-80"
                />
                <polygon 
                  points="8,24 16,16 24,24" 
                  fill="url(#footer-gradient-2)"
                  className="opacity-90"
                />
                <polygon 
                  points="8,24 16,30 24,24" 
                  fill="url(#footer-gradient-3)"
                  className="opacity-85"
                />
              </svg>
            </div>
            
            <div className="text-left">
              <h3 className="text-base font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                Ammar Ridho
              </h3>
              <p className="text-xs text-gray-600 -mt-0.5">AI Engineer</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-lg mx-auto"
          >
            <p className="text-gray-600 text-sm">
              Building intelligent AI solutions that solve real-world challenges.
            </p>
          </motion.div>

          {/* Skills/Expertise Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-1.5 max-w-lg mx-auto"
          >
            {[
              'Machine Learning',
              'Data Science', 
              'Python',
              'AI Solutions'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-2 py-1 bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-full text-xs text-gray-700 font-medium"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={footerVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Copyright and Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={footerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-500 pt-2 border-t border-gray-200/30"
          >
            <p>© {currentYear} Muhammad Ammar Ridho</p>
            <div className="flex items-center space-x-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Available for opportunities</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

export default memo(Footer)
