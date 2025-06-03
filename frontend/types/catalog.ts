export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en horas
  capacity: number; // número de invitados
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: string[];
  imageUrl?: string;
  isActive: boolean;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
}

export interface FoodOption {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens?: string[];
  isActive: boolean;
}
