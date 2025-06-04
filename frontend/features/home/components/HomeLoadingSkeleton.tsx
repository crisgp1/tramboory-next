'use client'

import { motion } from 'framer-motion'

/**
 * HomeLoadingSkeleton - Loading state component for the home feature
 * 
 * Features:
 * - Skeleton loaders that match the home section structure
 * - Smooth shimmer animations
 * - Responsive design
 * - Tramboory theme colors
 * - Performance optimized animations
 */
export function HomeLoadingSkeleton() {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'linear'
      }
    }
  }

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut'
      }
    }
  }

  const SkeletonCard = ({ className = "", children }: { className?: string, children?: React.ReactNode }) => (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate="animate"
      className={`relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 ${className}`}
    >
      {children}
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </motion.div>
  )

  const SkeletonLine = ({ width = "100%", height = "h-4" }: { width?: string, height?: string }) => (
    <SkeletonCard className={`${height} ${width === "100%" ? "w-full" : `w-${width}`}`} />
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-tramboory-purple-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -top-40 right-[10%] w-[35rem] h-[35rem] rounded-full blur-[100px] 
          bg-gradient-to-br from-tramboory-purple-500/20 to-indigo-600/10 pointer-events-none"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
        className="absolute -bottom-20 -left-20 w-[25rem] h-[25rem] rounded-full blur-[80px] 
          bg-gradient-to-tr from-tramboory-yellow-500/20 to-pink-500/10 pointer-events-none"
      />

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Hero Section Skeleton */}
        <motion.section 
          className="min-h-screen flex flex-col justify-center items-center text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome badge skeleton */}
            <SkeletonCard className="h-10 w-64 mx-auto" />
            
            {/* Main title skeleton */}
            <div className="space-y-4">
              <SkeletonCard className="h-16 w-full max-w-3xl mx-auto" />
              <SkeletonCard className="h-16 w-5/6 mx-auto" />
            </div>
            
            {/* Subtitle skeleton */}
            <div className="space-y-3">
              <SkeletonCard className="h-6 w-4/5 mx-auto" />
              <SkeletonCard className="h-6 w-3/4 mx-auto" />
            </div>
            
            {/* CTA buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <SkeletonCard className="h-14 w-48" />
              <SkeletonCard className="h-14 w-40" />
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-tramboory-yellow-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.section>

        {/* Features Section Skeleton */}
        <motion.section 
          className="py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-20">
            <SkeletonCard className="h-8 w-48 mx-auto mb-8" />
            <SkeletonCard className="h-12 w-96 mx-auto mb-6" />
            <div className="space-y-2">
              <SkeletonCard className="h-5 w-3/4 mx-auto" />
              <SkeletonCard className="h-5 w-2/3 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <SkeletonCard className="p-8 h-80">
                  <div className="space-y-6">
                    {/* Icon skeleton */}
                    <SkeletonCard className="w-16 h-16 rounded-full" />
                    
                    {/* Title skeleton */}
                    <SkeletonCard className="h-6 w-3/4" />
                    
                    {/* Description skeleton */}
                    <div className="space-y-2">
                      <SkeletonCard className="h-4 w-full" />
                      <SkeletonCard className="h-4 w-5/6" />
                      <SkeletonCard className="h-4 w-4/5" />
                    </div>
                  </div>
                </SkeletonCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Section Skeleton */}
        <motion.section 
          className="py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-20">
            <SkeletonCard className="h-8 w-40 mx-auto mb-8" />
            <SkeletonCard className="h-12 w-80 mx-auto mb-6" />
            <div className="space-y-2">
              <SkeletonCard className="h-5 w-2/3 mx-auto" />
              <SkeletonCard className="h-5 w-1/2 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {Array.from({ length: 2 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
              >
                <SkeletonCard className="p-8 h-96">
                  <div className="space-y-6">
                    {/* Badge skeleton */}
                    <SkeletonCard className="h-6 w-24" />
                    
                    {/* Title and price skeleton */}
                    <div className="space-y-2">
                      <SkeletonCard className="h-8 w-48" />
                      <SkeletonCard className="h-10 w-32" />
                    </div>
                    
                    {/* Features list skeleton */}
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <div key={j} className="flex items-center space-x-3">
                          <SkeletonCard className="w-5 h-5 rounded-full" />
                          <SkeletonCard className="h-4 flex-1" />
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA button skeleton */}
                    <SkeletonCard className="h-12 w-full mt-8" />
                  </div>
                </SkeletonCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reservation Steps Section Skeleton */}
        <motion.section 
          className="py-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-20">
            <SkeletonCard className="h-8 w-56 mx-auto mb-8" />
            <SkeletonCard className="h-12 w-72 mx-auto mb-6" />
            <SkeletonCard className="h-5 w-3/5 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              >
                <SkeletonCard className="p-6 h-64 text-center">
                  <div className="space-y-4">
                    {/* Step number skeleton */}
                    <SkeletonCard className="w-12 h-12 rounded-full mx-auto" />
                    
                    {/* Title skeleton */}
                    <SkeletonCard className="h-6 w-24 mx-auto" />
                    
                    {/* Description skeleton */}
                    <div className="space-y-2">
                      <SkeletonCard className="h-4 w-full" />
                      <SkeletonCard className="h-4 w-5/6 mx-auto" />
                      <SkeletonCard className="h-4 w-4/5 mx-auto" />
                    </div>
                  </div>
                </SkeletonCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Loading indicator */}
      <motion.div
        className="fixed bottom-8 left-8 flex items-center space-x-3 bg-white/10 backdrop-blur-sm 
          px-4 py-2 rounded-full border border-white/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="w-4 h-4 bg-tramboory-yellow-400 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-white text-sm font-medium">Cargando experiencias mágicas...</span>
      </motion.div>
    </div>
  )
}

export default HomeLoadingSkeleton
