'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Balloon {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: string
}

const balloonColors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2'
]

export default function AnimatedBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons: Balloon[] = []
      const balloonCount = 15

      for (let i = 0; i < balloonCount; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 40 + 30,
          duration: Math.random() * 20 + 15,
          delay: Math.random() * 10,
          color: balloonColors[Math.floor(Math.random() * balloonColors.length)]
        })
      }

      setBalloons(newBalloons)
    }

    generateBalloons()
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute"
            initial={{
              x: `${balloon.x}vw`,
              y: '110vh',
            }}
            animate={{
              y: '-10vh',
            }}
            transition={{
              duration: balloon.duration,
              delay: balloon.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              width: balloon.size,
              height: balloon.size * 1.2,
            }}
          >
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-lg"
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
        ))}
      </AnimatePresence>
    </div>
  )
}