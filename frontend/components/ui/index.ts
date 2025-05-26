/**
 * Barrel Exports para Componentes UI Base
 * @module UIComponents
 * @description Exportaciones centralizadas para componentes de interfaz base
 */

// Componentes principales
export { default as Button, buttonVariants, useButtonState } from './Button'
export { default as Input, inputVariants, useInputValidation, validators } from './Input'

// Re-exportar tipos
export type { ButtonProps } from './Button'
export type { InputProps } from './Input'

// Utilidades de estilos (para extensión futura)
export const uiConfig = {
  colors: {
    primary: 'blue',
    secondary: 'gray',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  }
} as const

/**
 * Utilidad para combinación de clases CSS
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}