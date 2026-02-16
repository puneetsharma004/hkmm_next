"use client";
import { motion } from 'framer-motion';
import {
  FaHome,
  FaChevronRight,
  FaTools,
  FaUtensils,
  FaHeart
} from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';


export default function DonationsPageHero() {
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
            <span className="text-primary font-medium">Donations</span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Donations
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Support the Temple – Contribute to Spiritual Service & Community Welfare
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 rounded-2xl p-6 max-w-3xl mx-auto border border-primary/40 border-opacity-60 shadow-lg"
          >
            <p className="text-gray-800 text-lg italic mb-2">
              "यज्ञदानतपःकर्म न त्याज्यं कार्यमेव तत्"
            </p>
            <p className="text-gray-600 text-sm">
              "Acts of sacrifice, charity and austerity should never be abandoned" - Bhagavad Gita 18.5
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
        >
          {[
            { number: '35000 Sq. Ft.', label: 'Temple Built Up Area', icon: <GiReceiveMoney /> },
            { number: '70 Feet', label: 'Dome Height', icon: <FaHeart /> },
            { number: '4+', label: 'Active Community Projects', icon: <FaTools /> },
            { number: '1000+', label: 'Daily Meals Served', icon: <FaUtensils /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              className="text-center p-4 bg-white/10 rounded-xl border border-primary border-opacity-60 backdrop-blur-sm hover:border-primary hover:border-opacity-80 transition-all duration-300 shadow-lg group"
            >
              <div className="text-2xl mb-2 text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-primary glow">{stat.number}</div>
              <div className="text-gray-600 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
