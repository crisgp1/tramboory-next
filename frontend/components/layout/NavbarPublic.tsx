'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMenu, 
  FiX, 
  FiCalendar, 
  FiInfo, 
  FiImage, 
  FiHome, 
  FiPhone,
  FiHeart,
  FiChevronDown
} from 'react-icons/fi'
import { usePathname } from 'next/navigation'

/**
 * NavbarPublic - Enhanced navigation component for public-facing pages
 * Features rich animations, gradient effects, and responsive design
 */
export default function NavbarPublic() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  
  // Main navigation items
  const navItems = [
    { 
      href: '/', 
      label: 'Inicio', 
      icon: FiHome 
    },
    { 
      href: '/about', 
      label: 'Nosotros', 
      icon: FiInfo,
      dropdown: [
        { href: '/about#historia', label: 'Nuestra Historia' },
        { href: '/about#equipo', label: 'Nuestro Equipo' },
        { href: '/about#valores', label: 'Valores' }
      ]
    },
    { 
      href: '/galeria', 
      label: 'Galería', 
      icon: FiImage 
    },
    { 
      href: '/reservas', 
      label: 'Reservar', 
      icon: FiCalendar,
      dropdown: [
        { href: '/reservas#paquetes', label: 'Nuestros Paquetes' },
        { href: '/reservas#fechas', label: 'Fechas Disponibles' },
        { href: '/reservas#proceso', label: 'Proceso de Reserva' }
      ]
    },
    { 
      href: '#contact', 
      label: 'Contacto', 
      icon: FiPhone 
    },
  ]
  
  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)

    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  // Toggle dropdown menu
  const toggleDropdown = (href: string) => {
    if (activeDropdown === href) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(href)
    }
  }

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  }
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  }
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.2 + (custom * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -3,
      color: "#facc15",
      transition: {
        duration: 0.2
      }
    }
  }
  
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  }
  
  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  }
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        opacity: { duration: 0.2 }
      }
    }
  }
  
  const ctaButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-purple-950/90 backdrop-blur-xl shadow-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      {/* Animated gradient line at top */}
      <div className="h-0.5 w-full overflow-hidden">
        <motion.div 
          className="h-full w-full bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400"
          animate={{ 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "linear",
            repeatDelay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center space-x-3"
            >
              <div className="relative w-14 h-14 overflow-hidden rounded-full" style={{ height: '56px' }}>
                <Image
                  src="/img/logo.webp"
                  alt="Tramboory"
                  fill
                  sizes="(max-width: 768px) 56px, 56px"
                  className="object-cover transition-transform duration-300"
                  priority
                />
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/50 to-purple-500/50 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300"
                />
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-funhouse transition-colors duration-300 relative">
                  Tramboory
                  {/* Animated underline */}
                  <motion.span 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0"
                    animate={{ 
                      scaleX: [0, 1, 0],
                      x: [-100, 0, 100]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1
                    }}
                  />
                </span>
                <span className="text-xs text-yellow-300/80 hidden sm:block">Salón de Fiestas Infantiles</span>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.href} className="relative group">
                <motion.div
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover="hover"
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center ${
                      pathname === item.href
                        ? 'text-yellow-400 bg-white/5'
                        : 'text-white hover:bg-white/5'
                    }`}
                    onClick={(e) => {
                      if (item.dropdown) {
                        e.preventDefault()
                        toggleDropdown(item.href)
                      }
                    }}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <FiChevronDown className={`ml-1 transition-transform duration-300 ${
                        activeDropdown === item.href ? 'rotate-180' : ''
                      }`} />
                    )}
                    
                    {/* Hover effect */}
                    <motion.span 
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.href && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-0 mt-2 w-56 bg-purple-950/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/10 overflow-hidden z-20"
                      >
                        {item.dropdown.map((dropdownItem, idx) => (
                          <motion.div
                            key={dropdownItem.href}
                            variants={dropdownItemVariants}
                            custom={idx}
                          >
                            <Link
                              href={dropdownItem.href}
                              className="block px-4 py-3 text-sm text-white hover:bg-white/10 hover:text-yellow-300 transition-colors duration-300"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropdownItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                
                {/* Active indicator */}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/50 via-yellow-400 to-yellow-400/50"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <motion.div
              variants={ctaButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/reservas"
                className="relative px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 
                  text-purple-900 rounded-xl font-extrabold text-base 
                  shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Animated shine effect */}
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-white/30 to-yellow-400/0"
                  animate={{ 
                    x: ['-100%', '100%'],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 1,
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                />
                <span className="flex items-center relative z-10">
                  <FiCalendar className="mr-2" />
                  <span>Reserva Ahora</span>
                </span>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-12 h-12 flex items-center justify-center text-white 
              bg-white/10 backdrop-blur-md rounded-full border border-white/20
              hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiX className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiMenu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden bg-purple-950/95 backdrop-blur-xl rounded-xl mt-2 border border-white/10 shadow-2xl"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <div key={item.href} className="py-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + (index * 0.05) }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                          pathname === item.href
                            ? 'text-yellow-400 bg-white/10'
                            : 'text-white hover:bg-white/5'
                        }`}
                        onClick={(e) => {
                          if (item.dropdown) {
                            e.preventDefault()
                            toggleDropdown(item.href)
                          } else {
                            setIsMobileMenuOpen(false)
                          }
                        }}
                      >
                        <span className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3" />
                          <span>{item.label}</span>
                        </span>
                        {item.dropdown && (
                          <FiChevronDown className={`transition-transform duration-300 ${
                            activeDropdown === item.href ? 'rotate-180' : ''
                          }`} />
                        )}
                      </Link>
                    </motion.div>
                    
                    {/* Dropdown items */}
                    {item.dropdown && activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 ml-10 overflow-hidden border-l-2 border-white/10 pl-4 space-y-1"
                      >
                        {item.dropdown.map((dropdownItem, idx) => (
                          <motion.div
                            key={dropdownItem.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + (idx * 0.05) }}
                          >
                            <Link
                              href={dropdownItem.href}
                              className="block py-2 px-3 text-sm text-gray-300 hover:text-yellow-300 rounded-lg hover:bg-white/5 transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-2"
                >
                  <Link
                    href="/reservas"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-4 bg-gradient-to-r 
                      from-yellow-400 to-yellow-500 text-purple-900 rounded-xl font-bold 
                      hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
                  >
                    <FiCalendar className="text-xl" />
                    <span>Reserva Ahora</span>
                  </Link>
                </motion.div>
                
                {/* Footer elements for mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 border-t border-white/10 flex justify-center"
                >
                  <p className="text-sm text-gray-400 flex items-center">
                    Hecho con <FiHeart className="text-pink-500 mx-1" /> en Guadalajara
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}