"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import CustomCursor from "./components/CustomCursor";
import { motion, useAnimation } from "framer-motion";
import { useState, useRef } from "react";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function RootLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const iframeRef = useRef(null);

  const toggleExpand = () => {
    console.log("Toggling player expansion:", !isExpanded);
    if (!isExpanded) {
      setIsExpanded(true);

      // Reload iframe to trigger autoplay (browser-dependent)
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = iframeRef.current.src;
        }
      }, 100);
    } else {
      setIsExpanded(false);
      controls.start({
        width: "56px",
        height: "56px",
        transition: { duration: 0.3, ease: "easeInOut" },
      });
    }
  };

  const minimize = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
    controls.start({
      width: "56px",
      height: "56px",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.className} pb-28 sm:pb-20 md:pb-8 min-h-screen`}
        suppressHydrationWarning
      >
        <NavBar />
        <CustomCursor />
        {children}

        {/* Musik Floating Button */}
        <motion.div
          className="fixed bottom-20 right-4 z-50 w-14 h-14 sm:w-16 sm:h-16"
          animate={controls}
          initial={{ width: "56px", height: "56px" }}
        >
          <motion.div
            className={`bg-gray-800 p-3 flex items-center justify-center rounded-xl shadow-xl transition-all duration-300 ${
              isExpanded ? "w-[calc(100vw-2rem)] max-w-xs sm:max-w-md h-14" : ""
            }`}
            onClick={toggleExpand}
            style={{
              width: isExpanded ? "auto" : "56px",
              height: isExpanded ? "56px" : "56px",
            }}
          >
            {!isExpanded ? (
              <motion.div className="text-secondary text-3xl cursor-pointer flex items-center justify-center w-full h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 0019.5 15.553zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                  />
                </svg>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between w-full h-full px-2">
                <button
                  onClick={minimize}
                  className="text-secondary text-xl font-bold bg-gray-700 p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                >
                  -
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Spotify Embed Panel */}
        {isExpanded && (
          <motion.div
            className="fixed bottom-20 right-4 z-40 w-[calc(100vw-2rem)] max-w-xs sm:max-w-md h-[300px] sm:h-[352px] bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              ref={iframeRef}
              data-testid="embed-iframe"
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/1dZ3ixDS9JhkF1ie5dXaSh?utm_source=generator&autoplay=1"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </motion.div>
        )}
      </body>
    </html>
  );
}
