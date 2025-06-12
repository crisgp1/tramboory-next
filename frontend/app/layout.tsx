import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

/**
 * Configuración de Fuentes Optimizada
 * @description Sistema de fuentes con preload y fallbacks optimizados
 */
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap", // Optimización para CLS (Cumulative Layout Shift)
  preload: true,
});

const funhouse = localFont({
  src: "../public/fonts/FunhouseVF.ttf",
  variable: "--font-funhouse",
  display: "swap",
  preload: true,
});

/**
 * Configuración de Metadata Completa y Optimizada
 * @description Resuelve el error de metadataBase y optimiza SEO
 * 
 * ### Errores Resueltos:
 * - metadataBase property in metadata export is not set
 * - Social media og:image paths
 * - Twitter card optimization
 */
export const metadata: Metadata = {
  // Configuración de metadataBase CRÍTICA para resolver el error
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' 
      ? 'https://tramboory.com' 
      : 'http://localhost:3000'
  ),
  
  // Metadata básica
  title: {
    default: "Tramboory - Salón de Eventos Infantiles",
    template: "%s | Tramboory"
  },
  description: "El mejor salón de fiestas infantiles en Zapopan, Jalisco. Eventos inolvidables con instalaciones modernas, animación profesional y la mejor atención.",
  
  // Keywords optimizadas para SEO local
  keywords: [
    "salón de fiestas",
    "eventos infantiles", 
    "fiestas infantiles",
    "Zapopan",
    "Jalisco",
    "animación infantil",
    "celebraciones",
    "cumpleaños niños",
    "salón eventos",
    "tramboory"
  ],
  
  // Información del autor
  authors: [{ 
    name: "Tramboory", 
    url: "https://tramboory.com" 
  }],
  creator: "Tramboory",
  
  // Configuración de robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph optimizado con rutas absolutas
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Tramboory",
    title: "Tramboory - Eventos Infantiles Inolvidables",
    description: "Celebra momentos inolvidables en el mejor salón de fiestas infantiles en Zapopan. Instalaciones modernas, animación profesional y experiencias mágicas.",
    images: [
      {
        url: "/img/og-image.jpg", // Ruta absoluta resuelta por metadataBase
        width: 1200,
        height: 630,
        alt: "Tramboory - Salón de Eventos Infantiles",
      },
      {
        url: "/img/logo2.webp",
        width: 800,
        height: 600,
        alt: "Logo Tramboory",
      }
    ],
  },
  
  // Twitter Cards optimizado
  twitter: {
    card: "summary_large_image",
    site: "@tramboory",
    creator: "@tramboory",
    title: "Tramboory - Eventos Infantiles Inolvidables",
    description: "El mejor salón de fiestas infantiles en Zapopan, Jalisco",
    images: ["/img/og-image.jpg"], // Ruta absoluta resuelta por metadataBase
  },
  
  // Configuración de íconos y favicon
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#8B5CF6"
      }
    ]
  },
  
  // Manifest para PWA
  manifest: "/manifest.json",
  
  // Configuración adicional
  alternates: {
    canonical: "/",
    languages: {
      'es-MX': '/',
      'es': '/es',
    },
  },
  
  // Verificación de propietario (si aplicable)
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    other: {
      me: ['mailto:info@tramboory.com', 'https://tramboory.com'],
    },
  },
  
  // Configuración de formato
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Configuración de categoría
  category: "business",
  
  // Configuración de viewport implícita (manejada por Next.js 13+)
  // viewport: "width=device-width, initial-scale=1", // NO necesario en app directory
}

/**
 * Configuración de Viewport Separada (Next.js 13+)
 * @description Configuración específica de viewport para optimización móvil
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#8B5CF6' },
    { media: '(prefers-color-scheme: dark)', color: '#7C3AED' },
  ],
}

/**
 * RootLayout - Layout Principal de la Aplicación
 * @description Configuración global con optimizaciones de rendimiento y SEO
 * 
 * ### Características Técnicas:
 * - **Font Optimization**: Preload y display swap para mejor CLS
 * - **Metadata Completa**: SEO optimizado con metadataBase configurado
 * - **Progressive Enhancement**: Soporte para diferentes dispositivos
 * - **Performance**: Configuración optimizada para Core Web Vitals
 * 
 * ### Errores Resueltos:
 * - metadataBase configuration missing
 * - Social media image paths resolution
 * - Font loading optimization
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      suppressHydrationWarning
      className={`${lexend.variable} ${funhouse.variable}`}
    >
      <head>
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/fonts/FunhouseVF.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Preconnect para mejor performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Configuración de CSP básica */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Schema.org JSON-LD para SEO local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventVenue",
              "name": "Tramboory",
              "description": "Salón de eventos infantiles en Zapopan, Jalisco",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Zapopan",
                "addressRegion": "Jalisco",
                "addressCountry": "MX"
              },
              "telephone": "+52-33-XXXX-XXXX",
              "url": "https://tramboory.com",
              "sameAs": [
                "https://www.facebook.com/tramboory",
                "https://www.instagram.com/tramboory"
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${lexend.variable} ${funhouse.variable} antialiased`} 
        suppressHydrationWarning
      >
        {/* Providers optimizados con lazy loading */}
        <Providers>
          {children}
        </Providers>
        
        {/* Script de analytics (si aplica) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics 4 */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}