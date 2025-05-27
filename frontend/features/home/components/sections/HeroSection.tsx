'use client'

import { RefObject } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import Link from 'next/link'

interface HeroSectionProps {
  sectionRefs: {
    hero: RefObject<HTMLElement>
    content: RefObject<HTMLElement>
    video: RefObject<HTMLVideoElement>
  }
}

export default function HeroSection({ sectionRefs }: HeroSectionProps) {
  const scrollToContent = () => {
    if (sectionRefs.content.current) {
      window.scrollTo({
        top: window.innerHeight * 0.8,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section 
      ref={sectionRefs.hero}
      className="relative min-h-screen flex items-center justify-center text-white pt-24 pb-12"
    >
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-funhouse mb-6">
            <span className="block">Bienvenidos a</span>
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
              Tramboory
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Donde los sueños de tus pequeños se convierten en celebraciones inolvidables
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link 
            href="/reservas"
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500
              text-purple-900 rounded-lg font-bold text-lg shadow-xl
              hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
          >
            Reserva Ahora
          </Link>
          <Link 
            href="/about"
            className="px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/30
              text-white rounded-lg font-bold text-lg
              hover:bg-white/20 transition-all duration-300"
          >
            Conócenos
          </Link>
        </motion.div>

        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 
            w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center
            border border-white/30 hover:bg-white/20 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ y: 5 }}
        >
          <FiArrowDown className="text-white text-2xl animate-bounce" />
        </motion.button>
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />
    </section>
  )
}