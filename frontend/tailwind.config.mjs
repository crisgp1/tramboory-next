/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Sistema tipográfico optimizado para Tramboory
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '0.9375rem', // 15px
        'lg': '1rem',        // 16px
        'xl': '1.125rem',    // 18px
        '2xl': '1.25rem',    // 20px
        '3xl': '1.5rem',     // 24px
        '4xl': '1.875rem',   // 30px
        '5xl': '2.25rem',    // 36px
        '6xl': '3rem',       // 48px
      },

      // Familia de fuentes específicas del proyecto
      fontFamily: {
        funhouse: ['"Funhouse"', 'sans-serif'],
        sans: ['"travelia"', 'sans-serif'],
      },
      
      // Paleta de colores de marca Tramboory
      colors: {
        'tramboory': {
          purple: {
            50: '#f3e8ff',
            100: '#e9d5ff',
            200: '#d8b4fe',
            300: '#c084fc',
            400: '#a855f7',
            500: '#9333ea',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
            950: '#2e1065'
          },
          yellow: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12'
          }
        }
      },
      
      // Sistema de animaciones personalizado
      animation: {
        'carousel': 'carousel 60s linear infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'scaleIn': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Keyframes para animaciones específicas del proyecto
      keyframes: {
        carousel: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': { 
            transform: 'translateY(-25px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
        shine: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '50%': { 
            opacity: '1',
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      
      // Sistema de sombras personalizado para efectos visuales
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.5)',
        'glow-yellow': '0 0 20px rgba(250, 204, 21, 0.5)',
        'glow-lg': '0 0 40px rgba(147, 51, 234, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(147, 51, 234, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      // Sistema de blur personalizado
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      
      // Spacing system específico para el proyecto
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      
      // Sistema de z-index estructurado
      zIndex: {
        '-10': '-10',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Plugin personalizado para utilidades adicionales de Tramboory
    function({ addUtilities, addComponents, theme }) {
      // Utilidades personalizadas
      const newUtilities = {
        // Ocultar scrollbar manteniendo funcionalidad
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Texto con gradiente
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        
        // Transformaciones 3D
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.transform-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        
        // Glassmorphism effects
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        
        // Animación de escribir
        '.typing': {
          'overflow': 'hidden',
          'border-right': '.15em solid rgba(255, 255, 255, 0.75)',
          'white-space': 'nowrap',
          'margin': '0 auto',
          'letter-spacing': '.15em',
          'animation': 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        },
        
        // Efecto de hover para cards
        '.card-hover': {
          'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            'transform': 'translateY(-4px) scale(1.02)',
            'box-shadow': theme('boxShadow.card-hover'),
          },
        },
      }
      
      // Componentes personalizados
      const newComponents = {
        // Botón principal de Tramboory
        '.btn-tramboory': {
          'padding': `${theme('spacing.3')} ${theme('spacing.6')}`,
          'background': `linear-gradient(to right, ${theme('colors.tramboory.yellow.400')}, ${theme('colors.tramboory.yellow.500')})`,
          'color': theme('colors.tramboory.purple.900'),
          'font-weight': theme('fontWeight.bold'),
          'border-radius': theme('borderRadius.lg'),
          'transition': 'all 0.3s ease',
          'box-shadow': theme('boxShadow.lg'),
          
          '&:hover': {
            'background': `linear-gradient(to right, ${theme('colors.tramboory.yellow.500')}, ${theme('colors.tramboory.yellow.600')})`,
            'transform': 'translateY(-2px)',
            'box-shadow': theme('boxShadow.glow-yellow'),
          },
          
          '&:active': {
            'transform': 'translateY(0)',
          },
        },
        
        // Card de servicio
        '.service-card': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
          'border-radius': theme('borderRadius.2xl'),
          'padding': theme('spacing.6'),
          'transition': 'all 0.3s ease',
          
          '&:hover': {
            'background': 'rgba(255, 255, 255, 0.15)',
            'border-color': 'rgba(255, 255, 255, 0.3)',
            'transform': 'translateY(-8px)',
            'box-shadow': theme('boxShadow.glow'),
          },
        },
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ],
}

export default tailwindConfig