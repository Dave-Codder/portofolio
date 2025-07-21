'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

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
      className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-6">Contact</h1>
        <p className="text-text mb-6 text-sm md:text-base">Daveo Dava Putra - Portofolio | Software Engineering</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-primary text-text border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-primary text-text border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            required 
          />
          <textarea 
            name="message"
            placeholder="Your Message" 
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-primary text-text border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
            rows="4" 
            required
          ></textarea>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-secondary text-primary p-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-opacity-90"
          >
            Send Message
          </motion.button>
        </form>
        {status && <p className="mt-4 text-text text-center">{status}</p>}
        <div className="mt-6 flex justify-center space-x-4">
          <Link href="https://github.com/Dave-Codder" target="_blank" rel="noopener noreferrer">
            <motion.div 
              whileHover={{ scale: 1.1, color: '#f59e0b' }}
              className="text-text text-2xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.446-1.269.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 7.844c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.543 1.378.2 2.394.097 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.308.678.916.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.479C19.137 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </motion.div>
          </Link>
          <Link href="https://linkedin.com/in/daveo-dp-91a136237" target="_blank" rel="noopener noreferrer">
            <motion.div 
              whileHover={{ scale: 1.1, color: '#f59e0b' }}
              className="text-text text-2xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.255-2.391-1.875-2.391-1.635 0-2.125 1.062-2.125 2.391v5.604h-3v-11h3v1.542c.405-1.191 2.04-2.596 4.5-2.596 3.247 0 4.5 2.072 4.5 5.072v6.882z"/></svg>
            </motion.div>
          </Link>
          <Link href="https://instagram.com/daveo_dp" target="_blank" rel="noopener noreferrer">
            <motion.div 
              whileHover={{ scale: 1.1, color: '#f59e0b' }}
              className="text-text text-2xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.173.281 2.673.554.707.375 1.279.966 1.654 1.611.374.645.555 1.307.592 2.673.058 1.266.069 1.646.069 4.85s-.011 3.584-.069 4.85c-.037 1.366-.218 2.028-.592 2.673-.375.645-.947 1.236-1.654 1.611-.494.273-1.307.492-2.673.554-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.173-.281-2.673-.554-.707-.375-1.279-.966-1.654-1.611-.374-.645-.555-1.307-.592-2.673-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.85c.037-1.366.218-2.028.592-2.673.375-.645.947-1.236 1.654-1.611.494-.273 1.307-.492 2.673-.554 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.67.014-4.947.072-1.254.057-2.08.247-2.813.514-.732.266-1.353.63-1.99 1.267-.636.637-1.001 1.258-1.267 1.99-.267.733-.456 1.559-.514 2.813-.058 1.277-.072 1.688-.072 4.947s.014 3.67.072 4.947c.057 1.254.247 2.08.514 2.813.266.732.63 1.353 1.267 1.99.637.636 1.258 1.001 1.99 1.267.733.267 1.559.456 2.813.514 1.277.058 1.688.072 4.947.072s3.67-.014 4.947-.072c1.254-.057 2.08-.247 2.813-.514.732-.266 1.353-.63 1.99-1.267.636-.637 1.001-1.258 1.267-1.99.267-.733.456-1.559.514-2.813.058-1.277.072-1.688.072-4.947s-.014-3.67-.072-4.947c-.057-1.254-.247-2.08-.514-2.813-.266-.732-.63-1.353-1.267-1.99-.637-.636-1.258-1.001-1.99-1.267-.733-.267-1.559-.456-2.813-.514-1.277-.058-1.688-.072-4.947-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441-.645-1.441-1.441s.645-1.441 1.441-1.441c.796 0 1.441.645 1.441 1.441s-.645 1.441-1.441 1.441z"/></svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}