'use client'

import { useEffect } from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Add auth-page class to body to remove navbar padding
    document.body.classList.add('auth-page')
    
    return () => {
      // Clean up when leaving auth pages
      document.body.classList.remove('auth-page')
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}
