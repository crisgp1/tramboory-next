'use client'

import { motion } from 'framer-motion'
import { 
  FiCalendar, 
  FiDollarSign, 
  FiCheck, 
  FiSmile,
  FiArrowRight
} from 'react-icons/fi'

export default function ReservationStepsSection() {
  const steps = [
    {
      icon: FiCalendar,
      title: "Selecciona tu Fecha",
      description: "Consulta nuestro calendario de disponibilidad y elige el día perfecto para tu evento",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: FiDollarSign,
      title: "Elige tu Paquete",
      description: "Contamos con diferentes opciones para ajustarnos a tus necesidades y presupuesto",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: FiCheck,
      title: "Confirma tu Reserva",
      description: "Realiza tu pago inicial para asegurar la fecha y comenzar la planificación",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: FiSmile,
      title: "¡Disfruta tu Evento!",
      description: "Déjanos encargarnos de todo mientras tú y tus invitados viven una experiencia inolvidable",
      color: "from-yellow-400 to-yellow-600"
    }
  ]

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
            ¿Cómo Reservar?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Celebrar en Tramboory es muy sencillo, sigue estos 4 pasos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 
                hover:border-white/40 transition-all duration-300 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center
                  bg-gradient-to-r ${step.color}`}>
                  <step.icon className="text-2xl text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 mb-4">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-yellow-400">
                    <FiArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              {/* Step number bubble */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-yellow-400 
                flex items-center justify-center text-purple-900 font-bold text-lg">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <a 
            href="/reservas"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500
              text-purple-900 rounded-lg font-bold text-lg shadow-xl
              hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
          >
            Reservar Ahora
            <FiArrowRight className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}