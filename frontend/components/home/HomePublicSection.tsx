'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedBalloons } from '@/components/decorative/AnimatedBalloons'

interface Testimonial {
  id: number
  name: string
  role: string
  comment: string
  avatar: string
  rating: number
}

interface Feature {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Laura Sánchez',
    role: 'Mamá de Sofía',
    comment: '¡La mejor fiesta que pudimos haber tenido! Mi hija y sus amigos disfrutaron cada minuto. El equipo de Tramboory hizo todo perfecto.',
    avatar: '/img/logo2.webp',
    rating: 5
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Papá de Diego',
    comment: 'Excelente servicio, instalaciones impecables y una atención increíble. Mi hijo tuvo el mejor cumpleaños de su vida.',
    avatar: '/img/logo2.webp',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena Torres',
    role: 'Mamá de Mateo',
    comment: 'La decoración temática superó todas mis expectativas. El equipo de animación mantuvo a los niños entretenidos todo el tiempo.',
    avatar: '/img/logo2.webp',
    rating: 4
  }
]

const features: Feature[] = [
  {
    id: 1,
    title: 'Temáticas Personalizadas',
    description: 'Decoración exclusiva con más de 20 temáticas diferentes para elegir.',
    icon: '✨',
    color: 'bg-gradient-to-br from-pink-500 to-rose-500'
  },
  {
    id: 2,
    title: 'Animadores Profesionales',
    description: 'Equipo de animación capacitado para crear momentos mágicos.',
    icon: '🎭',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Gastronomía de Calidad',
    description: 'Menús deliciosos para niños y adultos con opciones para todos.',
    icon: '🍕',
    color: 'bg-gradient-to-br from-amber-500 to-orange-500'
  },
  {
    id: 4,
    title: 'Instalaciones Seguras',
    description: 'Espacios diseñados pensando en la seguridad y diversión de los pequeños.',
    icon: '🏰',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    id: 5,
    title: 'Paquetes Todo Incluido',
    description: 'Soluciones completas para que no tengas que preocuparte por nada.',
    icon: '🎁',
    color: 'bg-gradient-to-br from-purple-500 to-indigo-500'
  },
  {
    id: 6,
    title: 'Atención Personalizada',
    description: 'Coordinador exclusivo para tu evento que cuidará cada detalle.',
    icon: '👑',
    color: 'bg-gradient-to-br from-red-500 to-pink-500'
  }
]

export const HomePublicSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <div className="relative">
      {/* Decorative Elements */}
      <AnimatedBalloons 
        count={8}
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

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center z-10">
        <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-wider text-tramboory-purple-900 bg-tramboory-yellow-300 rounded-full">
          ¡Celebra con nosotros!
        </span>
        <h1 className="text-5xl md:text-7xl font-funhouse font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500">
          Diversión Mágica<br />para tus Pequeños
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-tramboory-yellow-100">
          El lugar perfecto para celebrar cumpleaños y eventos infantiles inolvidables en Zapopan
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/catalogo" className="px-8 py-4 bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 text-tramboory-purple-900 font-bold rounded-xl shadow-lg shadow-tramboory-yellow-500/25 hover:shadow-tramboory-yellow-500/40 transition-all duration-300 transform hover:-translate-y-1">
            Ver Paquetes
          </Link>
          <Link href="/galeria" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
            Explorar Galería
          </Link>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-white/70">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-tramboory-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Abierto 7 días</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-tramboory-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Zapopan, Jalisco</span>
          </div>
          <span className="text-white/30">•</span>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-tramboory-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>5.0 Calificación</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-funhouse font-bold mb-4 text-white">
            Por qué Elegir <span className="text-tramboory-yellow-400">Tramboory</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Ofrecemos experiencias únicas y personalizadas para crear recuerdos que durarán toda la vida
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-tramboory-purple-500/10 transform hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center text-2xl mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-funhouse font-bold mb-4 text-white">
            Lo que Dicen Nuestros <span className="text-tramboory-yellow-400">Clientes</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Miles de familias felices han celebrado con nosotros
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-tramboory-purple-800/50 to-tramboory-purple-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-tramboory-yellow-400">
                <Image 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].name} 
                  fill
                  className="object-cover"
                />
              </div>
              
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-tramboory-yellow-400' : 'text-gray-400'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-lg md:text-xl text-white/90 italic mb-6">"{testimonials[activeIndex].comment}"</p>
                
                <div>
                  <h4 className="text-lg font-bold text-white">{testimonials[activeIndex].name}</h4>
                  <p className="text-tramboory-yellow-300">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 right-10 flex gap-3">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white text-tramboory-purple-900 flex items-center justify-center shadow-lg hover:bg-tramboory-yellow-100 transition-all duration-300"
                title="Testimonio anterior"
                aria-label="Ver testimonio anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-tramboory-yellow-400 text-tramboory-purple-900 flex items-center justify-center shadow-lg hover:bg-tramboory-yellow-500 transition-all duration-300"
                title="Testimonio siguiente"
                aria-label="Ver testimonio siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="bg-gradient-to-r from-tramboory-purple-700/50 to-tramboory-purple-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tramboory-yellow-400/20 rounded-full filter blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-tramboory-purple-500/20 rounded-full filter blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-5 text-xs font-medium uppercase tracking-wider text-tramboory-purple-900 bg-tramboory-yellow-300 rounded-full">
              Oferta Especial
            </span>
            <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-4 text-white">
              15% de Descuento en Reservas Anticipadas
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Reserva tu evento con 30 días de anticipación y obtén un descuento especial en cualquiera de nuestros paquetes. ¡Plazas limitadas!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalogo" className="px-6 py-3 bg-white text-tramboory-purple-900 font-bold rounded-xl shadow-lg hover:bg-tramboory-yellow-50 transition-all duration-300">
                Ver Detalles
              </Link>
              <Link href="/contacto" className="px-6 py-3 bg-transparent border-2 border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300">
                Reservar Ahora
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePublicSection