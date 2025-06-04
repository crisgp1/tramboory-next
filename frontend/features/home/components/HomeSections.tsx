'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useHome } from '@/features/home/application/providers/HomeProvider'
import { HomeHeroSection } from '@/components/home/HomeHeroSection'
import { FeaturesSection } from '@/components/home/sections/FeaturesSection'
import { ServicesSection } from '@/components/home/sections/ServicesSection'
import { ReservationStepsSection } from '@/components/home/sections/ReservationStepsSection'

/**
 * Home Sections Component
 * 
 * This component orchestrates all the sections of the home page,
 * using data from the HomeProvider and organizing them in the correct order.
 */
export function HomeSections() {
  const { data } = useHome()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Hero Section */}
      <motion.section variants={sectionVariants}>
        <HomeHeroSection />
      </motion.section>

      {/* Features Section */}
      <motion.section variants={sectionVariants}>
        <FeaturesSection />
      </motion.section>

      {/* Services Section */}
      <motion.section variants={sectionVariants}>
        <ServicesSection services={data.services} />
      </motion.section>

      {/* Reservation Steps Section */}
      <motion.section variants={sectionVariants}>
        <ReservationStepsSection />
      </motion.section>

      {/* Spacer for footer */}
      <div className="h-20" />
    </motion.div>
  )
}
