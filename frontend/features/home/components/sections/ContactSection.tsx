'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiMessageCircle,
  FiInstagram,
  FiFacebook,
  FiArrowRight,
  FiHelpCircle
} from 'react-icons/fi'

/**
 * Sección de contacto con animaciones avanzadas y efectos visuales mejorados
 */
export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Contact information with enhanced data
  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Ubicación",
      details: "Av. Patria 123, Zapopan, Jalisco",
      action: "Ver Mapa",
      url: "https://maps.google.com",
      color: "from-blue-400 to-blue-600",
      hoverColor: "from-blue-500 to-blue-700",
      glowColor: "blue-400/20",
      textColor: "text-blue-400",
      delay: 0
    },
    {
      icon: FiPhone,
      title: "Teléfono",
      details: "+52 33 3230 0243",
      action: "Llamar",
      url: "tel:+523332300243",
      color: "from-green-400 to-green-600",
      hoverColor: "from-green-500 to-green-700",
      glowColor: "green-400/20",
      textColor: "text-green-400",
      delay: 0.1
    },
    {
      icon: FiMail,
      title: "Correo",
      details: "info@tramboory.com",
      action: "Enviar Correo",
      url: "mailto:info@tramboory.com",
      color: "from-yellow-400 to-yellow-600",
      hoverColor: "from-yellow-500 to-yellow-700",
      glowColor: "yellow-400/20",
      textColor: "text-yellow-400",
      delay: 0.2
    },
    {
      icon: FiClock,
      title: "Horario",
      details: "Martes a Domingo: 10am - 8pm",
      action: "Ver Disponibilidad",
      url: "/reservas",
      color: "from-purple-400 to-purple-600",
      hoverColor: "from-purple-500 to-purple-700",
      glowColor: "purple-400/20",
      textColor: "text-purple-400",
      delay: 0.3
    },
  ]

  // Social media links enhanced
  const socialLinks = [
    {
      icon: FiInstagram,
      url: "https://www.instagram.com/tramboory/",
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
      hoverColor: "from-pink-600 to-purple-600",
      delay: 0
    },
    {
      icon: FiFacebook,
      url: "https://www.facebook.com/tramboory/",
      label: "Facebook",
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800",
      delay: 0.1
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: custom,
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5 
      }
    }),
    hover: { 
      y: -10, 
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
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5 
      }
    }
  }
  
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        delay: 0.4,
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7 
      }
    }
  }
  
  const socialVariants = {
    hidden: { opacity: 0, scale: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        delay: 0.6 + custom * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }),
    hover: { 
      scale: 1.2, 
      rotate: 15,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-28 relative z-10 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-purple-900/40 pointer-events-none" />
      
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute -top-40 left-[20%] w-[30rem] h-[30rem] rounded-full blur-[120px] 
          bg-gradient-to-br from-indigo-500/10 to-purple-600/5 pointer-events-none"
      />
      
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity }}
        className="absolute -bottom-20 right-[10%] w-[25rem] h-[25rem] rounded-full blur-[100px] 
          bg-gradient-to-tr from-green-500/10 to-blue-500/5 pointer-events-none"
      />
      
      {/* Animated dot pattern */}
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
              <FiHelpCircle className="text-yellow-300" />
              <span>Estamos para ayudarte</span>
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
              Contáctanos
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
            ¿Tienes alguna pregunta o quieres hacer una reservación? 
            Estamos aquí para ayudarte a crear momentos inolvidables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              custom={info.delay}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 
                hover:border-white/40 hover:shadow-xl transition-all duration-500
                group relative overflow-hidden"
            >
              {/* Background gradient animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon container with animation */}
              <div className="relative z-10 mb-6">
                <motion.div 
                  className="absolute -inset-4 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ backgroundColor: `var(--${info.glowColor.split('/')[0]})` }}
                />
                <motion.div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center
                    bg-gradient-to-r ${info.color} relative shadow-lg
                    group-hover:bg-gradient-to-r group-hover:${info.hoverColor} transition-all duration-500`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <info.icon className="text-2xl text-white" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 font-funhouse group-hover:text-yellow-300 transition-colors duration-300">
                  {info.title}
                </h3>
                <p className="text-gray-300 mb-5 group-hover:text-white transition-colors duration-300">
                  {info.details}
                </p>
                
                <motion.a 
                  href={info.url}
                  className={`inline-flex items-center text-sm font-medium ${info.textColor} hover:underline`}
                  target={info.url.startsWith('http') ? "_blank" : undefined}
                  rel={info.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {info.action}
                  <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA with enhanced design */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl mx-auto relative mb-24"
        >
          {/* Glowing background effects */}
          <motion.div 
            className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-green-600/10 to-green-500/20 rounded-3xl blur-xl"
            animate={{ 
              opacity: [0.5, 0.8, 0.5],
              scale: [0.98, 1.01, 0.98],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className="relative bg-gradient-to-r from-green-800/80 to-green-700/80 p-10 rounded-2xl border border-green-600/30 text-center backdrop-blur-lg overflow-hidden">
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/10 to-green-600/0"
              animate={{ 
                x: ['-100%', '100%'],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "linear",
                repeatDelay: 1
              }}
            />
            
            {/* Light dot patterns */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-funhouse">
                ¿Quieres información inmediata?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Contáctanos por WhatsApp y recibe atención personalizada al instante
                para planificar tu evento perfecto
              </p>
              
              <motion.button
                onClick={() => {
                  window.open("https://wa.me/523332300243?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20para%20fiestas%20infantiles.", '_blank', 'noopener,noreferrer');
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center space-x-2 py-4 px-8
                  bg-white text-green-700 rounded-xl font-bold hover:bg-gray-100
                  transition-all duration-300 shadow-lg relative overflow-hidden group"
                aria-label="Contactar por WhatsApp"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-green-100/0 via-green-100/30 to-green-100/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <FiMessageCircle className="text-2xl mr-2" />
                <span className="relative z-10">Contactar por WhatsApp</span>
              </motion.button>
              
              <p className="text-green-300/80 mt-4 text-sm">
                Respuesta inmediata durante horario de atención
              </p>
            </div>
          </div>
        </motion.div>

        {/* Social Media with enhanced design */}
        <div className="text-center">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-bold text-white mb-6"
          >
            Síguenos en Redes Sociales
          </motion.h4>
          
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                custom={social.delay}
                variants={socialVariants}
                initial="hidden"
                animate={controls}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-14 h-14 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center
                  shadow-lg transition-all duration-300 group`}
                aria-label={social.label}
              >
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, var(--${social.color.split(' ')[1]}), var(--${social.color.split(' ')[2]}))` }}
                />
                
                <social.icon className="text-2xl text-white relative z-10" />
                
                {/* Hover tooltip */}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  bg-white/10 backdrop-blur-md text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-sm"
          >
            Descubre más fotos y eventos en nuestras redes sociales
          </motion.p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
    </section>
  )
}