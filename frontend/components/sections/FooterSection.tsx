'use client'

import { useRef, useEffect } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FiHome, 
  FiCalendar, 
  FiInfo, 
  FiPhone, 
  FiMail,
  FiInstagram,
  FiFacebook,
  FiHeart,
  FiArrowUp,
  FiMapPin,
  FiStar,
  FiClock
} from 'react-icons/fi'

/**
 * Sección de footer con animaciones y elementos visuales mejorados
 */
export function FooterSection() {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: false, margin: "-100px" })
  const controls = useAnimation()
  
  // Start animations when section is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Navigation links enhanced
  const navLinks = [
    { label: "Inicio", href: "/", icon: FiHome, delay: 0, color: "text-tramboory-yellow-400" },
    { label: "Nosotros", href: "/nosotros", icon: FiInfo, delay: 0.1, color: "text-blue-400" },
    { label: "Galería", href: "/galeria", icon: FiStar, delay: 0.2, color: "text-pink-400" },
    { label: "Reservaciones", href: "/reservas", icon: FiCalendar, delay: 0.3, color: "text-green-400" },
    { label: "Contacto", href: "#contact", icon: FiPhone, delay: 0.4, color: "text-tramboory-purple-500" },
  ]
  
  // Social media links enhanced
  const socialLinks = [
    { 
      icon: FiInstagram, 
      href: "https://www.instagram.com/tramboory/", 
      label: "Instagram",
      color: "from-pink-500 to-purple-500",
      hoverColor: "from-pink-600 to-purple-600",
      delay: 0
    },
    { 
      icon: FiFacebook, 
      href: "https://www.facebook.com/tramboory/", 
      label: "Facebook",
      color: "from-blue-500 to-blue-700",
      hoverColor: "from-blue-600 to-blue-800",
      delay: 0.1
    }
  ]
  
  // Contact info enhanced
  const contactInfo = [
    { 
      icon: FiPhone, 
      content: "+52 33 3230 0243", 
      href: "tel:+523332300243",
      delay: 0
    },
    { 
      icon: FiMail, 
      content: "info@tramboory.com", 
      href: "mailto:info@tramboory.com",
      delay: 0.1
    },
    { 
      icon: FiMapPin, 
      content: "Av. Patria 123, Zapopan, Jalisco", 
      href: "https://maps.google.com",
      delay: 0.2
    },
    { 
      icon: FiClock, 
      content: "Martes a Domingo: 10am - 8pm", 
      href: null,
      delay: 0.3
    }
  ]
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.7, 
        ease: "easeOut" 
      }
    })
  }
  
  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.3 + custom * 0.1,
        duration: 0.5 
      }
    }),
    hover: { 
      x: 5,
      transition: { duration: 0.2 }
    }
  }
  
  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: 0.5 + custom * 0.1,
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
  
  const contactVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.4 + custom * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      x: 5,
      transition: { duration: 0.2 }
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="relative z-10 pt-20 pb-8 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-tramboory-purple-900/60 via-tramboory-purple-900/80 to-black/95 pointer-events-none" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      {/* Wave pattern at top */}
      <div className="absolute top-0 inset-x-0 h-20 overflow-hidden">
        <div className="absolute -top-10 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-black/10 -skew-y-2"></div>
      </div>
      
      {/* Blurred circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-tramboory-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Logo and main heading */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate={controls}
          custom={0}
          className="flex flex-col items-center justify-center mb-16"
        >
          <div className="w-20 h-20 relative mb-4">
            <Image 
              src="/img/logo2.webp"
              alt="Tramboory Logo"
              fill
              style={{ objectFit: 'contain' }}
              sizes="80px"
              className="drop-shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-white font-funhouse text-center mb-3">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500">
              Tramboory
            </span>
          </h2>
          <p className="text-gray-400 max-w-md text-center mb-6">
            Creamos experiencias mágicas e inolvidables para las celebraciones de tus pequeños.
            Nuestro compromiso es hacer de cada evento un momento único y especial.
          </p>
          
          {/* Social links enhanced */}
          <div className="flex space-x-5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                custom={social.delay}
                variants={socialVariants}
                initial="hidden"
                animate={controls}
                whileHover="hover"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center
                  shadow-lg transition-all duration-300 group`}
                aria-label={social.label}
              >
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, var(--${social.color.split(' ')[1]}), var(--${social.color.split(' ')[2]}))` }}
                />
                
                <social.icon className="text-xl text-white relative z-10" />
                
                {/* Hover tooltip */}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  bg-white/10 backdrop-blur-md text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        {/* Main content columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={controls}
            custom={1}
          >
            <h3 className="text-xl font-bold text-white mb-6 inline-flex items-center">
              <span className="relative">
                Sobre Nosotros
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-tramboory-yellow-400/0 via-tramboory-yellow-400/80 to-tramboory-yellow-400/0"
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
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              En Tramboory creamos momentos mágicos para las celebraciones de tus pequeños. 
              Nuestras instalaciones en Zapopan están diseñadas para ofrecer diversión, 
              seguridad y experiencias inolvidables para toda la familia.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={{ pathname: "/nosotros" }}
                className="inline-flex items-center px-5 py-2 bg-white/10 backdrop-blur-sm 
                  text-white rounded-lg text-sm font-medium hover:bg-white/20
                  transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <FiInfo className="mr-2" />
                Conoce más sobre nosotros
                <FiArrowUp className="ml-2 rotate-45" />
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={controls}
            custom={2}
          >
            <h3 className="text-xl font-bold text-white mb-6 inline-flex items-center">
              <span className="relative">
                Enlaces Rápidos
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-400/0 via-blue-400/80 to-blue-400/0"
                  animate={{ 
                    scaleX: [0, 1, 0],
                    x: [-100, 0, 100]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </span>
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  custom={link.delay}
                  variants={linkVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover="hover"
                >
                  {link.href.startsWith('#') ? (
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white flex items-center transition-colors duration-300 group"
                    >
                      <span className={`w-8 h-8 rounded-full bg-white/10 mr-3 flex items-center justify-center 
                        ${link.color} group-hover:bg-white/20 transition-colors duration-300`}>
                        <link.icon className="text-sm" />
                      </span>
                      {link.label}
                      <FiArrowUp className="ml-2 opacity-0 group-hover:opacity-100 rotate-45 transition-opacity duration-300" />
                    </a>
                  ) : (
                    <Link 
                      href={{ pathname: link.href }}
                      className="text-gray-400 hover:text-white flex items-center transition-colors duration-300 group"
                    >
                      <span className={`w-8 h-8 rounded-full bg-white/10 mr-3 flex items-center justify-center 
                        ${link.color} group-hover:bg-white/20 transition-colors duration-300`}>
                        <link.icon className="text-sm" />
                      </span>
                      {link.label}
                      <FiArrowUp className="ml-2 opacity-0 group-hover:opacity-100 rotate-45 transition-opacity duration-300" />
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Column 3: Contact */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={controls}
            custom={3}
          >
            <h3 className="text-xl font-bold text-white mb-6 inline-flex items-center">
              <span className="relative">
                Información de Contacto
                <motion.span 
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-green-400/0 via-green-400/80 to-green-400/0"
                  animate={{ 
                    scaleX: [0, 1, 0],
                    x: [-100, 0, 100]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </span>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li 
                  key={index}
                  custom={info.delay}
                  variants={contactVariants}
                  initial="hidden"
                  animate={controls}
                  whileHover={info.href ? "hover" : undefined}
                  className="flex items-start text-gray-400 group"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 mr-3 flex items-center justify-center flex-shrink-0
                    group-hover:bg-white/20 transition-colors duration-300">
                    <info.icon className="text-sm" />
                  </span>
                  {info.href ? (
                    <a 
                      href={info.href} 
                      className="hover:text-white transition-colors duration-300 flex-1"
                      target={info.href.startsWith('http') ? "_blank" : undefined}
                      rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <span className="flex-1">{info.content}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Separating line with gradient */}
        <motion.div 
          className="h-px w-full mx-auto mb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.div 
            className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ 
              x: ['-100%', '100%'],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "linear",
              repeatDelay: 3
            }}
          />
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-gray-500">
            &copy; {year} Tramboory. Todos los derechos reservados.
          </p>
          <motion.p 
            className="text-gray-600 text-sm mt-2 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.03, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          >
            Hecho con 
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
                color: ["#ec4899", "#f43f5e", "#ec4899"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                ease: "easeInOut"
              }}
              className="mx-1 text-pink-500"
            >
              <FiHeart />
            </motion.span> 
            en Guadalajara, México
          </motion.p>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500
          flex items-center justify-center shadow-lg hover:shadow-tramboory-yellow-400/30
          hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-500 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Volver arriba"
      >
        <FiArrowUp className="text-tramboory-purple-900 text-xl" />
      </motion.button>
    </footer>
  )
}