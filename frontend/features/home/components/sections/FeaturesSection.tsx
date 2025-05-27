'use client'

import { motion } from 'framer-motion'
import { 
  FiStar, 
  FiSmile, 
  FiUsers, 
  FiShield, 
  FiMusic, 
  FiCoffee 
} from 'react-icons/fi'

export default function FeaturesSection() {
  const features = [
    {
      icon: FiStar,
      title: 'Instalaciones de Primer Nivel',
      description: 'Contamos con un espacio amplio, seguro y moderno, diseñado para celebraciones infantiles.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: FiSmile,
      title: 'Diversión Garantizada',
      description: 'Juegos, actividades y animación profesional para mantener a los pequeños entretenidos.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: FiUsers,
      title: 'Equipo Profesional',
      description: 'Personal capacitado y amable que se encarga de cada detalle para tu tranquilidad.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: FiShield,
      title: 'Seguridad Total',
      description: 'Ambientes controlados y seguros para que los niños jueguen sin preocupaciones.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: FiMusic,
      title: 'Ambiente Festivo',
      description: 'Música, iluminación y decoración que crean la atmósfera perfecta para celebrar.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: FiCoffee,
      title: 'Gastronomía Deliciosa',
      description: 'Menús especiales para niños y adultos, con opciones para todos los gustos.',
      color: 'from-orange-400 to-orange-600'
    }
  ]

  return (
    <section className="py-20 relative z-10 bg-gradient-to-b from-transparent to-purple-900/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4 font-funhouse">
            ¿Por Qué Elegir Tramboory?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Somos expertos en crear experiencias mágicas e inolvidables para toda la familia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 
                hover:border-white/40 hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center
                  bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />
    </section>
  )
}