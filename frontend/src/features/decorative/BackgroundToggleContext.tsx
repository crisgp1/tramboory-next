'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface BackgroundToggleContextType {
  isPlaying: boolean
  togglePlayback: () => void
}

const BackgroundToggleContext = createContext<BackgroundToggleContextType>({
  isPlaying: true,
  togglePlayback: () => {},
})

export const useBackgroundToggle = () => useContext(BackgroundToggleContext)

export function BackgroundToggleProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const togglePlayback = () => {
    setIsPlaying(prev => !prev)
  }

  useEffect(() => {
    if (!isMounted) return

    // Find the background video element
    const bgVideo = document.getElementById('backgroundVideo') as HTMLVideoElement | null
    
    // Apply play/pause to the video element
    if (bgVideo) {
      if (isPlaying) {
        try {
          const playPromise = bgVideo.play()
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error('Video play error:', error)
            })
          }
        } catch (error) {
          console.error('Error playing video:', error)
        }
      } else {
        bgVideo.pause()
      }
    }

    // Apply paused class to animated elements
    const animatedElements = document.querySelectorAll('.particle, .globo')
    animatedElements.forEach(el => {
      if (isPlaying) {
        el.classList.remove('paused')
      } else {
        el.classList.add('paused')
      }
    })

  }, [isPlaying, isMounted])

  return (
    <BackgroundToggleContext.Provider value={{ isPlaying, togglePlayback }}>
      {children}
    </BackgroundToggleContext.Provider>
  )
}