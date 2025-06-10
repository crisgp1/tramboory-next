'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiArrowLeft } from 'react-icons/fi';
import { api } from '@/lib/api';
import { ParticlesBackground } from '../decorative/ParticlesBackground';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Email inválido').required('El email es requerido'),
  telefono: yup.string(),
  direccion: yup.string(),
  password: yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una minúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[!@#$%^&*]/, 'Debe contener al menos un caracter especial')
    .required('La contraseña es requerida'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
    .required('Confirma tu contraseña'),
});

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const password = watch('password', '');

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/signup', data);
      toast.success(response.message || "Tu cuenta ha sido creada con éxito");
      setTimeout(() => router.push('/signin'), 2000);
    } catch (error: any) {
      toast.error(error.message || "Hubo un problema al registrarte. Intenta nuevamente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-400'];

  const passwordCriteria = [
    { label: 'Al menos 8 caracteres', regex: /.{8,}/ },
    { label: 'Una letra mayúscula', regex: /[A-Z]/ },
    { label: 'Una letra minúscula', regex: /[a-z]/ },
    { label: 'Un número', regex: /[0-9]/ },
    { label: 'Un caracter especial (!@#$%^&*)', regex: /[!@#$%^&*]/ },
  ];

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
          className="w-full max-w-2xl my-8"
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
                Crear cuenta
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 mb-8"
              >
                Completa tus datos para registrarte
              </motion.p>
            </div>
            
            {/* Form */}
            <div className="px-6 sm:px-8 pb-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    icon={<FiUser className="text-tramboory-yellow-400" />}
                    label="Nombre Completo"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    register={register}
                    error={errors.nombre}
                  />

                  <InputField
                    icon={<FiMail className="text-tramboory-yellow-400" />}
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    register={register}
                    error={errors.email}
                  />

                  <InputField
                    icon={<FiPhone className="text-tramboory-yellow-400" />}
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    placeholder="Tu número de teléfono"
                    register={register}
                    error={errors.telefono}
                  />

                  <InputField
                    icon={<FiMapPin className="text-tramboory-yellow-400" />}
                    label="Dirección"
                    name="direccion"
                    type="text"
                    placeholder="Tu dirección"
                    register={register}
                    error={errors.direccion}
                  />
                </div>

                <div className="mt-2">
                  <PasswordField
                    label="Contraseña"
                    name="password"
                    register={register}
                    error={errors.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-3 mt-2 border border-white/20">
                  {/* Indicador de fortaleza */}
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <motion.div
                        key={index}
                        initial={{ width: '20%', opacity: 0.3 }}
                        animate={{ 
                          opacity: index < getPasswordStrength() ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`h-1.5 flex-grow rounded-full ${
                          index < getPasswordStrength() ? strengthColors[getPasswordStrength() - 1] : 'bg-white/20'
                        }`}
                      ></motion.div>
                    ))}
                  </div>
                  
                  {/* Criterios de contraseña */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {passwordCriteria.map((criterion, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: 1,
                          scale: criterion.regex.test(password) ? [1, 1.05, 1] : 1
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center text-xs"
                      >
                        <div className={`w-4 h-4 mr-2 rounded-full flex items-center justify-center ${
                          criterion.regex.test(password) ? 'bg-green-500/20' : 'bg-white/10'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            criterion.regex.test(password) ? 'bg-green-400' : 'bg-white/30'
                          }`}></div>
                        </div>
                        <span className={criterion.regex.test(password) ? 'text-white' : 'text-white/60'}>
                          {criterion.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <PasswordField
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    register={register}
                    error={errors.confirmPassword}
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                  />
                </div>

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
                      Registrando...
                    </div>
                  ) : 'Crear Cuenta'}
                </motion.button>
              </form>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-white/70">
                  ¿Ya tienes cuenta?{' '}
                  <Link 
                    href="/signin" 
                    className="font-medium text-tramboory-yellow-400 hover:text-tramboory-yellow-300 transition-colors duration-300"
                  >
                    Inicia Sesión
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

interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: any;
  error: any;
}

const InputField = ({ icon, label, name, type, placeholder, register, error }: InputFieldProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
    className="space-y-2"
  >
    <label htmlFor={name} className="text-sm font-medium text-white/90 block">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        {...register(name)}
        type={type}
        className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl 
          focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-tramboory-yellow-400 focus:border-transparent 
          transition-all duration-300 text-white placeholder-white/50"
        placeholder={placeholder}
      />
    </div>
    {error && (
      <motion.p 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="text-xs text-red-400 mt-1"
      >
        {error.message}
      </motion.p>
    )}
  </motion.div>
);

interface PasswordFieldProps {
  label: string;
  name: string;
  register: any;
  error: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const PasswordField = ({ label, name, register, error, showPassword, setShowPassword }: PasswordFieldProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7 }}
    className="space-y-2"
  >
    <label htmlFor={name} className="text-sm font-medium text-white/90 block">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FiLock className="text-tramboory-yellow-400" />
      </div>
      <input
        {...register(name)}
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
    {error && (
      <motion.p 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="text-xs text-red-400 mt-1"
      >
        {error.message}
      </motion.p>
    )}
  </motion.div>
);