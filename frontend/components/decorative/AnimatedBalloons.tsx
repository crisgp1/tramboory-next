'use client'

import { useEffect, useState, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Balloon {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: string
  rotation: number
  swing: number
}

const Balloon = memo(({ balloon }: { balloon: Balloon }) => (
  <motion.div
    key={balloon.id}
    className="absolute"
    initial={{
      x: `${balloon.x}vw`,
      y: '110vh',
      rotate: -5,
    }}
    animate={{
      y: '-20vh',
      rotate: [balloon.rotation - balloon.swing, balloon.rotation + balloon.swing, balloon.rotation - balloon.swing],
    }}
    transition={{
      y: {
        duration: balloon.duration,
        delay: balloon.delay,
        repeat: Infinity,
        ease: 'linear',
      },
      rotate: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'mirror',
      }
    }}
    style={{
      width: balloon.size,
      height: balloon.size * 1.2,
      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
    }}
  >
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Balloon body */}
      <ellipse
        cx="50"
        cy="45"
        rx="35"
        ry="45"
        fill={balloon.color}
        opacity="0.8"
      />
      {/* Highlight */}
      <ellipse
        cx="40"
        cy="30"
        rx="15"
        ry="20"
        fill="white"
        opacity="0.3"
      />
      {/* String */}
      <path
        d="M 50 90 Q 50 100 48 110 Q 46 120 48 130"
        stroke={balloon.color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
    </svg>
  </motion.div>
))

Balloon.displayName = 'Balloon'

/**
 * Animated balloons that float up from the bottom of the screen
 * 
 * Features:
 * - Randomly generated balloons with varying sizes, colors, and speeds
 * - Gentle swinging motion for added realism
 * - Optimized with memoization to prevent unnecessary re-renders
 * - Configurable balloon count and colors
 */
export function AnimatedBalloons({ 
  count = 15,
  colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Light Green
    '#F7DC6F', // Yellow
    '#BB8FCE', // Purple
    '#85C1E2'  // Light Blue
  ]
}) {
  // Generate balloons once and memoize
  const balloons = useMemo(() => {
    const newBalloons: Balloon[] = []
    
    for (let i = 0; i < count; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 40 + 30,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 10 - 5, // Random initial rotation
        swing: Math.random() * 5 + 2,    // Random swing amount
      })
    }
    
    return newBalloons
  }, [count, colors])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {balloons.map(balloon => (
          <Balloon key={balloon.id} balloon={balloon} />
        ))}
      </AnimatePresence>
    </div>
  )
}