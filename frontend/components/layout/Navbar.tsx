'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  FiMenu, 
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHome,
  FiPackage,
  FiUsers,
  FiBarChart,
  FiCalendar,
  FiDollarSign,
  FiImage,
  FiBell,
  FiShield
} from 'react-icons/fi'
import { usePathname } from 'next/navigation'

/**
 * Navbar Dashboard - Navegación para área administrativa
 * 
 * ### Arquitectura Visual Implementada:
 * - **Sistema de Gradientes Tramboory**: Purple/Yellow palette
 * - **Glassmorphism Effects**: Backdrop blur con transparencias
 * - **Micro-animaciones**: Hover states y transiciones fluidas
 * - **Responsive Design**: Mobile-first con breakpoints estratégicos
 * - **Accessibility Support**: ARIA labels y reduced motion
 */
export default function Navbar() {
  // Configuración de animaciones con soporte para reduced motion
  const prefersReducedMotion = useReducedMotion()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [notifications, setNotifications] = useState(3) // Simulación de notificaciones

  // Navegación Desktop - Elementos principales del navbar
  const desktopNavItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: FiHome 
    },
    { 
      href: '/dashboard/inventario', 
      label: 'Inventario', 
      icon: FiPackage,
      badge: '12'
    },
    { 
      href: '/dashboard/reservas', 
      label: 'Reservas', 
      icon: FiCalendar,
      badge: '5'
    },
    { 
      href: '/dashboard/reportes', 
      label: 'Reportes', 
      icon: FiBarChart,
      dropdown: [
        { href: '/dashboard/reportes/ventas', label: 'Ventas', icon: FiDollarSign },
        { href: '/dashboard/reportes/eventos', label: 'Eventos', icon: FiCalendar },
        { href: '/dashboard/reportes/clientes', label: 'Clientes', icon: FiUsers }
      ]
    }
  ]

  // Navegación Mobile - Incluye toda la navegación del sidebar
  const sidebarNavigation = [
    {
      category: 'Principal',
      items: [
        { 
          href: '/dashboard', 
          label: 'Dashboard', 
          icon: FiHome,
          description: 'Panel de control principal'
        },
        { 
          href: '/dashboard/inventario', 
          label: 'Inventario', 
          icon: FiPackage,
          badge: '12',
          description: 'Gestión de productos y stock'
        }
      ]
    },
    {
      category: 'Operaciones',
      items: [
        { 
          href: '/dashboard/reservas', 
          label: 'Reservas', 
          icon: FiCalendar,
          badge: '5',
          description: 'Gestión de reservas y eventos'
        },
        { 
          href: '/dashboard/clientes', 
          label: 'Clientes', 
          icon: FiUsers,
          description: 'Base de datos de clientes'
        },
        { 
          href: '/dashboard/galeria', 
          label: 'Galería', 
          icon: FiImage,
          description: 'Gestión de contenido multimedia'
        }
      ]
    },
    {
      category: 'Reportes y Análisis',
      items: [
        { 
          href: '/dashboard/reportes/ventas', 
          label: 'Reportes de Ventas', 
          icon: FiDollarSign,
          description: 'Análisis financiero y ventas'
        },
        { 
          href: '/dashboard/reportes/eventos', 
          label: 'Reportes de Eventos', 
          icon: FiCalendar,
          description: 'Estadísticas de eventos'
        },
        { 
          href: '/dashboard/reportes/clientes', 
          label: 'Análisis de Clientes', 
          icon: FiUsers,
          description: 'Comportamiento de clientes'
        }
      ]
    },
    {
      category: 'Configuración',
      items: [
        { 
          href: '/dashboard/seguridad', 
          label: 'Seguridad', 
          icon: FiShield,
          description: 'Configuración de seguridad'
        },
        { 
          href: '/dashboard/configuracion', 
          label: 'Configuración', 
          icon: FiSettings,
          description: 'Ajustes del sistema'
        }
      ]
    }
  ]

  // Configuración de usuario simulada
  const user = {
    name: 'Admin Tramboory',
    role: 'Administrador',
    avatar: '/images/avatar-placeholder.jpg'
  }

  // Manejo del scroll para efectos de transparencia
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Prevenir scroll cuando el menú móvil esté abierto
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

  // Toggle dropdown functionality
  const toggleDropdown = (href) => {
    setActiveDropdown(activeDropdown === href ? null : href)
  }

  // Simulación de logout
  const handleLogout = () => {
    console.log('Logout initiated')
    // Aquí iría la lógica de logout
  }

  // Configuración de animaciones
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: prefersReducedMotion ? 300 : 400,
        damping: prefersReducedMotion ? 40 : 25,
        mass: 1
      }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: prefersReducedMotion ? 0.2 : 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : index * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-tramboory-purple-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-gradient-to-r from-tramboory-purple-900/80 via-tramboory-purple-800/70 to-tramboory-purple-900/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Section - Enhanced with animations */}
          <motion.div 
            className="flex items-center space-x-3 flex-shrink-0"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <motion.div
                className="relative"
                whileHover={prefersReducedMotion ? {} : { rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-tramboory-yellow-400 to-tramboory-yellow-600 flex items-center justify-center shadow-lg">
                  <span className="text-tramboory-purple-900 font-bold text-lg lg:text-xl">T</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-tramboory-yellow-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              
              <div className="hidden sm:block">
                <motion.h1 
                  className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-tramboory-yellow-300 bg-clip-text text-transparent"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  Tramboory
                </motion.h1>
                <p className="text-xs text-tramboory-yellow-400/80 font-medium">Dashboard</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Elementos principales */}
          <div className="hidden lg:flex items-center space-x-1">
            {desktopNavItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                className="relative"
              >
                {item.dropdown ? (
                  // Dropdown Menu Item
                  <div className="relative">
                    <motion.button
                      onClick={() => toggleDropdown(item.href)}
                      className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                        activeDropdown === item.href || pathname.startsWith(item.href.split('/').slice(0, -1).join('/'))
                          ? 'text-tramboory-yellow-400 bg-white/10'
                          : 'text-white hover:text-tramboory-yellow-300'
                      }`}
                      whileHover={prefersReducedMotion ? {} : { y: -2 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    >
                      {/* Hover Effect Tramboory */}
                      <span 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                        style={{
                          background: `linear-gradient(
                            to bottom,
                            transparent 5%,
                            oklch(43.8% 0.218 303.724 / 0.15) 25%,
                            oklch(43.8% 0.218 303.724 / 0.15) 75%,
                            transparent 95%
                          )`,
                          backdropFilter: 'blur(8px)'
                        }}
                      />
                      
                      <motion.span 
                        className="text-tramboory-yellow-300 group-hover:text-white transition-colors duration-300 relative z-10"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.span>
                      
                      <span className="relative z-10">{item.label}</span>
                      
                      <motion.div
                        animate={{ rotate: activeDropdown === item.href ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <FiChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>

                    {/* Dropdown Content */}
                    <AnimatePresence>
                      {activeDropdown === item.href && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-tramboory-purple-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem, dropIndex) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className="group flex items-center space-x-3 px-4 py-3 hover:bg-white/5 transition-colors duration-200"
                            >
                              <dropdownItem.icon className="w-4 h-4 text-tramboory-yellow-400" />
                              <span className="text-white group-hover:text-tramboory-yellow-300 transition-colors">
                                {dropdownItem.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Regular Menu Item
                  <Link
                    href={item.href}
                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      pathname === item.href
                        ? 'text-tramboory-yellow-400 bg-white/10'
                        : 'text-white hover:text-tramboory-yellow-300'
                    }`}
                  >
                    {/* Hover Effect Tramboory */}
                    <span 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
                      style={{
                        background: `linear-gradient(
                          to bottom,
                          transparent 5%,
                          oklch(43.8% 0.218 303.724 / 0.15) 25%,
                          oklch(43.8% 0.218 303.724 / 0.15) 75%,
                          transparent 95%
                        )`,
                        backdropFilter: 'blur(8px)'
                      }}
                    />
                    
                    <motion.span 
                      className="text-tramboory-yellow-300 group-hover:text-white transition-colors duration-300 relative z-10"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.span>
                    
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Badge indicator */}
                    {item.badge && (
                      <motion.span 
                        className="bg-tramboory-yellow-400 text-tramboory-purple-900 text-xs font-bold px-2 py-1 rounded-full relative z-10"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      >
                        {item.badge}
                      </motion.span>
                    )}

                    {/* Active indicator */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-tramboory-yellow-400"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* User Section & Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              className="relative p-2 text-white hover:text-tramboory-yellow-400 transition-colors"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <FiBell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.button>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-tramboory-yellow-400">{user.role}</p>
              </div>
              
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-tramboory-yellow-400 to-tramboory-yellow-600 flex items-center justify-center cursor-pointer"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                <FiUser className="w-5 h-5 text-tramboory-purple-900" />
              </motion.div>
            </div>

            {/* Settings & Logout */}
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 text-white hover:text-tramboory-yellow-400 transition-colors"
                whileHover={prefersReducedMotion ? {} : { rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <FiSettings className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-all duration-300 flex items-center space-x-2"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <FiLogOut className="w-4 h-4" />
                <span>Salir</span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-tramboory-yellow-400 transition-colors p-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu - Navegación completa del sidebar integrada */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden border-t border-white/10 mt-4 pt-4 pb-6 max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Navegación organizada por categorías */}
                {sidebarNavigation.map((section, sectionIndex) => (
                  <motion.div
                    key={section.category}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={sectionIndex}
                    className="space-y-3"
                  >
                    {/* Título de categoría */}
                    <div className="px-4">
                      <h3 className="text-xs font-semibold text-tramboory-yellow-400 uppercase tracking-wider">
                        {section.category}
                      </h3>
                      <div className="mt-2 h-px bg-gradient-to-r from-tramboory-yellow-400/30 to-transparent" />
                    </div>
                    
                    {/* Items de navegación de la categoría */}
                    <div className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <motion.div
                          key={item.href}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={sectionIndex * 10 + itemIndex}
                        >
                          <Link
                            href={item.href}
                            className={`group flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all duration-300 ${
                              pathname === item.href
                                ? 'text-tramboory-yellow-400 bg-white/10 shadow-lg'
                                : 'text-white hover:bg-white/5 hover:text-tramboory-yellow-300'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {/* Contenido del item */}
                            <div className="flex items-start space-x-3 flex-1">
                              {/* Icono con efecto de brillo */}
                              <div className="relative flex-shrink-0 mt-0.5">
                                <motion.div
                                  className="text-tramboory-yellow-400 group-hover:text-white transition-colors duration-300"
                                  whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                                >
                                  <item.icon className="w-5 h-5" />
                                </motion.div>
                                
                                {/* Efecto de resplandor en hover */}
                                <div className="absolute inset-0 rounded-full bg-tramboory-yellow-400/20 scale-0 group-hover:scale-150 transition-transform duration-300 blur-sm" />
                              </div>
                              
                              {/* Contenido textual */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium truncate">{item.label}</span>
                                  {item.badge && (
                                    <motion.span 
                                      className="bg-tramboory-yellow-400 text-tramboory-purple-900 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                                    >
                                      {item.badge}
                                    </motion.span>
                                  )}
                                </div>
                                
                                {/* Descripción del elemento */}
                                <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 mt-1 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            
                            {/* Indicador de página activa */}
                            {pathname === item.href && (
                              <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-2 h-2 bg-tramboory-yellow-400 rounded-full flex-shrink-0"
                              />
                            )}
                            
                            {/* Chevron de navegación */}
                            <motion.div
                              className="text-white/40 group-hover:text-tramboory-yellow-400 transition-colors duration-300 flex-shrink-0 ml-2"
                              whileHover={prefersReducedMotion ? {} : { x: 2 }}
                            >
                              <FiChevronRight className="w-4 h-4" />
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                {/* Sección de acciones rápidas */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={sidebarNavigation.length + 1}
                  className="space-y-3 pt-4 border-t border-white/10"
                >
                  <div className="px-4">
                    <h3 className="text-xs font-semibold text-tramboory-yellow-400 uppercase tracking-wider">
                      Acciones Rápidas
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 px-2">
                    {/* Botón de nueva reserva */}
                    <motion.button
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-tramboory-yellow-400/20 to-tramboory-yellow-600/10 rounded-xl border border-tramboory-yellow-400/30 hover:from-tramboory-yellow-400/30 hover:to-tramboory-yellow-600/20 transition-all duration-300"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    >
                      <FiCalendar className="w-6 h-6 text-tramboory-yellow-400 mb-2" />
                      <span className="text-xs text-white font-medium">Nueva Reserva</span>
                    </motion.button>
                    
                    {/* Botón de agregar producto */}
                    <motion.button
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-tramboory-yellow-400/20 to-tramboory-yellow-600/10 rounded-xl border border-tramboory-yellow-400/30 hover:from-tramboory-yellow-400/30 hover:to-tramboory-yellow-600/20 transition-all duration-300"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    >
                      <FiPackage className="w-6 h-6 text-tramboory-yellow-400 mb-2" />
                      <span className="text-xs text-white font-medium">Agregar Producto</span>
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Mobile User Section - Mejorada */}
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={sidebarNavigation.length + 2}
                  className="border-t border-white/10 pt-6 mt-6"
                >
                  {/* Información del usuario */}
                  <div className="flex items-center space-x-4 px-4 py-3 mx-2 rounded-xl bg-white/5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tramboory-yellow-400 to-tramboory-yellow-600 flex items-center justify-center shadow-lg">
                      <FiUser className="w-6 h-6 text-tramboory-purple-900" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-tramboory-yellow-400">{user.role}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-xs text-white/60">En línea</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Acciones de usuario */}
                  <div className="space-y-2 mt-4 px-2">
                    {/* Notificaciones */}
                    <button className="w-full flex items-center justify-between px-4 py-3 text-white hover:text-tramboory-yellow-400 hover:bg-white/5 rounded-lg transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <FiBell className="w-5 h-5" />
                        <span>Notificaciones</span>
                      </div>
                      {notifications > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </button>
                    
                    {/* Configuración */}
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-white hover:text-tramboory-yellow-400 hover:bg-white/5 rounded-lg transition-all duration-300">
                      <FiSettings className="w-5 h-5" />
                      <span>Configuración</span>
                    </button>
                    
                    {/* Cerrar sesión */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}