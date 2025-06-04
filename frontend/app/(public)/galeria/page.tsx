import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

export const metadata: Metadata = {
  title: 'Galería de Eventos - Tramboory',
  description: 'Explora nuestra galería de fotos de eventos anteriores en Tramboory, el mejor salón de fiestas infantiles en Zapopan.',
  keywords: 'galería, fotos, eventos, fiestas infantiles, tramboory, zapopan, recuerdos',
  openGraph: {
    title: 'Galería de Eventos - Tramboory',
    description: 'Mira los momentos mágicos que hemos creado para nuestros clientes',
    images: ['/img/logo.webp'],
    type: 'website',
  },
}

// Datos de ejemplo para la galería
const galeriaImages = [
  {
    id: 1,
    src: '/img/background-noblur.webp',
    alt: 'Fiesta temática de princesas',
    category: 'Temáticas',
    width: 1200,
    height: 800,
    featured: true
  },
  {
    id: 2,
    src: '/img/blur.webp',
    alt: 'Fiesta de cumpleaños con globos',
    category: 'Cumpleaños',
    width: 800,
    height: 1200,
    featured: false
  },
  {
    id: 3,
    src: '/img/noblur.webp',
    alt: 'Decoración de superheroes',
    category: 'Temáticas',
    width: 1200,
    height: 800,
    featured: true
  },
  {
    id: 4,
    src: '/img/logo.webp',
    alt: 'Fiesta con animadores',
    category: 'Shows',
    width: 800,
    height: 800,
    featured: false
  },
  {
    id: 5,
    src: '/img/LogoComplete.webp',
    alt: 'Mesa de dulces personalizada',
    category: 'Decoración',
    width: 1200,
    height: 800,
    featured: false
  },
  {
    id: 6,
    src: '/img/background-noblur.webp',
    alt: 'Área de juegos para niños',
    category: 'Instalaciones',
    width: 800,
    height: 1200,
    featured: false
  },
  {
    id: 7,
    src: '/img/blur.webp',
    alt: 'Show de magia para niños',
    category: 'Shows',
    width: 1200,
    height: 800,
    featured: false
  },
  {
    id: 8,
    src: '/img/noblur.webp',
    alt: 'Fiesta temática de dinosaurios',
    category: 'Temáticas',
    width: 1200,
    height: 800,
    featured: true
  },
  {
    id: 9,
    src: '/img/logo.webp',
    alt: 'Pintacaritas para niños',
    category: 'Actividades',
    width: 800,
    height: 800,
    featured: false
  },
  {
    id: 10,
    src: '/img/LogoComplete.webp',
    alt: 'Decoración con globos',
    category: 'Decoración',
    width: 1200,
    height: 800,
    featured: false
  },
  {
    id: 11,
    src: '/img/background-noblur.webp',
    alt: 'Fiesta temática de espacio',
    category: 'Temáticas',
    width: 1200,
    height: 800,
    featured: false
  },
  {
    id: 12,
    src: '/img/blur.webp',
    alt: 'Área de comida y bebidas',
    category: 'Instalaciones',
    width: 800,
    height: 1200,
    featured: false
  }
];

// Categorías para filtrado
const categorias = [
  'Todas',
  'Temáticas',
  'Cumpleaños',
  'Decoración',
  'Shows',
  'Actividades',
  'Instalaciones'
];

// Información sobre eventos destacados
const eventosDestacados = [
  {
    id: 1,
    title: 'Fiesta Temática de Princesas',
    description: 'Una celebración mágica con decoración y personajes de princesas.',
    image: '/img/background-noblur.webp',
    date: 'Marzo 2025'
  },
  {
    id: 2,
    title: 'Aventura de Superhéroes',
    description: 'Una fiesta llena de acción con los superhéroes favoritos de los niños.',
    image: '/img/noblur.webp',
    date: 'Febrero 2025'
  },
  {
    id: 3,
    title: 'Mundo de Dinosaurios',
    description: 'Viaje al pasado con esta increíble temática de dinosaurios.',
    image: '/img/blur.webp',
    date: 'Enero 2025'
  }
];

export default function GaleriaPage() {
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
          Galería de Eventos
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-tramboory-yellow-100">
          Explora los momentos mágicos que hemos creado para familias como la tuya
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-tramboory-purple-400 to-tramboory-yellow-400 rounded-full"></div>
      </section>

      {/* Eventos Destacados */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
          Eventos Destacados
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventosDestacados.map((evento) => (
            <div 
              key={evento.id} 
              className="bg-gradient-to-br from-tramboory-purple-800/50 to-tramboory-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="h-64 relative">
                <Image 
                  src={evento.image} 
                  alt={evento.title}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tramboory-purple-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-tramboory-yellow-500 text-tramboory-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                    {evento.date}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-tramboory-yellow-300">{evento.title}</h3>
                <p className="text-white/80 text-sm">{evento.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filtros de Categoría */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12 z-10 relative">
        <div className="flex flex-wrap justify-center gap-3">
          {categorias.map((categoria, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                index === 0 
                  ? 'bg-tramboory-yellow-500 text-tramboory-purple-900' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      {/* Galería Principal */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galeriaImages.map((image) => (
            <div 
              key={image.id} 
              className={`relative group overflow-hidden rounded-xl ${
                image.featured 
                  ? 'md:col-span-2 md:row-span-2' 
                  : ''
              }`}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image 
                  src={image.src} 
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm md:text-base">{image.alt}</p>
                  <span className="text-tramboory-yellow-400 text-xs mt-1">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center z-10 relative">
        <div className="bg-gradient-to-r from-tramboory-purple-800 to-tramboory-purple-900 rounded-2xl p-10 shadow-2xl shadow-purple-800/30">
          <h2 className="text-3xl font-funhouse font-bold mb-4">¿Quieres ser parte de nuestra galería?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Reserva ahora tu evento en Tramboory y crea momentos inolvidables para ti y tus pequeños. ¡Tu próxima celebración podría estar en nuestra galería!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-tramboory-purple-700 font-medium py-3 px-6 rounded-xl hover:bg-tramboory-purple-50 transition-all duration-300 shadow-lg">
              Reservar Ahora
            </Link>
            <Link href="/catalogo" className="bg-transparent border-2 border-white/30 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300">
              Ver Paquetes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}