import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de performance enterprise
  experimental: {
    optimizeCss: true,
    serverActions: true,
  },
  
  // Configuración de paquetes externos del servidor
  serverExternalPackages: ['crypto-js'],
  
  // Configuración TypeScript estricta
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  
  // Configuración ESLint enterprise
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'features', 'components', 'lib', 'utils'],
  },
  
  // Optimizaciones de compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  // Headers de seguridad enterprise
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  
  // Configuración de redirecciones enterprise
  async redirects() {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
  
  // Optimización de imágenes y Cloudinary integration
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['ui-avatars.com', 'images.unsplash.com', 'res.cloudinary.com'],
    minimumCacheTTL: 60,
  },
  
  // Configuración de Webpack optimizada con ES modules
  webpack: (config, { dev, isServer }) => {
    // Configuración de alias para imports más limpios
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, './'),
      '@/components': resolve(__dirname, './components'),
      '@/features': resolve(__dirname, './features'),
      '@/lib': resolve(__dirname, './lib'),
    }
    
    // Optimizaciones para crypto-js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
      }
    }
    
    // Bundle analyzer en desarrollo
    if (dev && process.env.ANALYZE === 'true') {
      console.log('Bundle analyzer habilitado en desarrollo')
    }
    
    return config
  },
  
  // Configuración de output para deployment
  output: 'standalone',
  
  // Configuración de logging
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  
  // Configuración de cache optimizada
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig