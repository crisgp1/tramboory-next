'use client';

import { useState } from 'react';
import { PackageTable } from '@/components/catalog/package-table';
import { PackageForm } from '@/components/catalog/package-form';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Package } from '@/types/catalog';

export default function CatalogoPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingPackage(null);
    // Refresh the table
    window.location.reload();
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Catálogo de Paquetes</CardTitle>
          <Button onClick={() => setShowForm(true)}>
            Nuevo Paquete
          </Button>
        </CardHeader>
        <CardContent>
          <PackageTable onEdit={handleEdit} />
        </CardContent>
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPackage(null);
        }}
        title={editingPackage ? 'Editar Paquete' : 'Nuevo Paquete'}
        size="lg"
      >
        <PackageForm
          package={editingPackage || undefined}
          onSuccess={handleSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingPackage(null);
          }}
        />
      </Modal>
    </div>
  );
}
