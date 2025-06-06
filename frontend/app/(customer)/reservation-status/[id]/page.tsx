'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface ReservationStatusPageProps {
  params: {
    id: string;
  };
}

interface Reservation {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  paquete: string;
  total: number;
}

export default function ReservationStatusPage({ params }: ReservationStatusPageProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loadingReservation, setLoadingReservation] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && params.id) {
      fetchReservation();
    }
  }, [user, params.id]);

  const fetchReservation = async () => {
    try {
      const response = await api.get(`/reservas/${params.id}`);
      setReservation(response.data);
    } catch (error) {
      console.error('Error fetching reservation:', error);
    } finally {
      setLoadingReservation(false);
    }
  };

  if (loading || loadingReservation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'confirmada':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status || 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Estado de Reservación</h1>
            <p className="text-gray-600">Reservación #{params.id}</p>
          </div>
          
          {reservation ? (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.estado)}`}>
                      {getStatusText(reservation.estado)}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                    <p className="text-gray-900">{reservation.fecha}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                    <p className="text-gray-900">{reservation.hora}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Paquete</label>
                    <p className="text-gray-900">{reservation.paquete}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total</label>
                    <p className="text-gray-900 text-lg font-semibold">
                      ${reservation.total?.toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => router.push('/reservations')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Ver Todas las Reservaciones
                </button>
                <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Modificar Reservación
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <div className="text-gray-400 text-6xl mb-4">❌</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Reservación no encontrada
              </h3>
              <p className="text-gray-500 mb-6">
                No se pudo encontrar la reservación solicitada.
              </p>
              <button 
                onClick={() => router.push('/reservations')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Ver Mis Reservaciones
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}