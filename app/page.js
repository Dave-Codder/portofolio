"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center 
                 bg-gradient-to-b from-primary via-secondary to-primary p-8"
    >
      {/* Judul */}
      <h1 className="text-2xl md:text-4xl text-center font-bold text-white mb-4">
        Welcome to My Portofolio
      </h1>

      {/* Deskripsi */}
      <p className="text-lg md:text-xl text-white text-center max-w-2xl">
        My Name Is Daveo Dava Putra, and I live in Pangkal Pinang, Bangka
        Belitung Province.
      </p>

      {/* Tombol */}
      <Link href="/projects">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-b from-secondary to-accent text-white px-8 py-4 rounded-full shadow-lg cursor-pointer text-center font-semibold text-lg transition-all duration-300 hover:shadow-xl"
        >
          Explore My Work
        </motion.div>
      </Link>
    </motion.main>
  );
}
