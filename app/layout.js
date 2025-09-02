"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import CustomCursor from "./components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

const MusicContext = createContext(null);

export function useMusic() {
  return useContext(MusicContext);
}

export default function RootLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    fetch("/api/music")
      .then((res) => res.json())
      .then(setPlaylist)
      .catch((err) => console.error("Failed to fetch playlist:", err));
  }, []);

  useEffect(() => {
    if (playlist.length === 0 || !audioRef.current) return;

    const audio = audioRef.current;
    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    const updateTime = () => {
      setCurrentTime(audio.currentTime || 0);
      if (progressRef.current) {
        progressRef.current.value = audio.currentTime || 0;
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      if (progressRef.current) {
        progressRef.current.max = audio.duration || 100;
      }
      if (hasUserInteracted) {
        audio.play().catch((err) => {
          console.log("Autoplay failed:", err.message);
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", () => {
      setIsPlaying(false);
      console.error("Audio error occurred");
    });

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", () => {});
    };
  }, [currentTrackIndex, playlist, hasUserInteracted]);

  const playMusic = () => {
    if (audioRef.current) {
      setHasUserInteracted(true);
      audioRef.current.play().catch((err) => {
        console.log("Play failed:", err.message);
      });
      setIsPlaying(true);
    }
  };

  const playPause = () => {
    if (audioRef.current) {
      setHasUserInteracted(true);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log("Play failed:", err.message);
        });
      }
      setIsPlaying(!isPlaying);
      track(isPlaying ? "music-pause" : "music-play");
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
    setHasUserInteracted(true);
    setIsPlaying(true);
    track("music-next");
  };

  const prevTrack = () => {
    setCurrentTrackIndex(
      (prev) => (prev - 1 + playlist.length) % playlist.length
    );
    setCurrentTime(0);
    setHasUserInteracted(true);
    setIsPlaying(true);
    track("music-prev");
  };

  const updateProgress = (e) => {
    if (audioRef.current) {
      const value = e.target.value;
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setHasUserInteracted(true);
    track(isExpanded ? "player-minimized" : "player-expanded");
  };

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style jsx>{`
          .music-player {
            background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          }
          .music-player .controls button {
            background: #ffd700;
            color: #1a1a1a;
            transition: background 0.3s, transform 0.2s;
          }
          .music-player .controls button:hover {
            background: #e6b800;
            transform: scale(1.1);
          }
          .music-player .progress-bar {
            background: #ffd700;
            height: 4px;
          }
          .music-player .time {
            color: #ffd700;
            font-size: 0.9rem;
          }
          .music-logo {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </head>
      <body
        className={`${inter.className} pb-0 sm:pb-20 md:pb-8 min-h-screen bg-gray-900 text-white`}
        suppressHydrationWarning
      >
        <MusicContext.Provider value={{ playMusic }}>
          <NavBar />
          <CustomCursor />
          {children}
        </MusicContext.Provider>

        {/* Music Floating Button */}
        <motion.div
          className="fixed bottom-20 right-4 z-50"
          animate={controls}
          initial={{ width: "56px", height: "56px" }}
        >
          {!isExpanded && (
            <motion.div
              className="music-player music-logo p-2 rounded-xl shadow-xl transition-all duration-100 cursor-pointer"
              onClick={toggleExpand}
              // animate={isPlaying ? { rotate: 180 } : {}}
              // transition={{
              //   duration: 1,
              //   repeat: isPlaying ? Infinity : 0,
              //   ease: "linear",
              // }}
            >
              <motion.div className="text-secondary flex items-center justify-center w-full h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
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
            </motion.div>
          )}
        </motion.div>

        {isExpanded && playlist.length > 0 && (
          <motion.div
            className="fixed bottom-20 right-4 z-40 w-[calc(90vw-1rem)] max-w-xs sm:max-w-md h-[300px] sm:h-[352px] music-player rounded-lg shadow-lg overflow-hidden border border-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-full p-4 bg-primary">
              <button
                onClick={toggleExpand}
                className="absolute top-2 right-2 text-white bg-gray-700 bg-opacity-80 p-1 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors duration-300"
              >
                -
              </button>
              <div className="flex items-center h-full bg-primary">
                <img
                  src={playlist[currentTrackIndex].art || "/images/mark.png"}
                  alt={`${playlist[currentTrackIndex].title} artwork`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg mr-4 object-cover border-2 border-yellow-400"
                  onError={() =>
                    console.error(
                      "Image failed to load:",
                      playlist[currentTrackIndex].art
                    )
                  }
                />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-400">
                    {playlist[currentTrackIndex].title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {playlist[currentTrackIndex].artist}
                  </p>
                  <div className="controls flex items-center mt-2 space-x-4">
                    <button
                      onClick={prevTrack}
                      className="controls button p-2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
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
                    </button>
                    <button
                      onClick={playPause}
                      className="controls button p-3 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
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
                              ? "M6 4h4v16H6V4zm8 0h4v16h-4V4z" // Pause icon
                              : "M8 5v14l11-7L8 5z" // Play icon
                          }
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextTrack}
                      className="controls button p-2 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
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
                    </button>
                  </div>
                  <div className="mt-4">
                    <input
                      ref={progressRef}
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={updateProgress}
                      className="progress-bar w-full accent-yellow-400 cursor-pointer"
                    />
                    <div className="flex justify-between time mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <audio ref={audioRef} hidden />
        <Analytics />
      </body>
    </html>
  );
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
