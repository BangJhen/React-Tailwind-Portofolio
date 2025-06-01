// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger } from '../hooks/useAnimations'

const Contact = () => {
  const [contactRef, contactVisible] = useScrollTrigger(0.2)
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={contactRef}
          variants={containerVariants}
          initial="hidden"
          animate={contactVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p 
            variants={itemVariants}
            className="text-blue-500 font-medium text-lg mb-4"
          >
            Contact us
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Get in touch
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our friendly team is always here to chat.
          </motion.p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={contactVisible ? "visible" : "hidden"}
        >
          {/* Email Card */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
            <p className="text-gray-600 mb-6">Our friendly team is here to help.</p>
            <motion.a 
              href="mailto:jhenerar21@gmail.com"
              className="text-blue-500 hover:text-blue-600 font-medium text-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              jhenerar21@gmail.com
            </motion.a>
          </motion.div>

          {/* Office Card */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Place</h3>
            <p className="text-gray-600 mb-6">Come say hello at my place.</p>
            <p className="text-blue-500 font-medium text-lg">
              Telkom University, Bandung Regency, West Java
            </p>
          </motion.div>

          {/* Phone Card */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone</h3>
            <p className="text-gray-600 mb-6">Mon-Fri from 8am to 5pm.</p>
            <motion.a 
              href="mailto:jhenerar21@gmail.com"
              className="text-blue-500 hover:text-blue-600 font-medium text-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email for scheduling
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
