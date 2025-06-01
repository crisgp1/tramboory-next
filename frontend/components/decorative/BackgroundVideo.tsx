'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiPlay, FiPause } from 'react-icons/fi'

interface BackgroundVideoProps {
  src?: string
  fallbackSrc?: string
  poster?: string
  className?: string
}

/**
 * BackgroundVideo - Componente de video de fondo optimizado para Next.js 15+
 * 
 * ### Correcciones Implementadas:
 * - Eliminación del error "play() request was interrupted"
 * - Verificación robusta de montaje de componente
 * - Manejo seguro de promesas de reproducción
 * - Limpieza adecuada de event listeners
 * - Compatibilidad con React 19 y Next.js 15.3.2
 * 
 * ### Características Técnicas:
 * - Auto-reproducción inteligente con detección de políticas del navegador
 * - Fallback automático entre formatos de video (webm → mp4)
 * - Error boundary integrado para graceful degradation
 * - Performance optimizada con useCallback y memoización
 */
export function BackgroundVideo({ 
  src = '/video/background.webm',
  fallbackSrc = '/video/background.mp4',
  poster,
  className = ''
}: BackgroundVideoProps) {
  
  // Referencias y estados del componente
  const videoRef = useRef<HTMLVideoElement>(null)
  const mountedRef = useRef(true)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  
  // Estados de UI y control
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)
  
  // Marcar componente como montado - crucial para Next.js SSR
  useEffect(() => {
    setIsMounted(true)
    mountedRef.current = true
    
    return () => {
      mountedRef.current = false
    }
  }, [])
  
  /**
   * Función de reproducción segura - Previene el error de play() interrupted
   * 
   * ### Estrategia de Seguridad:
   * 1. Verificación de montaje del componente
   * 2. Cancelación de promesas anteriores
   * 3. Manejo de errores de autoplay del navegador
   * 4. Actualización de estado solo si el componente sigue montado
   */
  const safePlay = useCallback(async (): Promise<boolean> => {
    const video = videoRef.current
    
    // Verificaciones de seguridad críticas
    if (!video || !mountedRef.current || !isMounted) {
      console.log('🛑 [BackgroundVideo] Video no disponible o componente desmontado')
      return false
    }
    
    // Cancelar reproducción anterior si existe
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current
      } catch (error) {
        // Ignorar errores de promesas canceladas - comportamiento esperado
        console.log('🔄 [BackgroundVideo] Promesa anterior cancelada')
      }
    }
    
    try {
      // Crear nueva promesa de reproducción con tracking
      playPromiseRef.current = video.play()
      await playPromiseRef.current
      
      // Actualizar estado solo si el componente sigue montado
      if (mountedRef.current && isMounted) {
        setIsPlaying(true)
        console.log('▶️ [BackgroundVideo] Reproducción iniciada exitosamente')
      }
      
      return true
      
    } catch (error: any) {
      // Manejo específico de errores de autoplay
      if (mountedRef.current && isMounted) {
        console.warn('⚠️ [BackgroundVideo] Error en reproducción:', error.message)
        setIsPlaying(false)
        
        // Error específico de políticas de autoplay
        if (error.name === 'NotAllowedError') {
          console.log('🔒 [BackgroundVideo] Autoplay bloqueado por el navegador - requerirá interacción del usuario')
        }
      }
      return false
      
    } finally {
      // Limpiar referencia de promesa
      playPromiseRef.current = null
    }
  }, [isMounted])
  
  /**
   * Función de pausa segura
   */
  const safePause = useCallback(() => {
    const video = videoRef.current
    
    if (!video || !mountedRef.current) {
      return
    }
    
    try {
      video.pause()
      if (mountedRef.current && isMounted) {
        setIsPlaying(false)
        console.log('⏸️ [BackgroundVideo] Video pausado')
      }
    } catch (error) {
      console.error('❌ [BackgroundVideo] Error pausando video:', error)
    }
  }, [isMounted])
  
  /**
   * Inicialización y configuración del video
   * 
   * ### Flujo de Inicialización:
   * 1. Configuración de event listeners
   * 2. Manejo de errores con fallback automático
   * 3. Intento de reproducción automática
   * 4. Limpieza robusta en desmontaje
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !isMounted) return
    
    let autoplayTimeout: NodeJS.Timeout
    
    // Event handlers con verificación de montaje
    const handleLoadedData = () => {
      if (!mountedRef.current) return
      
      console.log('✅ [BackgroundVideo] Video cargado:', currentSrc)
      setIsLoaded(true)
      setHasError(false)
      
      // Intentar reproducción automática con delay
      autoplayTimeout = setTimeout(() => {
        if (mountedRef.current && isMounted) {
          safePlay()
        }
      }, 500)
    }
    
    const handlePlay = () => {
      if (!mountedRef.current) return
      setIsPlaying(true)
      console.log('🎬 [BackgroundVideo] Evento play disparado')
    }
    
    const handlePause = () => {
      if (!mountedRef.current) return
      setIsPlaying(false)
      console.log('⏸️ [BackgroundVideo] Evento pause disparado')
    }
    
    const handleError = (e: Event) => {
      if (!mountedRef.current) return
      
      const error = e.target as HTMLVideoElement
      console.error('❌ [BackgroundVideo] Error del video:', {
        error: error.error,
        src: currentSrc,
        readyState: error.readyState
      })
      
      // Estrategia de fallback automático
      if (currentSrc === src && fallbackSrc && fallbackSrc !== src) {
        console.log('🔄 [BackgroundVideo] Intentando fallback a:', fallbackSrc)
        setCurrentSrc(fallbackSrc)
        return
      }
      
      // Error definitivo - mostrar UI de fallback
      console.log('💥 [BackgroundVideo] Error definitivo - mostrando fallback UI')
      setHasError(true)
      setIsLoaded(false)
    }
    
    const handleCanPlay = () => {
      if (!mountedRef.current) return
      console.log('✨ [BackgroundVideo] Video listo para reproducir')
    }
    
    // Registrar event listeners
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)
    video.addEventListener('canplay', handleCanPlay)
    
    // Iniciar carga del video
    video.load()
    
    // Cleanup function - crítico para prevenir memory leaks
    return () => {
      // Limpiar timeout
      if (autoplayTimeout) {
        clearTimeout(autoplayTimeout)
      }
      
      // Limpiar event listeners
      if (video) {
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('error', handleError)
        video.removeEventListener('canplay', handleCanPlay)
        
        // Pausar video de manera segura antes del desmontaje
        try {
          video.pause()
          video.currentTime = 0
        } catch (error) {
          // Ignorar errores durante cleanup
          console.log('🧹 [BackgroundVideo] Cleanup ejecutado')
        }
      }
    }
  }, [isMounted, currentSrc, src, fallbackSrc, safePlay])
  
  /**
   * Control de reproducción/pausa para la UI
   */
  const togglePlayback = useCallback(async () => {
    if (!mountedRef.current || !isMounted) {
      console.warn('⚠️ [BackgroundVideo] Toggle llamado en componente desmontado')
      return
    }
    
    if (isPlaying) {
      safePause()
    } else {
      await safePlay()
    }
  }, [isPlaying, isMounted, safePlay, safePause])
  
  /**
   * Función para reintentar carga (usado en UI de error)
   */
  const retryLoad = useCallback(() => {
    if (!mountedRef.current) return
    
    console.log('🔄 [BackgroundVideo] Reintentando carga de video')
    setHasError(false)
    setIsLoaded(false)
    setCurrentSrc(src) // Volver al src original
    
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [src])
  
  // Renderizado condicional para SSR/CSR compatibility
  if (!isMounted) {
    return (
      <div className={`fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-purple-950 to-purple-800 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Preparando experiencia Tramboory...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 w-full h-full z-0 overflow-hidden ${className}`}>
      {!hasError ? (
        <>
          {/* Contenedor principal del video */}
          <div className="absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: 'brightness(0.8) contrast(1.1) saturate(1.1)',
              }}
            >
              {/* Fuentes de video con fallback automático */}
              <source src={currentSrc} type="video/webm" />
              <source src={fallbackSrc} type="video/mp4" />
              <source src="/video/background.webm" type="video/webm" />
              Tu navegador no soporta reproducción de video HTML5.
            </video>
          </div>
          
          {/* Sistema de overlays para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-transparent to-purple-900/30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-900/10 to-yellow-900/15" />
          
          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-950 to-purple-800">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-yellow-400/20 rounded-full"></div>
                </div>
                <div className="text-center">
                  <p className="text-white text-xl font-bold mb-2">Cargando experiencia mágica</p>
                  <p className="text-yellow-300 text-sm">Preparando el mejor salón de fiestas infantiles</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Control de reproducción flotante */}
          {isLoaded && (
            <motion.button
              onClick={togglePlayback}
              whileHover={{ 
                scale: 1.15,
                boxShadow: "0 0 30px rgba(250, 204, 21, 0.7)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 2, 
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="fixed bottom-8 right-8 z-50 w-16 h-16 md:w-18 md:h-18 rounded-full 
                bg-gradient-to-br from-yellow-400 to-yellow-500 text-purple-900 
                flex items-center justify-center shadow-2xl shadow-purple-900/50 
                border-3 border-yellow-300 hover:border-yellow-200
                backdrop-blur-sm transition-all duration-300
                focus:outline-none focus:ring-4 focus:ring-yellow-300/60"
              aria-label={isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}
            >
              {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} className="ml-1" />}
              
              {/* Efecto de pulso animado */}
              <motion.div
                className="absolute -inset-3 rounded-full bg-yellow-400/30 z-[-1]"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut"
                }}
              />
            </motion.button>
          )}
        </>
      ) : (
        // UI de fallback para errores
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-400/20 flex items-center justify-center"
            >
              <FiPlay className="text-yellow-400 text-3xl" />
            </motion.div>
            
            <h3 className="text-white text-2xl font-bold mb-4 font-funhouse">
              Video no disponible
            </h3>
            <p className="text-yellow-300 mb-6 leading-relaxed">
              No se pudo cargar el video de fondo, pero la experiencia Tramboory continúa 
              con toda la magia que nos caracteriza.
            </p>
            
            <motion.button
              onClick={retryLoad}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 
                text-purple-900 rounded-xl font-bold shadow-lg
                hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
            >
              🔄 Reintentar carga
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}