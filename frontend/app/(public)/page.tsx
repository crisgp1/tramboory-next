import { Metadata } from 'next'
import { HeroSection } from '@/components/home/HomeHeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { PromotionsSection } from '@/components/home/sections/PromotionsSection'
import { ReservationStepsSection } from '@/components/home/sections/ReservationStepsSection'
import { FeaturesSection } from '@/components/home/sections/FeaturesSection'
import ContactSection from '@/components/sections/ContactSection'
import { BackgroundVideo } from '@/components/decorative/BackgroundVideo'
import { AnimatedBalloons } from '@/components/decorative/AnimatedBalloons'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

export const metadata: Metadata = {
  title: 'Tramboory - Salón de Fiestas Infantiles',
  description: 'El mejor salón de eventos infantiles en Zapopan. Celebra el cumpleaños de tus pequeños con experiencias inolvidables.',
  keywords: 'fiestas infantiles, salon de eventos, zapopan, cumpleanos, tramboory',
  openGraph: {
    title: 'Tramboory - Salón de Fiestas Infantiles',
    description: 'El mejor lugar para celebrar el cumpleaños de tus pequeños',
    images: ['/img/logo2.webp'],
    type: 'website',
  },
}

/**
 * PublicHomePage - Página principal pública de Tramboory
 * 
 * Incluye todas las secciones y elementos decorativos para recrear
 * el diseño anterior de la página con efectos visuales mejorados
 */
export default function PublicHomePage() {
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
      description: 'Nuestra experiencia matutina con horarios especiales para las mañanas.',
      price: '5,999',
      features: [
        {
          title: '3 Horas de Diversión',
          description: '2.5 horas de salón + 30 min de despedida',
          iconName: 'clock'
        },
        {
          title: 'Invitación Digital',
          description: 'Invitación personalizada para tu evento',
          iconName: 'message-circle'
        },
        {
          title: 'Decoración Básica',
          description: 'Ambientación temática para tu fiesta',
          iconName: 'home'
        },
        {
          title: 'Menú Desayuno',
          description: 'Opciones de desayuno para niños y adultos',
          iconName: 'users'
        },
        {
          title: 'Bebidas Matutinas',
          description: 'Jugos, café y agua de cortesía',
          iconName: 'coffee'
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
      highlights: ['Horario Matutino', 'Precio Especial', 'Menú Desayuno'],
      recommended: false
    }
  }
  
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-tramboory-purple-900 to-indigo-950">
      {/* Elementos decorativos - dan vida y personalidad a la página */}
      <BackgroundVideo 
        src="/video/background.webm" 
      />
      
      <ParticlesBackground 
        particleCount={100} 
        opacity={0.7}
      />
      
      <AnimatedBalloons 
        count={15} 
        colors={["#FF5A5F", "#FFC857", "#8A4FFF", "#3CAEA3", "#F78FB3"]} 
      />
      
      {/* Secciones de contenido - organizadas para una experiencia fluida */}
      <div className="relative z-30">
        <HeroSection 
          title="CELEBRA CON TRAMBOORY" 
          subtitle="Tu salón de eventos infantiles en Zapopan con experiencias diseñadas para crear recuerdos inolvidables en el cumpleaños de tus pequeños."
          ctaText="Reserva tu fiesta"
          ctaLink="#reservar"
          label="El mejor salón de fiestas infantiles en Zapopan"
        />
        
        <ServicesSection services={services} />
        
        <FeaturesSection />
        
        <GallerySection 
          title="NUESTRA GALERÍA" 
          subtitle="Mira cómo otros han disfrutado de nuestras instalaciones y servicios"
        />
        
        <PromotionsSection 
          promocionesImages={[
            {
              id: 1,
              src: "/img/promociones/promo1.webp",
              alt: "Promoción especial de cumpleaños",
              title: "Paquete Cumpleaños"
            },
            {
              id: 2,
              src: "/img/promociones/promo2.webp",
              alt: "Descuento para eventos entre semana",
              title: "Descuento Entre Semana"
            },
            {
              id: 3,
              src: "/img/promociones/promo3.webp",
              alt: "Paquete para grupos grandes",
              title: "Grupos Grandes"
            }
          ]}
        />
        
        <ReservationStepsSection />
        
        <ContactSection 
          id="contacto"
          title="¿TIENES DUDAS?"
          subtitle="Estamos aquí para ayudarte a planear la fiesta perfecta"
        />
      </div>
    </main>
  )
}