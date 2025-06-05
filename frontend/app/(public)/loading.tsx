import { ParticlesBackground } from "@/components/decorative/ParticlesBackground"
import { cn } from "@/lib/utils"

export default function PublicLoading() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center">
      {/* Decorative background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={20}
        connectionDistance={100}
        opacity={0.2}
      />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Pulsing circle animation */}
        <div className="relative">
          <div className={cn(
            "w-24 h-24 rounded-full",
            "bg-gradient-to-br from-tramboory-purple-500 to-tramboory-purple-800",
            "flex items-center justify-center",
            "animate-pulse"
          )}>
            <div className="w-16 h-16 rounded-full bg-tramboory-purple-900 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-tramboory-yellow-400 animate-bounce delay-150"></div>
            </div>
          </div>
          
          {/* Orbiting particles */}
          <div className="absolute inset-0 -z-10">
            <div className={cn(
              "absolute w-3 h-3 rounded-full bg-tramboory-yellow-400",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "animate-orbit-clockwise"
            )} style={{ '--orbit-duration': '3s', '--orbit-size': '140px' } as React.CSSProperties}></div>
            
            <div className={cn(
              "absolute w-2 h-2 rounded-full bg-tramboory-purple-400",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "animate-orbit-counter-clockwise"
            )} style={{ '--orbit-duration': '4s', '--orbit-size': '160px' } as React.CSSProperties}></div>
            
            <div className={cn(
              "absolute w-4 h-4 rounded-full bg-tramboory-yellow-300",
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "animate-orbit-clockwise"
            )} style={{ '--orbit-duration': '5s', '--orbit-size': '180px' } as React.CSSProperties}></div>
          </div>
        </div>
        
        {/* Loading text */}
        <h2 className={cn(
          "mt-8 font-funhouse text-2xl",
          "text-transparent bg-clip-text bg-gradient-to-r from-tramboory-yellow-300 to-tramboory-yellow-500",
        )}>
          Cargando...
        </h2>
        
        {/* Loading bar animation */}
        <div className="w-48 h-1.5 bg-tramboory-purple-900/30 rounded-full mt-4 overflow-hidden">
          <div className={cn(
            "h-full bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-purple-500",
            "animate-loading-bar"
          )}></div>
        </div>
      </div>
    </div>
  )
}