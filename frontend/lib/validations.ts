import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

// Package schema
export const packageSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  duration: z.number().min(1, 'La duración debe ser mayor a 0'),
  capacity: z.number().min(1, 'La capacidad debe ser mayor a 0'),
});

// Reservation schema
export const reservationSchema = z.object({
  packageId: z.string().min(1, 'Selecciona un paquete'),
  date: z.string().min(1, 'Selecciona una fecha'),
  time: z.string().min(1, 'Selecciona una hora'),
  celebrantName: z.string().min(2, 'El nombre del festejado es requerido'),
  celebrantAge: z.number().min(1, 'La edad es requerida'),
  guestCount: z.number().min(1, 'El número de invitados es requerido'),
  customerName: z.string().min(2, 'Tu nombre es requerido'),
  customerPhone: z.string().min(10, 'El teléfono es requerido'),
  customerEmail: z.string().email('Email inválido'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PackageInput = z.infer<typeof packageSchema>;
export type ReservationInput = z.infer<typeof reservationSchema>;
