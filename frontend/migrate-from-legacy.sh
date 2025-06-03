#!/bin/bash

echo "🔄 Script para migrar desde estructura legacy..."
echo "Este script te ayudará a mover archivos del legacy a la nueva estructura"
echo ""
echo "Ejemplos de migración:"
echo "mv src/domains/reservas/pages/customer/* components/customer/reservations/"
echo "mv src/domains/reservas/pages/admin/* components/dashboard/reservations/"
echo "mv src/domains/public/* components/shared/ y app/(public)/"
echo "mv src/domains/catalogo/pages/admin/* components/dashboard/catalog/"
echo "mv src/domains/finanzas/* components/dashboard/finance/"
echo "mv src/domains/inventario/* components/dashboard/inventory/"
echo ""
echo "⚠️  IMPORTANTE: Revisar imports y rutas después de mover archivos"
