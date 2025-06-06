import { Suspense } from 'react'
import { Metadata } from 'next'
import { AboutTramboory } from './_components'
import LoadingSpinner from '../../../components/shared/LoadingSpinner'

export const metadata: Metadata = {
  title: 'Acerca de Tramboory - Conoce Nuestra Historia',
  description: 'Descubre la historia, misión y visión de Tramboory, el mejor salón de eventos infantiles en Zapopan, Jalisco.',
  keywords: 'acerca de, historia, misión, visión, tramboory, salón de fiestas, eventos infantiles, zapopan',
  openGraph: {
    title: 'Acerca de Tramboory - Nuestra Historia',
    description: 'Conoce la magia detrás del mejor salón de fiestas infantiles en Zapopan',
    images: ['/images/about-og-image.jpg'],
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" color="white" className="h-screen flex items-center justify-center" />}>
      <AboutTramboory />
    </Suspense>
  )
}