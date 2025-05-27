import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PromotionsSection } from '@/components/sections/PromotionsSection'
import { ReservationStepsSection } from '@/components/sections/ReservationStepsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { BackgroundVideo } from '@/components/decorative/BackgroundVideo'
import { AnimatedBalloons } from '@/components/decorative/AnimatedBalloons'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'
import { FiClock, FiMessageCircle, FiCamera, FiMusic, FiUsers, FiHome } from 'react-icons/fi'

/**
 * Home Page - Tramboory Landing Page
 * 
 * This is the main landing page for Tramboory, featuring:
 * - Interactive background video
 * - Animated decorative elements
 * - Hero section with CTA buttons
 * - Services section with package details
 * 
 * The components have been migrated from the previous React implementation
 * to the new Next.js 14+ App Router architecture.
 */
export default function HomePage() {
  // Service packages data
  const services = {
    normal: {
      title: 'Tramboory Normal',
      description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta.',
      price: '7,999',
      features: [
        {
          title: '4 Horas de Diversión',
          description: '3.5 horas de salón + 30 min de despedida',
          icon: FiClock
        },
        {
          title: 'Invitación Digital',
          description: 'Invitación personalizada para tu evento',
          icon: FiMessageCircle
        },
        {
          title: 'Decoración Temática',
          description: 'Ambientación Tramboory para tu fiesta',
          icon: FiHome
        },
        {
          title: 'Menú Completo',
          description: 'Alimentos para niños y adultos',
          icon: FiUsers
        },
        {
          title: 'Bebidas Ilimitadas',
          description: 'Refrescos, agua y café de cortesía',
          icon: FiUsers
        },
        {
          title: 'Área de Juegos',
          description: 'Ludoteca y alberca de pelotas',
          icon: FiUsers
        },
        {
          title: 'Ambiente Festivo',
          description: 'Música y anfitriones para animar',
          icon: FiMusic
        },
        {
          title: 'Coordinador de Evento',
          description: 'Personal dedicado para tu celebración',
          icon: FiUsers
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
          icon: FiClock
        },
        {
          title: 'Espacio Exclusivo',
          description: 'Salón privado para tu evento',
          icon: FiHome
        },
        {
          title: 'Mobiliario Básico',
          description: 'Mesas y sillas incluidas',
          icon: FiHome
        },
        {
          title: 'Servicios Opcionales',
          description: 'Personaliza tu experiencia',
          icon: FiUsers
        }
      ],
      highlights: ['Personalizable', 'Económico', 'Flexible'],
      recommended: false
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-tramboory-purple-900 to-indigo-950">
      {/* Background decorative elements */}
      <BackgroundVideo 
        src="/videos/tramboory-background.webm" 
        poster="/img/background-noblur.webp"
      />
      <ParticlesBackground colorVariant="gradient" />
      <AnimatedBalloons />

      {/* Main content sections */}
      <HeroSection />
      <ServicesSection services={services} />
      <GallerySection carouselImages={[
        '/img/background-noblur.webp',
        '/img/blur.webp',
        '/img/logo.webp',
        '/img/LogoComplete.webp',
        '/img/noblur.webp'
      ]} />
      <PromotionsSection promocionesImages={[
        '/img/background-noblur.webp',
        '/img/blur.webp',
        '/img/logo.webp',
        '/img/LogoComplete.webp',
        '/img/noblur.webp'
      ]} />
      <ReservationStepsSection />
      <FeaturesSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}