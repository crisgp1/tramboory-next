'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiGift, FiClock } from 'react-icons/fi'
import Image from 'next/image'

interface PromotionsSectionProps {
  promocionesImages: string[]
}

/**
 * Sección de promociones con carrusel avanzado y efectos visuales mejorados
 */
export default function PromotionsSection({ promocionesImages }: PromotionsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Animación de entrada al scrollear a la sección
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = 320 // Ancho aproximado de tarjeta + margen
    const currentScroll = carouselRef.current.scrollLeft
    
    carouselRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    })
  }

  // Variantes de animación para elementos del carrusel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  // Animación del fondo
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  }

  // Skip rendering if there are no promotion images
  if (!promocionesImages || promocionesImages.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative z-10 overflow-hidden"
    >
      {/* Fondo decorativo animado */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/10 via-indigo-900/20 to-purple-900/10"
        variants={backgroundVariants}
        initial="hidden"
        animate={controls}
      />
      
      {/* Círculos decorativos */}
      <motion.div 
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -top-32 -right-32 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <div className="container mx-auto px-6">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8 }
            }
          }}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <FiGift className="text-yellow-400 text-3xl mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white font-funhouse">
              Promociones del Mes
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aprovecha nuestras ofertas especiales y celebra a lo grande con descuentos exclusivos
          </p>
        </motion.div>

        {/* Línea decorativa con gradiente */}
        <motion.div 
          className="h-0.5 w-32 mx-auto mb-16 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <div className="relative">
          {/* Carousel Navigation Buttons - Mejorados */}
          <motion.button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-4 rounded-full text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300 -ml-4 md:ml-2
              border border-white/10 hover:border-white/30 shadow-lg"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Anterior promoción"
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-4 rounded-full text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300 -mr-4 md:mr-2
              border border-white/10 hover:border-white/30 shadow-lg"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Siguiente promoción"
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Carousel Container - Mejorado */}
          <motion.div 
            ref={carouselRef}
            className="flex overflow-x-auto py-8 px-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {promocionesImages.map((imageUrl, index) => (
              <motion.div
                key={index}
                className="min-w-[320px] h-[420px] mx-4 rounded-2xl overflow-hidden flex-shrink-0 snap-center
                  shadow-2xl transform transition-all duration-500 group relative
                  border-2 border-white/10 hover:border-yellow-400/50"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Promoción ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                  />
                  
                  {/* Overlay con gradiente mejorado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Badge flotante para tiempo limitado */}
                  <div className="absolute top-4 right-4 flex items-center bg-yellow-400/90 text-purple-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    <FiClock className="mr-1" />
                    <span>Tiempo Limitado</span>
                  </div>
                  
                  {/* Contenido de la tarjeta */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-bold inline-block mb-3 shadow-lg">
                      Oferta Especial
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-funhouse">
                      Promoción {index + 1}
                    </h3>
                    <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Aprovecha esta oferta por tiempo limitado para celebrar con los mejores precios.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/30
                        text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                    >
                      Ver detalles
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}