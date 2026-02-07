"use client";

import { motion } from 'framer-motion';
import {
  FaBullseye,
  FaStar,
  FaPray,
  FaHandshake,
  FaGraduationCap,
  FaUniversity,
  FaQuoteLeft,
  FaQuoteRight
} from 'react-icons/fa';

export default function MissionVision() {
  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-primary/30 to-orange-400/30 rounded-full opacity-40 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Mission & Vision
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Guided by divine purpose and unwavering devotion to serve humanity
          </p>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl shadow-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl hover:border-opacity-80 transition-all duration-300 group"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary transition-colors duration-300">
                Our Mission
              </h3>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To spread the timeless teachings of Lord Krishna and provide a spiritual sanctuary where devotees can experience divine love, inner peace, and spiritual growth through the practice of bhakti yoga.
              </p>
              <p>
                We strive to preserve and promote the rich cultural heritage of the Marwar region while fostering global consciousness of Krishna's universal message of love and compassion.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 rounded-2xl shadow-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl hover:border-opacity-80 transition-all duration-300 group"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary transition-colors duration-300">
                Our Vision
              </h3>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                To become a beacon of spiritual enlightenment in Rajasthan, inspiring thousands to embrace a life of devotion, service, and divine consciousness.
              </p>
              <p>
                We envision a harmonious community where ancient wisdom meets modern living, creating a world where peace, love, and spiritual prosperity flourish for all beings.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Core Values</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaPray />, title: 'Devotion', desc: 'Pure love for Krishna' },
              { icon: <FaHandshake />, title: 'Service', desc: 'Selfless community service' },
              { icon: <FaGraduationCap />, title: 'Education', desc: 'Spiritual knowledge sharing' },
              { icon: <FaUniversity />, title: 'Heritage', desc: 'Cultural preservation' }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 flex justify-center items-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="font-bold text-primary mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-sm max-w-4xl mx-auto shadow-xl">
            <div className="text-4xl text-primary mb-4">
              <FaQuoteLeft />
            </div>
            <blockquote className="text-xl italic text-gray-700 mb-4">
              A temple is not just a building; it is a living embodiment of divine love where every soul can find their eternal home in Krishna's embrace.
            </blockquote>
            <p className="text-primary font-semibold">– His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada</p>
            <div className="text-4xl text-primary mb-4 flex justify-end items-center">
              <FaQuoteRight />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
