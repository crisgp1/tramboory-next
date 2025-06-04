'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeProvider } from '@/features/home/application/providers/HomeProvider';
import { HomeLayout } from '@/features/home/components/layout/HomeLayout';
import { HomeSections } from '@/features/home/components/HomeSections';
import { HomeLoadingSkeleton } from '@/features/home/components/ui/HomeLoadingSkeleton';
import { HomeErrorFallback } from '@/features/home/components/ui/HomeErrorFallback';

// Configuración del cliente de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000,   // 10 minutos
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true
    },
    mutations: {
      retry: 1
    }
  }
});

/**
 * Página principal del sitio web Tramboory
 * Implementa arquitectura DDD con Next.js 14 y App Router
 */
export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary 
        FallbackComponent={HomeErrorFallback}
        onError={(error, errorInfo) => {
          console.error('Home page error:', error);
          console.error('Error info:', errorInfo);
          // Aquí puedes integrar servicios de logging como Sentry
        }}
        onReset={() => {
          // Lógica para resetear el estado si es necesario
          window.location.reload();
        }}
      >
        <HomeProvider>
          <HomeLayout>
            <Suspense fallback={<HomeLoadingSkeleton />}>
              <HomeSections />
            </Suspense>
          </HomeLayout>
        </HomeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}