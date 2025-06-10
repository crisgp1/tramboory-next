'use client'

/**
 * Página de Gestión de Seguridad
 * @module SeguridadPage
 * @description Página principal para la gestión de seguridad del sistema
 */

import React, { useState } from 'react'
import { ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const SecurityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const KeyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default function SeguridadPage() {
  const [securityLogs] = useState<SecurityLog[]>(mockSecurityLogs)
  const [settings, setSettings] = useState<SecuritySettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<'logs' | 'settings'>('logs')
  const [showAlert, setShowAlert] = useState(true)

  // Obtener color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Obtener icono del estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <ShieldIcon />
      case 'failed': return <SecurityIcon />
      case 'warning': return <ClockIcon />
      default: return <EyeIcon />
    }
  }

  // Manejar actualización de configuración
  const handleSettingsUpdate = (newSettings: SecuritySettings) => {
    setSettings(newSettings)
    // Aquí se enviarían los cambios al backend
    alert('Configuración de seguridad actualizada exitosamente')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Alerta de tamaño de pantalla */}
      {showAlert && (
        <div className="md:hidden">
          <ScreenSizeAlert setShowAlert={setShowAlert} />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <SecurityIcon />
            Gestión de Seguridad
          </h1>
          <p className="text-gray-600 mt-1">
            Administra la seguridad del sistema y auditoría
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'logs'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Logs de Seguridad
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Configuración
          </button>
        </nav>
      </div>

      {/* Contenido de tabs */}
      {activeTab === 'logs' ? (
        /* Logs de Seguridad */
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Registro de Actividad</h3>
            <p className="text-sm text-gray-500">Últimas actividades de seguridad del sistema</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full ${getStatusColor(log.status)}`}>
                          {getStatusIcon(log.status)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.action}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{log.timestamp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{log.ipAddress}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{log.details}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Configuración de Seguridad */
        <div className="space-y-6">
          {/* Política de Contraseñas */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <KeyIcon />
              <h3 className="text-lg font-medium text-gray-900">Política de Contraseñas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
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
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">Requerir mayúsculas</span>
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
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">Requerir números</span>
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
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">Requerir símbolos</span>
              </label>
            </div>
          </div>

          {/* Configuración de Sesiones */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <ClockIcon />
              <h3 className="text-lg font-medium text-gray-900">Configuración de Sesiones</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="flex justify-end">
            <button
              onClick={() => handleSettingsUpdate(settings)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Guardar Configuración
            </button>
          </div>
        </div>
      )}
    </div>
  )
}