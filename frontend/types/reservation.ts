export interface Reservation {
  id: string;
  packageId: string;
  package?: Package;
  customerId: string;
  customer?: User;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  celebrantName: string;
  celebrantAge: number;
  guestCount: number;
  totalAmount: number;
  deposit: number;
  remainingAmount: number;
  extras: ReservationExtra[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationExtra {
  id: string;
  extraId: string;
  extra?: Extra;
  quantity: number;
  price: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  reservationId?: string;
}

import { Package, Extra } from './catalog';
import { User } from './auth';
