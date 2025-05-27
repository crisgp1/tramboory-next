'use client'

import { motion } from 'framer-motion'
import { FiCamera, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

interface GallerySectionProps {
  carouselImages: string[]
}

export default function GallerySection({ carouselImages }: GallerySectionProps) {
  // Skip rendering if there are no carousel images
  if (!carouselImages || carouselImages.length === 0) {
    return null
  }

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-funhouse">
            Nuestra Galería
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conoce nuestras instalaciones y algunos de los momentos mágicos que hemos creado
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Simple image gallery using local images */}
          <div className="flex overflow-x-auto py-4 px-4 hide-scrollbar snap-x snap-mandatory" 
               style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {carouselImages.map((imageUrl, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] h-[450px] mx-4 rounded-xl overflow-hidden flex-shrink-0 snap-center
                  shadow-xl transform transition-all duration-300 hover:scale-[1.02]
                  border-2 border-white/10 hover:border-yellow-400/50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={imageUrl}
                    alt={`Imagen de galería ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/galeria"
              className="flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white 
                rounded-full font-bold text-lg border-2 border-yellow-400/30 hover:bg-white/20
                transition-all duration-300"
            >
              <FiCamera className="mr-2" />
              Ver Galería Completa
              <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
    </section>
  )
}