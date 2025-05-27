'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { FiCamera, FiArrowRight, FiImage, FiPlus, FiHeart } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'

interface GallerySectionProps {
  carouselImages: string[]
}

/**
 * Sección de galería con animaciones avanzadas y efectos visuales mejorados
 */
export default function GallerySection({ carouselImages }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Skip rendering if there are no carousel images
  if (!carouselImages || carouselImages.length === 0) {
    return null
  }
  
  // Manually scroll gallery with focus on selected image
  const scrollToImage = (index: number) => {
    setSelectedImage(index)
    
    if (galleryRef.current) {
      const scrollAmount = index * 320 // Approximate width of an image + margin
      galleryRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  
  // Animation variants
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
      className="py-28 relative z-10 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-purple-900/30 to-indigo-900/30 pointer-events-none" />
      
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -top-40 right-[20%] w-[30rem] h-[30rem] rounded-full blur-[100px] 
          bg-gradient-to-br from-purple-500/10 to-indigo-600/5 pointer-events-none"
      />
      
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -bottom-20 left-[10%] w-[25rem] h-[25rem] rounded-full blur-[80px] 
          bg-gradient-to-tr from-yellow-500/10 to-pink-500/5 pointer-events-none"
      />
      
      {/* Animated pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          {/* Badge de título */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <span className="group relative px-5 py-2 rounded-full text-sm font-medium 
              bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-purple-500/20 
              text-yellow-300 border border-purple-500/30 backdrop-blur-sm 
              hover:border-yellow-400/50 transition-all duration-300 inline-flex items-center gap-2">
              <FiImage className="text-yellow-300" />
              <span>Momentos para recordar</span>
              <motion.span 
                className="absolute inset-0 -z-10 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 rounded-full"
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
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 ml-3">
                Galería
              </span>
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300/0 via-yellow-400 to-yellow-300/0"
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

        {/* Gallery dots navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {carouselImages.slice(0, 5).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedImage === index 
                    ? 'bg-yellow-400 scale-125' 
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
          {/* Enhanced image gallery with effects */}
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
                  border-2 ${selectedImage === index ? 'border-yellow-400/70' : 'border-white/10 hover:border-white/30'}`}
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
                  />
                  
                  {/* Overlays con gradientes mejorados */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Número de imagen */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md 
                    flex items-center justify-center text-white text-sm font-medium border border-white/20">
                    {index + 1}
                  </div>
                  
                  {/* Overlay de información */}
                  <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-center mb-3">
                      <div className="bg-yellow-400/90 text-purple-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
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

        {/* CTA mejorado */}
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
            <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-purple-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Link
              href="/galeria"
              className="relative flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white 
                rounded-full font-bold text-lg border-2 border-yellow-400/30 hover:border-yellow-400/50 
                hover:bg-white/20 transition-all duration-300 shadow-lg z-10"
            >
              <FiCamera className="mr-2 text-yellow-400" />
              Ver Galería Completa
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Caption */}
        <p className="text-center text-gray-400 mt-6 text-sm">
          Explora más de 100 imágenes de nuestros eventos y celebraciones
        </p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
    </section>
  )
}