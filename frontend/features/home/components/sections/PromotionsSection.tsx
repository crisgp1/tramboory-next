'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'

interface PromotionsSectionProps {
  promocionesImages: string[]
}

export default function PromotionsSection({ promocionesImages }: PromotionsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = 320 // Approximate width of a card + margin
    const currentScroll = carouselRef.current.scrollLeft
    
    carouselRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    })
  }

  // Skip rendering if there are no promotion images
  if (!promocionesImages || promocionesImages.length === 0) {
    return null
  }

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-funhouse">
            Promociones del Mes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Aprovecha nuestras ofertas especiales y celebra a lo grande
          </p>
        </motion.div>

        <div className="relative">
          {/* Carousel Navigation Buttons */}
          <button 
            onClick={() => scrollCarousel('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-3 rounded-full text-white
              hover:bg-white/20 transition-all duration-300 -ml-4 md:ml-2"
            aria-label="Anterior promoción"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scrollCarousel('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10
              bg-white/10 backdrop-blur-md p-3 rounded-full text-white
              hover:bg-white/20 transition-all duration-300 -mr-4 md:mr-2"
            aria-label="Siguiente promoción"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto py-4 px-4 hide-scrollbar snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {promocionesImages.map((imageUrl, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] h-[400px] mx-4 rounded-xl overflow-hidden flex-shrink-0 snap-center
                  shadow-xl transform transition-all duration-300 hover:scale-[1.02]
                  border-2 border-white/10 hover:border-yellow-400/50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Promoción ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">
                      Oferta Especial
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">
                      Promoción {index + 1}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}