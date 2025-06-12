'use client'

/**
 * Componente Principal de Gestión de Seguridad
 * @module SeguridadMain
 * @description Componente principal para la gestión de seguridad del sistema
 */

import React, { useState, useEffect } from 'react'
import { ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const SecurityIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const KeyIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface SecurityLog {
  id: string
  action: string
  user: string
  timestamp: string
  ipAddress: string
  status: 'success' | 'failed' | 'warning'
  details: string
}

interface SecuritySettings {
  passwordPolicy: {
    minLength: number
    requireUppercase: boolean
    requireNumbers: boolean
    requireSymbols: boolean
    expirationDays: number
  }
  sessionSettings: {
    timeoutMinutes: number
    maxConcurrentSessions: number
    requireReauth: boolean
  }
  auditSettings: {
    logRetentionDays: number
    enableDetailedLogging: boolean
    alertOnFailedLogins: boolean
  }
}

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

/**
 * StatusBadge - Componente para mostrar el estado del log de seguridad
 */
const StatusBadge: React.FC<{
  status: string
  size?: 'sm' | 'md'
}> = ({ status, size = 'md' }) => {
  const statusConfig = {
    success: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      icon: <ShieldIcon />
    },
    failed: {
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      icon: <SecurityIcon />
    },
    warning: {
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      icon: <ClockIcon />
    },
    default: {
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600',
      icon: <EyeIcon />
    }
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.default
  const sizeClass = size === 'sm' ? 'p-1.5' : 'p-2'

  return (
    <div className={`${sizeClass} rounded-full ${config.bgColor} ${config.textColor}`}>
      {config.icon}
    </div>
  )
}

/**
 * SettingsCard - Tarjeta de configuración reutilizable
 */
const SettingsCard: React.FC<{
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="p-1.5 md:p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
          {icon}
        </div>
        <h3 className="text-base md:text-lg font-body-medium text-gray-900">
          {title}
        </h3>
      </div>
      {children}
    </div>
  )
}

/**
 * LogCard - Tarjeta para mostrar un log en vista móvil
 */
const LogCard: React.FC<{
  log: SecurityLog
}> = ({ log }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <StatusBadge status={log.status} size="sm" />
          <div>
            <div className="text-sm font-body-medium text-gray-900 mb-1">{log.action}</div>
            <div className="text-xs text-gray-600 font-body-light">{log.timestamp}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs mt-3">
        <div>
          <div className="text-gray-500 font-body-light">Usuario:</div>
          <div className="text-gray-900 font-body-medium truncate">{log.user}</div>
        </div>
        <div>
          <div className="text-gray-500 font-body-light">IP:</div>
          <div className="text-gray-900 font-body-medium">{log.ipAddress}</div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500 font-body-light">Detalles:</div>
        <div className="text-xs text-gray-900 mt-1">{log.details}</div>
      </div>
    </div>
  )
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockSecurityLogs: SecurityLog[] = [
  {
    id: '1',
    action: 'Login exitoso',
    user: 'admin@tramboory.com',
    timestamp: '2024-01-15 14:30:25',
    ipAddress: '192.168.1.100',
    status: 'success',
    details: 'Inicio de sesión desde navegador Chrome'
  },
  {
    id: '2',
    action: 'Intento de login fallido',
    user: 'unknown@email.com',
    timestamp: '2024-01-15 14:25:10',
    ipAddress: '203.0.113.45',
    status: 'failed',
    details: 'Contraseña incorrecta - 3 intentos'
  },
  {
    id: '3',
    action: 'Cambio de contraseña',
    user: 'maria@tramboory.com',
    timestamp: '2024-01-15 13:15:42',
    ipAddress: '192.168.1.105',
    status: 'success',
    details: 'Contraseña actualizada exitosamente'
  },
  {
    id: '4',
    action: 'Sesión expirada',
    user: 'carlos@tramboory.com',
    timestamp: '2024-01-15 12:00:00',
    ipAddress: '192.168.1.102',
    status: 'warning',
    details: 'Sesión cerrada por inactividad'
  }
]

const defaultSettings: SecuritySettings = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false,
    expirationDays: 90
  },
  sessionSettings: {
    timeoutMinutes: 30,
    maxConcurrentSessions: 3,
    requireReauth: true
  },
  auditSettings: {
    logRetentionDays: 365,
    enableDetailedLogging: true,
    alertOnFailedLogins: true
  }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * SeguridadMain - Componente de gestión de seguridad
 * 
 * ### Características:
 * - **Logs**: Registro de actividad de seguridad
 * - **Configuración**: Políticas de contraseñas y sesiones
 * - **Auditoría**: Configuración de logs y alertas
 * - **Monitoreo**: Seguimiento de eventos de seguridad
 */
export function SeguridadMain() {
  const [securityLogs] = useState<SecurityLog[]>(mockSecurityLogs)
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<'logs' | 'settings'>('logs')
  const [showAlert, setShowAlert] = useState(false) // Cambiado a false ya que implementamos diseño responsive
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  // Manejar actualización de configuración
  const handleSettingsUpdate = (newSettings: SecuritySettings) => {
    setSettings(newSettings)
    // Aquí se enviarían los cambios al backend
    alert('Configuración de seguridad actualizada exitosamente')
  }

  // Automáticamente cambiar a vista de tarjetas en pantallas pequeñas para logs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setViewMode('cards')
      } else {
        setViewMode('table')
      }
    }
    
    // Inicializar basado en el tamaño actual
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="p-3 sm:p-4 md:p-6 pb-16 space-y-4 md:space-y-8">
      {/* Alerta de tamaño de pantalla - Ahora oculto ya que implementamos vista responsiva */}
      {showAlert && (
        <div className="hidden">
          <ScreenSizeAlert setShowAlert={setShowAlert} />
        </div>
      )}

      {/* Header */}
      <div className="mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
            <SecurityIcon />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-body-semibold mb-1 md:mb-2">
              Gestión de Seguridad
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 font-body-light">
              Administra la seguridad del sistema y auditoría
            </p>
          </div>
        </div>
      </div>

      {/* Tabs con toggle para vista mobile/desktop en Logs */}
      <div className="border-b border-gray-200 flex justify-between items-center">
        <nav className="-mb-px flex space-x-4 sm:space-x-8">
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 ${
              activeTab === 'logs'
                ? 'border-tramboory-purple-500 text-tramboory-purple-600 font-body-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-body-light'
            }`}
          >
            Logs de Seguridad
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-all duration-200 ${
              activeTab === 'settings'
                ? 'border-tramboory-purple-500 text-tramboory-purple-600 font-body-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-body-light'
            }`}
          >
            Configuración
          </button>
        </nav>
        
        {activeTab === 'logs' && (
          <button
            onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
            className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-2 py-1 transition-colors duration-200"
          >
            {viewMode === 'table' ? 'Vista Tarjetas' : 'Vista Tabla'}
          </button>
        )}
      </div>

      {/* Contenido de tabs */}
      {activeTab === 'logs' ? (
        /* Logs de Seguridad */
        viewMode === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 font-body-medium">Registro de Actividad</h3>
              <p className="text-xs sm:text-sm text-gray-500 font-body-light">Últimas actividades de seguridad del sistema</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      Acción
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      Fecha/Hora
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      IP
                    </th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-body-medium text-gray-500 uppercase tracking-wider">
                      Detalles
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusBadge status={log.status} />
                        </div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-body-medium text-gray-900">{log.action}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm font-body-medium text-gray-900">{log.user}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-500 font-body-light">{log.timestamp}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-xs sm:text-sm text-gray-500 font-body-light">{log.ipAddress}</div>
                      </td>
                      <td className="px-3 md:px-6 py-3 md:py-4">
                        <div className="text-xs sm:text-sm text-gray-500 font-body-light">{log.details}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Vista de tarjetas para logs en móvil */
          <div className="space-y-4">
            {securityLogs.map((log) => (
              <LogCard key={log.id} log={log} />
            ))}
          </div>
        )
      ) : (
        /* Configuración de Seguridad */
        <div className="space-y-4 md:space-y-8">
          {/* Política de Contraseñas */}
          <SettingsCard title="Política de Contraseñas" icon={<KeyIcon />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-body-medium text-gray-700 mb-1 md:mb-2">
                  Longitud mínima
                </label>
                <input
                  type="number"
                  value={settings.passwordPolicy.minLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      minLength: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent transition-all duration-200"
                  title="Longitud mínima de contraseña"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-body-medium text-gray-700 mb-1 md:mb-2">
                  Expiración (días)
                </label>
                <input
                  type="number"
                  value={settings.passwordPolicy.expirationDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      expirationDays: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent transition-all duration-200"
                  title="Días hasta expiración de contraseña"
                />
              </div>
            </div>
            <div className="mt-3 md:mt-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireUppercase}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireUppercase: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Requerir mayúsculas"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">Requerir mayúsculas</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireNumbers}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireNumbers: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Requerir números"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">Requerir números</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireSymbols}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {
                      ...settings.passwordPolicy,
                      requireSymbols: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Requerir símbolos"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">Requerir símbolos</span>
              </label>
            </div>
          </SettingsCard>

          {/* Configuración de Sesiones */}
          <SettingsCard title="Configuración de Sesiones" icon={<ClockIcon />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-body-medium text-gray-700 mb-1 md:mb-2">
                  Timeout (minutos)
                </label>
                <input
                  type="number"
                  value={settings.sessionSettings.timeoutMinutes}
                  onChange={(e) => setSettings({
                    ...settings,
                    sessionSettings: {
                      ...settings.sessionSettings,
                      timeoutMinutes: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent transition-all duration-200"
                  title="Tiempo de inactividad antes de cierre de sesión"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-body-medium text-gray-700 mb-1 md:mb-2">
                  Sesiones concurrentes máximas
                </label>
                <input
                  type="number"
                  value={settings.sessionSettings.maxConcurrentSessions}
                  onChange={(e) => setSettings({
                    ...settings,
                    sessionSettings: {
                      ...settings.sessionSettings,
                      maxConcurrentSessions: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent transition-all duration-200"
                  title="Número máximo de sesiones simultáneas"
                />
              </div>
            </div>
            <div className="mt-3 md:mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.sessionSettings.requireReauth}
                  onChange={(e) => setSettings({
                    ...settings,
                    sessionSettings: {
                      ...settings.sessionSettings,
                      requireReauth: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Requerir reautenticación para acciones sensibles"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">
                  Requerir reautenticación para acciones sensibles
                </span>
              </label>
            </div>
          </SettingsCard>

          {/* Configuración de Auditoría */}
          <SettingsCard title="Configuración de Auditoría" icon={<EyeIcon />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-body-medium text-gray-700 mb-1 md:mb-2">
                  Retención de logs (días)
                </label>
                <input
                  type="number"
                  value={settings.auditSettings.logRetentionDays}
                  onChange={(e) => setSettings({
                    ...settings,
                    auditSettings: {
                      ...settings.auditSettings,
                      logRetentionDays: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent transition-all duration-200"
                  title="Días que se mantienen los logs de seguridad"
                />
              </div>
            </div>
            <div className="mt-3 md:mt-4 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.auditSettings.enableDetailedLogging}
                  onChange={(e) => setSettings({
                    ...settings,
                    auditSettings: {
                      ...settings.auditSettings,
                      enableDetailedLogging: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Habilitar logging detallado"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">
                  Habilitar logging detallado
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.auditSettings.alertOnFailedLogins}
                  onChange={(e) => setSettings({
                    ...settings,
                    auditSettings: {
                      ...settings.auditSettings,
                      alertOnFailedLogins: e.target.checked
                    }
                  })}
                  className="h-4 w-4 rounded border-gray-300 text-tramboory-purple-600 focus:ring-tramboory-purple-500"
                  title="Alertar sobre intentos fallidos de login"
                />
                <span className="ml-2 text-xs sm:text-sm text-gray-700 font-body-light">
                  Alertar sobre intentos fallidos de login
                </span>
              </label>
            </div>
          </SettingsCard>

          {/* Botón Guardar */}
          <div className="flex justify-end">
            <button
              onClick={() => handleSettingsUpdate(settings)}
              className="bg-tramboory-purple-600 hover:bg-tramboory-purple-700 text-white font-bold text-sm md:text-base py-2 px-4 md:px-6 rounded-lg md:rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105 transform font-body-medium"
              title="Guardar configuración de seguridad"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      )}
    </div>
  )
}