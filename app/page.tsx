export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            🎉 Tramboory
          </h1>
          <p className="text-xl mb-8">
            Tu salón de eventos infantiles en Zapopan
          </p>
          <div className="space-y-4">
            <p className="text-lg opacity-90">
              ✅ Migración Next.js completada exitosamente
            </p>
            <p className="text-lg opacity-90">
              🎨 Estilos Tailwind configurados
            </p>
            <p className="text-lg opacity-90">
              🔧 Estructura de componentes creada
            </p>
          </div>
          <div className="mt-12 space-x-4">
            <button className="btn-primary">
              Ver Paquetes
            </button>
            <button className="btn-secondary">
              Galería
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
