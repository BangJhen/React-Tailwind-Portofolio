// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger } from '../hooks/useAnimations'

const Footer = () => {
  const [footerRef, footerVisible] = useScrollTrigger(0.2)
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-white border-t border-gray-200 py-12"
      initial={{ opacity: 0, y: 50 }}
      animate={footerVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio</h3>
            <p className="text-gray-600 text-sm max-w-md">
              Creating beautiful digital experiences through thoughtful design.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-bold">LI</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-bold">GH</span>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm font-bold">TW</span>
            </motion.a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
