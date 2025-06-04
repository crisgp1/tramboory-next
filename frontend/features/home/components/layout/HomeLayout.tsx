'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { HomeProvider, useHome } from '@/features/home/application/providers/HomeProvider'
import { HomeLoadingSkeleton } from '../HomeLoadingSkeleton'
import { HomeErrorFallback } from '../HomeErrorFallback'

interface HomeLayoutProps {
  children: React.ReactNode
}

/**
 * Home Layout Content Component
 * Handles the rendering logic based on loading and error states
 */
function HomeLayoutContent({ children }: HomeLayoutProps) {
  const { data, refetch } = useHome()

  if (data.isLoading) {
    return <HomeLoadingSkeleton />
  }

  if (data.error) {
    return (
      <HomeErrorFallback
        error={new Error(data.error)}
        onRetry={refetch}
        variant="full"
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-tramboory-purple-900 via-indigo-900 to-black"
    >
      {/* Background video/image container */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/50" />
        {/* You can add a background video or image here */}
          <div className="absolute inset-0 bg-gradient-to-br from-tramboory-purple-900/80 via-indigo-900/60 to-black/80" />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Decorative elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Animated background elements */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-tramboory-yellow-400/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-tramboory-purple-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2,
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/5 to-tramboory-purple-500/5 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * Home Layout Component
 * 
 * This component provides the main layout structure for the home feature.
 * It includes the HomeProvider for context management and applies consistent
 * styling and animations across the home sections.
 * 
 * Features:
 * - Automatic loading state handling
 * - Error boundary with retry functionality
 * - Responsive background animations
 * - Context provider integration
 */
export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <HomeProvider>
      <HomeLayoutContent>
        {children}
      </HomeLayoutContent>
    </HomeProvider>
  )
}
