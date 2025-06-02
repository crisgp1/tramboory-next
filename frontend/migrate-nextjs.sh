#!/bin/bash

# ============================================================================
# Script de Migración: Next.js App Router - Estructura Enterprise
# Versión: 2.0
# Autor: Arquitecto de Software
# Propósito: Migrar estructura actual a mejores prácticas de Next.js 14+
# ============================================================================

set -e  # Exit on any error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Variables globales
PROJECT_ROOT=$(pwd)
DRY_RUN=false
CREATE_BACKUP=true
VERBOSE=false
BACKUP_PATH=""

# ============================================================================
# FUNCIONES DE UTILIDAD
# ============================================================================

print_color() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_step() {
    local step=$1
    local current=$2
    local total=$3
    print_color $BLUE "[$current/$total] $step"
}

print_header() {
    print_color $PURPLE "╔══════════════════════════════════════════════════════════════════╗"
    print_color $PURPLE "║                    MIGRACIÓN NEXT.JS ENTERPRISE                 ║"
    print_color $PURPLE "║                     Estructura App Router                       ║"
    print_color $PURPLE "╚══════════════════════════════════════════════════════════════════╝"
}

print_usage() {
    echo "Uso: $0 [OPCIONES]"
    echo "Opciones:"
    echo "  --dry-run     Simular cambios sin ejecutar"
    echo "  --no-backup   No crear backup automático"
    echo "  --verbose     Mostrar información detallada"
    echo "  --help        Mostrar esta ayuda"
}

# ============================================================================
# VALIDACIONES INICIALES
# ============================================================================

validate_nextjs_project() {
    print_step "Validando proyecto Next.js" 1 8
    
    if [[ ! -f "package.json" ]]; then
        print_color $RED "❌ Error: No se encontró package.json en el directorio actual"
        exit 1
    fi
    
    if ! grep -q '"next"' package.json; then
        print_color $RED "❌ Error: Este no parece ser un proyecto Next.js"
        exit 1
    fi
    
    if [[ ! -d "app" ]]; then
        print_color $RED "❌ Error: No se encontró directorio app/"
        exit 1
    fi
    
    print_color $GREEN "✓ Proyecto Next.js detectado correctamente"
}

# ============================================================================
# BACKUP Y PREPARACIÓN
# ============================================================================

create_backup() {
    if [[ "$CREATE_BACKUP" == false ]]; then
        return 0
    fi
    
    print_step "Creando backup de seguridad" 2 8
    
    local timestamp=$(date +"%Y%m%d_%H%M%S")
    BACKUP_PATH="backup_migration_$timestamp"
    
    print_color $YELLOW "📦 Creando backup en: $BACKUP_PATH"
    
    if [[ "$DRY_RUN" == false ]]; then
        mkdir -p "$BACKUP_PATH"
        cp -r app "$BACKUP_PATH/app_original"
        cp -r components "$BACKUP_PATH/components_original" 2>/dev/null || true
        cp -r features "$BACKUP_PATH/features_original" 2>/dev/null || true
        print_color $GREEN "✓ Backup creado exitosamente"
    else
        print_color $CYAN "🔍 [DRY RUN] Se crearía backup en: $BACKUP_PATH"
    fi
}

# ============================================================================
# CREACIÓN DE ESTRUCTURA TARGET
# ============================================================================

create_route_groups() {
    print_step "Creando route groups" 3 8
    
    local route_groups=("(public)" "(auth)" "(dashboard)")
    
    for group in "${route_groups[@]}"; do
        local group_path="app/$group"
        print_color $CYAN "  📁 Creando route group: $group"
        
        if [[ "$DRY_RUN" == false ]]; then
            mkdir -p "$group_path"
        fi
        
        # Crear layout específico para cada group
        create_route_group_layout "$group"
    done
}

create_route_group_layout() {
    local group_name=$1
    local layout_path="app/$group_name/layout.tsx"
    
    if [[ "$DRY_RUN" == false ]]; then
        case $group_name in
            "(public)")
                cat > "$layout_path" << 'EOF'
import { NavbarPublic } from '@/components/layout/NavbarPublic'
import { FooterSection } from '@/components/sections/FooterSection'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavbarPublic />
      <main className="min-h-screen">
        {children}
      </main>
      <FooterSection />
    </>
  )
}
EOF
                ;;
            "(auth)")
                cat > "$layout_path" << 'EOF'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
EOF
                ;;
            "(dashboard)")
                cat > "$layout_path" << 'EOF'
import { Navbar } from '@/components/layout/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white shadow-sm">
          {/* Sidebar navigation */}
          <nav className="p-4">
            <div className="space-y-2">
              <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Dashboard
              </a>
              <a href="/dashboard/inventario" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Inventario
              </a>
              <a href="/dashboard/finanzas" className="block px-3 py-2 rounded-md hover:bg-gray-100">
                Finanzas
              </a>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
EOF
                ;;
        esac
        print_color $GREEN "  ✓ Layout creado: $layout_path"
    fi
}

# ============================================================================
# MIGRACIÓN DE PÁGINAS EXISTENTES
# ============================================================================

migrate_home_page() {
    print_step "Migrando página de inicio" 4 8
    
    # Mover home desde (index) a raíz
    if [[ -f "app/(index)/page.tsx" ]]; then
        print_color $CYAN "  📄 Moviendo home: (index)/page.tsx → page.tsx"
        
        if [[ "$DRY_RUN" == false ]]; then
            mv "app/(index)/page.tsx" "app/page.tsx"
            
            # Eliminar carpeta (index) si está vacía
            if [[ -d "app/(index)" && -z "$(ls -A app/\(index\))" ]]; then
                rmdir "app/(index)"
            fi
        fi
    elif [[ ! -f "app/page.tsx" ]]; then
        # Crear home page si no existe
        print_color $CYAN "  📄 Creando home page en app/page.tsx"
        
        if [[ "$DRY_RUN" == false ]]; then
            cat > "app/page.tsx" << 'EOF'
import { Home } from '@/features/home/components'

export default function HomePage() {
  return <Home />
}

export const metadata = {
  title: 'Tramboory - Fiestas Infantiles Increíbles',
  description: 'Los mejores paquetes para fiestas infantiles en Guadalajara',
}
EOF
        fi
    fi
    
    print_color $GREEN "  ✓ Home page configurado correctamente"
}

migrate_public_pages() {
    print_step "Migrando páginas públicas" 5 8
    
    local public_pages=("about" "galeria" "catalogo" "cotizaciones" "reservas")
    
    for page in "${public_pages[@]}"; do
        if [[ -d "app/$page" ]]; then
            print_color $CYAN "  📁 Moviendo: app/$page → app/(public)/$page"
            
            if [[ "$DRY_RUN" == false ]]; then
                mv "app/$page" "app/(public)/$page"
                
                # Crear archivos especiales para cada página
                create_special_files "app/(public)/$page"
            fi
        else
            print_color $YELLOW "  ⚠️  Página $page no encontrada, omitiendo..."
        fi
    done
}

migrate_auth_pages() {
    print_step "Migrando páginas de autenticación" 6 8
    
    if [[ -d "app/auth" ]]; then
        print_color $CYAN "  📁 Reorganizando estructura de auth"
        
        if [[ "$DRY_RUN" == false ]]; then
            # Crear estructura de auth
            mkdir -p "app/(auth)"
            
            # Mover login si existe
            if [[ -d "app/auth/login" ]]; then
                mv "app/auth/login" "app/(auth)/login"
            fi
            
            # Mover otros archivos de auth si existen
            if [[ -f "app/auth/page.tsx" ]]; then
                mkdir -p "app/(auth)/login"
                mv "app/auth/page.tsx" "app/(auth)/login/page.tsx"
            fi
            
            # Eliminar carpeta auth original si está vacía
            if [[ -d "app/auth" && -z "$(ls -A app/auth)" ]]; then
                rmdir "app/auth"
            fi
            
            # Crear archivos especiales para auth
            create_special_files "app/(auth)"
        fi
    fi
}

migrate_dashboard_pages() {
    print_step "Migrando páginas de dashboard" 7 8
    
    local dashboard_pages=("dashboard" "inventario" "finanzas")
    
    for page in "${dashboard_pages[@]}"; do
        if [[ -d "app/$page" ]]; then
            print_color $CYAN "  📁 Moviendo: app/$page → app/(dashboard)/$page"
            
            if [[ "$DRY_RUN" == false ]]; then
                mv "app/$page" "app/(dashboard)/$page"
                
                # Crear archivos especiales para cada página
                create_special_files "app/(dashboard)/$page"
            fi
        else
            print_color $YELLOW "  ⚠️  Página $page no encontrada, omitiendo..."
        fi
    done
}

# ============================================================================
# CREACIÓN DE ARCHIVOS ESPECIALES
# ============================================================================

create_special_files() {
    local target_dir=$1
    
    # Crear loading.tsx si no existe
    if [[ ! -f "$target_dir/loading.tsx" ]]; then
        cat > "$target_dir/loading.tsx" << 'EOF'
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )
}
EOF
    fi
    
    # Crear error.tsx si no existe
    if [[ ! -f "$target_dir/error.tsx" ]]; then
        cat > "$target_dir/error.tsx" << 'EOF'
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-2xl font-bold text-red-600">¡Algo salió mal!</h2>
      <p className="text-gray-600">Ha ocurrido un error inesperado.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
EOF
    fi
}

create_global_special_files() {
    # Crear archivos especiales globales
    local special_files=("loading.tsx" "error.tsx" "not-found.tsx")
    
    for file in "${special_files[@]}"; do
        if [[ ! -f "app/$file" ]]; then
            case $file in
                "loading.tsx")
                    cat > "app/$file" << 'EOF'
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="text-gray-600">Cargando...</p>
      </div>
    </div>
  )
}
EOF
                    ;;
                "error.tsx")
                    cat > "app/$file" << 'EOF'
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h2 className="text-4xl font-bold text-red-600">¡Ups!</h2>
      <p className="text-xl text-gray-600">Algo salió mal</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
EOF
                    ;;
                "not-found.tsx")
                    cat > "app/$file" << 'EOF'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600">Página no encontrada</h2>
      <p className="text-gray-500 text-center max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
EOF
                    ;;
            esac
            print_color $GREEN "  ✓ Creado: app/$file"
        fi
    done
}

# ============================================================================
# MIGRACIÓN DE COMPONENTES ESPECÍFICOS
# ============================================================================

migrate_home_components() {
    print_color $CYAN "  📦 Migrando componentes específicos del home"
    
    # Crear directorio de destino
    local target_dir="features/home/components/sections"
    
    if [[ "$DRY_RUN" == false ]]; then
        mkdir -p "$target_dir"
    fi
    
    # Componentes específicos del home a mover
    local home_components=(
        "components/sections/HeroSection.tsx:features/home/components/HomeHeroSection.tsx"
        "components/sections/PromotionsSection.tsx:features/home/components/sections/PromotionsSection.tsx"
        "components/sections/ReservationStepsSection.tsx:features/home/components/sections/ReservationStepsSection.tsx"
        "components/sections/ServicesSection.tsx:features/home/components/sections/ServicesSection.tsx"
        "components/sections/FeaturesSection.tsx:features/home/components/sections/FeaturesSection.tsx"
    )
    
    for mapping in "${home_components[@]}"; do
        local source="${mapping%%:*}"
        local target="${mapping##*:}"
        
        if [[ -f "$source" ]]; then
            print_color $CYAN "    📄 Moviendo: $source → $target"
            
            if [[ "$DRY_RUN" == false ]]; then
                mkdir -p "$(dirname "$target")"
                mv "$source" "$target"
            fi
        fi
    done
}

# ============================================================================
# ACTUALIZACIÓN DE IMPORTS
# ============================================================================

update_imports() {
    print_step "Actualizando declaraciones de import" 8 8
    
    print_color $CYAN "  🔄 Buscando archivos TypeScript/JavaScript..."
    
    # Buscar todos los archivos .tsx, .ts, .jsx, .js
    local files_to_update=($(find app features -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" 2>/dev/null))
    
    if [[ ${#files_to_update[@]} -eq 0 ]]; then
        print_color $YELLOW "  ⚠️  No se encontraron archivos para actualizar"
        return
    fi
    
    print_color $CYAN "  🔄 Actualizando imports en ${#files_to_update[@]} archivos..."
    
    for file in "${files_to_update[@]}"; do
        if [[ "$DRY_RUN" == false ]]; then
            # Actualizar imports específicos
            sed -i.bak \
                -e "s|from '@/components/sections/HeroSection'|from '@/features/home/components/HomeHeroSection'|g" \
                -e "s|from '@/components/sections/PromotionsSection'|from '@/features/home/components/sections/PromotionsSection'|g" \
                -e "s|from '@/components/sections/ReservationStepsSection'|from '@/features/home/components/sections/ReservationStepsSection'|g" \
                -e "s|from '@/components/sections/ServicesSection'|from '@/features/home/components/sections/ServicesSection'|g" \
                -e "s|from '@/components/sections/FeaturesSection'|from '@/features/home/components/sections/FeaturesSection'|g" \
                "$file"
            
            # Remover archivo de backup
            rm -f "$file.bak"
        fi
    done
    
    print_color $GREEN "  ✓ Imports actualizados correctamente"
}

# ============================================================================
# REPORTE FINAL
# ============================================================================

generate_migration_report() {
    local report_file="migration-report.md"
    local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
    
    print_color $CYAN "📄 Generando reporte de migración..."
    
    if [[ "$DRY_RUN" == false ]]; then
        cat > "$report_file" << EOF
# Reporte de Migración Next.js Enterprise

**Fecha:** $timestamp  
**Backup:** $BACKUP_PATH

## ✅ Cambios Realizados

### Route Groups Creados
- \`(public)\` - Páginas públicas con navbar y footer
- \`(auth)\` - Páginas de autenticación con layout minimalista
- \`(dashboard)\` - Área administrativa con sidebar

### Reorganización de Páginas
- Home: \`app/(index)/page.tsx\` → \`app/page.tsx\`
- About: \`app/about/\` → \`app/(public)/about/\`
- Galería: \`app/galeria/\` → \`app/(public)/galeria/\`
- Catálogo: \`app/catalogo/\` → \`app/(public)/catalogo/\`
- Cotizaciones: \`app/cotizaciones/\` → \`app/(public)/cotizaciones/\`
- Reservas: \`app/reservas/\` → \`app/(public)/reservas/\`
- Auth: \`app/auth/\` → \`app/(auth)/\`
- Dashboard: \`app/dashboard/\` → \`app/(dashboard)/dashboard/\`
- Inventario: \`app/inventario/\` → \`app/(dashboard)/inventario/\`
- Finanzas: \`app/finanzas/\` → \`app/(dashboard)/finanzas/\`

### Archivos Especiales Creados
- \`loading.tsx\` - UIs de carga contextuales
- \`error.tsx\` - Manejo de errores específico
- \`not-found.tsx\` - Página 404 global

### Componentes Migrados
- \`HeroSection\` → \`features/home/components/HomeHeroSection\`
- \`PromotionsSection\` → \`features/home/components/sections/\`
- \`ReservationStepsSection\` → \`features/home/components/sections/\`
- \`ServicesSection\` → \`features/home/components/sections/\`
- \`FeaturesSection\` → \`features/home/components/sections/\`

## 🔄 Próximos Pasos

1. **Verificar funcionamiento:** \`npm run dev\`
2. **Probar todas las rutas:** Navegar por cada página
3. **Revisar imports:** Verificar que no haya errores de compilación
4. **Actualizar tests:** Ajustar rutas en archivos de testing
5. **Personalizar layouts:** Adaptar según necesidades específicas

## 📝 URLs Resultantes

- \`/\` - Homepage (desde features/home)
- \`/about\` - Página About (layout público)
- \`/galeria\` - Galería (layout público)
- \`/catalogo\` - Catálogo (layout público)
- \`/cotizaciones\` - Cotizaciones (layout público)
- \`/reservas\` - Reservas (layout público)
- \`/login\` - Login (layout auth)
- \`/dashboard\` - Dashboard (layout admin)
- \`/inventario\` - Inventario (layout admin)
- \`/finanzas\` - Finanzas (layout admin)

## ⚙️ Configuración Recomendada

### TypeScript Paths
Asegúrate de que tu \`tsconfig.json\` incluya:
\`\`\`json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./app/*"],
      "@/features/*": ["./features/*"],
      "@/components/*": ["./components/*"]
    }
  }
}
\`\`\`

### ESLint Import Order
\`\`\`json
{
  "rules": {
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling"],
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "internal"
          }
        ]
      }
    ]
  }
}
\`\`\`

## 🚀 Resultado

La estructura ahora sigue las mejores prácticas de Next.js 14+ con:
- Route groups para organización semántica
- Layouts específicos por contexto
- Error handling contextual
- Loading states optimizados
- Separación clara de responsabilidades
- Arquitectura escalable y mantenible

EOF
        print_color $GREEN "✓ Reporte generado: $report_file"
    fi
}

# ============================================================================
# FUNCIÓN PRINCIPAL
# ============================================================================

main() {
    local total_steps=8
    
    # Parsear argumentos
    while [[ $# -gt 0 ]]; do
        case $1 in
            --dry-run)
                DRY_RUN=true
                shift
                ;;
            --no-backup)
                CREATE_BACKUP=false
                shift
                ;;
            --verbose)
                VERBOSE=true
                shift
                ;;
            --help)
                print_usage
                exit 0
                ;;
            *)
                print_color $RED "Opción desconocida: $1"
                print_usage
                exit 1
                ;;
        esac
    done
    
    # Mostrar header
    print_header
    
    if [[ "$DRY_RUN" == true ]]; then
        print_color $YELLOW "🔍 MODO DRY RUN ACTIVADO - No se realizarán cambios reales"
    fi
    
    print_color $BLUE "📁 Directorio del proyecto: $PROJECT_ROOT"
    print_color $BLUE "💾 Backup automático: $CREATE_BACKUP"
    
    # Solicitar confirmación si no es dry run
    if [[ "$DRY_RUN" == false ]]; then
        echo
        read -p "¿Continuar con la migración? (s/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[SsYy]$ ]]; then
            print_color $YELLOW "❌ Migración cancelada por el usuario"
            exit 0
        fi
    fi
    
    echo
    print_color $BLUE "🚀 Iniciando migración..."
    echo
    
    # Ejecutar migración paso a paso
    validate_nextjs_project
    create_backup
    create_route_groups
    migrate_home_page
    migrate_public_pages
    migrate_auth_pages
    migrate_dashboard_pages
    
    # Crear archivos especiales globales
    create_global_special_files
    
    # Migrar componentes específicos
    migrate_home_components
    
    # Actualizar imports
    update_imports
    
    # Generar reporte
    generate_migration_report
    
    echo
    print_color $GREEN "🎉 ¡Migración completada exitosamente!"
    echo
    
    if [[ "$BACKUP_PATH" != "" ]]; then
        print_color $BLUE "💾 Backup disponible en: $BACKUP_PATH"
    fi
    
    print_color $BLUE "📖 Consulta el reporte: migration-report.md"
    print_color $BLUE "🧪 Ejecuta 'npm run dev' para verificar que todo funcione correctamente"
    echo
    
    print_color $PURPLE "✨ ¡Tu proyecto ahora sigue las mejores prácticas de Next.js 14+!"
}

# Ejecutar función principal con todos los argumentos
main "$@"