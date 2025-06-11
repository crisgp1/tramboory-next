'use client'

/**
 * Componente Principal de Gestión de Usuarios
 * @module UsersMain
 * @description Componente principal para la gestión de usuarios del sistema
 */

import React, { useState } from 'react'
import { ItemModal, ScreenSizeAlert } from '@/components/dashboard'

// ============================================================================
// ICONOS SVG
// ============================================================================

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

// ============================================================================
// INTERFACES Y TIPOS
// ============================================================================

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
  createdAt: string
}

// ============================================================================
// DATOS DE EJEMPLO
// ============================================================================

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@tramboory.com',
    role: 'Administrador',
    status: 'active',
    lastLogin: '2024-01-15',
    createdAt: '2023-12-01'
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@tramboory.com',
    role: 'Operador',
    status: 'active',
    lastLogin: '2024-01-14',
    createdAt: '2023-11-15'
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@tramboory.com',
    role: 'Vendedor',
    status: 'inactive',
    lastLogin: '2024-01-10',
    createdAt: '2023-10-20'
  }
]

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * UsersMain - Componente de gestión de usuarios
 * 
 * ### Características:
 * - **Listado de usuarios**: Tabla con información completa
 * - **Filtros**: Búsqueda y filtrado por rol/estado
 * - **CRUD**: Crear, editar y eliminar usuarios
 * - **Responsive**: Adaptable a diferentes tamaños de pantalla
 */
export const UsersMain: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showAlert, setShowAlert] = useState(true)

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Manejar creación/edición de usuario
  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id ? { ...user, ...userData } : user
      ))
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setUsers([...users, newUser])
    }
    setIsModalOpen(false)
    setEditingUser(null)
  }


  // Manejar eliminación de usuario
  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="p-6 pb-16 space-y-8">
      {/* Alerta de tamaño de pantalla */}
      {showAlert && (
        <div className="md:hidden">
          <ScreenSizeAlert setShowAlert={setShowAlert} />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-body-semibold flex items-center gap-2">
            <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600">
              <UserIcon />
            </div>
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 mt-1 font-body-light">
            Administra los usuarios del sistema y sus permisos
          </p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null)
            setIsModalOpen(true)
          }}
          className="bg-tramboory-purple-600 hover:bg-tramboory-purple-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200 hover:shadow-md flex items-center gap-2"
          title="Crear nuevo usuario"
        >
          <PlusIcon />
          Nuevo Usuario
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
          </div>

          {/* Filtro por rol */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por rol"
          >
            <option value="all">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Operador">Operador</option>
            <option value="Vendedor">Vendedor</option>
          </select>

          {/* Filtro por estado */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tramboory-purple-500 focus:border-transparent"
            title="Filtrar por estado"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 font-body-medium">{user.name}</div>
                      <div className="text-sm text-gray-500 font-body-light">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-tramboory-purple-100 text-tramboory-purple-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-body-light">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user)
                          setIsModalOpen(true)
                        }}
                        className="text-tramboory-purple-600 hover:text-tramboory-purple-700 p-1 rounded transition-all duration-200"
                        title="Editar usuario"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded transition-all duration-200"
                        title="Eliminar usuario"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="p-2 bg-tramboory-purple-50 rounded-lg text-tramboory-purple-600 inline-block mb-2">
              <UserIcon />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 font-body-medium">No hay usuarios</h3>
            <p className="mt-1 text-sm text-gray-500 font-body-light">
              No se encontraron usuarios que coincidan con los filtros aplicados.
            </p>
          </div>
        )}
      </div>

      {/* Modal para crear/editar usuario */}
      {isModalOpen && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingUser(null)
          }}
          title={editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          activeTab="users"
          handleSubmit={handleSaveUser}
          editingItem={editingUser}
        />
      )}
    </div>
  )
}