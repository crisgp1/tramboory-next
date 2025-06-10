/**
 * Componente Principal Público
 * @module PublicMain
 * @description Página principal del sitio público de Tramboory
 */

import React from 'react'
import Link from 'next/link'

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface PublicMainProps {
  className?: string
}

interface ServiceCard {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

interface FeatureHighlight {
  id: string
  title: string
  description: string
  image: string
}

// ============================================================================
// ICONOS SVG
// ============================================================================

const PartyIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10V9a3 3 0 013-3v0a3 3 0 013 3v1M9 10H6m9 0h3m-9 5v5m9-5v5" />
  </svg>
)

const CameraIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v14a2 2 0 002 2z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const StarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

// ============================================================================
// DATOS
// ============================================================================

const services: ServiceCard[] = [
  {
    id: '1',
    title: 'Fiestas Infantiles',
    description: 'Celebraciones mágicas llenas de diversión, juegos y entretenimiento para los más pequeños.',
    icon: <PartyIcon />,
    href: '/catalogo?category=cumpleanos'
  },
  {
    id: '2',
    title: 'Eventos Sociales',
    description: 'Quinceañeras, bodas y celebraciones especiales con elegancia y estilo único.',
    icon: <HeartIcon />,
    href: '/catalogo?category=social'
  },
  {
    id: '3',
    title: 'Eventos Corporativos',
    description: 'Soluciones profesionales para conferencias, presentaciones y eventos empresariales.',
    icon: <CalendarIcon />,
    href: '/catalogo?category=corporativo'
  },
  {
    id: '4',
    title: 'Fotografía y Video',
    description: 'Capturamos los momentos más especiales con calidad profesional y creatividad.',
    icon: <CameraIcon />,
    href: '/galeria'
  }
]

const features: FeatureHighlight[] = [
  {
    id: '1',
    title: 'Experiencia Comprobada',
    description: 'Más de 10 años creando momentos inolvidables para familias y empresas.',
    image: '/img/features/experience.jpg'
  },
  {
    id: '2',
    title: 'Equipo Profesional',
    description: 'Personal capacitado y equipos de última generación para garantizar el éxito.',
    image: '/img/features/team.jpg'
  },
  {
    id: '3',
    title: 'Personalización Total',
    description: 'Cada evento es único, adaptamos nuestros servicios a tus necesidades específicas.',
    image: '/img/features/customization.jpg'
  }
]

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * ServiceCard - Tarjeta de servicio
 */
const ServiceCardComponent: React.FC<{ service: ServiceCard }> = ({ service }) => (
  <Link href={service.href} className="group">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-center w-16 h-16 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 mb-4 group-hover:bg-tramboory-purple-100 transition-colors">
        {service.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 font-body-medium mb-2 group-hover:text-tramboory-purple-600 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-600 font-body-light mb-4">
        {service.description}
      </p>
      <div className="flex items-center text-tramboory-purple-600 font-medium font-body-medium group-hover:text-tramboory-purple-700">
        <span>Ver más</span>
        <ArrowRightIcon />
      </div>
    </div>
  </Link>
)

/**
 * FeatureCard - Tarjeta de característica destacada
 */
const FeatureCard: React.FC<{ feature: FeatureHighlight }> = ({ feature }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="h-48 bg-gray-200 flex items-center justify-center">
      <div className="text-gray-400">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 font-body-medium mb-2">
        {feature.title}
      </h3>
      <p className="text-gray-600 font-body-light">
        {feature.description}
      </p>
    </div>
  </div>
)

/**
 * TestimonialCard - Tarjeta de testimonio
 */
const TestimonialCard: React.FC<{
  name: string
  event: string
  rating: number
  comment: string
}> = ({ name, event, rating, comment }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center mb-4">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
        ))}
      </div>
    </div>
    <p className="text-gray-600 font-body-light mb-4 italic">
      "{comment}"
    </p>
    <div>
      <p className="font-semibold text-gray-900 font-body-medium">{name}</p>
      <p className="text-sm text-gray-500 font-body-light">{event}</p>
    </div>
  </div>
)

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * PublicMain - Componente principal de la página pública
 * 
 * ### Características:
 * - **Hero Section**: Presentación principal con llamada a la acción
 * - **Servicios**: Grid de servicios principales
 * - **Características**: Destacados de la empresa
 * - **Testimonios**: Reseñas de clientes satisfechos
 * 
 * @example
 * ```tsx
 * <PublicMain />
 * ```
 */
export const PublicMain: React.FC<PublicMainProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-16 ${className}`}>
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-tramboory-purple-50 to-tramboory-yellow-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-funhouse mb-6">
            Creamos Momentos
            <span className="text-tramboory-purple-600"> Inolvidables</span>
          </h1>
          <p className="text-xl text-gray-600 font-body-light mb-8 max-w-2xl mx-auto">
            Especialistas en organización de eventos, fiestas y celebraciones. 
            Transformamos tus ideas en experiencias mágicas que perdurarán para siempre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="btn-tramboory inline-flex items-center justify-center px-8 py-3 text-lg font-semibold"
            >
              Ver Paquetes
              <ArrowRightIcon />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold border-2 border-tramboory-purple-600 text-tramboory-purple-600 rounded-lg hover:bg-tramboory-purple-50 transition-colors font-body-medium"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Servicios Principales */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-funhouse mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-gray-600 font-body-light max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios para hacer de tu evento una experiencia única e inolvidable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCardComponent key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-funhouse mb-4">
            ¿Por qué elegir Tramboory?
          </h2>
          <p className="text-lg text-gray-600 font-body-light max-w-2xl mx-auto">
            Nos distinguimos por nuestro compromiso con la excelencia y la satisfacción total de nuestros clientes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-funhouse mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 font-body-light max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            name="María González"
            event="Quinceañera de mi hija"
            rating={5}
            comment="Superaron todas mis expectativas. La decoración fue espectacular y la organización impecable. Mi hija quedó encantada."
          />
          <TestimonialCard
            name="Carlos Ruiz"
            event="Evento corporativo"
            rating={5}
            comment="Profesionalismo de primer nivel. Manejaron cada detalle con precisión y el evento fue un éxito rotundo."
          />
          <TestimonialCard
            name="Ana López"
            event="Cumpleaños infantil"
            rating={5}
            comment="Los niños se divirtieron muchísimo. El equipo de animación fue fantástico y la decoración muy creativa."
          />
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="text-center py-16 bg-tramboory-purple-600 rounded-2xl text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-funhouse mb-4">
            ¿Listo para crear tu evento perfecto?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-body-light">
            Contáctanos hoy y comencemos a planificar la celebración de tus sueños.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-tramboory-yellow-500 text-tramboory-purple-900 rounded-lg hover:bg-tramboory-yellow-400 transition-colors font-body-medium"
          >
            Solicitar Cotización
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default PublicMain