"use client";
import { motion } from 'framer-motion';
import {
  FaCamera,
  FaPalette,
  FaImages,
  FaHome,
  FaChevronRight,
  FaPlay,
  FaCalendarAlt,
  FaGift,
  FaUniversity
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function GalleryPageHero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      <div className="relative max-w-6xl mx-auto z-10 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-sm">
            <a
              href="/"
              className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center space-x-1"
            >
              <FaHome className="text-xs" />
              <span>Home</span>
            </a>
            <FaChevronRight className="text-gray-500 text-xs" />
            <span className="text-primary font-medium">Gallery</span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Gallery
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            A Visual Journey Through the Hare Krishna Marwar Mandir
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FaCamera className="text-primary" />
              <span>Sacred Moments</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FaPlay className="text-primary" />
              <span>Festival Videos</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FaUniversity className="text-primary" />
              <span>Temple Architecture</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
        >
          {[
            { number: '300+', label: 'Photos', icon: <FaCamera /> },
            { number: '25+', label: 'Videos', icon: <FaPlay /> },
            { number: '200+', label: 'Festivals', icon: <FaGift /> },
            { number: '14+', label: 'Years Captured', icon: <FaCalendarAlt /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              className="text-center p-4 bg-white/10 rounded-xl border border-primary:b border-opacity-60 backdrop-blur-sm shadow-lg hover:border-primary hover:border-opacity-80 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-primary glow">{stat.number}</div>
              <div className="text-gray-600 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Gallery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaImages className="text-primary" />
              <span>HD Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPalette className="text-primary" />
              <span>Curated Collection</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Updated Regularly</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
