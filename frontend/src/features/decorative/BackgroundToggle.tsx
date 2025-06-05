'use client'

import React from 'react'
import { useBackgroundToggle } from './BackgroundToggleContext'

export function BackgroundToggle() {
  const { isPlaying, togglePlayback } = useBackgroundToggle()
  
  return (
    <button 
      id="bgToggle"
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-[9999] rounded-full bg-yellow-400 text-purple-900 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shadow-lg transition-smooth hover-scale"
      aria-label={isPlaying ? "Pausar animaciones de fondo" : "Reproducir animaciones de fondo"}
    >
      <span id="bgToggleIcon" className="text-xl">
        {isPlaying ? '⏸' : '▶️'}
      </span>
    </button>
  )
}