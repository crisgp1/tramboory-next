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
import Link from 'next/link'

/**
 * Sección de contacto con animaciones avanzadas y efectos visuales mejorados
 */
export function ContactSection() {
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
      glowColor: "bg-blue-400/20",
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
      glowColor: "bg-green-400/20",
      textColor: "text-green-400",
      delay: 0.1
    },
    {
      icon: FiMail,
      title: "Correo",
      details: "info@tramboory.com",
      action: "Enviar Correo",
      url: "mailto:info@tramboory.com",
      color: "from-tramboory-yellow-400 to-tramboory-yellow-500",
      hoverColor: "from-tramboory-yellow-500 to-tramboory-yellow-500",
      glowColor: "bg-tramboory-yellow-400/20",
      textColor: "text-tramboory-yellow-400",
      delay: 0.2
    },
    {
      icon: FiClock,
      title: "Horario",
      details: "Martes a Domingo: 10am - 8pm",
      action: "Ver Disponibilidad",
      url: "/reservas",
      isInternalLink: true,
      color: "from-tramboory-purple-500 to-tramboory-purple-900",
      hoverColor: "from-tramboory-purple-600 to-tramboory-purple-900",
      glowColor: "bg-tramboory-purple-500/20",
      textColor: "text-tramboory-purple-500",
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tramboory-purple-900/30 to-tramboory-purple-900/40 pointer-events-none" />
      
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute -top-40 left-[20%] w-[30rem] h-[30rem] rounded-full blur-[120px] 
          bg-gradient-to-br from-indigo-500/10 to-tramboory-purple-500/5 pointer-events-none"
      />
      
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity }}
        className="absolute -bottom-20 right-[10%] w-[25rem] h-[25rem] rounded-full blur-[100px] 
          bg-gradient-to-tr from-green-500/10 to-blue-500/5 pointer-events-none"
      />
      
      {/* Animated dot pattern */</section>