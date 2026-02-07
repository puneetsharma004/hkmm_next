"use client";

import { motion } from 'framer-motion';
import {
  FaCamera,
  FaPalette,
  FaDoorOpen,
  FaPray,
  FaTheaterMasks,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaArrowRight,
  FaShare,
  FaHeart,

} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { FaXTwitter } from "react-icons/fa6";

export default function GalleryCallToAction() {
  const actionCards = [
    {
      title: 'Be Part of Our Journey',
      description: 'Join our spiritual community and create memories',
      icon: <FaDoorOpen />,
      color: 'from-purple-500 to-indigo-600',
      action: 'Visit Temple',
      link: '/visitor-info'
    },
    {
      title: 'Support Our Mission',
      description: 'Help us continue serving Krishna and community',
      icon: <FaPray />,
      color: 'from-green-500 to-teal-600',
      action: 'Donate Online',
      link: '/donations'
    },
    {
      title: 'Join Our Events',
      description: 'Participate in festivals and spiritual programs',
      icon: <FaTheaterMasks />,
      color: 'from-orange-500 to-red-600',
      action: 'View Events',
      link: '/events'
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>


      <div className="relative max-w-6xl mx-auto z-10">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Be Part of Our Story
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            Every moment captured here represents the divine love and community spirit that flows through our temple.
            Join us in creating more beautiful memories together.
          </p>
        </motion.div>

        {/* Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {actionCards.map((card, index) => (
            <motion.a
              key={index}
              href={card.link}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white/10 rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group text-center shadow-xl"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                {card.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {card.description}
              </p>

              <motion.div
                className="inline-flex items-center space-x-2 text-primary font-semibold group-hover:text-primary transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span>{card.action}</span>
                <FaArrowRight />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Share Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm mb-12 shadow-lg"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Our Divine Moments</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Help spread the divine joy by sharing our gallery with your friends and family.
              Every share brings more souls closer to Krishna's love.
            </p>

            <div className="flex justify-center space-x-4">
              {[
                { platform: 'Facebook', icon: <FaFacebook />, color: 'bg-blue-600 hover:bg-blue-700' },
                { platform: 'Twitter', icon: <FaXTwitter />, color: 'bg-black hover:bg-black/80' },
                { platform: 'WhatsApp', icon: <FaWhatsapp />, color: 'bg-green-600 hover:bg-green-700' },
                { platform: 'Instagram', icon: <FaInstagram />, color: 'bg-pink-600 hover:bg-pink-700' }
              ].map((social, index) => (
                <motion.button
                  key={social.platform}
                  className={`${social.color} text-white p-3 rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                  title={`Share on ${social.platform}`}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 italic text-lg mb-4">
              "Through every photograph, we capture not just moments, but the eternal presence of divine love"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <FaPray className="text-2xl text-primary" />
              <p className="text-primary font-semibold text-xl">
                Hare Krishna! May you find peace and joy in these sacred moments
              </p>
            </div>
          </div>
        </motion.div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaCamera className="text-primary" />
              <span>Professional Photography</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-primary" />
              <span>Community Memories</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Divine Moments</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
