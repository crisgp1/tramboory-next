export interface MateriaPrima {
  id: string;
  name: string;
  description: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  price: number;
  supplierId?: string;
  isActive: boolean;
}

export interface Lote {
  id: string;
  materiaPrimaId: string;
  quantity: number;
  expirationDate?: string;
  purchaseDate: string;
  cost: number;
}

export interface MovimientoInventario {
  id: string;
  materiaPrimaId: string;
  type: 'entrada' | 'salida' | 'ajuste';
  quantity: number;
  reason: string;
  date: string;
  userId: string;
}

export interface AlertaInventario {
  id: string;
  materiaPrimaId: string;
  type: 'low_stock' | 'expiring' | 'expired';
  message: string;
  isRead: boolean;
  createdAt: string;
}
