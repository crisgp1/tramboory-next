'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '@/contexts/AuthContext'

/**
 * Global providers component that wraps the application with all necessary context providers
 * 
 * This component is responsible for:
 * - Context providers (Auth, Theme, etc.)
 * - Global animations with AnimatePresence
 * - Global error boundaries
 * - Performance optimizations
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // AnimatePresence enables animations when components mount/unmount
    <AnimatePresence mode="wait">
      <AuthProvider>
        {/* Future providers can be added here:
            - Theme provider
            - Global state management
            - Media query provider
            - Analytics provider
            - etc.
        */}
        {children}
      </AuthProvider>
    </AnimatePresence>
  )
}