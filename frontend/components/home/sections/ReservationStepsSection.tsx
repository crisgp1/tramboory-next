'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  FiCalendar, 
  FiDollarSign, 
  FiCheck, 
  FiSmile,
  FiArrowRight,
  FiClock
} from 'react-icons/fi'
import Link from 'next/link'

/**
 * Sección de pasos para reservar con animaciones avanzadas y efectos visuales mejorados
 */
export function ReservationStepsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Efectos de parallax basados en scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Activar animaciones cuando la sección está en vista
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Pasos para la reservación mejorados con iconos y colores
  const steps = [
    {
      icon: FiCalendar,
      title: "Selecciona tu Fecha",
      description: "Consulta nuestro calendario de disponibilidad y elige el día perfecto para tu celebración especial.",
      color: "from-tramboory-purple-500 to-tramboory-purple-900",
      highlight: "Fechas Disponibles",
      bgGlow: "bg-tramboory-purple-500/20"
    },
    {
      icon: FiDollarSign,
      title: "Elige tu Paquete",
      description: "Contamos con diferentes opciones para ajustarnos a tus necesidades y presupuesto con todo incluido.",
      color: "from-pink-400 to-pink-600",
      highlight: "Opciones Flexibles",
      bgGlow: "bg-pink-500/20"
    },
    {
      icon: FiCheck,
      title: "Confirma tu Reserva",
      description: "Realiza tu pago inicial para asegurar la fecha y comenzar la planificación de tu evento soñado.",
      color: "from-blue-400 to-blue-600",
      highlight: "Proceso Simple",
      bgGlow: "bg-blue-500/20"
    },
    {
      icon: FiSmile,
      title: "¡Disfruta tu Evento!",
      description: "Déjanos encargarnos de todo mientras tú y tus invitados viven una experiencia mágica e inolvidable.",
      color: "from-tramboory-yellow-400 to-tramboory-yellow-500",
      highlight: "Momentos Mágicos",
      bgGlow: "bg-tramboory-yellow-400/20"
    }
  ]

  // Variantes para animaciones
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    }
  }
  
  const stepsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }
  
  const stepCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10, 
        duration: 0.5 
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-28 relative z-10 overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -top-40 -right-40 w-[30rem] h-[30rem] rounded-full blur-[80px] bg-tramboory-purple-500/5 pointer-events-none"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute -bottom-20 -left-40 w-[25rem] h-[25rem] rounded-full blur-[70px] bg-tramboory-yellow-400/5 pointer-events-none"
      />
      
      {/* Patrón de líneas decorativas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-pattern"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-20"
        >
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
              <FiClock className="text-tramboory-yellow-400" />
              <span>Proceso sencillo y rápido</span>
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
              <span>¿Cómo </span>
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 ml-2">
                Reservar
              </span>
              <span>?</span>
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
            Celebrar en Tramboory es muy sencillo, sigue estos 4 pasos y estarás 
            listo para vivir una experiencia inolvidable
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          variants={stepsContainerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Línea de conexión entre tarjetas */}
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-tramboory-purple-500/30 via-pink-500/30 to-tramboory-yellow-400/30 hidden lg:block"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepCardVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.3 } 
              }}
              className="relative z-10"
            >
              {/* Tarjeta de paso mejorada */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 
                hover:border-white/40 transition-all duration-500 h-full flex flex-col
                hover:bg-white/15 group shadow-xl">
                
                {/* Círculo de icono flotante con animación */}
                <div className="relative mb-8">
                  <motion.div 
                    className={`absolute -inset-3 rounded-full ${step.bgGlow} blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center
                    bg-gradient-to-r ${step.color} relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <step.icon className="text-2xl text-white" />
                  </div>
                </div>
                
                {/* Badge de característica destacada */}
                <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/30 
                  text-white text-xs font-medium mb-3 group-hover:bg-white/20 transition-colors duration-500">
                  {step.highlight}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 font-funhouse">{step.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{step.description}</p>
                
                {/* Flechas de conexión mejoradas */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/3 right-0 transform translate-x-1/2 items-center justify-center z-20">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-tramboory-purple-500/20 to-indigo-500/20 
                        backdrop-blur-md flex items-center justify-center border border-white/20"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <FiArrowRight className="w-5 h-5 text-tramboory-yellow-400" />
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Número de paso flotante */}
              <motion.div 
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 
                  flex items-center justify-center text-tramboory-purple-900 font-bold text-lg shadow-lg z-20"
                whileHover={{ 
                  scale: 1.2,
                  rotate: 10, 
                  transition: { duration: 0.3 } 
                }}
              >
                {index + 1}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA mejorado */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block group"
          >
            <span className="absolute -inset-1 bg-gradient-to-r from-tramboory-yellow-400/80 to-tramboory-yellow-500/80 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Link 
              href="/reservas"
              className="relative inline-flex items-center px-10 py-4 bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500
                text-tramboory-purple-900 rounded-xl font-extrabold text-xl shadow-2xl
                hover:shadow-tramboory-yellow-400/40 hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-500
                transition-all duration-300 group-hover:text-tramboory-purple-900"
            >
              Reservar Ahora
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          
          <p className="text-gray-400 mt-4 text-sm">
            Sin compromisos - Agenda una llamada con nosotros para más información
          </p>
        </motion.div>
      </div>
    </section>
  )
}