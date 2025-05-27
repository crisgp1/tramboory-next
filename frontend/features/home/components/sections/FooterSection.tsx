'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FiHome, 
  FiCalendar, 
  FiInfo, 
  FiPhone, 
  FiMail,
  FiInstagram,
  FiFacebook,
  FiHeart
} from 'react-icons/fi'

export default function FooterSection() {
  const year = new Date().getFullYear()
  
  // Navigation links
  const navLinks = [
    { label: "Inicio", href: "/", icon: FiHome },
    { label: "Nosotros", href: "/about", icon: FiInfo },
    { label: "Galería", href: "/galeria", icon: FiHome },
    { label: "Reservaciones", href: "/reservas", icon: FiCalendar },
    { label: "Contacto", href: "/contacto", icon: FiPhone },
  ]
  
  // Social media links
  const socialLinks = [
    { icon: FiInstagram, href: "https://www.instagram.com/tramboory/", label: "Instagram" },
    { icon: FiFacebook, href: "https://www.facebook.com/tramboory/", label: "Facebook" }
  ]

  return (
    <footer className="relative z-10 pt-16 pb-8 bg-gradient-to-b from-transparent to-black/90">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 font-funhouse">Tramboory</h3>
            <p className="text-gray-400 mb-6">
              Creamos experiencias mágicas e inolvidables para las celebraciones de tus pequeños.
              Nuestro compromiso es hacer de cada evento un momento único y especial.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                    flex items-center justify-center transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="text-white" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white flex items-center"
                  >
                    <link.icon className="mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-400">
                <FiPhone className="mr-2 mt-1 flex-shrink-0" />
                <a href="tel:+523332300243" className="hover:text-white">
                  +52 33 3230 0243
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <FiMail className="mr-2 mt-1 flex-shrink-0" />
                <a href="mailto:info@tramboory.com" className="hover:text-white">
                  info@tramboory.com
                </a>
              </li>
              <li className="flex items-start text-gray-400">
                <FiHome className="mr-2 mt-1 flex-shrink-0" />
                <span>Av. Patria 123, Zapopan, Jalisco</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-500">
            &copy; {year} Tramboory. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm mt-2 flex items-center justify-center">
            Hecho con <FiHeart className="text-pink-500 mx-1" /> en Guadalajara, México
          </p>
        </div>
      </div>
    </footer>
  )
}