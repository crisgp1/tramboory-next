'use client'

import { motion } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiMessageCircle,
  FiInstagram,
  FiFacebook,
  FiArrowRight
} from 'react-icons/fi'

export default function ContactSection() {
  // Contact information
  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Ubicación",
      details: "Av. Patria 123, Zapopan, Jalisco",
      action: "Ver Mapa",
      url: "https://maps.google.com",
      color: "bg-blue-500/20",
      textColor: "text-blue-400"
    },
    {
      icon: FiPhone,
      title: "Teléfono",
      details: "+52 33 3230 0243",
      action: "Llamar",
      url: "tel:+523332300243",
      color: "bg-green-500/20",
      textColor: "text-green-400"
    },
    {
      icon: FiMail,
      title: "Correo",
      details: "info@tramboory.com",
      action: "Enviar Correo",
      url: "mailto:info@tramboory.com",
      color: "bg-yellow-500/20",
      textColor: "text-yellow-400"
    },
    {
      icon: FiClock,
      title: "Horario",
      details: "Martes a Domingo: 10am - 8pm",
      action: "Ver Disponibilidad",
      url: "/reservas",
      color: "bg-purple-500/20",
      textColor: "text-purple-400"
    },
  ]

  // Social media links
  const socialLinks = [
    {
      icon: FiInstagram,
      url: "https://www.instagram.com/tramboory/",
      label: "Instagram",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: FiFacebook,
      url: "https://www.facebook.com/tramboory/",
      label: "Facebook",
      color: "from-blue-500 to-blue-700"
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
            Contáctanos
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes alguna pregunta o quieres hacer una reservación? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 
                hover:border-white/40 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-full ${info.color} flex items-center justify-center mb-4`}>
                <info.icon className={`text-xl ${info.textColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
              <p className="text-gray-300 mb-4">{info.details}</p>
              
              <a 
                href={info.url}
                className="inline-flex items-center text-sm font-medium text-yellow-400 hover:text-yellow-300"
                target={info.url.startsWith('http') ? "_blank" : undefined}
                rel={info.url.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {info.action}
                <FiArrowRight className="ml-1" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-green-800/80 to-green-700/80 p-10 rounded-2xl border border-white/10 text-center backdrop-blur-lg mb-16"
        >
          <h3 className="text-3xl font-bold text-white mb-4 font-funhouse">
            ¿Quieres información inmediata?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Contáctanos por WhatsApp y recibe atención personalizada al instante
          </p>
          
          <motion.button
            onClick={() => {
              window.open("https://wa.me/523332300243?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20para%20fiestas%20infantiles.", '_blank', 'noopener,noreferrer');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center space-x-2 py-3 px-6
              bg-white text-green-700 rounded-lg font-bold hover:bg-gray-100
              transition-colors duration-300 shadow-lg"
            aria-label="Contactar por WhatsApp"
          >
            <FiMessageCircle className="text-xl" />
            <span>Contactar por WhatsApp</span>
          </motion.button>
        </motion.div>

        {/* Social Media */}
        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center
                shadow-lg transition-transform duration-300`}
              aria-label={social.label}
            >
              <social.icon className="text-xl text-white" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}