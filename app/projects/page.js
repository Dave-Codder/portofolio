"use client";

import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Project Alpha",
      desc: "A web app built with React and Node.js for seamless user experiences.",
    },
    {
      title: "Project Beta",
      desc: "A mobile-responsive e-commerce platform with secure payment integration.",
    },
    {
      title: "Project Gamma",
      desc: "A data visualization dashboard using D3.js and Next.js.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-primary"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-12 text-center">
        My Projects
      </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-secondary mb-2">
              {project.title}
            </h2>
            <p className="text-text">{project.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
