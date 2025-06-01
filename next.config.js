/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de imágenes optimizadas
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24, // 24 horas
  },
  
  // Headers personalizados para assets de video
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
  
  // Configuración experimental para mejor rendimiento
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Compresión de assets
  compress: true,
  
  // Configuración de webpack para assets de video
  webpack: (config, { isServer }) => {
    // Configuración para archivos de video
    config.module.rules.push({
      test: /\.(webm|mp4)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    
    return config;
  },
}

module.exports = nextConfig