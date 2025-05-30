'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Service } from '../../domain/entities/Service';
import { IconDisplay } from './IconDisplay';

interface ServiceCardProps {
  service: Service;
  index: number;
  className?: string;
}

/**
 * Componente optimizado para mostrar tarjetas de servicio
 * Compatible con Next.js 15 y Turbopack
 */
export const ServiceCard = memo<ServiceCardProps>(({ 
  service, 
  index, 
  className = '' 
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        delay: index * 0.1 
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`relative group ${className}`}
    >
      <motion.div 
        whileHover={{ 
          y: -5, 
          boxShadow: "0 20px 40px -10px rgba(79, 70, 229, 0.25)" 
        }}
        className={`
          flex flex-col h-full p-8 rounded-2xl border-2 transition-all duration-500
          ${service.isRecommended() 
            ? 'bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-transparent border-yellow-400/40 shadow-yellow-400/20' 
            : 'bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent border-purple-500/30'
          }
          backdrop-blur-md shadow-xl group-hover:shadow-2xl
        `}
      >
        {/* Badge de recomendado */}
        {service.isRecommended() && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 
              text-purple-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
          >
            <IconDisplay iconName="star" className="inline mr-1" size={14} />
            Recomendado
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-200 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Precio */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-yellow-300">
              ${service.price}
            </span>
            <span className="text-gray-300 ml-2">MXN</span>
          </div>
        </div>

        {/* Características */}
        <div className="flex-1 mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Incluye:
          </h4>
          <ul className="space-y-3">
            {service.features.map((feature, featureIndex) => (
              <motion.li
                key={featureIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * featureIndex }}
                className="flex items-start gap-3 group/item"
              >
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
                  group-hover/item:from-yellow-400/20 group-hover/item:to-yellow-500/20 transition-all duration-300">
                  <IconDisplay 
                    iconName={feature.iconName}
                    className="text-yellow-300 group-hover/item:text-white transition-colors duration-300"
                    size={16}
                    aria-label={feature.title}
                  />
                </div>
                <div>
                  <h5 className="font-medium text-white group-hover/item:text-yellow-300 transition-colors">
                    {feature.title}
                  </h5>
                  <p className="text-sm text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {service.highlights.map((highlight, highlightIndex) => (
              <span
                key={highlightIndex}
                className="px-3 py-1 text-xs font-medium rounded-full
                  bg-gradient-to-r from-purple-500/20 to-indigo-500/20 
                  text-purple-200 border border-purple-400/30"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/appointments"
            className={`
              block w-full py-4 px-6 rounded-xl font-bold text-center transition-all duration-300
              ${service.isRecommended()
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 hover:from-yellow-500 hover:to-yellow-600 shadow-yellow-400/20'
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-purple-500/20'
              }
              hover:shadow-xl transform hover:-translate-y-1
            `}
          >
            <IconDisplay iconName="calendar" className="inline mr-2" size={18} />
            Reservar Ahora
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';