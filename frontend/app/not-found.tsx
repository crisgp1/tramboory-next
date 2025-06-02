import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600">Página no encontrada</h2>
      <p className="text-gray-500 text-center max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
