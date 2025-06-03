#!/bin/bash

# =============================================================================
# ESTRUCTURA CUSTOMER vs DASHBOARD - COMANDOS TERMINAL
# Ejecutar desde /frontend
# =============================================================================

echo "🏗️  Creando estructura Customer vs Dashboard..."

# =============================================================================
# 1. LIMPIAR Y CREAR ESTRUCTURA BASE
# =============================================================================

# Crear carpetas principales
mkdir -p components/{customer,dashboard,shared}
mkdir -p app/\(customer\) app/\(dashboard\) app/\(public\)
mkdir -p lib types hooks store

# =============================================================================
# 2. COMPONENTS - CUSTOMER (Todo lo del cliente)
# =============================================================================

echo "👤 Creando estructura CUSTOMER..."

# Customer - Reservations (Stepper completo del cliente)
mkdir -p components/customer/reservations/{stepper,components,steps,modals}

# Customer - Profile (Perfil del cliente)
mkdir -p components/customer/profile

# Customer - Auth (Login/Register del cliente)
mkdir -p components/customer/auth

# Customer - Dashboard (Portal del cliente)
mkdir -p components/customer/dashboard

# Customer - Payments (Pagos del cliente)
mkdir -p components/customer/payments

# =============================================================================
# 3. COMPONENTS - DASHBOARD (Todo lo del admin/empleados)
# =============================================================================

echo "🎛️  Creando estructura DASHBOARD..."

# Dashboard - Reservations Management
mkdir -p components/dashboard/reservations/{table,forms,modals,management}

# Dashboard - Catalog Management  
mkdir -p components/dashboard/catalog/{packages,themes,extras,categories,foods}

# Dashboard - Finance Management
mkdir -p components/dashboard/finance/{transactions,payments,reports,summary}

# Dashboard - Inventory Management
mkdir -p components/dashboard/inventory/{materials,stock,movements,alerts,suppliers}

# Dashboard - User Management
mkdir -p components/dashboard/users/{admin,employees,customers}

# Dashboard - Analytics & Reports
mkdir -p components/dashboard/analytics/{charts,reports,kpis}

# Dashboard - Gallery Management
mkdir -p components/dashboard/gallery

# Dashboard - Audit
mkdir -p components/dashboard/audit

# =============================================================================
# 4. APP ROUTES - CUSTOMER
# =============================================================================

echo "🛣️  Creando rutas CUSTOMER..."

# Customer Routes
mkdir -p app/\(customer\)/{reservas,mis-reservas,perfil,pagos,estado}

# Customer - Reservation Flow
mkdir -p app/\(customer\)/reservas/{nueva,\[id\]}

# Customer - My Reservations
mkdir -p app/\(customer\)/mis-reservas/{\[id\],historial}

# Customer - Profile & Settings
mkdir -p app/\(customer\)/perfil/{editar,configuracion}

# Customer - Payments
mkdir -p app/\(customer\)/pagos/{pendientes,historial}

# =============================================================================
# 5. APP ROUTES - DASHBOARD  
# =============================================================================

echo "🎛️  Creando rutas DASHBOARD..."

# Main Dashboard
mkdir -p app/\(dashboard\)/{dashboard,reportes}

# Reservations Management
mkdir -p app/\(dashboard\)/reservas/{nueva,\[id\],calendario,resumen}

# Catalog Management
mkdir -p app/\(dashboard\)/catalogo/{paquetes,tematicas,extras,categorias,alimentos}
mkdir -p app/\(dashboard\)/catalogo/paquetes/{nuevo,\[id\]}
mkdir -p app/\(dashboard\)/catalogo/tematicas/{nueva,\[id\]}
mkdir -p app/\(dashboard\)/catalogo/extras/{nuevo,\[id\]}

# Finance Management
mkdir -p app/\(dashboard\)/finanzas/{transacciones,pagos,reportes,categorias}
mkdir -p app/\(dashboard\)/finanzas/transacciones/{nueva,\[id\]}
mkdir -p app/\(dashboard\)/finanzas/pagos/{nuevo,\[id\]}

# Inventory Management
mkdir -p app/\(dashboard\)/inventario/{materias-primas,lotes,movimientos,alertas,proveedores}
mkdir -p app/\(dashboard\)/inventario/materias-primas/{nueva,\[id\]}
mkdir -p app/\(dashboard\)/inventario/proveedores/{nuevo,\[id\]}

# User Management
mkdir -p app/\(dashboard\)/usuarios/{empleados,clientes,roles}
mkdir -p app/\(dashboard\)/usuarios/empleados/{nuevo,\[id\]}

# Gallery Management
mkdir -p app/\(dashboard\)/galeria/{subir,categorias}

# Audit
mkdir -p app/\(dashboard\)/auditoria/{logs,reportes}

# =============================================================================
# 6. APP ROUTES - PUBLIC
# =============================================================================

echo "🌐 Creando rutas PÚBLICAS..."

# Public Routes
mkdir -p app/\(public\)/{nosotros,galeria,contacto,cotizaciones}

# =============================================================================
# 7. SHARED COMPONENTS
# =============================================================================

echo "🔄 Creando componentes COMPARTIDOS..."

# UI Components (usados por customer y dashboard)
mkdir -p components/shared/ui/{forms,tables,modals,cards,navigation}

# Business Components (usados por ambos)
mkdir -p components/shared/business/{calendar,payments,notifications}

# Layout Components
mkdir -p components/shared/layout/{headers,footers,sidebars}

# =============================================================================
# 8. ESTRUCTURA ESPECÍFICA POR DOMINIO
# =============================================================================

echo "📦 Creando estructura específica por dominio..."

# Types específicos
mkdir -p types/{customer,dashboard,shared}

# Hooks específicos  
mkdir -p hooks/{customer,dashboard,shared}

# Stores específicos
mkdir -p store/{customer,dashboard,shared}

# Services específicos
mkdir -p lib/services/{customer,dashboard,shared}

# Utils específicos
mkdir -p lib/utils/{customer,dashboard,shared}

# =============================================================================
# 9. ASSETS Y RECURSOS
# =============================================================================

echo "📁 Creando estructura de assets..."

# Assets organizados
mkdir -p public/{images,videos,fonts,icons}/{customer,dashboard,shared}

# Styles organizados
mkdir -p styles/{customer,dashboard,shared,themes}

# =============================================================================
# 10. CREAR ARCHIVOS INDEX PARA ORGANIZACIÓN
# =============================================================================

echo "📄 Creando archivos index de organización..."

# Components index files
touch components/customer/index.ts
touch components/dashboard/index.ts  
touch components/shared/index.ts

# Types index files
touch types/customer/index.ts
touch types/dashboard/index.ts
touch types/shared/index.ts

# Hooks index files
touch hooks/customer/index.ts
touch hooks/dashboard/index.ts
touch hooks/shared/index.ts

# Store index files
touch store/customer/index.ts
touch store/dashboard/index.ts
touch store/shared/index.ts

# =============================================================================
# 11. LAYOUT FILES
# =============================================================================

echo "📐 Creando archivos de layout..."

# Layout files
touch app/\(customer\)/layout.tsx
touch app/\(dashboard\)/layout.tsx
touch app/\(public\)/layout.tsx

# Loading and error files
touch app/\(customer\)/{loading.tsx,error.tsx,not-found.tsx}
touch app/\(dashboard\)/{loading.tsx,error.tsx,not-found.tsx}
touch app/\(public\)/{loading.tsx,error.tsx}

# =============================================================================
# 12. CREAR ESTRUCTURA DE EJEMPLO ESPECÍFICA
# =============================================================================

echo "🎯 Creando estructura específica del negocio..."

# Customer Reservation Stepper (basado en legacy)
mkdir -p components/customer/reservations/stepper/{package-step,datetime-step,celebrant-step,theme-step,extras-step,food-step,review-step}

# Dashboard Reservation Management (basado en legacy) 
mkdir -p components/dashboard/reservations/management/{form-sections,status-management,calendar-view}

# Customer Profile Forms
mkdir -p components/customer/profile/{personal-info,preferences,notifications}

# Dashboard User Management
mkdir -p components/dashboard/users/{forms,tables,permissions,roles}

# =============================================================================
# RESUMEN DE LA ESTRUCTURA CREADA
# =============================================================================

echo ""
echo "✅ ESTRUCTURA CREADA EXITOSAMENTE!"
echo ""
echo "📊 RESUMEN:"
echo "├── components/"
echo "│   ├── customer/           👤 Todo lo del CLIENTE"
echo "│   │   ├── reservations/   🎪 Stepper de reservas"
echo "│   │   ├── profile/        👤 Perfil del cliente"  
echo "│   │   ├── dashboard/      📱 Portal del cliente"
echo "│   │   └── payments/       💳 Pagos del cliente"
echo "│   ├── dashboard/          🎛️  Todo lo del ADMIN"
echo "│   │   ├── reservations/   📋 Gestión de reservas"
echo "│   │   ├── catalog/        📦 Gestión de catálogo"
echo "│   │   ├── finance/        💰 Gestión financiera"
echo "│   │   ├── inventory/      📊 Gestión de inventario"
echo "│   │   └── users/          👥 Gestión de usuarios"
echo "│   └── shared/             🔄 Componentes compartidos"
echo "├── app/"
echo "│   ├── (customer)/         👤 Rutas del CLIENTE"
echo "│   ├── (dashboard)/        🎛️  Rutas del ADMIN"
echo "│   └── (public)/           🌐 Rutas PÚBLICAS"
echo "└── {types,hooks,store}/    📁 Organizados por contexto"
echo ""
echo "🎯 PRÓXIMO PASO:"
echo "Ahora puedes organizar tu código legacy en esta estructura:"
echo "• Legacy customer/ → components/customer/"
echo "• Legacy admin/ → components/dashboard/"
echo "• Legacy public/ → components/shared/ + app/(public)/"

# =============================================================================
# 13. COMANDO OPCIONAL - MIGRAR DESDE LEGACY
# =============================================================================

cat > migrate-from-legacy.sh << 'EOF'
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
EOF

chmod +x migrate-from-legacy.sh

echo ""
echo "🎉 ¡ESTRUCTURA COMPLETA CREADA!"
echo "📁 Archivos creados: migrate-from-legacy.sh para ayuda con migración"