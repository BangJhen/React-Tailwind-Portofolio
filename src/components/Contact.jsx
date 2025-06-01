import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useScrollTrigger } from '../hooks/useAnimations'

const Contact = () => {
  const [contactRef, contactVisible] = useScrollTrigger(0.2)
  const [formRef, formVisible] = useScrollTrigger(0.3)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

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

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          ref={contactRef}
          variants={containerVariants}
          initial="hidden"
          animate={contactVisible ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 mb-6"
          >
            Let's work together on your next project.
          </motion.p>
        </motion.div>

        {/* Simple Contact Form */}
        <motion.div
          ref={formRef}
          variants={formVariants}
          initial="hidden"
          animate={formVisible ? "visible" : "hidden"}
          className="max-w-sm mx-auto mb-12"
        >
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            variants={containerVariants}
          >
            <motion.input
              variants={itemVariants}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent text-center placeholder-gray-400"
              placeholder="Your name"
              whileFocus={{ scale: 1.01 }}
            />
            
            <motion.input
              variants={itemVariants}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent text-center placeholder-gray-400"
              placeholder="your.email@example.com"
              whileFocus={{ scale: 1.01 }}
            />
            
            <motion.textarea
              variants={itemVariants}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent text-center placeholder-gray-400 resize-none"
              placeholder="Your message..."
              whileFocus={{ scale: 1.01 }}
            />
            
            <motion.button
              type="submit"
              variants={itemVariants}
              className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-full font-medium transition-all outline-none"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#2563eb"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
