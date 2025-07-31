"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import CustomCursor from "./components/CustomCursor";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

export default function RootLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const playerRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(
    "Memory Reboot by VØJ, Narvent"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = "your-spotify-access-token"; // Replace with a valid Spotify access token
      if (!token) {
        console.error("Spotify access token is missing or invalid");
        return;
      }

      const player = new Spotify.Player({
        name: "My Portfolio Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      playerRef.current = player;

      player.addListener("ready", ({ device_id }) => {
        console.log("Spotify Player ready with Device ID:", device_id);
        setIsPlayerReady(true);
        playerRef.current
          .resume()
          .catch((err) => console.error("Resume error:", err)); // Attempt to start playback
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline:", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          setCurrentTrack(
            `${
              state.track_window.current_track.name
            } by ${state.track_window.current_track.artists
              .map((artist) => artist.name)
              .join(", ")}`
          );
          setIsPlaying(!state.paused);
        }
      });

      player.connect().catch((error) => {
        console.error("Connection error:", error);
      });

      return () => player.disconnect();
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current
        .togglePlay()
        .then(() => {
          setIsPlaying((prev) => !prev);
        })
        .catch((error) => {
          console.error("Toggle play error:", error);
        });
    } else {
      console.log("Player not ready or initialized");
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    controls.start({
      scale: isExpanded ? 0.5 : 1,
      transition: { duration: 0.3 },
    });
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NavBar />
        <CustomCursor />
        {children}
        <motion.div
          className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-40"
          animate={controls}
          initial={{ scale: 0.5 }}
        >
          <motion.div
            className={`bg-gray-800 p-2 md:p-4 flex items-center justify-between rounded-lg shadow-lg ${
              isExpanded ? "w-96 h-20" : "w-16 h-16"
            }`}
            onClick={toggleExpand}
          >
            {!isExpanded ? (
              <motion.div className="text-secondary text-2xl cursor-pointer flex items-center justify-center w-full h-full">
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
                    d="M15 10l-4 4m0 0l-4-4m4 4V3"
                  />
                </svg>
              </motion.div>
            ) : (
              <>
                <motion.div className="text-secondary text-sm truncate w-1/3">
                  {currentTrack} {isPlaying ? "▶" : "⏸"}
                </motion.div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlayerReady && playerRef.current)
                        playerRef.current.previousTrack();
                    }}
                    className="bg-secondary text-primary p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlayPause();
                    }}
                    className="bg-secondary text-primary p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                          isPlaying
                            ? "M10 9v6m4-6v6"
                            : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        }
                      />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPlayerReady && playerRef.current)
                        playerRef.current.nextTrack();
                    }}
                    className="bg-secondary text-primary p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </body>
    </html>
  );
}
