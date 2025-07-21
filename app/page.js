"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary p-8"
    >
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to My Portofolio
      </h1>
      <p className="text-xl text-white text-center max-w-2xl">
        My Name Is Daveo Dava Putra, And i live in pangkal pinang, at bangka
        belitung province.
      </p>
      <Link href="/projects">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-secondary to-accent text-white px-8 py-4 rounded-full shadow-lg cursor-pointer text-center font-semibold text-lg transition-all duration-300 hover:shadow-xl"
        >
          Explore My Work
        </motion.div>
      </Link>
    </motion.main>
  );
}
