'use client'

import { RefObject } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause } from 'react-icons/fi'

interface BackgroundVideoComponentProps {
  videoRef: RefObject<HTMLVideoElement | null>
  isVideoPlaying: boolean
  toggleVideo: (e?: React.MouseEvent) => void
}

export default function BackgroundVideoComponent({
  videoRef,
  isVideoPlaying,
  toggleVideo
}: BackgroundVideoComponentProps) {
  return (
    <>
      {/* Video de fondo */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/tramboory-background.mp4" type="video/mp4" />
          <source src="/videos/tramboory-background.webm" type="video/webm" />
        </video>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        
        {/* Overlay de colores */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20" />
      </div>

      {/* Control de video */}
      <motion.button
        onClick={toggleVideo}
        className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label={isVideoPlaying ? "Pausar video" : "Reproducir video"}
      >
        {isVideoPlaying ? (
          <FiPause className="w-6 h-6" />
        ) : (
          <FiPlay className="w-6 h-6" />
        )}
      </motion.button>
    </>
  )
}