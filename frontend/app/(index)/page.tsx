import { Suspense } from 'react'
import { Metadata } from 'next'
import HomeContent from '@/features/home/components/HomeContent'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Tramboory - Salón de Fiestas Infantiles en Zapopan',
  description: 'El mejor salón de eventos infantiles en Zapopan. Celebra con nosotros y crea recuerdos inolvidables para tu pequeño.',
  keywords: 'salón de fiestas, fiestas infantiles, eventos infantiles, zapopan, guadalajara, tramboory',
  openGraph: {
    title: 'Tramboory - Salón de Fiestas Infantiles',
    description: 'Celebra los momentos más especiales en el mejor salón de fiestas infantiles de Zapopan',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen />}>
      <HomeContent />
    </Suspense>
  )
}