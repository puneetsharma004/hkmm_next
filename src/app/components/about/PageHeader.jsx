"use client";

import { motion } from 'framer-motion';
import {
  FaHome,
  FaChevronRight
} from 'react-icons/fa';


export default function PageHeader() {
  return (
    <section className="relative py-20 px-4 overflow-hidden contribute-about-bg h-[80vh] flex justify-center lg:justify-start items-start lg:items-center bg-no-repeat bg-center w-full">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      <div className="relative max-w-6xl z-10 text-center bg-white rounded-2xl p-6 lg:p-10 shadow-lg">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center pace-x-2 text-sm">
            <a
              href="/"
              className="text-gray-600 hover:text-primary transition-colors duration-300 flex items-center space-x-1"
            >
              <FaHome className="text-xs" />
              <span>Home</span>
            </a>
            <FaChevronRight className="text-gray-500 text-xs" />
            <span className="text-primary font-medium">About Us</span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            About Us
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Journey of Devotion and Heritage in Jodhpur
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-gray-600 text-lg"
          >
            Discover the spiritual legacy of Hare Krishna Marwar Mandir
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
