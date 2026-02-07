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
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>


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
            Follow Our Journey
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Stay connected with our daily spiritual activities and community updates on social media
          </p>
        </motion.div>


        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h3>
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
            <p className="text-gray-700 mb-4 text-sm">
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
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaMobileAlt className="text-primary" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-primary" />
              <span>Community Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
