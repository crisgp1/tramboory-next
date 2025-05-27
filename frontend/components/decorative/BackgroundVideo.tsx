'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause } from 'react-icons/fi'

interface BackgroundVideoProps {
  src: string
  poster?: string
}

/**
 * Optimized background video component with playback controls
 * 
 * Features:
 * - Lazy loading
 * - Error handling
 * - Play/pause controls
 * - Responsive design
 * - Gradient overlays
 */
export function BackgroundVideo({ src, poster }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasError, setHasError] = useState(false)
  
  // Initialize video playback
  useEffect(() => {
    const videoElement = videoRef.current
    
    if (!videoElement) return
    
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      console.error('Error loading video:', src)
      setHasError(true)
    }
    
    // Add event listeners
    videoElement.addEventListener('play', handlePlay)
    videoElement.addEventListener('pause', handlePause)
    videoElement.addEventListener('error', handleError)
    
    // Auto-play on mount
    const playPromise = videoElement.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Auto-play prevented:', error)
        setIsPlaying(false)
      })
    }
    
    // Clean up
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handlePlay)
        videoElement.removeEventListener('pause', handlePause)
        videoElement.removeEventListener('error', handleError)
      }
    }
  }, [src])
  
  // Toggle playback control
  const togglePlayback = async () => {
    if (!videoRef.current) return
    
    try {
      if (isPlaying) {
        await videoRef.current.pause()
      } else {
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          await playPromise
        }
      }
    } catch (error) {
      console.error('Error controlling video:', error)
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {!hasError ? (
        <>
          {/* Video element */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            className="absolute w-full h-full object-cover"
          >
            <source src={src} type="video/webm" />
            <source src={src.replace('.webm', '.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-tramboory-purple-900/30 to-tramboory-yellow-900/10 mix-blend-overlay" />
          
          {/* Control button */}
          <motion.button
            onClick={togglePlayback}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-tramboory-yellow-400 text-tramboory-purple-900 flex items-center justify-center shadow-lg"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
          </motion.button>
        </>
      ) : (
        // Fallback for video errors
        <div className="absolute inset-0 bg-gradient-to-br from-tramboory-purple-900 to-tramboory-purple-700 flex items-center justify-center">
          <div className="text-white text-center p-6">
            <p className="mb-2 text-lg">No se pudo cargar el video de fondo</p>
            <p className="text-sm text-tramboory-yellow-400">Disfruta de la experiencia Tramboory de todas formas</p>
          </div>
        </div>
      )}
    </div>
  )
}