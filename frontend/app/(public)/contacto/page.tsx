import { Metadata } from 'next'
import { ParticlesBackground } from '@/components/decorative/ParticlesBackground'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contacto - Tramboory',
  description: 'Contáctanos para reservar tu evento o resolver cualquier duda sobre nuestros servicios de fiestas infantiles en Zapopan.',
  keywords: 'contacto, reservaciones, cotizaciones, ubicación, teléfono, email, tramboory, zapopan',
  openGraph: {
    title: 'Contacto - Tramboory',
    description: 'Ponte en contacto con nosotros para crear la fiesta perfecta',
    images: ['/img/logo.webp'],
    type: 'website',
  },
}

// FAQ data
const faqs = [
  {
    question: '¿Cómo puedo reservar una fecha para mi evento?',
    answer: 'Puedes reservar una fecha a través de nuestro formulario de contacto, llamándonos directamente o visitando nuestras instalaciones. Se requiere un anticipo del 30% para confirmar la reservación.'
  },
  {
    question: '¿Cuánto tiempo de anticipación debo reservar?',
    answer: 'Recomendamos reservar con al menos 4 semanas de anticipación, especialmente para fechas en temporada alta (fines de semana y vacaciones escolares).'
  },
  {
    question: '¿Puedo llevar decoración o alimentos adicionales?',
    answer: 'Sí, puedes traer decoración adicional. En cuanto a alimentos externos, tenemos políticas específicas dependiendo del paquete seleccionado. Consúltanos para más detalles.'
  },
  {
    question: '¿Ofrecen servicios para niños con necesidades especiales?',
    answer: 'Sí, nuestras instalaciones son accesibles y nuestro personal está capacitado para atender a niños con diversas necesidades. Por favor infórmanos al momento de reservar para preparar todo adecuadamente.'
  },
  {
    question: '¿Qué sucede en caso de cancelación?',
    answer: 'Las cancelaciones con más de 15 días de anticipación reciben un reembolso del 70% del anticipo. Cancelaciones con menos tiempo están sujetas a nuestra política de cancelación que te proporcionamos al momento de la reserva.'
  }
]

export default function ContactoPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-tramboory-purple-900 to-indigo-950 text-white pb-20">
      {/* Decorative background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={30}
        connectionDistance={100}
        opacity={0.3}
      />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center z-10">
        <h1 className="text-5xl md:text-6xl font-funhouse font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500">
          Contáctanos
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-tramboory-yellow-100">
          Estamos aquí para ayudarte a planear la celebración perfecta para tus pequeños
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-tramboory-purple-400 to-tramboory-yellow-400 rounded-full"></div>
      </section>
      
      {/* Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
              <CardHeader className="pb-0">
                <Badge className="mb-3 bg-tramboory-yellow-500 text-tramboory-purple-900 hover:bg-tramboory-yellow-600">
                  Contáctanos
                </Badge>
                <CardTitle className="text-2xl font-funhouse text-tramboory-yellow-300">Envíanos un mensaje</CardTitle>
                <p className="mt-2 text-white/70">
                  Completa el formulario y te responderemos a la brevedad.
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-sm font-medium text-white/80">
                        Nombre completo
                      </label>
                      <Input 
                        id="nombre" 
                        name="nombre" 
                        placeholder="Tu nombre" 
                        required 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-tramboory-yellow-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-medium text-white/80">
                        Teléfono
                      </label>
                      <Input 
                        id="telefono" 
                        name="telefono" 
                        type="tel"
                        placeholder="Tu teléfono" 
                        required 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-tramboory-yellow-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">
                      Correo electrónico
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      placeholder="Tu correo electrónico" 
                      required 
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-tramboory-yellow-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="asunto" className="text-sm font-medium text-white/80">
                      Asunto
                    </label>
                    <select 
                      id="asunto" 
                      name="asunto" 
                      required
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white focus:outline-none focus:border-tramboory-yellow-500"
                    >
                      <option value="" disabled selected className="text-white/50">Selecciona un asunto</option>
                      <option value="reservacion">Reservación</option>
                      <option value="informacion">Información general</option>
                      <option value="cotizacion">Cotización personalizada</option>
                      <option value="comentario">Comentarios o sugerencias</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-sm font-medium text-white/80">
                      Mensaje
                    </label>
                    <textarea 
                      id="mensaje" 
                      name="mensaje" 
                      placeholder="Escribe tu mensaje aquí" 
                      rows={5} 
                      required
                      className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-tramboory-yellow-500 resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="politica" 
                      name="politica" 
                      required
                      className="mt-1"
                    />
                    <label htmlFor="politica" className="text-sm text-white/70">
                      He leído y acepto la <Link href="/politica-privacidad" className="text-tramboory-yellow-400 hover:text-tramboory-yellow-300 underline">política de privacidad</Link>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-tramboory-purple-600 to-tramboory-purple-800 hover:from-tramboory-purple-700 hover:to-tramboory-purple-900 text-white"
                  >
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-funhouse font-bold text-tramboory-yellow-300">
                Información de contacto
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tramboory-purple-700 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tramboory-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-tramboory-yellow-300">Teléfono</h3>
                    <p className="text-white/80 mb-2">Llámanos para consultas o reservas</p>
                    <a href="tel:+523312345678" className="text-tramboory-yellow-400 hover:text-tramboory-yellow-300">
                      +52 (33) 1234-5678
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tramboory-purple-700 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tramboory-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-tramboory-yellow-300">Email</h3>
                    <p className="text-white/80 mb-2">Escríbenos a nuestro correo</p>
                    <a href="mailto:info@tramboory.com" className="text-tramboory-yellow-400 hover:text-tramboory-yellow-300">
                      info@tramboory.com
                    </a>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tramboory-purple-700 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tramboory-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-tramboory-yellow-300">Dirección</h3>
                    <p className="text-white/80 mb-2">Visítanos en nuestro local</p>
                    <address className="not-italic text-tramboory-yellow-400">
                      Av. Patria 123, Zapopan, Jalisco
                    </address>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-tramboory-purple-700 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tramboory-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-tramboory-yellow-300">Horario</h3>
                    <p className="text-white/80 mb-2">Atención al cliente</p>
                    <p className="text-tramboory-yellow-400">
                      Lun - Vie: 10:00 - 19:00<br/>
                      Sáb - Dom: 10:00 - 21:00
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-2xl font-funhouse font-bold text-tramboory-yellow-300">
                Nuestra ubicación
              </h2>
              <Card className="bg-white/10 backdrop-blur-sm border-tramboory-purple-300/20 text-white overflow-hidden">
                <div className="relative w-full h-[300px]">
                  {/* Replace with actual map component or iframe */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-tramboory-purple-800 to-indigo-900">
                    <p className="text-white/70">
                      Mapa interactivo - Se mostrará la ubicación de Tramboory
                    </p>
                  </div>
                </div>
                <CardContent className="p-4 flex justify-center">
                  <a 
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tramboory-yellow-400 hover:text-tramboory-yellow-300 text-sm flex items-center"
                  >
                    <span>Ver en Google Maps</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </div>
            
            {/* Social Media */}
            <div className="space-y-4">
              <h2 className="text-2xl font-funhouse font-bold text-tramboory-yellow-300">
                Síguenos en redes sociales
              </h2>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20 transition-colors duration-300",
                    "text-tramboory-yellow-400"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20 transition-colors duration-300",
                    "text-tramboory-yellow-400"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20 transition-colors duration-300",
                    "text-tramboory-yellow-400"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20 transition-colors duration-300",
                    "text-tramboory-yellow-400"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://whatsapp.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "bg-white/10 hover:bg-white/20 transition-colors duration-300",
                    "text-tramboory-yellow-400"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-24 z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-funhouse font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500">
            Preguntas Frecuentes
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details 
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 text-lg font-medium cursor-pointer text-tramboory-yellow-300">
                {faq.question}
                <span className="transition-transform group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-white/80">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center z-10 relative">
        <div className="bg-gradient-to-r from-tramboory-purple-800 to-tramboory-purple-900 rounded-2xl p-10 shadow-2xl shadow-purple-800/30">
          <h2 className="text-3xl font-funhouse font-bold mb-4">¿Listo para reservar tu evento?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            ¡Haz de la celebración de tus pequeños un momento inolvidable! Contáctanos ahora y nuestro equipo te ayudará a crear la fiesta perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+523312345678" 
              className="bg-white text-tramboory-purple-700 font-medium py-3 px-6 rounded-xl hover:bg-tramboory-purple-50 transition-all duration-300 shadow-lg inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Llamar Ahora
            </a>
            <a 
              href="https://wa.me/523312345678" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white/30 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}