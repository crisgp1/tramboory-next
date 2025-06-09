'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { FiCamera, FiArrowRight, FiImage, FiPlus, FiHeart, FiChevronLeft, FiChevronRight, FiGift, FiClock } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

// ============================================================================
// INTERFACES Y TIPOS DE DOMINIO
// ============================================================================

interface GallerySectionProps {
  carouselImages: string[]
}

interface PromotionsSectionProps {
  promocionesImages: string[]
}

// ============================================================================
// GALLERY SECTION CON SISTEMA DE BLUR UNIFICADO
// ============================================================================

/**
 * GallerySection - Sistema de Blur Tramboory Implementado
 * 
 * ### Arquitectura Visual Optimizada:
 * - **Overlay OKLCH**: Gradiente púrpura con zona opaca expandida
 * - **Transiciones Suaves**: 2% - 20% - 90% - 100% para máxima cohesión
 * - **Performance GPU**: Elementos optimizados para renderizado acelerado
 * - **Coherencia Cromática**: Eliminación total de tonos azules conflictivos
 */
export function GallerySection({ carouselImages }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  // Parallax scroll effects optimizados
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Activación de animaciones optimizada
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Validación de contenido
  if (!carouselImages || carouselImages.length === 0) {
    return null
  }
  
  // Sistema de navegación de galería
  const scrollToImage = (index: number) => {
    setSelectedImage(index)
    
    if (galleryRef.current) {
      const scrollAmount = index * 320
      galleryRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  
  // Variantes de animación estandarizadas
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }
  
  const galleryContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }),
    hover: { 
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    selected: {
      scale: 1.1,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 z-30 overflow-hidden"
    >
      {/* ✅ OVERLAY TRAMBOORY - ARQUITECTURA VISUAL UNIFICADA */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 0.5%,
            oklch(43.8% 0.218 303.724 / 0.65) 13%,
            oklch(43.8% 0.218 303.724 / 0.65) 95%,
            transparent 100.5%
          )`
        }} 
      />
      
      {/* Elementos decorativos optimizados con GPU acceleration */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -top-40 right-[20%] w-[30rem] h-[30rem] rounded-full blur-[100px] 
          bg-gradient-to-br from-tramboory-purple-500/15 to-tramboory-purple-700/8 pointer-events-none"
      />
      
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -bottom-20 left-[10%] w-[25rem] h-[25rem] rounded-full blur-[80px] 
          bg-gradient-to-tr from-tramboory-yellow-500/10 to-pink-500/5 pointer-events-none"
      />
      
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          {/* Badge de título con efectos mejorados */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <span className="group relative px-5 py-2 rounded-full text-sm font-medium 
              bg-tramboory-purple-500/20 
              text-tramboory-yellow-300 border border-tramboory-purple-500/30 backdrop-blur-sm 
              hover:border-tramboory-yellow-400/50 transition-all duration-300 inline-flex items-center gap-2">
              <FiImage className="text-tramboory-yellow-300" />
              <span>Momentos para recordar</span>
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
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-funhouse">
            <span className="relative inline-block">
              Nuestra
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500 ml-3">
                Galería
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-tramboory-yellow-300/0 via-tramboory-yellow-400 to-tramboory-yellow-300/0"
                animate={{ 
                  scaleX: [0, 1, 0],
                  x: [-100, 0, 100]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conoce nuestras instalaciones y algunos de los momentos mágicos que hemos creado
            para cientos de familias
          </p>
        </motion.div>

        {/* Sistema de navegación por puntos */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {carouselImages.slice(0, 5).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImage === index 
                    ? 'bg-tramboory-yellow-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
            {carouselImages.length > 5 && (
              <div className="text-white/50 text-xs flex items-center pl-2">
                +{carouselImages.length - 5} más
              </div>
            )}
          </div>
        </div>

        <motion.div
          variants={galleryContainerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16 overflow-hidden"
        >
          {/* Galería de imágenes con efectos avanzados */}
          <div 
            ref={galleryRef}
            className="flex overflow-x-auto py-8 px-4 hide-scrollbar snap-x snap-mandatory" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {carouselImages.map((imageUrl, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={imageVariants}
                whileHover="hover"
                animate={selectedImage === index ? "selected" : "visible"}
                onClick={() => setSelectedImage(index)}
                className={`relative min-w-[320px] h-[450px] mx-4 rounded-xl overflow-hidden flex-shrink-0 snap-center
                  shadow-xl transform transition-all duration-500 group cursor-pointer
                  border-2 ${selectedImage === index ? 'border-tramboory-yellow-400/70' : 'border-white/10 hover:border-white/30'}`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={`Imagen de galería ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="transition-transform duration-700 group-hover:scale-110"
                    quality={90}
                    priority={index === 0}
                  />
                  
                  {/* Sistema de overlays graduales - SIN GRADIENTE AZULADO */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-tramboory-purple-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Numeración de imagen */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md 
                    flex items-center justify-center text-white text-sm font-medium border border-white/20">
                    {index + 1}
                  </div>
                  
                  {/* Overlay de información interactivo */}
                  <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-3">
                      <div className="bg-tramboory-yellow-400/90 text-tramboory-purple-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Tramboory
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
                      >
                        <FiHeart className="text-pink-400" />
                      </motion.button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Momentos mágicos
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Celebraciones inolvidables en nuestras instalaciones.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/30
                        text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center"
                    >
                      <FiPlus className="mr-1" />
                      Ver más detalles
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call-to-Action mejorado */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span className="absolute -inset-1 bg-gradient-to-r from-tramboory-yellow-400/30 to-tramboory-purple-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Link
              href={{
                pathname: '/galeria'
              }}
              className="relative flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white 
                rounded-full font-bold text-lg border-2 border-tramboory-yellow-400/30 hover:border-tramboory-yellow-400/50 
                hover:bg-white/20 transition-all duration-300 shadow-lg z-10"
            >
              <FiCamera className="mr-2 text-tramboory-yellow-400" />
              Ver Galería Completa
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Información adicional */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Explora más de 100 imágenes de nuestros eventos y celebraciones
        </p>
      </div>
    </section>
  )
}

// ============================================================================
// PROMOTIONS SECTION CON SISTEMA DE BLUR UNIFICADO
// ============================================================================

/**
 * PromotionsSection - Sistema de Blur Tramboory Implementado
 * 
 * ### Arquitectura de Efectos Visuales:
 * - **Overlay OKLCH Unificado**: Consistencia con ServicesSection
 * - **Carrusel Interactivo**: Navegación fluida con animaciones GPU
 * - **Elementos Decorativos**: Blur estratificado para profundidad visual
 * - **Performance Optimizada**: willChange y transform3d para renderizado acelerado
 */
export function PromotionsSection({ promocionesImages }: PromotionsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Activación de animaciones optimizada
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  // Sistema de navegación de carrusel
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = 320
    const currentScroll = carouselRef.current.scrollLeft
    
    carouselRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    })
  }

  // Variantes de animación estandarizadas
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

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.5 }
    }
  }

  // Validación de contenido
  if (!promocionesImages || promocionesImages.length === 0) {
    return null
  }

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 z-30 overflow-hidden"
    >
      {/* ✅ OVERLAY TRAMBOORY - ARQUITECTURA VISUAL UNIFICADA */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent 2%,
            oklch(43.8% 0.218 303.724 / 0.65) 20%,
            oklch(43.8% 0.218 303.724 / 0.65) 90%,
            transparent 100%
          )`
        }} 
      />
      
      {/* Elementos decorativos con blur optimizado */}
      <motion.div 
        className="absolute -bottom-32 -left-32 w-64 h-64 bg-tramboory-yellow-400/8 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      />
      <motion.div 
        className="absolute -top-32 -right-32 w-80 h-80 bg-tramboory-purple-500/8 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ 
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Elemento atmosférico adicional */}
      <motion.div 
        className="absolute top-1/4 left-1/3 w-40 h-40 bg-tramboory-yellow-300/5 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 20, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto relative z-10">
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
            <FiGift className="text-tramboory-yellow-400 text-3xl mr-3" />
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
          className="h-0.5 w-32 mx-auto mb-16 bg-gradient-to-r from-transparent via-tramboory-yellow-400 to-transparent backdrop-blur-sm"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        <div className="relative">
          {/* Botones de navegación con backdrop blur mejorado */}
          <motion.button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-4 rounded-full text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300 -ml-4 md:ml-2
              border border-white/20 hover:border-white/40 shadow-xl shadow-black/20
              hover:backdrop-blur-lg"
            whileHover={{ 
              scale: 1.1, 
              x: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Anterior promoción"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)' 
            }}
          >
            <FiChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-4 rounded-full text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300 -mr-4 md:mr-2
              border border-white/20 hover:border-white/40 shadow-xl shadow-black/20
              hover:backdrop-blur-lg"
            whileHover={{ 
              scale: 1.1, 
              x: 5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Siguiente promoción"
            style={{ 
              willChange: 'transform',
              transform: 'translateZ(0)' 
            }}
          >
            <FiChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Carrusel con efectos de blur en tarjetas */}
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
                  border-2 border-white/15 hover:border-tramboory-yellow-400/60
                  backdrop-blur-sm hover:backdrop-blur-md"
                variants={itemVariants}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  scale: 1.02
                }}
                style={{ 
                  willChange: 'transform',
                  transform: 'translateZ(0)' 
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
                  
                  {/* Sistema de overlays con gradiente y blur - SIN TONALIDADES AZULADAS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-tramboory-purple-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm" />
                  
                  {/* Badge con backdrop blur */}
                  <div className="absolute top-4 right-4 flex items-center bg-tramboory-yellow-400/90 backdrop-blur-sm text-tramboory-purple-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-tramboory-yellow-500/30">
                    <FiClock className="mr-1" />
                    <span>Tiempo Limitado</span>
                  </div>
                  
                  {/* Contenido con elementos blur */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-tramboory-yellow-400/95 backdrop-blur-sm text-tramboory-purple-900 px-4 py-2 rounded-lg text-sm font-bold inline-block mb-3 shadow-lg border border-tramboory-yellow-500/30">
                      Oferta Especial
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-funhouse drop-shadow-lg">
                      Promoción {index + 1}
                    </h3>
                    <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm">
                      Aprovecha esta oferta por tiempo limitado para celebrar con los mejores precios.
                    </p>
                    
                    {/* Botón CTA con backdrop blur avanzado */}
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-white/15 backdrop-blur-md rounded-lg border border-white/40
                        text-white hover:bg-white/25 hover:backdrop-blur-lg transition-all duration-300 text-sm font-medium
                        shadow-lg hover:shadow-xl"
                      style={{ 
                        willChange: 'transform',
                        transform: 'translateZ(0)' 
                      }}
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