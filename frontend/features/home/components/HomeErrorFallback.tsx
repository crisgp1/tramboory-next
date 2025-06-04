'use client'

import { motion } from 'framer-motion'
import { FiAlertTriangle, FiRefreshCw, FiHome, FiMail, FiPhone } from 'react-icons/fi'
import Link from 'next/link'

interface HomeErrorFallbackProps {
  error?: Error | null
  onRetry?: () => void
  variant?: 'full' | 'section'
  title?: string
  message?: string
}

/**
 * HomeErrorFallback - Error handling component for the home feature
 * 
 * Features:
 * - Multiple error display variants (full page, section)
 * - Retry functionality
 * - Contact information for support
 * - Animated error illustrations
 * - Tramboory theme integration
 * - Accessibility support
 */
export function HomeErrorFallback({
  error,
  onRetry,
  variant = 'full',
  title,
  message
}: HomeErrorFallbackProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  const errorTitle = title || (variant === 'full' ? 'Oops! Algo salió mal' : 'Error al cargar contenido')
  const errorMessage = message || (
    variant === 'full' 
      ? 'No pudimos cargar la página de inicio. Por favor, inténtalo de nuevo.'
      : 'No pudimos cargar esta sección. Por favor, inténtalo de nuevo.'
  )

  const ErrorContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center max-w-2xl mx-auto"
    >
      {/* Error Icon with Animation */}
      <motion.div
        variants={itemVariants}
        className="mb-8 relative inline-block"
      >
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full 
            flex items-center justify-center border border-red-500/30 backdrop-blur-sm"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
          >
            <FiAlertTriangle className="text-4xl text-red-400" />
          </motion.div>
        </motion.div>
        
        {/* Decorative rings */}
        <motion.div
          className="absolute inset-0 w-24 h-24 border-2 border-red-400/20 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 border border-red-400/10 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      {/* Error Title */}
      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-3xl font-bold text-white mb-4 font-funhouse"
      >
        {errorTitle}
      </motion.h2>

      {/* Error Message */}
      <motion.p
        variants={itemVariants}
        className="text-gray-300 text-lg leading-relaxed mb-8"
      >
        {errorMessage}
      </motion.p>

      {/* Error Details (if in development) */}
      {error && process.env.NODE_ENV === 'development' && (
        <motion.div
          variants={itemVariants}
          className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left"
        >
          <details className="cursor-pointer">
            <summary className="text-red-400 font-medium mb-2">
              Detalles del error (modo desarrollo)
            </summary>
            <pre className="text-xs text-red-300 overflow-auto max-h-40">
              {error.message}
              {error.stack}
            </pre>
          </details>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
      >
        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-tramboory-yellow-400 
              to-tramboory-yellow-500 text-tramboory-purple-900 rounded-lg font-bold shadow-lg
              hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600 transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-tramboory-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Reintentar cargar"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mr-2"
            >
              <FiRefreshCw className="text-lg" />
            </motion.div>
            Intentar de nuevo
          </motion.button>
        )}

        {variant === 'full' && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm 
                text-white rounded-lg font-medium border border-white/30
                hover:bg-white/20 hover:border-white/50 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <FiHome className="mr-2" />
              Ir al inicio
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Contact Information */}
      <motion.div
        variants={itemVariants}
        className="border-t border-white/20 pt-8"
      >
        <h3 className="text-white font-semibold mb-4">
          ¿Necesitas ayuda?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
          <motion.a
            href="mailto:contacto@tramboory.com"
            whileHover={{ scale: 1.05 }}
            className="flex items-center text-gray-300 hover:text-tramboory-yellow-400 transition-colors"
          >
            <FiMail className="mr-2" />
            contacto@tramboory.com
          </motion.a>
          <motion.a
            href="tel:+523312345678"
            whileHover={{ scale: 1.05 }}
            className="flex items-center text-gray-300 hover:text-tramboory-yellow-400 transition-colors"
          >
            <FiPhone className="mr-2" />
            (33) 1234-5678
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  )

  if (variant === 'section') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 px-6 bg-gradient-to-br from-red-900/10 to-orange-900/10 backdrop-blur-sm 
          rounded-xl border border-red-500/20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        <ErrorContent />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tramboory-purple-900 via-indigo-900 to-black 
      relative overflow-hidden flex items-center justify-center">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Animated background blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute -top-40 right-[10%] w-[35rem] h-[35rem] rounded-full blur-[100px] 
          bg-gradient-to-br from-red-500/20 to-orange-600/10 pointer-events-none"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="absolute -bottom-20 -left-20 w-[25rem] h-[25rem] rounded-full blur-[80px] 
          bg-gradient-to-tr from-red-500/20 to-pink-500/10 pointer-events-none"
      />

      {/* Floating error particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <ErrorContent />
      </div>
    </div>
  )
}

export default HomeErrorFallback
