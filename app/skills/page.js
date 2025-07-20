"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-primary"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-12 text-center">
        My Skills
      </h1>
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
        {skills.map((skill, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, backgroundColor: "#f59e0b", color: "#1a1a1a" }}
            className="bg-gray-800 text-text px-6 py-3 rounded-full shadow-lg text-lg"
          >
            {skill}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-text text-center max-w-2xl mx-auto"
      >
        I specialize in building modern, scalable web applications with a focus
        on performance and user experience.
      </motion.p>
    </motion.div>
  );
}
