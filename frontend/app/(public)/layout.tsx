import NavbarPublic from '@/components/layout/NavbarPublic'
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
