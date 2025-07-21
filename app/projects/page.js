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
      downloadLink: "https://direct-link.net/1373399/VrLkLPIjBWtK",
      image: "/images/Proyek Belajar.png",
    },
    {
    title: "Combined Material PAB Elektro Android Application",
    subtitle: "Mobile Programming Course Project",
    desc: "An educational app integrating key mobile programming concepts.",
    tech: "Kotlin, XML, Android Studio",
    background: "Developed as a project for the Mobile Application Programming (PAB) course at the Electrical Engineering department, this app combines three distinct modules to demonstrate practical Android development skills.",
    function: "Features a quiz module for interactive learning, an earthquake data module fetching JSON data for real-time updates, and a media player module supporting music and video playback.",
    type: "android",
    downloadLink: "https://link-hub.net/1373399/kh9T8YAAMecj"
  },
    // {
    //   title: "NoteSync Android",
    //   desc: "A synchronized note-taking app with cloud backup.",
    //   tech: "Android SDK, Firebase",
    //   background: "Designed for users needing secure note storage.",
    //   function: "Syncs notes across devices with cloud support.",
    //   type: "android",
    //   downloadLink: "https://example.com/notesync.apk", // Replace with actual APK URL
    // },
    // {
    //   title: "ShopEasy Android",
    //   desc: "A shopping list app with barcode scanning.",
    //   tech: "Kotlin, ZXing Library",
    //   background: "Built to simplify grocery shopping for users.",
    //   function: "Scans barcodes and manages shopping lists.",
    //   type: "android",
    //   downloadLink: "https://example.com/shopeasy.apk", // Replace with actual APK URL
    // },
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
      downloadLink: "https://link-target.net/1373399/HNivrRDagcQP",
      webLink: "https://link-center.net/1373399/QwPkMMVcmsRp",
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
