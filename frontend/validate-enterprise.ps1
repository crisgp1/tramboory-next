Write-Host "🔍 Iniciando validación enterprise de arquitectura Next.js..." -ForegroundColor Cyan

# Fase 1: Validación de TypeScript
Write-Host "
📋 Fase 1: Análisis estático TypeScript" -ForegroundColor Yellow
try {
    npx tsc --noEmit --strict
    Write-Host "✅ TypeScript: Tipos validados sin errores" -ForegroundColor Green
} catch {
    Write-Host "❌ TypeScript: Errores de tipado detectados" -ForegroundColor Red
    exit 1
}

# Fase 2: Compilación de producción
Write-Host "
🏗️ Fase 2: Build de producción optimizado" -ForegroundColor Yellow
try {
    npm run build
    Write-Host "✅ Build: Compilación enterprise exitosa" -ForegroundColor Green
} catch {
    Write-Host "❌ Build: Errores de compilación críticos" -ForegroundColor Red
    exit 1
}

# Fase 3: Validación de linting
Write-Host "
🔧 Fase 3: Análisis de calidad de código" -ForegroundColor Yellow
try {
    npm run lint
    Write-Host "✅ Lint: Estándares de código cumplidos" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Lint: Advertencias de calidad detectadas" -ForegroundColor Yellow
}

# Fase 4: Verificación de estructura
Write-Host "
📁 Fase 4: Validación de arquitectura enterprise" -ForegroundColor Yellow
 = @(
    "features\auth\types\auth.types.ts",
    "features\auth\config\auth.config.ts", 
    "features\auth\services\storage\auth-storage.service.ts",
    "features\auth\services\api\auth-api.service.ts",
    "components\shared\LoadingSpinner.tsx"
)

 = True
foreach ( in ) {
    if (Test-Path ) {
        Write-Host "✅ " -ForegroundColor Green
    } else {
        Write-Host "❌  - FALTANTE" -ForegroundColor Red
         = False
    }
}

if () {
    Write-Host "
🎉 VALIDACIÓN ENTERPRISE COMPLETADA EXITOSAMENTE" -ForegroundColor Green
    Write-Host "📈 Sistema listo para implementación de hooks avanzados" -ForegroundColor Cyan
} else {
    Write-Host "
🚨 VALIDACIÓN FALLIDA - Arquitectura incompleta" -ForegroundColor Red
    exit 1
}
