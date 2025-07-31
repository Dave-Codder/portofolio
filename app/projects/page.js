"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Projects() {
  const description = `
    This section showcases my portfolio of projects, built using a variety of technologies and programming languages. 
    The projects range from Android mobile applications to a web admin panel and a hybrid Flutter app integrated with web features. 
    Each project reflects my skills in developing functional, user-friendly solutions with diverse backgrounds, 
    including personal initiatives and client-based developments. Explore the previews and access the apps or websites below.
  `;

  const projects = [
    {
      title: "Attendance Application for BimbelMytraBelajar Admin-Teacher",
      desc: "A robust attendance tracking app for tutoring sessions, built with Android Studio.",
      tech: "Kotlin, XML, Android Studio",
      background:
        "Created to streamline attendance management for the BimbelMytraBelajar tutoring service, designed for admin and teacher collaboration.",
      function:
        "Enables attendance recording, real-time updates, and notifications for both admin and teacher users.",
      type: "android",
      downloadLink: "https://shrinkme.ink/BimbelMytraBelajar",
      image: "/images/Proyek Belajar.png",
    },
    {
      title: "Combined Material PAB Elektro Android Application",
      subtitle: "Mobile Programming Course Project",
      desc: "An educational app integrating key mobile programming concepts.",
      tech: "Kotlin, XML, Android Studio",
      background:
        "Developed as a project for the Mobile Application Programming (PAB) course at the Electrical Engineering department, this app combines three distinct modules to demonstrate practical Android development skills.",
      function:
        "Features a quiz module for interactive learning, an earthquake data module fetching JSON data for real-time updates, and a media player module supporting music and video playback.",
      type: "android",
      downloadLink: "https://shrinkme.ink/PAB_Elektro_App",
    },
    {
      title: "Drawing App for Android",
      subtitle: "Mobile Programming Course Project",
      desc: "A learning tool for creating and displaying shapes in Android applications.",
      tech: "Kotlin, XML, Android Studio",
      background:
        "Developed for the Mobile Application Programming (PAB) course in the Software Engineering Technology class, this app focuses on teaching Android graphics programming with Kotlin by enabling shape rendering.",
      function:
        "Allows users to draw and display geometric shapes on the screen as a learning tool for Android graphics.",
      type: "android",
      downloadLink: "https://shrinkme.ink/Aplikasi_Drawing",
    },
    {
      title: "Swalayanku App for Android",
      subtitle: "Mobile Programming Group Project",
      desc: "An app for UMKM to facilitate food ordering for customers.",
      tech: "Kotlin, XML, SQLite, Android Studio",
      background:
        "Developed as a group project for the Mobile Application Programming (PAB) course in the Software Engineering Technology class, this app supports UMKM by providing a platform for easy food ordering.",
      function:
        "Enables customers to order food easily, with an admin account (username: admin, password: admin123) for managing the system.",
      type: "android",
      downloadLink: "https://shrinkme.ink/Swalayanku_App",
    },
    // {
    //   title: "AdminPanel Web",
    //   desc: "A web-based admin dashboard for content management.",
    //   tech: "React, Node.js, MongoDB",
    //   background: "Developed for managing user content and analytics.",
    //   function: "Provides admin controls and data visualization.",
    //   type: "web",
    //   webLink: "https://example.com/adminpanel", // Replace with actual web URL
    // },
    {
      title: "Tokoku Client App and Admin Web Panel",
      desc: "An e-commerce solution with a mobile client and web admin interface.",
      tech: "Flutter, Dart, PHP, Blade, VSCode, MySQL",
      background:
        "Developed to create a comprehensive e-commerce platform for Tokoku, featuring a mobile app for customers and a web admin panel for store management, built using a mix of modern tools and databases.",
      function:
        "Enables customers to browse and purchase products via the Android app, while the web panel allows admins to manage inventory, orders, and user accounts with real-time updates.",
      type: "hybrid",
      downloadLink: "https://shrinkme.ink/Tokoku_App",
      webLink: "https://shrinkme.ink/Tokoku_Admin",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-8 bg-primary pb-20" // Added pb-20 for bottom padding
    >
      <h1 className="text-4xl md:text-5xl font-bold text-text mb-12 text-center">
        My Projects
      </h1>
      <p className="text-text text-center max-w-2xl mx-auto mb-8">
        {description}
      </p>
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
            <p className="text-text mb-2">{project.desc}</p>
            <p className="text-sm text-gray-400 mb-2">Tech: {project.tech}</p>
            <p className="text-sm text-gray-400 mb-2">
              Background: {project.background}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Function: {project.function}
            </p>
            {project.type === "android" && (
              <Link href={project.downloadLink}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-secondary text-primary px-4 py-2 rounded-full text-center cursor-pointer font-semibold transition-all duration-300 hover:bg-opacity-90"
                >
                  Download App
                </motion.div>
              </Link>
            )}
            {project.type === "web" && (
              <Link href={project.webLink}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-secondary text-primary px-4 py-2 rounded-full text-center cursor-pointer font-semibold transition-all duration-300 hover:bg-opacity-90"
                >
                  Visit Website
                </motion.div>
              </Link>
            )}
            {project.type === "hybrid" && (
              <>
                <Link href={project.downloadLink}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-secondary text-primary px-4 py-2 rounded-full text-center cursor-pointer font-semibold transition-all duration-300 hover:bg-opacity-90 mr-2"
                  >
                    Download App
                  </motion.div>
                </Link>
                <Link href={project.webLink}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 bg-secondary text-primary px-4 py-2 rounded-full text-center cursor-pointer font-semibold transition-all duration-300 hover:bg-opacity-90"
                  >
                    Visit Website
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
