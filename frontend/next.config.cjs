/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración específica para su stack tecnológico
  reactStrictMode: true,
  
  // Optimización de imágenes para su estructura de assets
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
    minimumCacheTTL: 86400, // 24 horas
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Headers optimizados para assets de video (CORRECCIÓN CRÍTICA)
  async headers() {
    return [
      {
        // Optimización específica para su /video/background.webm
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
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
      {
        // Optimización para sus imágenes en /img/
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Headers de seguridad (VULNERABILIDAD CORREGIDA)
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
        ],
      },
    ]
  },
  
  // Configuración para Turbopack (movido desde experimental.turbo)
  turbopack: {
    rules: {
      // Optimización para archivos de video
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
  
  // Configuración experimental
  experimental: {
    // Optimizaciones para React 19.0.0
    optimizeCss: true,
    scrollRestoration: true,
    optimizeServerReact: true,
  },
  
  // Compresión habilitada para mejor performance
  compress: true,
  
  // Configuración de webpack para assets multimedia
  webpack: (config, { dev, isServer }) => {
    // Optimización para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }
    
    // Configuración para archivos multimedia
    config.module.rules.push({
      test: /\.(webm|mp4|mov|avi)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    })
    
    return config
  },
  
  // Configuración de redirects para SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Variables de entorno públicas
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configuración de bundle analyzer (desarrollo)
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),
}

// Using ES module export syntax instead of CommonJS
export default nextConfig