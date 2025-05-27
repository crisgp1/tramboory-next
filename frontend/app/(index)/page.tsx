import { Suspense } from 'react'
import { Metadata } from 'next'
import { Home } from '@/features/home/components'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Tramboory - Salón de Fiestas Infantiles en Zapopan',
  description: 'El mejor salón de eventos infantiles en Zapopan. Celebra con nosotros y crea recuerdos inolvidables para tu pequeño.',
  keywords: 'salón de fiestas, fiestas infantiles, eventos infantiles, zapopan, guadalajara, tramboory',
  openGraph: {
    title: 'Tramboory - Salón de Fiestas Infantiles',
    description: 'Celebra los momentos más especiales en el mejor salón de fiestas infantiles de Zapopan',
    images: ['/img/LogoComplete.webp'],
    type: 'website',
  },
}

/**
 * HomePage Component - Main landing page for Tramboory
 * Enhanced with better loading state and optimized metadata
 */
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 to-indigo-950">
        <LoadingSpinner size="lg" color="white" className="w-20 h-20" />
      </div>
    }>
      <Home />
    </Suspense>
  )
}