'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiLogIn,
  FiUserPlus
} from 'react-icons/fi'
import { 
  HiOutlineHome,
  HiOutlinePhotograph,
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
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  
  // Main navigation items
  const navItems = [
    { 
      href: '/', 
      label: 'Inicio', 
      icon: HiOutlineHome 
    },
    { 
      href: '/paquetes', 
      label: 'Paquetes', 
      icon: HiOutlinePhotograph
    },
    { 
      href: '/nosotros', 
      label: 'Nosotros', 
      icon: HiOutlineInformationCircle
    },
    { 
      href: '/contacto', 
      label: 'Contacto', 
      icon: HiOutlinePhone 
    }
  ]
  
  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
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
        type: "tween",
        ease: "easeInOut"
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
  
  // CTA button variants removed

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
        <div className={`flex items-center justify-between ${isScrolled ? 'h-16' : 'h-24'} transition-all duration-300`}>
          {/* Logo */}
          <Link href="/" className="relative z-10 group">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center"
            >
              <div className="flex flex-col items-center">
                <div className={`relative ${isScrolled ? 'h-[45px]' : 'h-[65px]'} w-auto overflow-visible transition-all duration-300`}>
                  <Image
                    src="/img/logo.webp"
                    alt="Tramboory"
                    width={isScrolled ? 160 : 220}
                    height={isScrolled ? 45 : 65}
                    className="object-contain transition-all duration-300"
                    priority
                  />
                </div>
                <div 
                  className={`text-center font-funhouse text-white transition-all duration-300 ${
                    isScrolled ? 'text-[6px] mt-[-5px]' : 'text-[8px] mt-[-7px]'
                  }`}
                  style={{ 
                    letterSpacing: isScrolled ? '0.5px' : '0.8px'
                  }}
                >
                  SALON DE EVENTOS
                </div>
              </div>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-6">
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
                    onClick={() => {
                      // Simple navigation, no dropdown
                    }}
                  >
                    <item.icon className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{item.label}</span>
                    
                    {/* Hover effect */}
                    <motion.span 
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                
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
          </div>
          
          {/* Authentication Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-800/50 hover:bg-purple-700/70 rounded-lg border border-white/10 flex items-center"
              >
                <FiLogIn className="mr-2" />
                Iniciar sesión
              </motion.button>
            </Link>
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-purple-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg flex items-center"
              >
                <FiUserPlus className="mr-2" />
                Registrarse
              </motion.button>
            </Link>
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="flex items-center">
                          <item.icon className="w-5 h-5 mr-3 text-yellow-400" />
                          <span>{item.label}</span>
                        </span>
                      </Link>
                    </motion.div>
                    
                {/* Authentication Buttons (Mobile) */}
                <div className="mt-3 space-y-2">
                  <Link href="/login">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center px-4 py-3 text-white bg-purple-800/50 hover:bg-purple-700/70 rounded-lg"
                    >
                      <FiLogIn className="w-5 h-5 mr-3" />
                      <span>Iniciar sesión</span>
                    </motion.div>
                  </Link>
                  <Link href="/register">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                      className="flex items-center px-4 py-3 text-purple-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg"
                    >
                      <FiUserPlus className="w-5 h-5 mr-3" />
                      <span>Registrarse</span>
                    </motion.div>
                  </Link>
                </div>
                  </div>
                ))}
                
                {/* Mobile CTA removed */}
                
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