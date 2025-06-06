'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/types/catalog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { api } from '@/lib/api';

interface PackageTableProps {
  onEdit?: (pkg: Package) => void;
  onDelete?: (id: string) => void;
}

export function PackageTable({ onEdit, onDelete }: PackageTableProps) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await api.get('/catalogo/paquetes');
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando paquetes...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Duración</TableHead>
          <TableHead>Capacidad</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.map((pkg) => (
          <TableRow key={pkg.id}>
            <TableCell>
              <div>
                <div className="font-medium">{pkg.name}</div>
                <div className="text-sm text-gray-500">{pkg.description}</div>
              </div>
            </TableCell>
            <TableCell>{formatCurrency(pkg.price)}</TableCell>
            <TableCell>{pkg.duration}h</TableCell>
            <TableCell>{pkg.capacity} personas</TableCell>
            <TableCell>
              <Badge variant={pkg.isActive ? 'success' : 'error'}>
                {pkg.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(pkg)}>
                    Editar
                  </Button>
                )}
                {onDelete && (
                  <Button variant="destructive" size="sm" onClick={() => onDelete(pkg.id)}>
                    Eliminar
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
