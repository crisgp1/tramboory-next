'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Componentes de layout
import NavbarPublic from '@/components/shared/NavbarPublic'
import Footer from '@/components/layout/Footer'

// Componentes decorativos (carga diferida para optimización)
const ParticlesBackground = dynamic(
  () => import('./decorative/ParticlesBackground'),
  { ssr: false }
)
const AnimatedBalloons = dynamic(
  () => import('./decorative/AnimatedBalloons'),
  { ssr: false }
)
const BackgroundVideoComponent = dynamic(
  () => import('./decorative/BackgroundVideoComponent'),
  { ssr: false }
)

// Secciones de la página
import HeroSection from './sections/HeroSection'
import PromotionsSection from './sections/PromotionsSection'
import ReservationStepsSection from './sections/ReservationStepsSection'
import ServicesSection from './sections/ServicesSection'
import FeaturesSection from './sections/FeaturesSection'
import GallerySection from './sections/GallerySection'
import ContactSection from './sections/ContactSection'
import FooterSection from './sections/FooterSection'

// Hooks personalizados
import { useGalleryImages } from '@/features/home/hooks/useGalleryImages'
import { usePromotions } from '@/features/home/hooks/usePromotions'

// Datos de servicios
import { services } from '@/features/home/data/servicesData'

export default function HomeContent() {
  // Estados
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  
  // Referencias
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    content: useRef<HTMLDivElement>(null),
    video: useRef<HTMLVideoElement>(null)
  }
  
  // Cargar datos desde el servidor
  const { images: carouselImages, loading: isLoadingImages } = useGalleryImages()
  const { promotions: promocionesImages, loading: isLoadingPromociones } = usePromotions()
  
  // Efectos para animaciones GSAP
  useEffect(() => {
    if (typeof window === 'undefined') return

    let ctx = gsap.context(() => {
      // Parallax effect para el héroe
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

      // Animaciones para las características
      ScrollTrigger.batch('.feature-card', {
        onEnter: batch => gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true
        }),
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        markers: false
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      ctx.revert()
    }
  }, [])

  // Función toggleVideo mejorada
  const toggleVideo = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    
    console.log("Toggle Video clicked in Home:", !!sectionRefs.video.current)
    
    if (!sectionRefs.video.current) {
      console.error("No video reference available")
      return
    }
    
    try {
      if (isVideoPlaying) {
        // Pausar video
        sectionRefs.video.current.pause()
        console.log("Video pausado en Home")
        setIsVideoPlaying(false)
      } else {
        // Reproducir video
        sectionRefs.video.current.play()
          .then(() => {
            console.log("Video reproducido exitosamente en Home")
            setIsVideoPlaying(true)
          })
          .catch(err => {
            console.error("Error reproduciendo video en Home:", err)
            
            // Solo agregar listener para interacción de usuario si es necesario
            const handleUserInteraction = () => {
              sectionRefs.video.current?.play()
                .then(() => {
                  setIsVideoPlaying(true)
                  document.removeEventListener('click', handleUserInteraction)
                  console.log("Video reproducido tras interacción del usuario")
                })
                .catch(e => console.error("Fallo en reproducción forzada:", e))
            }
            
            document.addEventListener('click', handleUserInteraction, { once: true })
          })
      }
    } catch (error) {
      console.error("Error al cambiar estado del video:", error)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950">
      {/* Elementos decorativos de fondo */}
      <ParticlesBackground />
      <AnimatedBalloons />
      
      {/* Video de Fondo */}
      <BackgroundVideoComponent
        videoRef={sectionRefs.video}
        isVideoPlaying={isVideoPlaying}
        toggleVideo={toggleVideo}
      />

      {/* Navbar público */}
      <NavbarPublic />

      {/* Contenido principal */}
      <main className="relative z-10">
        {/* Secciones principales */}
        <HeroSection sectionRefs={sectionRefs} />
        
        <AnimatePresence>
          {promocionesImages && promocionesImages.length > 0 && (
            <PromotionsSection promocionesImages={promocionesImages} />
          )}
        </AnimatePresence>
        
        <ReservationStepsSection />
        <ServicesSection services={services} />
        <FeaturesSection />
        
        {!isLoadingImages && carouselImages && carouselImages.length > 0 && (
          <GallerySection carouselImages={carouselImages} />
        )}
        
        <ContactSection />
      </main>
      
      {/* Footer */}
      <FooterSection />
    </div>
  )
}