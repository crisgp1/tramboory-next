'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCalendar, FiInfo, FiImage, FiLogOut, FiUser } from 'react-icons/fi'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { href: '/', label: 'Inicio', icon: null },
  { href: '/about', label: 'Acerca de', icon: FiInfo },
  { href: '/galeria', label: 'Galería', icon: FiImage },
  { href: '/reservas', label: 'Reservar', icon: FiCalendar },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-purple-950/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full">
              <Image
                src="/images/logo2.webp"
                alt="Tramboory"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white font-funhouse hidden sm:block group-hover:text-yellow-400 transition-colors">
              Tramboory
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  pathname === item.href
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-300'
                }`}
              >
                <span className="flex items-center space-x-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </span>
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <FiUser className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full">
                    {user?.role === 'admin' ? 'Admin' : user?.role === 'employee' ? 'Empleado' : 'Cliente'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-all duration-300"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-white hover:text-yellow-400 transition-colors duration-300"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/reservas"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-lg font-bold text-sm hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Reserva Ahora
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-yellow-400 bg-purple-800/50'
                        : 'text-white hover:text-yellow-300 hover:bg-purple-800/30'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.label}</span>
                    </span>
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                {isAuthenticated ? (
                  <div className="mt-4 space-y-3">
                    <div className="px-3 py-2 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiUser className="w-4 h-4" />
                        <span className="text-sm font-medium">{user?.name}</span>
                      </div>
                      <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full">
                        {user?.role === 'admin' ? 'Admin' : user?.role === 'employee' ? 'Empleado' : 'Cliente'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-3 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <Link
                      href="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-3 py-3 text-center text-white hover:text-yellow-400 border border-white/30 rounded-lg transition-colors duration-300"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/reservas"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-3 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 rounded-lg font-bold text-center hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                    >
                      Reserva Ahora
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}