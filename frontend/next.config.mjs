/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración base para React 19 y Next.js 15+
  reactStrictMode: true,
  
  // Optimización de imágenes con remotePatterns (reemplaza domains deprecated)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'http', 
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
  },
  
  // Headers HTTP optimizados para assets multimedia
  async headers() {
    return [
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/webm',
          },
        ],
      },
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Configuración experimental para Turbopack
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.webm': {
          loaders: ['file-loader'],
          as: '*.webm',
        },
        '*.mp4': {
          loaders: ['file-loader'], 
          as: '*.mp4',
        },
      },
    },
  },
  
  // Compresión habilitada para optimización de red
  compress: true,
}

// Exportación ESM (CRÍTICO: Sin module.exports)
export default nextConfig