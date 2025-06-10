'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { ParticlesBackground } from '../decorative/ParticlesBackground';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { login, user, userType } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const loginResult = await login(data.email, data.password);
      
      toast.success('Inicio de sesión exitoso');

      // Usar el resultado del login directamente
      const userRole = loginResult.user.role;
      
      if (userRole === 'admin' || userRole === 'employee') {
        router.push('/dashboard');
      } else {
        // Para clientes, redirigir a una página de cliente o dashboard
        router.push('/dashboard');
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      toast.error(error.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-tramboory-purple-900 to-indigo-950 text-white overflow-hidden">
      {/* Decorative background */}
      <ParticlesBackground 
        colorVariant="gradient" 
        particleCount={30}
        connectionDistance={100}
        opacity={0.3}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-tramboory-purple-400/20 to-tramboory-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-16 w-40 h-40 bg-gradient-to-tr from-tramboory-yellow-400/25 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-16 right-16 w-56 h-56 bg-gradient-to-tl from-tramboory-purple-500/15 to-transparent rounded-full blur-2xl" />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Back to home button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Link 
              href="/"
              className="inline-flex items-center text-tramboory-yellow-300 hover:text-tramboory-yellow-400 transition-colors duration-300"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <Image 
                    src="/img/logo2.webp"
                    alt="Tramboory Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-funhouse font-bold mb-2 text-tramboory-yellow-300"
              >
                Bienvenido de vuelta
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 mb-8"
              >
                Ingresa tus credenciales para continuar
              </motion.p>
            </div>
            
            {/* Form */}
            <div className="px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="text-sm font-medium text-white/90 block">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="text-tramboory-yellow-400" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                        focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-tramboory-yellow-400 focus:border-transparent 
                        transition-all duration-300 text-white placeholder-white/50"
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-400 mt-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label htmlFor="password" className="text-sm font-medium text-white/90 block">
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className="text-tramboory-yellow-400" />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-11 pr-11 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
                        focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-tramboory-yellow-400 focus:border-transparent 
                        transition-all duration-300 text-white placeholder-white/50"
                      placeholder="Tu contraseña"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-tramboory-yellow-400 transition-colors duration-300"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-red-400 mt-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-tramboory-yellow-400 border-white/30 rounded focus:ring-tramboory-yellow-400 bg-white/10"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-white/70">
                      Recordarme
                    </label>
                  </div>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm font-medium text-tramboory-yellow-400 hover:text-tramboory-yellow-300 transition-colors duration-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                    loading 
                      ? 'bg-tramboory-yellow-400/50 cursor-not-allowed text-tramboory-purple-900/70' 
                      : 'bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600 text-tramboory-purple-900 shadow-tramboory-yellow-400/25'
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando sesión...
                    </div>
                  ) : 'Iniciar Sesión'}
                </motion.button>
              </form>

              {/* Demo Credentials Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <h3 className="text-sm font-semibold text-tramboory-yellow-400 mb-3">
                  🔑 Credenciales de Demo
                </h3>
                <div className="space-y-2 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span className="font-medium text-white/90">Administrador:</span>
                    <span>admin@tramboory.com / admin123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-white/90">Empleado:</span>
                    <span>empleado@tramboory.com / empleado123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-white/90">Cliente:</span>
                    <span>cliente@tramboory.com / cliente123</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-white/70">
                  ¿No tienes una cuenta?{' '}
                  <Link
                    href="/register"
                    className="font-medium text-tramboory-yellow-400 hover:text-tramboory-yellow-300 transition-colors duration-300"
                  >
                    Regístrate aquí
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}