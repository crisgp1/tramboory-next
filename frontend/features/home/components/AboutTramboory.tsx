'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6 }
  })
}

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Ana García',
    role: 'Fundadora & CEO',
    image: '/img/logo2.webp', // Placeholder - replace with actual team member image
    bio: 'Visionaria y líder con más de 15 años de experiencia en eventos infantiles.'
  },
  {
    id: 2,
    name: 'Carlos Mendoza',
    role: 'Director Creativo',
    image: '/img/blur.webp', // Placeholder - replace with actual team member image
    bio: 'Responsable de crear experiencias únicas y mágicas para cada celebración.'
  },
  {
    id: 3,
    name: 'Sofía Rodríguez',
    role: 'Coordinadora de Eventos',
    image: '/img/noblur.webp', // Placeholder - replace with actual team member image
    bio: 'Experta en logística y planificación para que cada evento sea perfecto.'
  }
]

// Values data
const values = [
  {
    id: 1,
    title: 'Creatividad',
    description: 'Diseñamos experiencias únicas y personalizadas para cada niño.',
    icon: '✨',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'Seguridad',
    description: 'Priorizamos la seguridad de los niños en todas nuestras instalaciones.',
    icon: '🛡️',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    title: 'Excelencia',
    description: 'Nos comprometemos a ofrecer el mejor servicio en cada detalle.',
    icon: '🌟',
    color: 'from-tramboory-yellow-400 to-amber-600'
  },
  {
    id: 4,
    title: 'Alegría',
    description: 'Creamos momentos de felicidad que perduran en la memoria.',
    icon: '😄',
    color: 'from-pink-500 to-rose-600'
  }
]

// Milestones data
const milestones = [
  {
    year: 2015,
    title: 'Fundación de Tramboory',
    description: 'Abrimos nuestras puertas con el sueño de crear el mejor salón de eventos infantiles en Zapopan.'
  },
  {
    year: 2017,
    title: 'Expansión de Instalaciones',
    description: 'Ampliamos nuestras instalaciones para ofrecer más espacio y mejores experiencias.'
  },
  {
    year: 2019,
    title: 'Premio al Mejor Servicio',
    description: 'Reconocidos como el mejor salón de fiestas infantiles en la región.'
  },
  {
    year: 2021,
    title: 'Renovación Completa',
    description: 'Renovamos completamente nuestras instalaciones con tecnología de punta y nuevas temáticas.'
  },
  {
    year: 2023,
    title: 'Plataforma Digital',
    description: 'Lanzamos nuestra plataforma digital para facilitar reservaciones y personalización de eventos.'
  }
]

export function AboutTramboory() {
  const [activeTab, setActiveTab] = useState<'historia' | 'equipo' | 'instalaciones'>('historia')
  
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-tramboory-purple-900 to-indigo-950 text-white pb-20">
      {/* Decorative background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={30}
        connectionDistance={100}
        opacity={0.3}
      />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center z-10">
        <motion.h1 
          className="text-5xl md:text-6xl font-funhouse font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nuestra Historia
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-tramboory-yellow-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Descubre quiénes somos y cómo hacemos magia en cada evento infantil
        </motion.p>
        
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-tramboory-purple-400 to-tramboory-yellow-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        ></motion.div>
      </section>
      
      {/* Introduction Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative rounded-xl overflow-hidden h-[400px]"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Image 
              src="/img/background-noblur.webp"  // Placeholder - replace with actual about image
              alt="Salón Tramboory"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tramboory-purple-900 to-transparent opacity-60"></div>
          </motion.div>
          
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <h2 className="text-3xl font-funhouse font-bold mb-6 text-tramboory-yellow-300">¿Quiénes Somos?</h2>
            <p className="text-white/80 mb-6">
              En Tramboory, somos creadores de experiencias mágicas para la infancia. Fundado en 2015 por un grupo de entusiastas con la visión de transformar las celebraciones infantiles en Zapopan, hemos crecido para convertirnos en el destino preferido para fiestas infantiles en la región.
            </p>
            <p className="text-white/80 mb-6">
              Nuestra misión es crear recuerdos inolvidables para los niños y sus familias, ofreciendo un espacio seguro, creativo y lleno de diversión. Cada evento es una oportunidad para despertar la imaginación y celebrar la magia de la infancia.
            </p>
            <p className="text-white/80">
              Con un equipo dedicado de profesionales apasionados por la diversión infantil, instalaciones de primera clase y una atención meticulosa a cada detalle, garantizamos que cada celebración sea única y especial.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Navigation Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 z-10 relative">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setActiveTab('historia')}
            className={cn(
              "px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300",
              activeTab === 'historia' 
                ? "bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 text-white shadow-lg shadow-purple-900/20" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            Nuestra Historia
          </button>
          <button
            onClick={() => setActiveTab('equipo')}
            className={cn(
              "px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300",
              activeTab === 'equipo' 
                ? "bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 text-white shadow-lg shadow-purple-900/20" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            Nuestro Equipo
          </button>
          <button
            onClick={() => setActiveTab('instalaciones')}
            className={cn(
              "px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300",
              activeTab === 'instalaciones' 
                ? "bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 text-white shadow-lg shadow-purple-900/20" 
                : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            Instalaciones
          </button>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        {/* Historia Tab */}
        {activeTab === 'historia' && (
          <div className="space-y-16">
            {/* Valores */}
            <div>
              <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
                Nuestros Valores
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div 
                    key={value.id}
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                  >
                    <div className="p-6">
                      <div className={cn(
                        "w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl",
                        "bg-gradient-to-br", value.color
                      )}>
                        {value.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-tramboory-yellow-300">{value.title}</h3>
                      <p className="text-white/80 text-sm">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Timeline */}
            <div>
              <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
                Nuestra Trayectoria
              </h2>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-tramboory-purple-600/30"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div 
                      key={milestone.year}
                      className="relative flex flex-col md:flex-row"
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={index}
                    >
                      <div className={cn(
                        "flex-1 md:text-right mb-8 md:mb-0",
                        index % 2 === 0 ? "md:pr-12" : "md:order-last md:pl-12 md:pr-0"
                      )}>
                        <div className={cn(
                          "inline-block rounded-lg px-4 py-2 text-sm font-medium",
                          "bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-600 text-tramboory-purple-900"
                        )}>
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mt-3 mb-2 text-tramboory-yellow-300">{milestone.title}</h3>
                        <p className="text-white/80">{milestone.description}</p>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-tramboory-yellow-400 border-4 border-tramboory-purple-800"></div>
                      </div>
                      
                      <div className={cn(
                        "flex-1",
                        index % 2 === 0 ? "md:pl-12" : "md:order-first md:pr-12 md:text-right"
                      )}>
                        {/* Empty space for the right side on odd items */}
                        {index % 2 === 0 && <div></div>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Equipo Tab */}
        {activeTab === 'equipo' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
              Nuestro Equipo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={member.id}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="bg-gradient-to-br from-tramboory-purple-800/50 to-tramboory-purple-900/50 backdrop-blur-sm rounded-2xl overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                >
                  <div className="h-64 relative">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tramboory-purple-900 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-tramboory-yellow-300">{member.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{member.role}</p>
                    <p className="text-white/80 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-funhouse font-bold mb-6 text-tramboory-yellow-300">¿Quieres formar parte de nuestro equipo?</h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Siempre estamos buscando personas creativas y apasionadas para unirse a la familia Tramboory. 
                ¡Envíanos tu CV y cuéntanos por qué te encantaría trabajar con nosotros!
              </p>
              <Button className="bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 hover:from-tramboory-purple-700 hover:to-tramboory-purple-900 text-white">
                Enviar CV
              </Button>
            </div>
          </div>
        )}
        
        {/* Instalaciones Tab */}
        {activeTab === 'instalaciones' && (
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-12 text-center text-white">
                Nuestras Instalaciones
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
                >
                  <h3 className="text-2xl font-funhouse font-bold mb-6 text-tramboory-yellow-300">Un Espacio Diseñado para la Diversión</h3>
                  <p className="text-white/80 mb-6">
                    Nuestras instalaciones han sido cuidadosamente diseñadas para ofrecer un entorno seguro, divertido y estimulante para los niños. Con más de 500 m² de espacio, Tramboory cuenta con diferentes áreas temáticas que se adaptan a cada tipo de celebración.
                  </p>
                  <p className="text-white/80 mb-6">
                    Disponemos de un amplio salón principal, zona de juegos interactivos, área de comedor, espacio para presentaciones y shows, y un jardín exterior para actividades al aire libre cuando el clima lo permite.
                  </p>
                  <p className="text-white/80">
                    Todas nuestras áreas cumplen con los más altos estándares de seguridad, con materiales no tóxicos, esquinas redondeadas, y personal capacitado para supervisar a los pequeños en todo momento.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="relative rounded-xl overflow-hidden h-[400px]"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                >
                  <Image 
                    src="/img/blur.webp"  // Placeholder - replace with actual installations image
                    alt="Instalaciones Tramboory"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tramboory-purple-900 to-transparent opacity-60"></div>
                </motion.div>
              </div>
            </div>
            
            {/* Áreas Principales */}
            <div>
              <h3 className="text-2xl font-funhouse font-bold mb-8 text-center text-tramboory-yellow-300">Áreas Principales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
                  <div className="h-48 relative">
                    <Image 
                      src="/img/logo2.webp"  // Placeholder - replace with actual area image
                      alt="Salón Principal"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-tramboory-yellow-300">Salón Principal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">
                      Amplio espacio central con capacidad para hasta 100 personas, decoración personalizable según la temática elegida y excelente acústica para música y shows.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
                  <div className="h-48 relative">
                    <Image 
                      src="/img/noblur.webp"  // Placeholder - replace with actual area image
                      alt="Zona de Juegos"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-tramboory-yellow-300">Zona de Juegos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">
                      Área interactiva con juegos, toboganes, alberca de pelotas y actividades para diferentes edades, todo con supervisión constante.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
                  <div className="h-48 relative">
                    <Image 
                      src="/img/background-noblur.webp"  // Placeholder - replace with actual area image
                      alt="Comedor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-tramboory-yellow-300">Comedor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">
                      Espacio dedicado para disfrutar de nuestro menú de alimentos y bebidas, con mesas y sillas adaptadas para niños y adultos.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
                  <div className="h-48 relative">
                    <Image 
                      src="/img/LogoComplete.webp"  // Placeholder - replace with actual area image
                      alt="Escenario"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-tramboory-yellow-300">Escenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">
                      Plataforma elevada para shows, presentaciones especiales, animadores y el momento especial de soplar las velitas.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center z-10 relative">
        <div className="bg-gradient-to-r from-tramboory-purple-800 to-tramboory-purple-900 rounded-2xl p-10 shadow-2xl shadow-purple-800/30">
          <h2 className="text-3xl font-funhouse font-bold mb-4">¿Listo para crear recuerdos inolvidables?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            ¡Celebra con nosotros! Reserva ahora y deja que nos encarguemos de todos los detalles para la fiesta perfecta de tus pequeños.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-tramboory-purple-700 font-medium py-3 px-6 rounded-xl hover:bg-tramboory-purple-50 transition-all duration-300 shadow-lg">
              Reservar Ahora
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