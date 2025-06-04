'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types for home feature
interface HomeData {
  hero: {
    title: string
    subtitle: string
    ctaText: string
  }
  features: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
  services: {
    normal: {
      title: string
      description: string
      price: string
      features: Array<{
        title: string
        description: string
        iconName: string
      }>
      highlights: string[]
      recommended: boolean
    }
    matutino: {
      title: string
      description: string
      price: string
      features: Array<{
        title: string
        description: string
        iconName: string
      }>
      highlights: string[]
      recommended: boolean
    }
  }
  isLoading: boolean
  error: string | null
}

interface HomeContextType {
  data: HomeData
  refetch: () => Promise<void>
  updateHeroTitle: (title: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const HomeContext = createContext<HomeContextType | undefined>(undefined)

export function useHome() {
  const context = useContext(HomeContext)
  if (context === undefined) {
    throw new Error('useHome must be used within a HomeProvider')
  }
  return context
}

interface HomeProviderProps {
  children: React.ReactNode
  initialData?: Partial<HomeData>
}

export function HomeProvider({ children, initialData }: HomeProviderProps) {
  const [data, setData] = useState<HomeData>({
    hero: {
      title: 'Celebra con Tramboory',
      subtitle: 'Tu salón de eventos infantiles en Zapopan con experiencias diseñadas para crear recuerdos inolvidables',
      ctaText: 'Reserva tu fiesta'
    },
    features: [
      {
        id: '1',
        title: 'Diversión Garantizada',
        description: 'Juegos interactivos, actividades creativas y animación profesional',
        icon: 'smile'
      },
      {
        id: '2',
        title: 'Equipo Profesional',
        description: 'Personal capacitado y con experiencia en eventos infantiles',
        icon: 'users'
      },
      {
        id: '3',
        title: 'Seguridad Total',
        description: 'Ambientes controlados y seguros con protocolos establecidos',
        icon: 'shield'
      },
      {
        id: '4',
        title: 'Ambiente Festivo',
        description: 'Música, iluminación y decoración para crear la atmósfera perfecta',
        icon: 'music'
      }
    ],
    services: {
      normal: {
        title: 'Paquete Normal',
        description: 'Perfecto para celebraciones familiares con todas las comodidades incluidas',
        price: '2,500',
        features: [
          {
            title: 'Duración completa',
            description: '4 horas de diversión sin límites',
            iconName: 'clock'
          },
          {
            title: 'Animación profesional',
            description: 'Personal especializado en entretenimiento infantil',
            iconName: 'users'
          },
          {
            title: 'Decoración temática',
            description: 'Ambientación personalizada según tus preferencias',
            iconName: 'star'
          }
        ],
        highlights: ['Más Popular', 'Todo Incluido', 'Mejor Valor'],
        recommended: true
      },
      matutino: {
        title: 'Paquete Matutino',
        description: 'Opción económica perfecta para celebraciones matutinas',
        price: '1,800',
        features: [
          {
            title: 'Horario matutino',
            description: 'De 10:00 AM a 2:00 PM',
            iconName: 'clock'
          },
          {
            title: 'Animación básica',
            description: 'Entretenimiento dirigido para los pequeños',
            iconName: 'users'
          },
          {
            title: 'Decoración estándar',
            description: 'Ambientación básica incluida',
            iconName: 'home'
          }
        ],
        highlights: ['Económico', 'Matutino', 'Familiar'],
        recommended: false
      }
    },
    isLoading: false,
    error: null,
    ...initialData
  })

  const refetch = async () => {
    setData(prev => ({ ...prev, isLoading: true, error: null }))
    try {
      // Here you would fetch data from your API
      // const response = await fetch('/api/home')
      // const newData = await response.json()
      // setData(prev => ({ ...prev, ...newData, isLoading: false }))
      
      // For now, just simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData(prev => ({ ...prev, isLoading: false }))
    } catch (error) {
      setData(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      }))
    }
  }

  const updateHeroTitle = (title: string) => {
    setData(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        title
      }
    }))
  }

  const setLoading = (loading: boolean) => {
    setData(prev => ({ ...prev, isLoading: loading }))
  }

  const setError = (error: string | null) => {
    setData(prev => ({ ...prev, error }))
  }

  const contextValue: HomeContextType = {
    data,
    refetch,
    updateHeroTitle,
    setLoading,
    setError
  }

  return (
    <HomeContext.Provider value={contextValue}>
      {children}
    </HomeContext.Provider>
  )
}
