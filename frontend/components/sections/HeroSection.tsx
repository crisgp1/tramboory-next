'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { FiCalendar, FiArrowDown, FiStar } from 'react-icons/fi'
import Link from 'next/link'

/**
 * Hero section with welcome message, title, and call-to-action buttons
 * Enhanced with advanced visual effects and parallax scrolling
 */
export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const controls = useAnimation()
  const { scrollY } = useScroll()
  
  // Advanced parallax effect based on scroll
  const yParallax = useTransform(scrollY, [0, 500], [0, -80])
  const opacityParallax = useTransform(scrollY, [0, 300], [1, 0])
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    })
  }
  
  useEffect(() => {
    // Sequentially animate decorative elements
    controls.start((i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3 * i, duration: 1.2, ease: "easeOut" }
    }))
  }, [controls])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circular gradients */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          custom={0}
          className="absolute -top-40 -right-40 w-[24rem] h-[24rem] bg-gradient-to-b from-tramboory-purple-500/10 to-transparent rounded-full blur-[50px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          custom={1}
          className="absolute top-1/3 left-10 w-32 h-32 bg-gradient-to-r from-tramboory-yellow-400/10 to-transparent rounded-full blur-[30px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={controls}
          custom={2}
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-t from-tramboory-purple-500/10 to-transparent rounded-full blur-[40px]"
        />
      </div>
      
      {/* Main content with parallax effect */}
      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 pt-24 pb-32 text-center relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          {/* Enhanced badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <span className="group relative px-5 py-2 rounded-full text-sm font-medium 
              bg-gradient-to-r from-tramboory-purple-500/20 via-indigo-500/20 to-tramboory-purple-500/20 
              text-tramboory-yellow-300 border border-tramboory-purple-500/30 backdrop-blur-sm 
              hover:border-tramboory-yellow-400/50 transition-all duration-300 inline-flex items-center gap-2">
              <FiStar className="text-tramboory-yellow-300 animate-pulse" />
              <span>El mejor salón de fiestas infantiles en Zapopan</span>
              <motion.span 
                className="absolute inset-0 -z-10 bg-gradient-to-r from-tramboory-yellow-400/0 via-tramboory-yellow-400/10 to-tramboory-yellow-400/0 rounded-full"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
            </span>
          </motion.div>
          
          {/* Enhanced main title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-funhouse leading-tight"
          >
            <span className="block relative">
              Celebra con{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient bg-clip-text text-transparent
                  bg-gradient-to-r from-tramboory-yellow-300 via-tramboory-yellow-400 to-tramboory-yellow-300 
                  transform hover:scale-105 transition-transform duration-500">
                  Tramboory
                </span>
                <motion.span 
                  className="absolute -inset-1 -z-10 bg-gradient-to-r from-tramboory-yellow-400/0 via-tramboory-yellow-400/20 to-tramboory-yellow-400/0 rounded-2xl blur-xl"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                />
              </span>
            </span>
          </motion.h1>
          
          {/* Enhanced subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-200 mb-14 max-w-3xl mx-auto leading-relaxed"
          >
            Tu salón de eventos infantiles en Zapopan con experiencias diseñadas
            para crear recuerdos inolvidables en el cumpleaños de tus pequeños.
          </motion.p>
          
          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <span className="absolute -inset-1 bg-gradient-to-r from-tramboory-yellow-400/80 to-tramboory-yellow-500/80 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Link
                href={{
                  pathname: '/reservas'
                }}
                className="relative px-10 py-5 bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500
                  text-tramboory-purple-900 rounded-xl font-extrabold text-xl shadow-2xl
                  hover:shadow-tramboory-yellow-400/40 hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600
                  transition-all duration-300 flex items-center group-hover:text-tramboory-purple-950"
              >
                <FiCalendar className="mr-2" />
                <span>Reserva tu fiesta</span>
              </Link>
            </motion.div>
            
            <Link 
              href={{
                pathname: '/nosotros'
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/30
                text-white rounded-lg font-bold text-lg
                hover:bg-white/20 transition-all duration-300"
            >
              Conócenos
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
          w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center
          border border-white/30 hover:bg-white/20 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        whileHover={{ y: 5 }}
        aria-label="Desplazarse hacia abajo"
      >
        <FiArrowDown className="text-white text-2xl animate-bounce" />
      </motion.button>

      {/* Gradient overlays for visual depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-tramboory-purple-900/20 to-tramboory-purple-900/10 mix-blend-overlay pointer-events-none" />
    </section>
  )
}