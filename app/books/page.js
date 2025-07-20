'use client'

import { motion } from 'framer-motion'

export default function Books() {
  const books = [
    { title: 'Clean Code', desc: 'A handbook for writing maintainable and readable code.' },
    { title: 'You Don’t Know JS', desc: 'A deep dive into JavaScript’s core concepts.' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-primary"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-12 text-center">Recommended Books</h1>
      <div className="max-w-7xl mx-auto space-y-8">
        {books.map((book, index) => (
          <motion.div 
            key={index}
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-secondary mb-2">{book.title}</h2>
            <p className="text-text">{book.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}