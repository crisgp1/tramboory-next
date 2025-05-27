'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { 
  FiArrowRight, 
  FiCheck, 
  FiStar, 
  FiPackage, 
  FiShield, 
  FiTrendingUp 
} from 'react-icons/fi'

interface ServiceFeature {
  title: string
  description: string
  icon: React.ElementType
}

interface ServicePackage {
  title: string
  description: string
  price: string
  features: ServiceFeature[]
  highlights: string[]
  recommended: boolean
}

interface ServicesSectionProps {
  services: {
    normal: ServicePackage
    matutino: ServicePackage
    [key: string]: ServicePackage
  }
}

/**
 * Services section with package cards and advanced animations
 * 
 * Features:
 * - Responsive service package cards
 * - Hover effects and interactive elements
 * - Scroll-triggered animations
 * - Decorative backgrounds and gradients
 * - Highlights and feature lists
 */
export function ServicesSection({ services }: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, -150])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }
  
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }
  
  // Animation for features
  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.2 + (custom * 0.1),
        duration: 0.5 
      }
    }),
    hover: { 
      scale: 1.05,
      x: 5,
      transition: { duration: 0.2 }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-28 relative z-10 overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute -top-40 right-[10%] w-[35rem] h-[35rem] rounded-full blur-[100px] 
          bg-gradient-to-br from-tramboory-purple-500/10 to-indigo-600/5 pointer-events-none"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity }}
        className="absolute -bottom-20 -left-20 w-[25rem] h-[25rem] rounded-full blur-[100px] 
          bg-gradient-to-tr from-tramboory-yellow-500/10 to-tramboory-purple-500/5 pointer-events-none"
      />
      
      {/* Animated dot pattern */}
      <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
          {/* Title badge */}
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
              <FiPackage className="text-tramboory-yellow-300" />
              <span>Opciones para cada necesidad</span>
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
              Nuestros
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500 ml-3">
                Paquetes
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
            Elige la opción que mejor se adapte a tus necesidades y presupuesto 
            para crear una celebración perfecta
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto relative"
          variants={cardContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Decorative connection element */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32
              bg-gradient-to-r from-tramboory-yellow-400/5 to-tramboory-purple-500/5 rounded-full blur-xl hidden lg:block"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Normal Package */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredCard('normal')}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
              transition-all duration-500
              ${services.normal.recommended ? 'border-4 border-tramboory-yellow-400/70 shadow-xl shadow-tramboory-yellow-400/20' : 'border border-white/20'}`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-tramboory-yellow-400/5 via-transparent to-tramboory-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Recommended tag */}
            {services.normal.recommended && (
              <div className="absolute top-0 right-0 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 text-tramboory-purple-900 py-1 px-4 font-bold text-sm rotate-45 translate-x-[18px] translate-y-[10px] shadow-lg">
                    Recomendado
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-400 rotate-45 translate-x-[18px] translate-y-[10px] blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            )}
            
            <div className="p-10 relative z-10">
              {/* Title and description */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <FiStar className="text-tramboory-yellow-400 mr-3 text-2xl" />
                  <h3 className="text-3xl font-bold text-white font-funhouse">{services.normal.title}</h3>
                </div>
                <p className="text-gray-300 text-lg">{services.normal.description}</p>
              </div>
              
              {/* Price */}
              <div className="mb-8 bg-white/10 p-4 rounded-xl border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-tramboory-yellow-400/10 to-tramboory-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-5xl font-bold text-white">${services.normal.price}</span>
                <span className="text-gray-400 ml-2 text-lg">/evento</span>
                <div className="mt-2 text-gray-300 text-sm">Todo incluido, sin costos adicionales</div>
              </div>
              
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {services.normal.highlights.map((highlight, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-gradient-to-r from-tramboory-yellow-400/30 to-tramboory-yellow-500/20 text-tramboory-yellow-300 px-4 py-1 rounded-full text-sm font-medium
                      border border-tramboory-yellow-400/20 shadow-sm backdrop-blur-sm"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-10">
                {services.normal.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={featureVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <div className="mt-1 mr-4 bg-gradient-to-br from-green-400/30 to-green-500/20 p-2 rounded-full border border-green-400/30">
                      <FiCheck className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href={{
                    pathname: '/reservas'
                  }}
                  className="block w-full py-4 px-6 text-center bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500
                    text-tramboory-purple-900 rounded-xl font-bold text-lg shadow-xl
                    hover:shadow-tramboory-yellow-400/30 hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600
                    transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-tramboory-yellow-300/0 via-tramboory-yellow-300/30 to-tramboory-yellow-300/0"
                    animate={{ 
                      x: ['-100%', '200%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Reservar Ahora
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
            </div>
            
            {/* Animated gradient border on hover */}
            <motion.div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: hoveredCard === 'normal' 
                  ? "0 0 25px 2px rgba(250, 204, 21, 0.2)" 
                  : "0 0 0px 0px rgba(250, 204, 21, 0)"
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          
          {/* Matutino Package */}
          <motion.div
            variants={cardVariants}
            onMouseEnter={() => setHoveredCard('matutino')}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
              transition-all duration-500
              ${services.matutino.recommended ? 'border-4 border-tramboory-yellow-400/70 shadow-xl shadow-tramboory-yellow-400/20' : 'border border-white/20'}`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-tramboory-purple-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Recommended tag */}
            {services.matutino.recommended && (
              <div className="absolute top-0 right-0 z-10">
                <div className="relative">
                  <div className="bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 text-tramboory-purple-900 py-1 px-4 font-bold text-sm rotate-45 translate-x-[18px] translate-y-[10px] shadow-lg">
                    Recomendado
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-400 rotate-45 translate-x-[18px] translate-y-[10px] blur-sm"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            )}
            
            <div className="p-10 relative z-10">
              {/* Title and description */}
              <div className="mb-8">
                <div className="flex items-center mb-3">
                  <FiShield className="text-tramboory-purple-400 mr-3 text-2xl" />
                  <h3 className="text-3xl font-bold text-white font-funhouse">{services.matutino.title}</h3>
                </div>
                <p className="text-gray-300 text-lg">{services.matutino.description}</p>
              </div>
              
              {/* Price */}
              <div className="mb-8 bg-white/10 p-4 rounded-xl border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-tramboory-purple-400/10 to-tramboory-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-5xl font-bold text-white">${services.matutino.price}</span>
                <span className="text-gray-400 ml-2 text-lg">/evento</span>
                <div className="mt-2 text-gray-300 text-sm">Opción económica para tu celebración</div>
              </div>
              
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {services.matutino.highlights.map((highlight, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-gradient-to-r from-tramboory-purple-400/30 to-tramboory-purple-500/20 text-tramboory-purple-300 px-4 py-1 rounded-full text-sm font-medium
                      border border-tramboory-purple-400/20 shadow-sm backdrop-blur-sm"
                  >
                    {highlight}
                  </motion.span>
                ))}
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-10">
                {services.matutino.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    variants={featureVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <div className="mt-1 mr-4 bg-gradient-to-br from-green-400/30 to-green-500/20 p-2 rounded-full border border-green-400/30">
                      <FiCheck className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href={{
                    pathname: '/reservas'
                  }}
                  className="block w-full py-4 px-6 text-center bg-gradient-to-r from-tramboory-purple-500 to-tramboory-purple-600
                    text-white rounded-xl font-bold text-lg shadow-xl
                    hover:shadow-tramboory-purple-500/30 hover:from-tramboory-purple-600 hover:to-tramboory-purple-700
                    transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-tramboory-purple-300/0 via-tramboory-purple-300/20 to-tramboory-purple-300/0"
                    animate={{ 
                      x: ['-100%', '200%'],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Reservar Ahora
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
            </div>
            
            {/* Animated gradient border on hover */}
            <motion.div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: hoveredCard === 'matutino' 
                  ? "0 0 25px 2px rgba(168, 85, 247, 0.2)" 
                  : "0 0 0px 0px rgba(168, 85, 247, 0)"
              }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link 
              href={{
                pathname: '/cotizaciones'
              }}
              className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-lg border border-white/30
                text-white rounded-lg font-semibold
                hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <FiTrendingUp className="mr-2 text-tramboory-yellow-400" />
              <span className="relative z-10">Ver más detalles de nuestros paquetes</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          
          <p className="text-gray-400 mt-4 text-sm">
            ¿Necesitas algo personalizado? <a href="#contact" className="text-tramboory-yellow-400 hover:underline">Contáctanos</a> para opciones especiales
          </p>
        </motion.div>
      </div>
    </section>
  )
}