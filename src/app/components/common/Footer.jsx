"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaHandHoldingHeart,
  FaBlog,
  FaCircleInfo
} from 'react-icons/fa6';

import {
  GiLotus,
  GiGreekTemple,
  GiSunrise,
  GiSunset,
  GiDoor
} from 'react-icons/gi';

const footerPages = [
  {link: "/contact", label: ""}
]

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkvariants = {
    hover: {
      x: 5,
      color: "#f59e0b",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      y: -3,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.9 }
  };

  const omVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.9, 1, 0.9],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.footer
      className="relative bg-footer-gradient"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Floating Particles Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          y: [-8, 8, -8],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 153, 51, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.06) 0%, transparent 50%)
          `,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >

          {/* Temple Info */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-xl font-bold mb-4 flex items-center gap-3"
              variants={itemVariants}
            >
              <span className="text-primary">
                Hare Krishna Marwar Mandir
              </span>
            </motion.h3>

            <motion.div
              className="space-y-3 text-sm"
              variants={containerVariants}
            >
              {[
                { icon: FaLocationDot, text: "Chopasani, Near Vastra Mantralay, Jodhpur, RJ PIN: 342024, Nearest Landmark: Vastra Mantralay" },
                { icon: FaPhone, text: "+91 91161 39371" },
                { icon: FaEnvelope, text: "nljd@hkmjodhpur.org" }
              ].map((item, index) => (
                <motion.p
                  key={index}
                  className="flex items-start gap-3 group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="text-primary mt-0.5 group-hover:text-orange-600 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    <item.icon />
                  </motion.span>
                  <span className="text-gray-700 group-hover:text-gray-800 transition-colors">
                    {item.text}
                  </span>
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold text-primary mb-4"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <motion.div
              className="space-y-2 text-sm"
              variants={containerVariants}
            >
              {[
                { href: "/", text: "Home", icon: GiGreekTemple },
                { href: "/about", text: "About Us", icon: FaCircleInfo },
                { href: "/events", text: "Darshan & Events", icon: GiLotus },
                { href: "/gallery", text: "Gallery", icon: FaBlog },
                { href: "/donations", text: "Donations", icon: FaHandHoldingHeart },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 py-1 px-2 rounded-md text-gray-700 transition-all hover:bg-primary/50 hover:text-primary"
                  variants={itemVariants}
                  whileHover="hover"
                  linkvariants={linkvariants}
                >
                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="text-primary"
                  >
                    <link.icon />
                  </motion.span>
                  {link.text}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Location map embed */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold text-primary mb-4"
              variants={itemVariants}
            >
              Reach Us
            </motion.h3>
            <motion.div
              className="w-full h-44 rounded-lg overflow-hidden"
              variants={itemVariants}
            >
              <iframe
                title="Hare Krishna Marwar Mandir Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.60221799336995!2d72.92808394879104!3d26.273491250976406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418f00266be169%3A0x9ca057426b5d4bec!2sHare%20Krishna%20Marwar%20Mandir%2C%20Chokha%2CChopasni%2C%20Jodhpur!5e0!3m2!1sen!2sin!4v1759394060148!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

          </motion.div>

          {/* Temple Timings & Connect */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-lg font-semibold text-primary mb-4"
              variants={itemVariants}
            >
              Temple Timings
            </motion.h3>
            <motion.div
              className="space-y-3 text-sm"
              variants={containerVariants}
            >
              {[
                { icon: GiSunrise, text: "Morning Aarti: 4:30 AM" },
                { icon: GiSunset, text: "Evening Aarti: 8:00 PM" },
                { icon: GiDoor, text: "Opens Daily: 08:30 AM - 08:30 PM" }
              ].map((timing, index) => (
                <motion.p
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                  variants={itemVariants}
                  whileHover={{ x: 3 }}
                >
                  <motion.span
                    className="text-primary"
                    whileHover={{ rotate: 15, scale: 1.2 }}
                  >
                    <timing.icon />
                  </motion.span>
                  {timing.text}
                </motion.p>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div className="mt-6" variants={itemVariants}>
              <motion.h4
                className="text-sm font-medium text-primary mb-3"
                variants={itemVariants}
              >
                Follow Us
              </motion.h4>
              <motion.div
                className="flex space-x-3"
                variants={containerVariants}
              >
                {[
                  { icon: FaFacebookF, className: "hover:text-blue-600", link: "https://www.facebook.com/Harekrishnamarwar" },
                  { icon: FaInstagram, className: "hover:text-pink-600", link: "https://www.instagram.com/harekrishnamarwar/" },
                  { icon: FaXTwitter, className: "hover:text-gray-800", link: "https://twitter.com" },
                  { icon: FaYoutube, className: "hover:text-red-600", link: "https://www.youtube.com/@HareKrishnaJodhpur" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className={`w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center border border-orange-300/60 text-gray-700 transition-all ${social.className}`}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    linkvariants={socialIconVariants}
                  >
                    <social.icon className="text-sm" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-orange-300/60 my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />

        {/* Spiritual Quote */}
        <motion.div
          className="text-center mb-6"
          variants={itemVariants}
        >
          <motion.p
            className="text-gray-700 italic text-sm"
            variants={itemVariants}
          >
            "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज" - भगवद्गीता
          </motion.p>
          <motion.p
            className="text-xs text-gray-600 mt-1"
            variants={itemVariants}
          >
            "Abandon all varieties of religion and just surrender unto Me" - Bhagavad Gita
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        className="bg-primary/50 backdrop-blur-sm py-4 border-t border-orange-300/40"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700"
            variants={containerVariants}
          >
            <motion.div className="mb-2 md:mb-0" variants={itemVariants}>
              <p>© {currentYear} Hare Krishna Marwar Mandir. All rights reserved.</p>
            </motion.div>

            {/* Additional Links */}
            <motion.div
              className="flex justify-center space-x-4 text-xs text-gray-600"
              variants={containerVariants}
            >
              {["Contact Us", "Privacy Policy", "Terms of Service", "Sitemap"].map((link, index) => (
                <React.Fragment key={index}>
                  <motion.a
                    href="#"
                    className="hover:text-primary transition-colors"
                    variants={itemVariants}
                    whileHover={{ y: -1 }}
                  >
                    {link}
                  </motion.a>
                  {index < 3 && <span className="text-primary">•</span>}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>



        </div>
      </motion.div>
    </motion.footer>
  );
}
