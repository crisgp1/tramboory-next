import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import { AuthGuard } from '@/components/auth/auth-guard'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navbar fijo */}
        <Navbar />
        
        {/* Container principal con flex responsive */}
        <div className="flex flex-1 relative">
          {/* Sidebar responsive */}
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-30">
              <Sidebar />
            </div>
          </div>

          {/* Overlay para móvil */}
          <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 hidden" id="sidebar-overlay">
            <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg">
              <Sidebar />
            </div>
          </div>

          {/* Main content area responsive */}
          <main className="flex-1 relative bg-gray-50 min-h-[calc(100vh-4rem)]">
            <div className="w-full h-full lg:ml-0">
              <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
                <div className="min-h-full">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Footer que se mantiene al final */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                <div className="w-6 h-6 bg-gradient-to-br from-tramboory-purple-500 to-tramboory-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">T</span>
                </div>
                <span className="font-medium">© 2024 Tramboory</span>
              </div>
              <div className="flex items-center space-x-4">
                <span>Versión 1.0.0</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-tramboory-purple-600">Panel Administrativo</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AuthGuard>
  )
}