'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { 
  FiArrowUp, 
  FiArrowRight, 
  FiCalendar,
  FiMessageCircle
} from 'react-icons/fi'
import Link from 'next/link'

// Layout components
import NavbarPublic from '@/components/layout/NavbarPublic'

// Decorative components
import ParticlesBackground from './decorative/ParticlesBackground'
import AnimatedBalloons from './decorative/AnimatedBalloons'
import BackgroundVideoComponent from './decorative/BackgroundVideoComponent'

// Section components
import HeroSection from './sections/HeroSection'
import PromotionsSection from './sections/PromotionsSection'
import ReservationStepsSection from './sections/ReservationStepsSection'
import ServicesSection from './sections/ServicesSection'
import FeaturesSection from './sections/FeaturesSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'
import FooterSection from './sections/FooterSection'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

/**
 * Service data structures
 */
interface ServiceFeature {
  title: string
  description: string
  icon: () => React.ReactNode
}

interface Service {
  title: string
  description: string
  price: string
  features: ServiceFeature[]
  highlights: string[]
  recommended: boolean
}

interface Services {
  normal: Service
  matutino: Service
  [key: string]: Service
}

/**
 * Mock API services for data fetching
 * In a real implementation, these would be imported from service modules
 */
const getImagenesCarousel = async (): Promise<string[]> => {
  try {
    // Simulating API response with actual images
    return [
      '/img/background-noblur.webp',
      '/img/blur.webp',
      '/img/logo.webp',
      '/img/LogoComplete.webp',
      '/img/noblur.webp'
    ]
  } catch (error) {
    console.error('Error fetching carousel images:', error)
    return []
  }
}

const getPromocionesCarousel = async (): Promise<string[]> => {
  try {
    // Simulating API response with actual images
    return [
      '/img/background-noblur.webp',
      '/img/blur.webp',
      '/img/logo.webp',
      '/img/LogoComplete.webp'
    ]
  } catch (error) {
    console.error('Error fetching promotion images:', error)
    return []
  }
}

/**
 * Main Home component with enhanced animations and transitions
 */
export default function Home() {
  // =========================================
  // State management
  // =========================================
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [carouselImages, setCarouselImages] = useState<string[]>([])
  const [promocionesImages, setPromocionesImages] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('hero')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // =========================================
  // References
  // =========================================
  const homeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const promotionsRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const galleryRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // =========================================
  // Scroll animations with Framer Motion
  // =========================================
  const { scrollY } = useScroll()
  const scrollProgress = useTransform(scrollY, [0, 1000], [0, 1])
  const backgroundOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0.7])
  
  // =========================================
  // Video controls
  // =========================================
  const toggleVideo = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (!videoRef.current) {
      console.error("No video reference available")
      return
    }
    
    try {
      if (isVideoPlaying) {
        videoRef.current.pause()
        setIsVideoPlaying(false)
      } else {
        const playPromise = videoRef.current.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoPlaying(true)
            })
            .catch(err => {
              console.error("Error playing video:", err)
              
              // Add listener for user interaction if needed
              const handleUserInteraction = () => {
                if (videoRef.current) {
                  videoRef.current.play()
                    .then(() => {
                      setIsVideoPlaying(true)
                      document.removeEventListener('click', handleUserInteraction)
                    })
                    .catch(e => console.error("Failed to play video after user interaction:", e))
                }
              }
              
              document.addEventListener('click', handleUserInteraction, { once: true })
            })
        }
      }
    } catch (error) {
      console.error("Error toggling video:", error)
    }
  }
  
  // =========================================
  // Navigation helpers
  // =========================================
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: 0,
      ease: "power4.inOut"
    })
  }
  
  const scrollToSection = (sectionId: string) => {
    let targetRef = null
    
    switch(sectionId) {
      case 'hero':
        targetRef = heroRef.current
        break
      case 'promotions':
        targetRef = promotionsRef.current
        break
      case 'steps':
        targetRef = stepsRef.current
        break
      case 'services':
        targetRef = servicesRef.current
        break
      case 'features':
        targetRef = featuresRef.current
        break
      case 'gallery':
        targetRef = galleryRef.current
        break
      case 'contact':
        targetRef = contactRef.current
        break
      default:
        targetRef = null
    }
    
    if (targetRef) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: targetRef.offsetTop,
        ease: "power3.inOut"
      })
    }
  }
  
  // =========================================
  // Data fetching
  // =========================================
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      
      try {
        // Parallel data fetching
        const [imagesData, promocionesData] = await Promise.all([
          getImagenesCarousel(),
          getPromocionesCarousel()
        ])
        
        setCarouselImages(imagesData)
        setPromocionesImages(promocionesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  // =========================================
  // Scroll handling and animations
  // =========================================
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    // Show/hide scroll-to-top button and track active section
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight / 2)
      
      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      // Check which section is active based on scroll position
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'promotions', ref: promotionsRef },
        { id: 'steps', ref: stepsRef },
        { id: 'services', ref: servicesRef },
        { id: 'features', ref: featuresRef },
        { id: 'gallery', ref: galleryRef },
        { id: 'contact', ref: contactRef }
      ]
      
      for (const section of sections) {
        const element = section.ref.current
        if (!element) continue
        
        const sectionTop = element.offsetTop
        const sectionBottom = sectionTop + element.offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    
    // Initialize GSAP animations
    let ctx = gsap.context(() => {
      // Create scroll-triggered animations for each section
      const sections = [
        { id: 'hero', ref: heroRef },
        { id: 'promotions', ref: promotionsRef },
        { id: 'steps', ref: stepsRef },
        { id: 'services', ref: servicesRef },
        { id: 'features', ref: featuresRef },
        { id: 'gallery', ref: galleryRef },
        { id: 'contact', ref: contactRef }
      ]
      
      sections.forEach(({ ref }) => {
        const section = ref.current
        if (!section) return
        
        // Add entrance animations
        gsap.fromTo(section, 
          { opacity: 0.6, y: 30 },
          { 
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top center',
              scrub: true
            }
          }
        )
      })
      
      // Animate feature cards
      ScrollTrigger.batch('.feature-card', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true,
          ease: "power2.out"
        }),
        start: 'top bottom-=100',
        end: 'bottom top+=100'
      })
    })

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ctx.revert()
    }
  }, [])

  // =========================================
  // Services data
  // =========================================
  const services: Services = {
    normal: {
      title: 'Tramboory Normal',
      description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta.',
      price: '7,999',
      features: [
        {
          title: '4 Horas de Diversión',
          description: '3.5 horas de salón + 30 min de despedida',
          icon: () => <></>
        },
        {
          title: 'Invitación Digital',
          description: 'Invitación personalizada para tu evento',
          icon: () => <></>
        },
        {
          title: 'Decoración Temática',
          description: 'Ambientación Tramboory para tu fiesta',
          icon: () => <></>
        },
        {
          title: 'Menú Completo',
          description: 'Alimentos para niños y adultos',
          icon: () => <></>
        },
        {
          title: 'Bebidas Ilimitadas',
          description: 'Refrescos, agua y café de cortesía',
          icon: () => <></>
        },
        {
          title: 'Área de Juegos',
          description: 'Ludoteca y alberca de pelotas',
          icon: () => <></>
        },
        {
          title: 'Ambiente Festivo',
          description: 'Música y anfitriones para animar',
          icon: () => <></>
        },
        {
          title: 'Coordinador de Evento',
          description: 'Personal dedicado para tu celebración',
          icon: () => <></>
        }
      ],
      highlights: ['Todo Incluido', 'Personal Completo', 'Sin Preocupaciones'],
      recommended: true
    },
    matutino: {
      title: 'Tramboory Matutino',
      description: 'Renta del espacio para eventos personalizados con servicios opcionales.',
      price: '4,999',
      features: [
        {
          title: '3 Horas de Evento',
          description: 'Horario matutino flexible',
          icon: () => <></>
        },
        {
          title: 'Espacio Exclusivo',
          description: 'Salón privado para tu evento',
          icon: () => <></>
        },
        {
          title: 'Mobiliario Básico',
          description: 'Mesas y sillas incluidas',
          icon: () => <></>
        },
        {
          title: 'Servicios Opcionales',
          description: 'Personaliza tu experiencia',
          icon: () => <></>
        }
      ],
      highlights: ['Personalizable', 'Económico', 'Flexible'],
      recommended: false
    }
  }

  // =========================================
  // Animation variants
  // =========================================
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.8
      }
    }
  }
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        damping: 15, 
        stiffness: 100,
        duration: 0.8 
      }
    }
  }
  
  const transitionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5 
      }
    }
  }
  
  // =========================================
  // Component for section transitions
  // =========================================
  const SectionTransition = ({ 
    type = 'wave', 
    direction = 'normal', 
    color = 'purple-950/30' 
  }: { 
    type?: 'wave' | 'diagonal', 
    direction?: 'normal' | 'reverse', 
    color?: string 
  }) => {
    if (type === 'wave') {
      return (
        <motion.div 
          variants={transitionVariants}
          className="relative h-24 mt-[-1px] overflow-hidden"
        >
          <div className={`absolute inset-0 bg-${color}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320" 
              className={`absolute bottom-0 w-full ${direction === 'reverse' ? 'transform rotate-180' : ''}`}
            >
              <path 
                fill="rgba(126, 34, 206, 0.1)" 
                fillOpacity="1" 
                d="M0,128L48,133.3C96,139,192,149,288,176C384,203,480,245,576,234.7C672,224,768,160,864,149.3C960,139,1056,181,1152,181.3C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
              />
            </svg>
          </div>
        </motion.div>
      )
    } else {
      return (
        <motion.div 
          variants={transitionVariants}
          className="relative h-24 mt-[-1px] overflow-hidden"
        >
          <div className={`absolute inset-0 bg-${color} transform ${
            direction === 'reverse' ? 'skew-y-2' : '-skew-y-2'
          }`} />
        </motion.div>
      )
    }
  }

  // =========================================
  // Loading state
  // =========================================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg">Cargando experiencia Tramboory...</p>
        </div>
      </div>
    )
  }

  // =========================================
  // Main render
  // =========================================
  return (
    <div 
      ref={homeRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950"
    >
      {/* Background decorative elements */}
      <motion.div 
        style={{ opacity: backgroundOpacity }}
        className="fixed inset-0 bg-noise opacity-[0.03] mix-blend-soft-light pointer-events-none"
      />
      <ParticlesBackground />
      <AnimatedBalloons />
      
      {/* Video background */}
      <BackgroundVideoComponent
        videoRef={videoRef}
        isVideoPlaying={isVideoPlaying}
        toggleVideo={toggleVideo}
      />
      
      {/* Navigation */}
      <NavbarPublic />

      {/* Mobile quick actions */}
      <div className="fixed bottom-8 left-8 z-50 md:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-3"
        >
          <motion.a
            href="https://wa.me/523332300243?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
            aria-label="Contactar por WhatsApp"
          >
            <FiMessageCircle className="text-xl text-white" />
          </motion.a>
          
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-lg"
            aria-label="Contacto"
          >
            <FiCalendar className="text-xl text-white" />
          </motion.button>
        </motion.div>
      </div>

      {/* Main content with sections */}
      <motion.div 
        ref={contentRef}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Hero Section */}
        <motion.section 
          ref={heroRef}
          variants={sectionVariants}
          id="hero"
        >
          <HeroSection sectionRefs={{
            hero: heroRef,
            content: contentRef,
            video: videoRef
          }} />
        </motion.section>
        
        {/* Section Transition - Wave */}
        <SectionTransition type="wave" />
        
        {/* Promotions Section */}
        <motion.section 
          ref={promotionsRef}
          variants={sectionVariants}
          id="promotions"
        >
          <PromotionsSection promocionesImages={promocionesImages} />
        </motion.section>
        
        {/* Section Transition - Diagonal */}
        <SectionTransition type="diagonal" />
        
        {/* Reservation Steps Section */}
        <motion.section 
          ref={stepsRef}
          variants={sectionVariants}
          id="steps"
        >
          <ReservationStepsSection />
        </motion.section>
        
        {/* Section Transition - Wave Reverse */}
        <SectionTransition type="wave" direction="reverse" />
        
        {/* Services Section */}
        <motion.section 
          ref={servicesRef}
          variants={sectionVariants}
          id="services"
        >
          <ServicesSection services={services} />
        </motion.section>
        
        {/* Section Transition - Diagonal Reverse */}
        <SectionTransition type="diagonal" direction="reverse" />
        
        {/* Features Section */}
        <motion.section 
          ref={featuresRef}
          variants={sectionVariants}
          id="features"
        >
          <FeaturesSection />
        </motion.section>
        
        {/* Section Transition - Wave */}
        <SectionTransition type="wave" />
        
        {/* Gallery Section */}
        <motion.section 
          ref={galleryRef}
          variants={sectionVariants}
          id="gallery"
        >
          <GallerySection carouselImages={carouselImages} />
        </motion.section>
        
        {/* Section Transition - Diagonal */}
        <SectionTransition type="diagonal" />
        
        {/* Contact Section */}
        <motion.section 
          ref={contactRef}
          variants={sectionVariants}
          id="contact"
        >
          <ContactSection />
        </motion.section>
        
        {/* Footer Section */}
        <motion.section variants={sectionVariants}>
          <FooterSection />
        </motion.section>
      </motion.div>
      
      {/* Quick action buttons */}
      <div className="fixed right-8 bottom-24 z-50 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-4"
        >
          <Link href="#contact">
            <motion.div
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center gap-2 text-white hover:bg-white/20 transition-all duration-300"
            >
              <FiCalendar className="text-yellow-400" />
              <span className="font-medium">Reservar</span>
              <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.div>
          </Link>

          <a href="https://wa.me/523332300243" target="_blank" rel="noopener noreferrer">
            <motion.div
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-green-500/90 backdrop-blur-md border border-green-400/20 rounded-lg flex items-center gap-2 text-white hover:bg-green-600/90 transition-all duration-300"
            >
              <FiMessageCircle />
              <span className="font-medium">WhatsApp</span>
            </motion.div>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500
              flex items-center justify-center shadow-lg hover:shadow-yellow-400/30
              hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Volver arriba"
          >
            <FiArrowUp className="text-purple-900 text-xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}