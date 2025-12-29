"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaMobileAlt, 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaHeart, 
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function SocialMediaFeed() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, color: 'from-pink-500 to-purple-600', link: ' https://www.instagram.com/harekrishnamarwar/' },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebookF />, color: 'from-blue-500 to-indigo-600', link: 'https://www.facebook.com/Harekrishnamarwar' },
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube />, color: 'from-red-500 to-pink-600', link: 'https://www.youtube.com/@HareKrishnaJodhpur' }
  ];


  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
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
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Follow Our Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Stay connected with our daily spiritual activities and community updates on social media
          </p>
        </motion.div>

        {/* Platform Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4 bg-white/10 dark:bg-gradient-to-r dark:from-gray-900/50 dark:to-black/50 p-2 rounded-2xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg">
            {socialPlatforms.map((platform) => (
              <motion.a
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 cursor-pointer outline-none ${
                  selectedPlatform === platform.id
                    ? `bg-gradient-to-r ${platform.color} text-white`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Social Posts Grid */}


        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Connect With Us</h3>
            <div className="flex justify-center space-x-6 mb-6">
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.id}
                  href={platform.link}
                  className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Follow us for daily updates, spiritual insights, and community moments
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaMobileAlt className="text-saffron" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-gold" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-saffron" />
              <span>Community Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
