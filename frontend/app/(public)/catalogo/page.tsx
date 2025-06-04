import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

export const metadata: Metadata = {
  title: 'Catálogo de Servicios - Tramboory',
  description: 'Explora nuestro catálogo completo de servicios y paquetes para fiestas infantiles en Tramboory Zapopan.',
  keywords: 'catálogo, servicios, paquetes, fiestas infantiles, cumpleaños, tramboory, zapopan',
  openGraph: {
    title: 'Catálogo de Servicios - Tramboory',
    description: 'Descubre los mejores paquetes para la fiesta perfecta de tus pequeños',
    images: ['/img/logo.webp'],
    type: 'website',
  },
}

// Datos de ejemplo para los paquetes
const paquetes = [
  {
    id: 1,
    title: 'Paquete Básico',
    description: 'La experiencia Tramboory esencial para celebraciones pequeñas y económicas.',
    price: '4,999',
    features: [
      '3 Horas de Diversión',
      'Decoración Básica',
      'Snacks para Niños',
      'Bebidas Limitadas',
      'Área de Juegos',
      'Música Ambiental'
    ],
    color: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    shadowColor: 'shadow-blue-500/20',
    hoverShadow: 'group-hover:shadow-blue-500/40',
    buttonColor: 'bg-white text-blue-600 hover:bg-blue-50',
    popular: false
  },
  {
    id: 2,
    title: 'Paquete Premium',
    description: 'La experiencia completa con todos los servicios incluidos para una celebración perfecta.',
    price: '7,999',
    features: [
      '4 Horas de Diversión',
      'Decoración Temática Completa',
      'Menú Completo para Niños y Adultos',
      'Bebidas Ilimitadas',
      'Área de Juegos Exclusiva',
      'Show Animado y DJ',
      'Invitaciones Digitales',
      'Mesa de Dulces',
      'Coordinador de Evento Exclusivo'
    ],
    color: 'bg-gradient-to-br from-tramboory-purple-600 to-tramboory-purple-900',
    shadowColor: 'shadow-purple-500/30',
    hoverShadow: 'group-hover:shadow-purple-500/50',
    buttonColor: 'bg-white text-tramboory-purple-600 hover:bg-tramboory-purple-50',
    popular: true
  },
  {
    id: 3,
    title: 'Paquete VIP',
    description: 'La experiencia de lujo con servicios adicionales para una celebración inolvidable.',
    price: '11,999',
    features: [
      '5 Horas de Diversión',
      'Decoración Temática Premium',
      'Menú Gourmet para Niños y Adultos',
      'Barra de Bebidas Premium',
      'Área de Juegos VIP',
      'Show Animado, DJ y Fotógrafo',
      'Invitaciones Físicas y Digitales',
      'Mesa de Dulces Personalizada',
      'Coordinador de Evento Exclusivo',
      'Transporte para el Festejado',
      'Recuerdos Premium para Invitados'
    ],
    color: 'bg-gradient-to-br from-tramboory-yellow-500 to-amber-700',
    shadowColor: 'shadow-amber-500/30',
    hoverShadow: 'group-hover:shadow-amber-500/50',
    buttonColor: 'bg-white text-amber-600 hover:bg-amber-50',
    popular: false
  }
]

const serviciosAdicionales = [
  {
    id: 1,
    title: 'Show de Magia',
    description: 'Espectáculo de magia e ilusionismo para sorprender a los pequeños.',
    price: '1,500',
    image: '/img/background-noblur.webp',
    duration: '45 minutos'
  },
  {
    id: 2,
    title: 'Pintura Facial',
    description: 'Artista de pintura facial para transformar a los niños en sus personajes favoritos.',
    price: '1,200',
    image: '/img/blur.webp',
    duration: '2 horas'
  },
  {
    id: 3,
    title: 'Personajes Animados',
    description: 'Visita de los personajes favoritos de los niños para fotos y animación.',
    price: '1,800',
    image: '/img/noblur.webp',
    duration: '1 hora'
  },
  {
    id: 4,
    title: 'Mesa de Dulces Extra',
    description: 'Mesa de dulces personalizada con temática a elección.',
    price: '2,500',
    image: '/img/logo.webp',
    duration: 'Todo el evento'
  }
]

export default function CatalogoPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-tramboory-purple-900 to-indigo-950 text-white pb-20">
      {/* Efectos decorativos */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={30}
        connectionDistance={100}
        opacity={0.3}
      />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl md:text-6xl font-funhouse font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500">
          Catálogo de Servicios
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-tramboory-yellow-100">
          Descubre nuestros increíbles paquetes y servicios diseñados para crear la fiesta perfecta para tus pequeños
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-tramboory-purple-400 to-tramboory-yellow-400 rounded-full"></div>
      </section>

      {/* Paquetes Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
          Nuestros Paquetes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paquetes.map((paquete) => (
            <div 
              key={paquete.id} 
              className={`relative rounded-2xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 ${paquete.shadowColor} shadow-xl`}
            >
              <div className={`${paquete.color} p-8 h-full flex flex-col`}>
                {paquete.popular && (
                  <div className="absolute top-0 right-0 bg-tramboory-yellow-400 text-tramboory-purple-900 font-bold py-1 px-4 rounded-bl-lg text-sm">
                    POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-funhouse font-bold mb-4">{paquete.title}</h3>
                <p className="text-white/80 mb-6">{paquete.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">${paquete.price}</span>
                  <span className="text-white/70 ml-1">MXN</span>
                </div>
                
                <ul className="mb-8 flex-grow">
                  {paquete.features.map((feature, index) => (
                    <li key={index} className="flex items-start mb-3">
                      <svg className="w-5 h-5 text-tramboory-yellow-300 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/contacto" className={`${paquete.buttonColor} text-center font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg ${paquete.hoverShadow}`}>
                  Reservar Ahora
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios Adicionales */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
          Servicios Adicionales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviciosAdicionales.map((servicio) => (
            <div 
              key={servicio.id} 
              className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="h-48 relative">
                <Image 
                  src={servicio.image} 
                  alt={servicio.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-tramboory-yellow-300">{servicio.title}</h3>
                <p className="text-white/80 text-sm mb-4">{servicio.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">${servicio.price}</span>
                    <span className="text-white/60 text-sm ml-1">MXN</span>
                  </div>
                  <div className="text-white/60 text-sm">
                    {servicio.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center z-10 relative">
        <div className="bg-gradient-to-r from-tramboory-purple-800 to-tramboory-purple-900 rounded-2xl p-10 shadow-2xl shadow-purple-800/30">
          <h2 className="text-3xl font-funhouse font-bold mb-4">¿Listo para la fiesta perfecta?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a crear la celebración perfecta. Contáctanos hoy mismo para comenzar a planear el evento de tus sueños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-tramboory-purple-700 font-medium py-3 px-6 rounded-xl hover:bg-tramboory-purple-50 transition-all duration-300 shadow-lg">
              Contactar Ahora
            </Link>
            <Link href="/galeria" className="bg-transparent border-2 border-white/30 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300">
              Ver Galería
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}