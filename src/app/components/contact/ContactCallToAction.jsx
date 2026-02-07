"use client";

import { motion } from 'framer-motion';
import {
  FaComments,
  FaCalendarAlt,
  FaTheaterMasks,
  FaPray,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaUserFriends,
  FaHeart,
  FaHandsHelping
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function ContactCallToAction() {
  const quickActions = [
    {
      title: 'Plan Your Visit',
      description: 'Get all the information you need for a perfect temple visit',
      icon: <FaCalendarAlt />,
      color: 'from-blue-500 to-cyan-600',
      action: 'Plan Visit',
      link: '/visitor-info'
    },
    {
      title: 'Join Our Events',
      description: 'Participate in festivals, workshops, and spiritual programs',
      icon: <FaTheaterMasks />,
      color: 'from-purple-500 to-pink-600',
      action: 'View Events',
      link: '/events'
    },
    {
      title: 'Support Our Mission',
      description: 'Contribute to temple activities and community service',
      icon: <FaPray />,
      color: 'from-green-500 to-teal-600',
      action: 'Donate Now',
      link: '/donations'
    }
  ];

  const contactMethods = [
    {
      method: 'Call Us Directly',
      detail: '+91 91161 39371',
      description: 'Speak with our team for immediate assistance',
      icon: <FaPhone />,
      action: 'Call Now'
    },
    {
      method: 'Send an Email',
      detail: 'nljd@hkmjodhpur.org',
      description: 'Detailed inquiries and official communication',
      icon: <FaEnvelope />,
      action: 'Email Us'
    },
    {
      method: 'WhatsApp Chat',
      detail: '+91 91161 39371',
      description: 'Quick messages and instant responses',
      icon: <FaWhatsapp />,
      action: 'Chat Now'
    },
    {
      method: 'Visit in Person',
      detail: 'Sector 12, Jodhpur',
      description: 'Come to our temple office for personal assistance',
      icon: <FaMapMarkerAlt />,
      action: 'Get Directions'
    }
  ];

  return (
    <section className="relative py-4 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
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

          <h2 className="text-4xl md:text-5xl py-2 md:py-4 font-bold gradient-text mb-6">
            Let's Connect & Serve Together
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            Have questions about visiting, donating, or joining our programs?
            We are here to help and guide you on your spiritual journey.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 rounded-2xl p-6 max-w-3xl mx-auto border border-primary/40 border-opacity-60 mb-12 shadow-lg"
          >
            <p className="text-gray-800">
              "Your questions are important to us. Every inquiry brings us closer to serving you better
              and spreading Krishna's love throughout our community."
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white/10 rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group text-center shadow-xl"
            >

              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                {action.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {action.description}
              </p>

              <motion.div
                className="inline-flex items-center space-x-2 text-primary font-semibold group-hover:text-primary transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span>{action.action}</span>
                <FaArrowRight />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Choose Your Preferred Contact Method</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 rounded-xl p-6 border border-primary border-opacity-60 backdrop-blur-sm hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group text-center shadow-lg"
              >
                <div className="text-4xl mb-3 text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {method.icon}
                </div>
                <h4 className="font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                  {method.method}
                </h4>
                <p className="text-primary font-semibold mb-2">{method.detail}</p>
                <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                <span className="text-primary text-sm font-semibold group-hover:text-primary transition-colors duration-300">
                  {method.action}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
