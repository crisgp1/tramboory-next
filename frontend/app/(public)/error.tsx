'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center px-4">
      {/* Decorative background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={20}
        connectionDistance={100}
        opacity={0.2}
      />
      
      <Card className={cn(
        "w-full max-w-md backdrop-blur-sm bg-white/10 border-tramboory-purple-300/20",
        "shadow-xl overflow-hidden"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-tramboory-purple-500/10 opacity-60" />
        
        <CardHeader className="relative z-10 pb-0">
          <CardTitle className="text-center text-3xl font-funhouse text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
            ¡Algo salió mal!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 pt-4 pb-6 text-center space-y-6">
          <p className="text-white/80">
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo o contacta a soporte si el problema persiste.
          </p>
          
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={reset}
              className="bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 hover:from-tramboory-purple-700 hover:to-tramboory-purple-900 text-white border-none"
            >
              Intentar de nuevo
            </Button>
            
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-transparent border border-white/30 text-white hover:bg-white/10"
            >
              Volver al inicio
            </Button>
          </div>
          
          {error.digest && (
            <p className="text-xs text-white/50 mt-6">
              Código de error: {error.digest}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}