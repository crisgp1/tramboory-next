'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiLogIn,
  FiUserPlus,
  FiPackage,
  FiImage,
  FiCalendar
} from 'react-icons/fi'
import { 
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlinePhone,
  HiHeart
} from 'react-icons/hi'
import { usePathname } from 'next/navigation'

/**
 * NavbarPublic - Enhanced navigation component for public-facing pages
 * Features rich animations, gradient effects, and responsive design
 */
export default function NavbarPublic() {
  // Use the reduced motion hook to respect user's system preferences
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Main navigation items
  const navItems = [
    { 
      href: '/', 
      label: 'Inicio', 
      icon: HiOutlineHome 
    },
    { 
      href: '/catalogo', 
      label: 'Paquetes', 
      icon: FiPackage
    },
    { 
      href: '/nosotros', 
      label: 'Nosotros', 
      icon: HiOutlineInformationCircle
    },
    { 
      href: '/galeria', 
      label: 'Galería', 
      icon: FiImage
    },
    { 
      href: '/contacto', 
      label: 'Contacto', 
      icon: HiOutlinePhone 
    }
  ]
  
  // Handle scroll effect for navbar transparency - with optimization for performance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial call to set the correct state
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close mobile menu when path changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  
  // Effect to prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])
  
  // Toggle dropdown menu
  const toggleDropdown = (href: string) => {
    if (activeDropdown === href) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(href)
    }
  }

  // Animation variants - with reduced intensity to avoid zoom issues
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: prefersReducedMotion ? 50 : 100,
        damping: 20,
        duration: 0.6
      }
    }
  }
  
  const logoVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    },
    // More subtle hover to prevent animation issues
    hover: prefersReducedMotion 
      ? {} 
      : {
        scale: 1.05,
        transition: {
          duration: 0.3,
          ease: "easeOut"
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
    hover: prefersReducedMotion 
      ? { color: "#facc15" } 
      : {
        y: -2,
        color: "#facc15",
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
        duration: 0.4
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
      {/* Animated gradient line at top - simplified for better performance */}
      <div className="h-0.5 w-full overflow-hidden">
        <motion.div 
          className="h-full w-full bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400"
          animate={prefersReducedMotion ? {} : { 
            x: ['-100%', '100%'],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "linear",
            repeatDelay: 0.5
          }}
        />
      </div>
      
      <div className="w-full px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo with optimized animations */}
          <div className="flex-shrink-0">
            <Link href="/" className="relative z-10 group">
              <div className="flex items-center">
                <motion.div
                  variants={logoVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="relative h-10 w-auto"
                >
                  {/* Logo glow effect - only if not reduced motion */}
                  {!prefersReducedMotion && (
                    <motion.div 
                      className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 blur-md z-0"
                      animate={{
                        opacity: [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  )}
                  
                  {/* Logo animation on scroll */}
                  <div className="relative">
                    <Image
                      src="/img/logo2.webp"
                      alt="Tramboory Complete"
                      width={200}
                      height={90}
                      className={`object-contain relative z-10 transition-all duration-500 ${
                        isScrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                      }`}
                      priority
                    />
                    <Image
                      src="/img/logo.webp"
                      alt="Tramboory"
                      width={200}
                      height={90}
                      className={`object-contain absolute top-0 left-0 z-10 transition-all duration-500 ${
                        isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      }`}
                      priority
                    />
                  </div>
                  
                  {/* Decorative line under logo on hover - simplified */}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/80 to-yellow-300/0 group-hover:w-full transition-all duration-300"
                  />
                </motion.div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - Further right aligned with refined styling */}
          <div className="hidden lg:flex items-center justify-end flex-1 pr-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item, index) => (
                <div key={item.href} className="relative group">
                  <motion.div
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Link
                      href={item.href}
                      className={`relative px-2 py-1 text-[0.7rem] uppercase tracking-tight font-light transition-colors duration-300 flex items-center group ${
                        pathname === item.href
                          ? 'text-yellow-400'
                          : 'text-white hover:text-yellow-300'
                      }`}
                    >
                      {/* Subtle hover glow effect */}
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-colors duration-300"></span>
                      
                      <motion.span 
                        className="text-yellow-300 group-hover:text-white transition-colors duration-300"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <item.icon className="w-3.5 h-3.5 mr-1" />
                      </motion.span>
                      
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                  
                  {/* Active indicator - yellow underline */}
                  {pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Authentication Buttons - Right aligned with refined styling */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
            >
              <Link href="/login">
                <button
                  className="px-2.5 py-0.5 text-[0.7rem] uppercase tracking-tight font-light text-white bg-purple-900/80 hover:bg-purple-800
                    rounded-md border border-white/10 flex items-center h-7 relative group overflow-hidden"
                >
                  {/* Subtle hover glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  
                  <motion.span 
                    whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiLogIn className="mr-2" />
                  </motion.span>
                  <span>Iniciar sesión</span>
                </button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
            >
              <Link href="/register">
                <button
                  className="px-2.5 py-0.5 text-[0.7rem] uppercase tracking-tight font-light text-purple-950 bg-yellow-400 hover:bg-yellow-300
                    rounded-md flex items-center h-7 relative group overflow-hidden"
                >
                  {/* Button glow effect - limited for better performance */}
                  {!prefersReducedMotion && (
                    <motion.span 
                      className="absolute inset-0 rounded-md bg-yellow-400/20 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ 
                        opacity: [0, 0.2, 0],
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                  
                  <motion.span 
                    whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FiUserPlus className="mr-2" />
                  </motion.span>
                  <span>Registrarse</span>
                </button>
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button - with optimized animations */}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiX className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiMenu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Navigation - with better animation constraints */}
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
                        className={`flex items-center justify-between px-4 py-3 rounded-lg group relative overflow-hidden ${
                          pathname === item.href
                            ? 'text-yellow-400 bg-white/10'
                            : 'text-white hover:bg-white/5'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {/* Subtle hover glow effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        
                        <span className="flex items-center relative z-10">
                          <motion.span 
                            className="text-yellow-400 group-hover:text-white transition-colors duration-300"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          >
                            <item.icon className="w-5 h-5 mr-3" />
                          </motion.span>
                          <span className="group-hover:text-yellow-300 transition-colors duration-300">
                            {item.label}
                          </span>
                        </span>
                        
                        {pathname === item.href && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-yellow-400"
                          />
                        )}
                      </Link>
                    </motion.div>
                  </div>
                ))}
                
                {/* Authentication Buttons (Mobile) */}
                <div className="mt-3 space-y-2">
                  <Link href="/login">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center px-4 py-3 text-white bg-purple-800/50 hover:bg-purple-700/70 rounded-lg group relative overflow-hidden"
                    >
                      {/* Subtle glow effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      
                      <motion.span
                        whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
                        className="w-5 h-5 mr-3 text-yellow-400 group-hover:text-white transition-colors duration-300"
                      >
                        <FiLogIn />
                      </motion.span>
                      <span className="group-hover:text-yellow-300 transition-colors duration-300">Iniciar sesión</span>
                    </motion.div>
                  </Link>
                  <Link href="/register">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex items-center px-4 py-3 text-purple-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg group relative overflow-hidden"
                    >
                      {/* Button glow effect */}
                      {!prefersReducedMotion && (
                        <motion.span 
                          className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={{ 
                            opacity: [0, 0.2, 0],
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      )}
                      
                      <motion.span
                        whileHover={prefersReducedMotion ? {} : { rotate: 10, scale: 1.1 }}
                        className="w-5 h-5 mr-3"
                      >
                        <FiUserPlus />
                      </motion.span>
                      <span>Registrarse</span>
                    </motion.div>
                  </Link>
                </div>
                
                {/* Footer elements for mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 border-t border-white/10 flex justify-center"
                >
                  <p className="text-sm text-gray-400 flex items-center">
                    Hecho con <HiHeart className="text-pink-500 mx-1" /> en Guadalajara
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