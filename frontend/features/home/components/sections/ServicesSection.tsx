'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

interface ServiceFeature {
  title: string
  description: string
  icon: React.ElementType
}

interface ServicePackage {
  title: string
  description: string
  price: string
  features: ServiceFeature[]
  highlights: string[]
  recommended: boolean
}

interface ServicesSectionProps {
  services: {
    normal: ServicePackage
    matutino: ServicePackage
  }
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-funhouse">
            Nuestros Paquetes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Elige la opción que mejor se adapte a tus necesidades y presupuesto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Paquete Normal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => setHoveredCard('normal')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
              transition-all duration-500 transform hover:scale-[1.02]
              ${services.normal.recommended ? 'border-4 border-yellow-400 shadow-xl shadow-yellow-400/20' : 'border border-white/20'}`}
          >
            {services.normal.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-yellow-400 text-purple-900 py-1 px-4 font-bold text-sm rotate-45 translate-x-[18px] translate-y-[10px]">
                  Recomendado
                </div>
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-2 font-funhouse">{services.normal.title}</h3>
              <p className="text-gray-300 mb-6">{services.normal.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${services.normal.price}</span>
                <span className="text-gray-400 ml-2">/evento</span>
              </div>
              
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {services.normal.highlights.map((highlight, index) => (
                  <span 
                    key={index}
                    className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-8">
                {services.normal.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 bg-green-500/20 p-1 rounded-full">
                      <FiCheck className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/reservas"
                className="block w-full py-3 px-6 text-center bg-yellow-400 hover:bg-yellow-500 
                  text-purple-900 rounded-lg font-bold transition-all duration-300"
              >
                Reservar Ahora
                <FiArrowRight className="inline ml-2" />
              </Link>
            </div>
            
            {/* Animated gradient border on hover */}
            <div 
              className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                ${hoveredCard === 'normal' ? 'opacity-100' : 'opacity-0'}
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                animate-shine`}
            />
          </motion.div>
          
          {/* Paquete Matutino */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredCard('matutino')}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden 
              transition-all duration-500 transform hover:scale-[1.02]
              ${services.matutino.recommended ? 'border-4 border-yellow-400 shadow-xl shadow-yellow-400/20' : 'border border-white/20'}`}
          >
            {services.matutino.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-yellow-400 text-purple-900 py-1 px-4 font-bold text-sm rotate-45 translate-x-[18px] translate-y-[10px]">
                  Recomendado
                </div>
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-3xl font-bold text-white mb-2 font-funhouse">{services.matutino.title}</h3>
              <p className="text-gray-300 mb-6">{services.matutino.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">${services.matutino.price}</span>
                <span className="text-gray-400 ml-2">/evento</span>
              </div>
              
              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-8">
                {services.matutino.highlights.map((highlight, index) => (
                  <span 
                    key={index}
                    className="bg-purple-400/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              
              {/* Features */}
              <div className="space-y-4 mb-8">
                {services.matutino.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mt-1 mr-3 bg-green-500/20 p-1 rounded-full">
                      <FiCheck className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/reservas"
                className="block w-full py-3 px-6 text-center bg-purple-600 hover:bg-purple-700 
                  text-white rounded-lg font-bold transition-all duration-300"
              >
                Reservar Ahora
                <FiArrowRight className="inline ml-2" />
              </Link>
            </div>
            
            {/* Animated gradient border on hover */}
            <div 
              className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                ${hoveredCard === 'matutino' ? 'opacity-100' : 'opacity-0'}
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                animate-shine`}
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/cotizaciones"
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/30
              text-white rounded-lg font-semibold
              hover:bg-white/20 transition-all duration-300"
          >
            Ver más detalles de nuestros paquetes
            <FiArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}