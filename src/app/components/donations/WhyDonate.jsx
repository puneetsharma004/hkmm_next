"use client";

import { motion } from 'framer-motion';
import {
  FaUniversity,
  FaUtensils,
  FaCalendarAlt,
  FaBook,
  FaHandshake,
  FaQuoteLeft,
  FaQuoteRight,
  FaCheck,
  FaFileInvoice,
  FaChartLine,
  FaCertificate,
  FaShieldAlt
} from 'react-icons/fa';

export default function WhyDonate() {
  const impactAreas = [
    {
      icon: <FaUniversity />,
      title: 'Temple Operations',
      description: 'Daily maintenance, utilities, and keeping the sacred space beautiful',
      // percentage: '30%'
    },
    {
      icon: <FaUtensils />,
      title: 'Prasadam Distribution',
      description: 'Free meals for devotees and community members in need',
      // percentage: '25%'
    },
    {
      icon: <FaCalendarAlt />,
      title: 'Festivals & Events',
      description: 'Celebrating divine festivals and organizing spiritual programs',
      // percentage: '20%'
    },
    {
      icon: <FaBook />,
      title: 'Education & Outreach',
      description: 'Spiritual classes, books, and spreading Krishna consciousness',
      // percentage: '15%'
    },
    {
      icon: <FaHandshake />,
      title: 'Community Service',
      description: 'Supporting the underprivileged and community welfare',
      // percentage: '10%'
    }
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
            Why Your Donation Matters
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            In Vedic tradition, charity (dana) is considered one of the highest virtues. Your contribution helps us serve Krishna and humanity
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/10rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold text-primary mb-6">The Power of Giving</h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Every contribution to our temple is an offering to Lord Krishna and serves multiple divine purposes.
                  Your donation helps maintain the sacred space where thousands find peace, spiritual guidance, and community.
                </p>
                <p>
                  From the daily aartis that awaken devotion to the free meals that nourish the needy, every rupee is
                  invested in creating positive impact. When you donate, you become part of a spiritual family working
                  together to spread love, compassion, and Krishna consciousness.
                </p>
                <p>
                  As the Bhagavad Gita teaches us, charity given with faith and without expectation of return purifies
                  the heart and brings spiritual merit. Your generosity not only supports our mission but also elevates
                  your own consciousness.
                </p>
              </div>
            </div>

            {/* Spiritual Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-primary/10 rounded-xl p-6 border border-primary/40 border-opacity-60 shadow-lg"
            >
              <div className="text-4xl text-primary mb-4">
                <FaQuoteLeft />
              </div>
              <blockquote className="text-gray-800 italic text-lg mb-4">
                "Charity given out of duty, without expectation of return, at the proper time and place,
                and to a worthy person is considered to be in the mode of goodness."
              </blockquote>
              <div className="flex justify-end items-center space-x-2">
                <p className="text-primary font-semibold">– Bhagavad Gita 17.20</p>
                <FaQuoteRight className="text-primary" />
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Impact Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">How Your Donation is Used</h3>
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 rounded-xl p-4 border border-primary border-opacity-60 backdrop-blur-sm hover:border-primary hover:border-opacity-80 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                        {area.title}
                      </h4>
                      <span className="text-primary font-bold text-lg">{area.percentage}</span>
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {area.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 border border-primary border-opacity-60 shadow-xl"
            >
              <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                <FaShieldAlt />
                100% Transparency
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-500" />
                  <span className="text-gray-700">Detailed financial reports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-500" />
                  <span className="text-gray-700">Regular progress updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-500" />
                  <span className="text-gray-700">Audited accounts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-500" />
                  <span className="text-gray-700">Donation certificates</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Mission Today</h3>
            <p className="text-gray-700 text-lg mb-6">
              Your donation, no matter the size, makes a real difference in preserving our spiritual heritage and serving the community.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <FaFileInvoice className="text-primary" />
                <span>Tax Benefits Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-primary" />
                <span>Impact Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCertificate className="text-primary" />
                <span>Instant Receipts</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
