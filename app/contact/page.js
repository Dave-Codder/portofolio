'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('Failed to send message.')
      }
    } catch (error) {
      setStatus('Error: ' + error.message)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen p-8 bg-primary flex items-center justify-center"
    >
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-secondary mb-6 text-center">Contact Me</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-primary text-text border border-gray-600 rounded" 
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-primary text-text border border-gray-600 rounded" 
            required 
          />
          <textarea 
            name="message"
            placeholder="Your Message" 
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-primary text-text border border-gray-600 rounded" 
            rows="4" 
            required
          ></textarea>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            type="submit"
            className="w-full bg-secondary text-primary p-3 rounded text-lg font-semibold"
          >
            Send Message
          </motion.button>
        </form>
        {status && <p className="mt-4 text-text text-center">{status}</p>}
      </div>
    </motion.div>
  )
}