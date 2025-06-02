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
