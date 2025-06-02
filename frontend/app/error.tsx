'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-4xl font-bold text-red-600">¡Ups!</h2>
      <p className="text-xl text-gray-600">Algo salió mal</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
