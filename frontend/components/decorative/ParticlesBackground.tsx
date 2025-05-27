'use client'

import { useEffect, useRef, memo } from 'react'

interface ParticlesBackgroundProps {
  particleCount?: number
  connectionDistance?: number
  colorVariant?: 'light' | 'purple' | 'gradient'
  opacity?: number
}

/**
 * Animated particles background with connecting lines
 * 
 * Features:
 * - Performance optimized with requestAnimationFrame
 * - Throttled resize handler to prevent layout thrashing
 * - Tramboory theme color integration
 * - Configurable particle count, opacity, and connection distance
 * - Responsive to screen size changes
 */
export const ParticlesBackground = memo(function ParticlesBackground({
  particleCount = 50,
  connectionDistance = 150,
  colorVariant = 'light',
  opacity = 0.5
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Colors based on the Tramboory theme
  const getParticleColor = (alpha: number = 1) => {
    switch (colorVariant) {
      case 'purple':
        return `rgba(139, 92, 246, ${alpha})`
      case 'gradient':
        // Return a random color from the Tramboory palette
        const colors = [
          `rgba(139, 92, 246, ${alpha})`, // purple-500
          `rgba(251, 191, 36, ${alpha})`, // yellow-400
          `rgba(245, 158, 11, ${alpha})`, // yellow-500
          `rgba(109, 40, 217, ${alpha})` // purple-700
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      case 'light':
      default:
        return `rgba(255, 255, 255, ${alpha})`
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with throttled resize handler
    const resizeCanvas = () => {
      // Use devicePixelRatio for crisp rendering on high DPI displays
      const scale = window.devicePixelRatio || 1
      
      canvas.width = window.innerWidth * scale
      canvas.height = window.innerHeight * scale
      
      // Scale the drawing context
      ctx.scale(scale, scale)
      
      // Set dimensions with CSS for proper layout
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }
    
    // Throttled resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        resizeCanvas()
        // Recreate particles after resize
        particles.length = 0
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(canvas.width, canvas.height))
        }
      }, 100)
    }
    
    resizeCanvas()
    window.addEventListener('resize', handleResize)

    // Particle class
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      color: string

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.3 + 0.1
        this.color = getParticleColor(this.opacity)
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx
        this.y += this.vy

        // Wrap around screen edges (smoother than bouncing)
        if (this.x < 0) this.x = canvasWidth
        if (this.x > canvasWidth) this.x = 0
        if (this.y < 0) this.y = canvasHeight
        if (this.y > canvasHeight) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    // Animation loop with performance optimization
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height)
        particle.draw()
      })

      // Draw connections with optimization to avoid excessive calculations
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 0.1 * (1 - distance / connectionDistance)
            
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            
            // Use the theme color for connections
            ctx.strokeStyle = colorVariant === 'gradient' 
              ? `rgba(139, 92, 246, ${opacity})` // Always use purple for lines in gradient mode
              : getParticleColor(opacity)
              
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Clean up
    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [particleCount, connectionDistance, colorVariant])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
      aria-hidden="true"
    />
  )
})