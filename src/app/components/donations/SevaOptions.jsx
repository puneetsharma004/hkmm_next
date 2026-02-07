"use client";

import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaGift,
  FaTools,
  FaBook,
  FaHeart,
  FaStar,
  FaRupeeSign,
  FaArrowRight
} from 'react-icons/fa';
import { GiByzantinTemple } from "react-icons/gi";
import { FaCow } from "react-icons/fa6";
import { HiSparkles } from 'react-icons/hi';
import { FaHandHoldingHeart } from "react-icons/fa";

export default function SevaOptions() {
  // Scroll to donation form
  const scrollToDonationForm = () => {
    const donationForm = document.querySelector('#donation-form');
    if (donationForm) {
      donationForm.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll to a section with class name if ID doesn't exist
      const donationSection = document.querySelector('.donation-form, .donate-section');
      if (donationSection) {
        donationSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };
  const sevaOptions = [
    {
      id: 'gau-seva',
      title: 'Gau Seva (Cow Protection)',
      description: 'Support the care and feeding of our sacred temple cows. Help maintain the goshala and provide nutritious food for these gentle souls.',
      icon: <FaCow />,
      color: 'from-green-500 to-teal-600',
      suggestedAmount: '₹2,100',
      impact: 'Feeds 1 cow for a month',
      popular: false
    },
    {
      id: 'anna-daan',
      title: 'Anna Daan Seva (Food Distribution)',
      description: 'Provide free prasadam to devotees and the needy. Your contribution helps us serve hundreds of meals daily with love and devotion.',
      icon: <FaUtensils />,
      color: 'from-orange-500 to-red-600',
      suggestedAmount: '₹4,500',
      impact: 'Provides 100 meals',
      popular: true
    },
    {
      id: 'festival-sponsorship',
      title: 'Festival Sponsorship',
      description: 'Sponsor major festivals like Janmashtami, Holi, and Rath Yatra. Help create divine celebrations that inspire thousands.',
      icon: <FaGift />,
      color: 'from-purple-500 to-pink-600',
      suggestedAmount: '₹11,000',
      impact: 'Sponsor any for complete festival',
      popular: false
    },
    {
      id: 'square-feet-seva',
      title: 'Square Feet Seva',
      description: 'Contribute to infrastructure development, maintenance, and beautification of our sacred temple premises.',
      icon: <FaTools />,
      color: 'from-blue-500 to-indigo-600',
      suggestedAmount: '₹2,100/Sq.ft.',
      impact: 'Major infrastructure support',
      popular: true
    },
    {
      id: 'aarti-sponsorship',
      title: 'Daily Aarti Sponsorship',
      description: 'Sponsor morning or evening aarti ceremonies. Your name will be announced during the sacred offering to the deities.',
      icon: <GiByzantinTemple />,
      color: 'from-yellow-500 to-orange-600',
      suggestedAmount: '₹1,100',
      impact: 'Sponsors one complete aarti',
      popular: true
    },
    {
      id: 'education-outreach',
      title: 'Education & Outreach',
      description: 'Fund spiritual education programs, book distribution, and outreach activities to spread Krishna consciousness.',
      icon: <FaBook />,
      color: 'from-cyan-500 to-blue-600',
      suggestedAmount: '₹5,100',
      impact: 'Supports 10 students monthly',
      popular: false
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>


      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Types of Seva / Donation Options
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Choose how you'd like to serve Krishna and support our temple community through various seva opportunities
          </p>
        </motion.div>

        {/* Seva Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sevaOptions.map((seva, index) => (
            <motion.div
              key={seva.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 group ${seva.popular
                ? 'bg-gradient-to-br from-primary/20 to-primary/20 border-2 border-primary border-opacity-80'
                : 'bg-white/10 border border-primary border-opacity-60 hover:border-primary hover:border-opacity-80'
                } backdrop-blur-xl`}
            >
              {seva.popular && (
                <div className="absolute top-0 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-b-lg shadow-lg flex items-center gap-1">
                  <FaStar />
                  POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Icon and Title */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${seva.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {seva.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary flex items-center gap-1">
                      <FaRupeeSign className="text-lg" />
                      {seva.suggestedAmount.replace('₹', '')}
                    </div>
                    <div className="text-xs text-gray-600">Suggested</div>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${seva.popular ? 'text-gray-800' : 'text-gray-800 group-hover:text-primary'
                  }`}>
                  {seva.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {seva.description}
                </p>

                {/* Impact */}
                <div className="mb-6 p-3 bg-gradient-to-r from-orange-100/80 to-amber-100/80 rounded-lg border border-primary/30 border-opacity-40">
                  <div className="text-xs text-primary font-semibold mb-1 flex items-center gap-1">
                    <FaHeart />
                    Your Impact:
                  </div>
                  <div className="text-sm text-gray-700">{seva.impact}</div>
                </div>

                {/* Donate Button */}
                <motion.button
                  onClick={scrollToDonationForm}
                  className={`w-full font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${seva.popular
                    ? 'bg-primary text-white hover:shadow-primary/30'
                    : 'bg-primary text-white hover:from-primary hover:to-primary hover:text-white hover:shadow-primary/30'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href='#'
                >
                  <FaHandHoldingHeart />
                  Donate Now
                </motion.button>

                {/* Other Amount Option */}
                <div className="mt-3 text-center">
                  <button className="text-gray-500 hover:text-primary text-sm transition-colors duration-300">
                    Or you can choose your own amount also
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Amount Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Can't find the right seva option?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Every contribution, no matter the size, is valuable and appreciated. You can also donate any amount for general temple operations.
          </p>
          <motion.button
            className="px-8 py-3 bg-primary cursor-pointer text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToDonationForm}
          >
            Make Custom Donation
            <FaArrowRight />
          </motion.button>
        </motion.div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-primary" />
              <span>100% Transparency</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="text-primary" />
              <span>Tax Benefits Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Regular Impact Reports</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
