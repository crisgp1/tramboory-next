import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/finanzas', '/inventario', '/catalogo', '/reservas'];
// Rutas que requieren estar NO autenticado
const authRoutes = ['/login', '/signin', '/register'];

export function middleware(request: NextRequest) {
  // DESARROLLO: Deshabilitar middleware de autenticación completamente
  if (process.env.NODE_ENV === 'development') {
    console.log('🔓 Middleware: Modo desarrollo - autenticación deshabilitada para:', request.nextUrl.pathname);
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth-token')?.value;

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // Si es una ruta protegida y no hay token, redirigir a signin
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Si está autenticado y trata de acceder a login/register, redirigir al dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
