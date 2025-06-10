"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMail, FiArrowLeft, FiSend, FiCheck } from "react-icons/fi";
import { ParticlesBackground } from "../decorative/ParticlesBackground";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

interface FormData {
  email: string;
}

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Aquí iría la lógica para enviar email de recuperación
      console.log("Enviando email de recuperación a:", data.email);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast.success("Se ha enviado un enlace de recuperación a tu email");
    } catch (error) {
      toast.error("Error al enviar el email de recuperación");
    } finally {
      setIsLoading(false);
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
          {/* Back to signin button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Link 
              href="/signin"
              className="inline-flex items-center text-tramboory-yellow-300 hover:text-tramboory-yellow-400 transition-colors duration-300"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Volver al login
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
                {isSuccess ? "¡Correo enviado!" : "Recuperar contraseña"}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/70 mb-8"
              >
                {isSuccess 
                  ? `Hemos enviado un enlace de recuperación a ${getValues("email")}`
                  : "Ingresa tu email para recibir un enlace de recuperación"
                }
              </motion.p>
            </div>
            
            {/* Content */}
            <div className="px-8 pb-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                    <FiCheck className="w-8 h-8 text-green-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-white/90">
                      Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                    </p>
                    <p className="text-white/60 text-sm">
                      Si no ves el correo, revisa tu carpeta de spam.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/signin"
                      className="block w-full py-3 bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 
                        hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600 text-tramboory-purple-900 
                        rounded-xl font-semibold text-center transition-all duration-300 shadow-lg shadow-tramboory-yellow-400/25"
                    >
                      Volver al login
                    </Link>
                    
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setIsLoading(false);
                      }}
                      className="block w-full py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                        text-white rounded-xl font-semibold hover:bg-white/15 hover:border-white/30 
                        transition-all duration-300"
                    >
                      Enviar otro correo
                    </button>
                  </div>
                </motion.div>
              ) : (
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
                        {...register("email")}
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
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-red-400 mt-1"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center ${
                      isLoading 
                        ? "bg-tramboory-yellow-400/50 cursor-not-allowed text-tramboory-purple-900/70" 
                        : "bg-gradient-to-r from-tramboory-yellow-400 to-tramboory-yellow-500 hover:from-tramboory-yellow-500 hover:to-tramboory-yellow-600 text-tramboory-purple-900 shadow-tramboory-yellow-400/25"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FiSend className="w-4 h-4 mr-2" />
                        Enviar enlace de recuperación
                      </div>
                    )}
                  </motion.button>
                </form>
              )}
              
              {!isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="text-sm text-white/70">
                    ¿Recordaste tu contraseña?{" "}
                    <Link 
                      href="/signin" 
                      className="font-medium text-tramboory-yellow-400 hover:text-tramboory-yellow-300 transition-colors duration-300"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
