'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  FiStar, 
  FiSmile, 
  FiUsers, 
  FiShield, 
  FiMusic, 
  FiCoffee,
  FiHeart,
  FiArrowRight
} from 'react-icons/fi'
import Link from 'next/link'

/**
 * Sección de características con animaciones avanzadas y efectos visuales mejorados
 */
export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Features with enhanced data
  const features = [
    {
      icon: FiStar,
      title: 'Instalaciones de Primer Nivel',
      description: 'Contamos con un espacio amplio, seguro y moderno, diseñado específicamente para celebraciones infantiles y adaptado a todas las edades.',
      color: 'from-tramboory-yellow-400 to-tramboory-yellow-500',
      bgGlow: 'bg-tramboory-yellow-400/20',
      delay: 0
    },
    {
      icon: FiSmile,
      title: 'Diversión Garantizada',
      description: 'Juegos interactivos, actividades creativas y animación profesional para mantener a los pequeños entretenidos durante toda la celebración.',
      color: 'from-pink-400 to-pink-600',
      bgGlow: 'bg-pink-400/20',
      delay: 0.1
    },
    {
      icon: FiUsers,
      title: 'Equipo Profesional',
      description: 'Personal capacitado, amable y con experiencia que se encarga meticulosamente de cada detalle para que tú disfrutes sin preocupaciones.',
      color: 'from-tramboory-purple-500 to-tramboory-purple-900',
      bgGlow: 'bg-tramboory-purple-500/20',
      delay: 0.2
    },
    {
      icon: FiShield,
      title: 'Seguridad Total',
      description: 'Ambientes controlados y seguros con protocolos establecidos para que los niños jueguen y se diviertan sin ningún tipo de riesgo.',
      color: 'from-blue-400 to-blue-600',
      bgGlow: 'bg-blue-400/20',
      delay: 0.3
    },
    {
      icon: FiMusic,
      title: 'Ambiente Festivo',
      description: 'Música seleccionada, iluminación profesional y decoración temática que crean la atmósfera perfecta para una celebración mágica.',
      color: 'from-green-400 to-green-600',
      bgGlow: 'bg-green-400/20',
      delay: 0.4
    },
    {
      icon: FiCoffee,
      title: 'Gastronomía Deliciosa',
      description: 'Menús especiales preparados con ingredientes frescos para niños y adultos, con opciones para todos los gustos y necesidades dietéticas.',
      color: 'from-orange-400 to-orange-600',
      bgGlow: 'bg-orange-400/20',
      delay: 0.5
    }
  ]
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }
  
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: custom * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5 
      }
    }),
    hover: { 
      y: -15, 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }
  
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        yoyo: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5 
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="py-28 relative z-10 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tramboory-purple-900/30 to-tramboory-purple-900/40 pointer-events-none" />
      
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute -top-40 right-[10%] w-[35rem] h-[35rem] rounded-full blur-[120px] 
          bg-gradient-to-br from-tramboory-purple-500/10 to-indigo-600/5 pointer-events-none"
      />
      
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity }}
        className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full blur-[100px] 
          bg-gradient-to-tr from-tramboory-yellow-400/10 to-pink-500/5 pointer-events-none"
      />
      
      {/* Animated patterns and textures */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tramboory-purple-500/20 to-transparent" />
      
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
              bg-gradient-to-r from-tramboory-purple-500/20 via-indigo-500/20 to-tramboory-purple-500/20 
              text-tramboory-yellow-400 border border-tramboory-purple-500/30 backdrop-blur-sm 
              hover:border-tramboory-yellow-400/50 transition-all duration-300 inline-flex items-center gap-2">
              <FiHeart className="text-tramboory-yellow-400" />
              <span>Creamos experiencias mágicas</span>
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
              ¿Por Qué Elegir
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 ml-3">
                Tramboory
              </span>
              ?
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-tramboory-yellow-400/0 via-tramboory-yellow-400 to-tramboory-yellow-400/0"
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
            Somos expertos en crear experiencias mágicas e inolvidables para toda la familia,
            cuidando cada detalle de tu celebración
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={feature.delay}
              variants={featureCardVariants}
              whileHover="hover"
              className="feature-card"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 
                hover:border-white/40 hover:shadow-xl transition-all duration-500 h-full
                group relative overflow-hidden">
                
                {/* Background glow effect */}
                <div className={`absolute inset-0 ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Animated gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                {/* Icon container with animation */}
                <div className="relative z-10 mb-6">
                  <motion.div 
                    className={`absolute -inset-4 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${feature.bgGlow}`}
                  />
                  <motion.div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center
                      bg-gradient-to-r ${feature.color} relative shadow-lg`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <feature.icon className="text-2xl text-white" />
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4 font-funhouse group-hover:text-tramboory-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hidden detail arrow that appears on hover */}
                <motion.div 
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} 
                    flex items-center justify-center shadow-lg`}>
                    <FiArrowRight className="text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
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
              href={{ pathname: '/about' }}
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
              <span className="relative z-10">Conoce más sobre nosotros</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-tramboory-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />
    </section>
  )
}