"use client";

import { motion } from 'framer-motion';
import {
  FaUtensils,
  FaHandsHelping,
  FaPray,
  FaSun,
  FaMoon,
  FaGift,
  FaCookieBite,
  FaBroom,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaCheck,
  FaHeart,
  FaStar,
  FaRupeeSign,
  FaChartLine
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { FaHandHoldingHeart } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function PrasadamAndSeva() {
  const prasadamSchedule = [
    {
      name: 'Morning Prasadam',
      time: '7:00 AM - 9:00 AM',
      description: 'Light breakfast prasadam after morning aarti',
      items: ['Kheer', 'Fruits', 'Tea/Milk'],
      location: 'Prasadam Hall',
      type: 'daily',
      icon: <FaSun />
    },
    {
      name: 'Raj Bhog Prasadam',
      time: '12:00 PM - 2:00 PM',
      description: 'Complete lunch prasadam with traditional dishes',
      items: ['Rice', 'Dal', 'Sabzi', 'Roti', 'Sweet'],
      location: 'Prasadam Hall',
      type: 'daily',
      icon: <FaUtensils />
    },
    {
      name: 'Evening Prasadam',
      time: '7:00 PM - 9:00 PM',
      description: 'Light dinner prasadam after evening aarti',
      items: ['Khichdi', 'Vegetables', 'Sweets'],
      location: 'Prasadam Hall',

      type: 'daily',
      icon: <FaMoon />
    },
    {
      name: 'Sunday Special Feast',
      time: '7:00 PM - 9:00 PM',
      description: 'Grand community feast with special preparations',
      items: ['15+ Dishes', 'Special Sweets', 'Festive Menu'],
      location: 'Prasadam Hall',
      type: 'weekly',
      icon: <FaGift />
    }
  ];

  const sevaOpportunities = [
    {
      title: 'Cooking Seva',
      description: 'Help prepare prasadam in our sacred kitchen',
      commitment: '2-4 hours weekly',
      requirements: 'Basic cooking skills, devotional attitude',
      benefits: 'Learn sacred cooking, serve Krishna directly',
      icon: <FaCookieBite />,
      color: 'from-orange-500 to-red-600',
      participants: '25+'
    },
    {
      title: 'Distribution Seva',
      description: 'Serve prasadam to devotees and community',
      commitment: '2-3 hours per session',
      requirements: 'Friendly nature, punctuality',
      benefits: 'Connect with devotees, spread joy',
      icon: <FaHandsHelping />,
      color: 'from-green-500 to-teal-600',
      participants: '40+'
    },
    {
      title: 'Kitchen Cleaning',
      description: 'Maintain cleanliness of sacred kitchen',
      commitment: '1-2 hours daily',
      requirements: 'Attention to detail, reliability',
      benefits: 'Purify consciousness through seva',
      icon: <FaBroom />,
      color: 'from-blue-500 to-indigo-600',
      participants: '15+'
    },
    {
      title: 'Management for Prasadam Distribution',
      description: 'Help organize and manage prasadam logistics',
      commitment: '2-3 hours Daily',
      requirements: 'Organizational skills, leadership qualities',
      benefits: 'Ensure smooth distribution, gain management experience',
      icon: <FaShoppingCart />,
      color: 'from-purple-500 to-pink-600',
      participants: '10+'
    }
  ];

  const [sponsorshipTiers, setSponsorshipTiers] = useState([]);
  // Fetch sponsorshipTiers dynamically from Supabase
  useEffect(() => {
    const fetchSponsorshipTiers = async () => {
      const { data, error } = await supabase
        .from('sponsorshipTiers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sponsorshipTiers:', error);
      } else {
        setSponsorshipTiers(data || []);
      }
    };

    fetchSponsorshipTiers();
  }, []);


  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 "></div>

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
            Prasadam Distribution & Seva Opportunities
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Experience the joy of sharing Krishna's mercy through prasadam and join our community service
          </p>
        </motion.div>

        {/* Prasadam Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800  mb-8">Daily Prasadam Schedule</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {prasadamSchedule.map((prasadam, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white/10 rounded-2xl p-6 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl text-primary">{prasadam.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                        {prasadam.name}
                      </h4>
                      <p className="text-primary text-sm font-semibold flex items-center gap-1">
                        <FaClock />
                        {prasadam.time}
                      </p>
                    </div>
                  </div>
                  {prasadam.type === 'weekly' && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <FaStar />
                      SPECIAL
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-gray-300 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                  {prasadam.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt />
                    <span>{prasadam.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seva Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Seva Opportunities</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {sevaOpportunities.map((seva, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/10 rounded-2xl p-6 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group shadow-xl"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${seva.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {seva.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 mb-2">
                      {seva.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FaUsers />
                      <span>{seva.participants} volunteers</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {seva.description}
                </p>

                <div className="space-y-3 mb-6 text-sm">
                  <div>
                    <span className="text-primary font-semibold">Commitment: </span>
                    <span className="text-gray-600 text-gray-300">{seva.commitment}</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Requirements: </span>
                    <span className="text-gray-600 text-gray-300">{seva.requirements}</span>
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Benefits: </span>
                    <span className="text-gray-600 text-gray-300">{seva.benefits}</span>
                  </div>
                </div>

                <motion.button
                  className="w-full bg-primary text-primary border font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHandHoldingHeart />
                  Join This Seva
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sponsorship Options */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Sponsor Prasadam Distribution</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 group relative shadow-xl ${tier.popular
                  ? 'bg-gradient-to-br from-primary/20 to-primary/20 border-primary border-opacity-80 shadow-primary/30'
                  : 'bg-white/10 border-primary border-opacity-60 hover:border-primary hover:border-opacity-80'
                  }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <FaStar />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-800mb-2">{tier.name}</h4>
                  <div className="text-3xl font-bold text-primary mb-1 flex items-center justify-center gap-1">
                    <FaRupeeSign className="text-2xl" />
                    {tier.amount}
                  </div>
                  <div className="text-sm text-gray-500">Serves {tier.serves}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <FaCheck className="text-primary" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${tier.popular
                    ? 'bg-primary text-primary border hover:shadow-lg hover:shadow-primary/30'
                    : 'border border-primary text-primary hover:bg-primary hover:text-primary/50'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHandHoldingHeart />
                  Sponsor Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Impact */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Prasadam Impact</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '50,000+', label: 'Meals Served Monthly', icon: <FaUtensils /> },
              { number: '200+', label: 'Daily Beneficiaries', icon: <FaUsers /> },
              { number: '14+', label: 'Years of Service', icon: <FaChartLine /> },
              { number: '100%', label: 'Spiritual Satisfaction', icon: <FaHeart /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary glow mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
