'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { api } from '@/lib/api';

const schema = yup.object().shape({
  email: yup.string().email('Email inválido').required('El email es requerido'),
});

interface FormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

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
      await api.post('/auth/forgot-password', { email: data.email });
      setEmailSent(true);
      toast.success('Se ha enviado un enlace de recuperación a tu email');
    } catch (error: any) {
      toast.error(error.message || 'Error al enviar el email de recuperación');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-green-100 rounded-2xl">
                <FiMail className="text-green-600 text-2xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Email enviado
            </h1>
            <p className="text-gray-600 mb-8">
              Hemos enviado un enlace de recuperación a tu email. Revisa tu bandeja de entrada y sigue las instrucciones.
            </p>
            <Link 
              href="/signin" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500 transition-all duration-200"
            >
              <FiArrowLeft className="mr-2" />
              Volver al inicio de sesión
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mr-32 -mt-32 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full -ml-40 -mb-40 opacity-70"></div>
      
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
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-2xl">
                <FiMail className="text-indigo-600 text-2xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
              Recuperar contraseña
            </h1>
            <p className="text-center text-gray-500 mb-8">
              Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>
          
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiMail className="text-indigo-500" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className={`w-full py-3 mt-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
                  loading 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </div>
                ) : 'Enviar enlace de recuperación'}
              </motion.button>
            </form>
            
            <div className="mt-8 text-center">
              <Link 
                href="/signin" 
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-200"
              >
                <FiArrowLeft className="mr-2" />
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}