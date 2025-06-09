'use client'

import React, { use } from 'react';
import { cn } from '@/lib/utils';

// ==========================================
// INTERFACES Y TIPOS DE DATOS
// ==========================================

interface ServiceFeature {
  title: string;
  description: string;
  iconName: string;
}

interface Service {
  title: string;
  description: string;
  price: string;
  features: ServiceFeature[];
  highlights: string[];
  recommended: boolean;
}

interface ServicesProps {
  services: {
    normal: Service;
    matutino: Service;
  };
}

// ==========================================
// COMPONENTES UI INLINE
// ==========================================

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <span 
    className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", className)} 
    {...props}
  >
    {children}
  </span>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
}> = ({ children, className = "", ...props }) => (
  <button 
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none ring-offset-background", 
      className
    )} 
    {...props}
  >
    {children}
  </button>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <div 
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} 
    {...props}
  >
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <div 
    className={cn("flex flex-col space-y-1.5 p-6", className)} 
    {...props}
  >
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <h3 
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)} 
    {...props}
  >
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "", 
  ...props 
}) => (
  <div 
    className={cn("p-6 pt-0", className)} 
    {...props}
  >
    {children}
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export function ServicesSection({ services }: ServicesProps) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-30">
      {/* Overlay con Zona Opaca Expandida - Arquitectura Visual Optimizada */}
      <div className="absolute inset-0 pointer-events-none"
           style={{
             background: `linear-gradient(
               to bottom,
               transparent 2%,
               oklch(43.8% 0.218 303.724 / 0.65) 20%,
               oklch(43.8% 0.218 303.724 / 0.65) 90%,
               transparent 100%
             )`
           }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-funhouse font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500">
            NUESTROS SERVICIOS
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-body font-light">
            Elige la experiencia perfecta para la celebración de tus pequeños
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          
          {/* TRAMBOORY NORMAL - Recommended */}
          <div className="relative group">
            <Card className={cn(
              "relative overflow-hidden transition-all duration-700 ease-out transform",
              "bg-[oklch(38.1%_0.176_304.987)] border-2 border-[oklch(38.1%_0.176_304.987)]/30",
              "rounded-2xl scale-80",
              "shadow-2xl shadow-purple-500/20",
              "hover:scale-[0.8030] hover:shadow-[0_20px_40px_-12px_rgba(147,51,234,0.35)]",
              "hover:border-[oklch(38.1%_0.176_304.987)]/40",
              "hover:bg-[oklch(40.1%_0.180_304.987)]",
              "group-hover:shadow-purple-400/25",
              "backdrop-blur-sm",
              "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700"
            )}>
              {/* Animated Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"></div>
              
              {/* Recommended Badge - Responsive Size Optimization */}
              <div className="absolute top-0 right-0 z-30">
                <div className="bg-gradient-to-r from-tramboory-yellow-400 via-tramboory-yellow-500 to-tramboory-yellow-400 
                              text-tramboory-purple-900 font-body font-bold 
                              px-2 py-1 text-[10px] sm:px-2.5 sm:py-1.5 sm:text-xs lg:px-3 lg:py-2 lg:text-sm
                              rounded-tr-2xl rounded-bl-2xl 
                              shadow-lg shadow-yellow-400/25
                              hover:shadow-xl hover:shadow-yellow-400/35
                              transition-all duration-600 transform hover:scale-105
                              border border-tramboory-yellow-300/60
                              relative overflow-hidden
                              before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                  <div className="flex items-center gap-0.5 sm:gap-1 relative z-10">
                    <span className="text-[10px] sm:text-xs lg:text-sm">⭐</span>
                    <span className="font-bold tracking-wide text-[10px] sm:text-xs lg:text-sm">RECOMENDADO</span>
                  </div>
                </div>
              </div>

              {/* Floating Particles Effect - More Subtle */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1200">
                <div 
                  className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-tramboory-yellow-400/40 rounded-full animate-float"
                ></div>
                <div 
                  className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-300/30 rounded-full animate-float" 
                  style={{ animationDelay: '0.8s' }}
                ></div>
                <div 
                  className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-tramboory-yellow-300/35 rounded-full animate-float" 
                  style={{ animationDelay: '1.2s' }}
                ></div>
              </div>

              <CardHeader className="pb-4 pt-8 sm:pt-9 lg:pt-10 pr-4 sm:pr-6 lg:pr-8 relative z-20">
                <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-funhouse font-bold text-tramboory-yellow-300 mb-2 
                                   transform transition-all duration-600 group-hover:scale-[1.02] group-hover:text-tramboory-yellow-200">
                  {services.normal.title}
                </CardTitle>
                <p className="text-tramboory-yellow-100/90 text-base lg:text-lg leading-relaxed font-body font-light
                             transform transition-all duration-600 group-hover:text-tramboory-yellow-50">
                  {services.normal.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6 relative z-20">
                {/* Enhanced Price Display - Refined Animation */}
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-tramboory-yellow-400/30
                              shadow-xl shadow-black/20 transform transition-all duration-700
                              hover:bg-black/35 hover:border-tramboory-yellow-400/40 hover:scale-[1.03] hover:shadow-2xl hover:shadow-yellow-400/15
                              relative overflow-hidden group/price">
                  <div className="absolute inset-0 bg-gradient-to-r from-tramboory-yellow-400/3 via-transparent to-tramboory-yellow-400/3 
                                opacity-0 group-hover/price:opacity-100 transition-opacity duration-700"></div>
                  <div className="flex items-baseline relative z-10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-tramboory-yellow-300 font-body font-semibold
                                   transform transition-all duration-600 group-hover/price:scale-105 group-hover/price:text-tramboory-yellow-200">
                      ${services.normal.price}
                    </span>
                    <span className="text-tramboory-yellow-200/70 ml-2 font-body font-light text-lg lg:text-xl">/evento</span>
                  </div>
                  <p className="text-tramboory-yellow-200/80 text-sm mt-2 font-body font-light">Todo incluido, sin costos adicionales</p>
                </div>

                {/* Enhanced Highlights - Subtle Animations */}
                <div className="flex flex-wrap gap-3">
                  {services.normal.highlights.map((highlight, index) => (
                    <div key={index} className="group/highlight">
                      <Badge className="bg-gradient-to-r from-tramboory-yellow-500 via-tramboory-yellow-400 to-tramboory-yellow-500 
                                     text-tramboory-purple-900 hover:from-tramboory-yellow-400 hover:to-tramboory-yellow-600 
                                     font-body font-semibold px-4 py-2 text-sm lg:text-base
                                     shadow-lg shadow-yellow-400/25 hover:shadow-xl hover:shadow-yellow-400/35
                                     transform transition-all duration-500 hover:scale-105 hover:-translate-y-0.5
                                     border border-tramboory-yellow-300/50
                                     relative overflow-hidden
                                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
                                     before:translate-x-[-100%] group-hover/highlight:before:translate-x-[100%] before:transition-transform before:duration-800">
                        {highlight}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Enhanced Features List - Gentle Interactions */}
                <div className="space-y-4">
                  {services.normal.features.map((feature, index) => (
                    <div key={index} className="group/feature flex items-start gap-4 p-3 rounded-xl transition-all duration-500 
                                               hover:bg-white/3 hover:shadow-lg hover:shadow-purple-400/8 hover:transform hover:scale-[1.02]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-tramboory-yellow-400 to-tramboory-yellow-500 
                                    flex items-center justify-center mt-1 shadow-lg shadow-yellow-400/25
                                    transform transition-all duration-500 group-hover/feature:scale-110 group-hover/feature:rotate-6">
                        <svg className="w-4 h-4 text-tramboory-purple-900 transform transition-transform duration-500 group-hover/feature:scale-105" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-tramboory-yellow-200 font-body font-medium text-lg
                                     transform transition-all duration-500 group-hover/feature:text-tramboory-yellow-100">
                          {feature.title}
                        </h4>
                        <p className="text-tramboory-yellow-100/80 text-sm font-body font-light leading-relaxed mt-1
                                    transform transition-all duration-500 group-hover/feature:text-tramboory-yellow-50">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button - Refined Interaction */}
                <div className="group/cta">
                  <Button className="w-full bg-gradient-to-r from-tramboory-yellow-400 via-tramboory-yellow-500 to-tramboory-yellow-400 
                                   hover:from-tramboory-yellow-300 hover:via-tramboory-yellow-400 hover:to-tramboory-yellow-300
                                   text-tramboory-purple-900 font-bold py-6 text-lg lg:text-xl shadow-2xl shadow-yellow-400/35
                                   hover:shadow-3xl hover:shadow-yellow-400/45 transition-all duration-700 
                                   transform hover:scale-[1.03] hover:-translate-y-1 font-body
                                   relative overflow-hidden
                                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent 
                                   before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Reservar Ahora 
                      <svg className="w-6 h-6 transform transition-transform duration-500 group-hover/cta:translate-x-1" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TRAMBOORY MATUTINO - Enhanced Version with Refined Animations */}
          <div className="relative group">
            <Card className={cn(
              "relative overflow-hidden transition-all duration-700 ease-out transform",
              "bg-[oklch(35.9%_0.144_278.697)] border-2 border-[oklch(35.9%_0.144_278.697)]/30",
              "rounded-2xl scale-80",
              "shadow-2xl shadow-blue-500/20",
              "hover:scale-[0.8030] hover:shadow-[0_20px_40px_-12px_rgba(59,130,246,0.35)]",
              "hover:border-[oklch(35.9%_0.144_278.697)]/40",
              "hover:bg-[oklch(38.9%_0.150_278.697)]",
              "group-hover:shadow-blue-400/25",
              "backdrop-blur-sm",
              "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/3 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700"
            )}>
              {/* Animated Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"></div>
              
              {/* Floating Particles Effect - Subtle Blue Theme */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1200">
                <div 
                  className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-float"
                ></div>
                <div 
                  className="absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-float" 
                  style={{ animationDelay: '0.8s' }}
                ></div>
                <div 
                  className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-blue-300/35 rounded-full animate-float" 
                  style={{ animationDelay: '1.2s' }}
                ></div>
              </div>

              <CardHeader className="pb-4 pt-6 sm:pt-8 lg:pt-10 relative z-20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-blue-500/25 to-cyan-500/25 
                                flex items-center justify-center shadow-xl shadow-blue-400/15
                                transform transition-all duration-600 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-2xl group-hover:shadow-blue-400/25">
                    <svg className="w-6 h-6 lg:w-7 lg:h-7 text-blue-400 transform transition-all duration-600 group-hover:scale-105" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-funhouse font-bold text-white
                                       transform transition-all duration-600 group-hover:scale-[1.02] group-hover:text-blue-100">
                    {services.matutino.title}
                  </CardTitle>
                </div>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed font-body font-light
                             transform transition-all duration-600 group-hover:text-white/90">
                  {services.matutino.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-6 relative z-20">
                {/* Enhanced Price Display - Refined Animation */}
                <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border-2 border-white/20
                              shadow-xl shadow-black/20 transform transition-all duration-700
                              hover:bg-black/35 hover:border-white/25 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-400/15
                              relative overflow-hidden group/price">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/3 via-transparent to-blue-400/3 
                                opacity-0 group-hover/price:opacity-100 transition-opacity duration-700"></div>
                  <div className="flex items-baseline relative z-10">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-body font-semibold
                                   transform transition-all duration-600 group-hover/price:scale-105 group-hover/price:text-blue-100">
                      ${services.matutino.price}
                    </span>
                    <span className="text-white/60 ml-2 font-body font-light text-lg lg:text-xl">/evento</span>
                  </div>
                  <p className="text-white/70 text-sm mt-2 font-body font-light">Opción económica para tu celebración</p>
                </div>

                {/* Enhanced Highlights - Subtle Animations */}
                <div className="flex flex-wrap gap-3">
                  {services.matutino.highlights.map((highlight, index) => (
                    <div key={index} className="group/highlight">
                      <Badge className="bg-gradient-to-r from-blue-500/25 via-blue-400/25 to-cyan-500/25 
                                     text-blue-300 border border-blue-400/35 hover:from-blue-400/30 hover:to-cyan-400/30 
                                     font-body font-semibold px-4 py-2 text-sm lg:text-base
                                     shadow-lg shadow-blue-400/15 hover:shadow-xl hover:shadow-blue-400/25
                                     transform transition-all duration-500 hover:scale-105 hover:-translate-y-0.5
                                     relative overflow-hidden
                                     before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent 
                                     before:translate-x-[-100%] group-hover/highlight:before:translate-x-[100%] before:transition-transform before:duration-800">
                        {highlight}
                      </Badge>
                    </div>
                  ))}
                </div>

                {/* Enhanced Features List - Gentle Interactions */}
                <div className="space-y-4">
                  {services.matutino.features.map((feature, index) => (
                    <div key={index} className="group/feature flex items-start gap-4 p-3 rounded-xl transition-all duration-500 
                                               hover:bg-white/3 hover:shadow-lg hover:shadow-blue-400/8 hover:transform hover:scale-[1.02]">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/25 to-cyan-400/25 
                                    flex items-center justify-center mt-1 shadow-lg shadow-blue-400/15
                                    transform transition-all duration-500 group-hover/feature:scale-110 group-hover/feature:rotate-6">
                        <svg className="w-4 h-4 text-white transform transition-transform duration-500 group-hover/feature:scale-105" 
                             fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white font-body font-medium text-lg
                                     transform transition-all duration-500 group-hover/feature:text-blue-100">
                          {feature.title}
                        </h4>
                        <p className="text-white/70 text-sm font-body font-light leading-relaxed mt-1
                                    transform transition-all duration-500 group-hover/feature:text-white/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced CTA Button - Refined Interaction */}
                <div className="group/cta">
                  <Button className="w-full bg-gradient-to-r from-white/8 via-white/12 to-white/8 
                                   hover:from-white/15 hover:via-white/20 hover:to-white/15
                                   text-white border border-white/25 hover:border-white/35 font-bold py-6 text-lg lg:text-xl 
                                   shadow-2xl shadow-blue-400/15 hover:shadow-3xl hover:shadow-blue-400/25 
                                   transition-all duration-700 transform hover:scale-[1.03] hover:-translate-y-1 font-body
                                   relative overflow-hidden
                                   before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/8 before:to-transparent 
                                   before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Reservar Ahora 
                      <svg className="w-6 h-6 transform transition-transform duration-500 group-hover/cta:translate-x-1" 
                           fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}