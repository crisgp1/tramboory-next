import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tramboory - Salón de Eventos Infantiles',
  description: 'El mejor salón de eventos infantiles en Zapopan. Celebra momentos únicos con nosotros.',
  keywords: 'salón infantil, eventos, fiestas, Zapopan, niños, celebraciones',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
