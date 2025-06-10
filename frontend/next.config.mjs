import path from 'path';
import { fileURLToPath } from 'url';

// Convert ESM file URL to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración base para React 19 y Next.js 15+
  reactStrictMode: true,
  
  // Webpack configuration for path aliases
  webpack: (config) => {
    // Add aliases that match tsconfig.json paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '.'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/features': path.resolve(__dirname, 'features'),
      '@/features/home/components': path.resolve(__dirname, 'src/features/home/components.ts'),
      '@/ui': path.resolve(__dirname, 'components/ui'),
      '@/decorative': path.resolve(__dirname, 'components/decorative'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/store': path.resolve(__dirname, 'store'),
      '@/contexts': path.resolve(__dirname, 'contexts')
    };
    
    return config;
  },
  
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