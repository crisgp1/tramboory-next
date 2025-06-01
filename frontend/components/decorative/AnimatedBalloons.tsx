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

// Función para generar números pseudoaleatorios con semilla
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * Animated balloons that float up from the bottom of the screen
 * 
 * Features:
 * - Consistently generated balloons with varying sizes, colors, and speeds
 * - Gentle swinging motion for added realism
 * - Optimized with memoization to prevent unnecessary re-renders
 * - Configurable balloon count and colors
 * - Fixed hydration issues by using seeded random generation
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Generate balloons with seeded randomness for consistency
  const balloons = useMemo(() => {
    if (!isMounted) return []
    
    const newBalloons: Balloon[] = []
    
    for (let i = 0; i < count; i++) {
      // Use seeds based on index for consistent randomness
      const xSeed = i * 1.5
      const sizeSeed = i * 2.3
      const durationSeed = i * 3.7
      const delaySeed = i * 4.1
      const colorSeed = i * 5.9
      const rotationSeed = i * 6.7
      const swingSeed = i * 7.3

      newBalloons.push({
        id: i,
        x: seededRandom(xSeed) * 100,
        size: seededRandom(sizeSeed) * 40 + 30,
        duration: seededRandom(durationSeed) * 20 + 15,
        delay: seededRandom(delaySeed) * 10,
        color: colors[Math.floor(seededRandom(colorSeed) * colors.length)],
        rotation: seededRandom(rotationSeed) * 10 - 5,
        swing: seededRandom(swingSeed) * 5 + 2,
      })
    }
    
    return newBalloons
  }, [count, colors, isMounted])

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null
  }

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