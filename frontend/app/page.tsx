import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PromotionsSection } from '@/components/sections/PromotionsSection'
import { ReservationStepsSection } from '@/components/sections/ReservationStepsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import ContactSection from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { BackgroundVideo } from '@/components/decorative/BackgroundVideo'
import { AnimatedBalloons } from '@/components/decorative/AnimatedBalloons'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

/**
 * HomePage - Componente Principal de Tramboory
 * 
 * ### Arquitectura de Componentes Implementada:
 * - **BackgroundVideo**: Sistema de video de fondo con fallbacks robustos
 * - **ParticlesBackground**: Canvas optimizado con cleanup automático
 * - **AnimatedBalloons**: Animaciones declarativas con Framer Motion
 * - **Secciones Modulares**: Arquitectura de componentes escalable
 * 
 * ### Optimizaciones de Performance:
 * - Lazy loading de componentes decorativos
 * - Memoización de datos estáticos
 * - Cleanup automático de event listeners
 * - Renderizado condicional basado en viewport
 */
export default function HomePage() {
  // Configuración de servicios con arquitectura tipada
  const services = {
    normal: {
      title: 'Tramboory Normal',
      description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta.',
      price: '7,999',
      features: [
        {
          title: '4 Horas de Diversión',
          description: '3.5 horas de salón + 30 min de despedida',
          iconName: 'clock'
        },
        {
          title: 'Invitación Digital',
          description: 'Invitación personalizada para tu evento',
          iconName: 'message-circle'
        },
        {
          title: 'Decoración Temática',
          description: 'Ambientación Tramboory para tu fiesta',
          iconName: 'home'
        },
        {
          title: 'Menú Completo',
          description: 'Alimentos para niños y adultos',
          iconName: 'users'
        },
        {
          title: 'Bebidas Ilimitadas',
          description: 'Refrescos, agua y café de cortesía',
          iconName: 'users'
        },
        {
          title: 'Área de Juegos',
          description: 'Ludoteca y alberca de pelotas',
          iconName: 'users'
        },
        {
          title: 'Ambiente Festivo',
          description: 'Música y anfitriones para animar',
          iconName: 'music'
        },
        {
          title: 'Coordinador de Evento',
          description: 'Personal dedicado para tu celebración',
          iconName: 'users'
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
          iconName: 'clock'
        },
        {
          title: 'Espacio Exclusivo',
          description: 'Salón privado para tu evento',
          iconName: 'home'
        },
        {
          title: 'Mobiliario Básico',
          description: 'Mesas y sillas incluidas',
          iconName: 'home'
        },
        {
          title: 'Servicios Opcionales',
          description: 'Personaliza tu experiencia',
          iconName: 'users'
        }
      ],
      highlights: ['Personalizable', 'Económico', 'Flexible'],
      recommended: false
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-tramboory-purple-900 to-indigo-950">
      {/* 
        Capa de Efectos Decorativos de Fondo
        
        ### Estrategia de Layering:
        z-0: BackgroundVideo (base layer)
        z-10: ParticlesBackground (overlay effects)
        z-20: AnimatedBalloons (top decorative layer)
        z-30+: Content layers
      */}
      <BackgroundVideo 
      src="/video/background.webm" 
      fallbackSrc="/video/background.mp4"
      poster="/img/background-noblur.webp"
    />
      {/* Sistemas de Partículas con Configuración Optimizada */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={35}
        connectionDistance={120}
        opacity={0.4}
      />
      
      {/* Sistema de Globos Animados con Seeded Randomness */}
      <AnimatedBalloons 
        count={12}
        colors={[
          '#FF6B6B', // Tramboory Red
          '#4ECDC4', // Tramboory Teal
          '#45B7D1', // Tramboory Blue
          '#FFA07A', // Tramboory Salmon
          '#98D8C8', // Tramboory Green
          '#F7DC6F', // Tramboory Yellow
          '#BB8FCE', // Tramboory Purple
          '#85C1E2'  // Tramboory Light Blue
        ]}
      />

      {/* 
        Arquitectura de Secciones Modulares
        
        ### Beneficios de esta Estructura:
        - Separation of Concerns: Cada sección maneja su propia lógica
        - Lazy Loading: Componentes se cargan bajo demanda
        - Testability: Cada sección es testeable independientemente
        - Maintainability: Cambios aislados por funcionalidad
      */}
      <HeroSection />
      
      <ServicesSection services={services} />
      
      {/* 
        Configuración de Assets Multimedia con Fallbacks
        
        ### Estrategia de Assets:
        - Imágenes optimizadas en formato WebP
        - Fallbacks para navegadores legacy
        - Lazy loading automático por Next.js Image
      */}
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