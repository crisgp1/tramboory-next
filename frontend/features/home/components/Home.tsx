'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

// Data fetching service (placeholder for actual implementation)
// In a real implementation, this would be imported from a proper service module
const getImagenesCarousel = async () => {
  // This would be an actual API call in production
  try {
    // Using actual images from public/img directory
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

const getPromocionesCarousel = async () => {
  // This would be an actual API call in production
  try {
    // Using actual images from public/img directory
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

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Main Home component that renders all sections of the homepage
 */
export default function Home() {
  // States
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [carouselImages, setCarouselImages] = useState<string[]>([])
  const [promocionesImages, setPromocionesImages] = useState<string[]>([])
  const [isLoadingImages, setIsLoadingImages] = useState(true)
  const [isLoadingPromociones, setIsLoadingPromociones] = useState(true)
  
  // References for sections and video
  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    content: useRef<HTMLDivElement>(null),
    video: useRef<HTMLVideoElement>(null)
  }

  // Toggle video playback
  const toggleVideo = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    if (!sectionRefs.video.current) {
      console.error("No video reference available")
      return
    }
    
    try {
      if (isVideoPlaying) {
        sectionRefs.video.current.pause()
        setIsVideoPlaying(false)
      } else {
        sectionRefs.video.current.play()
          .then(() => {
            setIsVideoPlaying(true)
          })
          .catch(err => {
            console.error("Error playing video:", err)
            
            // Add listener for user interaction if needed
            const handleUserInteraction = () => {
              if (sectionRefs.video.current) {
                sectionRefs.video.current.play()
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
    } catch (error) {
      console.error("Error toggling video:", error)
    }
  }
  
  // Fetch carousel images on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        setIsLoadingImages(true)
        const images = await getImagenesCarousel()
        setCarouselImages(images)
      } catch (error) {
        console.error('Error loading carousel images:', error)
        setCarouselImages([])
      } finally {
        setIsLoadingImages(false)
      }
    }
    
    const loadPromociones = async () => {
      try {
        setIsLoadingPromociones(true)
        const promociones = await getPromocionesCarousel()
        setPromocionesImages(promociones)
      } catch (error) {
        console.error('Error loading promotions:', error)
        setPromocionesImages([])
      } finally {
        setIsLoadingPromociones(false)
      }
    }
    
    loadImages()
    loadPromociones()
  }, [])
  
  // GSAP animations setup
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return
    
    let ctx = gsap.context(() => {
      // Parallax effect for hero section
      if (sectionRefs.content.current && sectionRefs.hero.current) {
        gsap.to(sectionRefs.content.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRefs.hero.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      }

      // Animate feature cards on scroll
      ScrollTrigger.batch('.feature-card', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true
        }),
        start: 'top bottom-=100',
        end: 'bottom top+=100'
        // removed markers property as it's not in the BatchVars type
      })
    })

    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ctx.revert()
    }
  }, [])

  // Services data
  const services = {
    normal: {
      title: 'Tramboory Normal',
      description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta.',
      price: '7,999',
      features: [
        {
          title: '4 Horas de Diversión',
          description: '3.5 horas de salón + 30 min de despedida',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Invitación Digital',
          description: 'Invitación personalizada para tu evento',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Decoración Temática',
          description: 'Ambientación Tramboory para tu fiesta',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Menú Completo',
          description: 'Alimentos para niños y adultos',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Bebidas Ilimitadas',
          description: 'Refrescos, agua y café de cortesía',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Área de Juegos',
          description: 'Ludoteca y alberca de pelotas',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Ambiente Festivo',
          description: 'Música y anfitriones para animar',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Coordinador de Evento',
          description: 'Personal dedicado para tu celebración',
          icon: () => <></> // Icon will be handled in ServicesSection
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
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Espacio Exclusivo',
          description: 'Salón privado para tu evento',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Mobiliario Básico',
          description: 'Mesas y sillas incluidas',
          icon: () => <></> // Icon will be handled in ServicesSection
        },
        {
          title: 'Servicios Opcionales',
          description: 'Personaliza tu experiencia',
          icon: () => <></> // Icon will be handled in ServicesSection
        }
      ],
      highlights: ['Personalizable', 'Económico', 'Flexible'],
      recommended: false
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950">
      {/* Decorative elements */}
      <ParticlesBackground />
      <AnimatedBalloons />
      
      {/* Video background */}
      <BackgroundVideoComponent
        videoRef={sectionRefs.video as React.RefObject<HTMLVideoElement>}
        isVideoPlaying={isVideoPlaying}
        toggleVideo={toggleVideo}
      />

      {/* Main content - all sections */}
      <div ref={sectionRefs.content} className="relative z-10">
        <HeroSection sectionRefs={sectionRefs as any} />
        <PromotionsSection promocionesImages={promocionesImages} />
        <ReservationStepsSection />
        <ServicesSection services={services} />
        <FeaturesSection />
        <GallerySection carouselImages={carouselImages} />
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  )
}