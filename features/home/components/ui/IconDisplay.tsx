'use client';

import { memo } from 'react';
import { IconRegistry } from '../../infrastructure/icons/IconRegistry';

interface IconDisplayProps {
  iconName: string;
  className?: string;
  size?: number;
  'aria-label'?: string;
}

/**
 * Componente cliente optimizado para mostrar iconos
 * Resuelve el problema de serialización usando el Registry Pattern
 */
export const IconDisplay = memo<IconDisplayProps>(({ 
  iconName, 
  className = '',
  size,
  'aria-label': ariaLabel
}) => {
  const IconComponent = IconRegistry.getIcon(iconName);

  if (!IconComponent) {
    // Fallback para iconos no encontrados
    console.warn(`Icon "${iconName}" not found in registry`);
    return (
      <span 
        className={`inline-block w-4 h-4 bg-gray-400 rounded ${className}`}
        aria-label={ariaLabel || `Missing icon: ${iconName}`}
        role="img"
      />
    );
  }

  return (
    <IconComponent 
      className={className}
      size={size}
      aria-label={ariaLabel || iconName}
      role="img"
    />
  );
});

IconDisplay.displayName = 'IconDisplay';