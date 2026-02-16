"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  FaGift,
  FaUniversity,
  FaClock,
  FaInfoCircle,
  FaBookOpen,
  FaBell,
  FaUsers,
  FaTheaterMasks,
  FaPray,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { IoCalendar } from "react-icons/io5";
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function MajorFestivals() {
  const [majorFestivals, setMajorFestivals] = useState([]);
  // Fetch majorFestivals dynamically from Supabase
  useEffect(() => {
    const fetchMajorFestivals = async () => {
      const { data, error } = await supabase
        .from('majorFestivals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching majorFestivals:', error);
      } else {
        setMajorFestivals(data || []);
      }
    };

    fetchMajorFestivals();
  }, []);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-orange-400/30 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
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
            Major Festivals & Celebrations
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Join us in celebrating the divine festivals that fill our hearts with joy and bring our community together
          </p>
        </motion.div>

        {/* Festivals Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {majorFestivals.map((festival, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 rounded-2xl shadow-2xl overflow-hidden border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group"
            >
              {/* Festival Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  width={100} height={100}
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`}></div>
              </div>

              {/* Festival Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {festival.name}
                    </h3>
                    <span className="text-primary text-sm font-semibold flex items-center gap-1">
                      <IoCalendar />
                      {festival.date}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {festival.description}
                  </p>
                </div>

                {/* Significance */}
                <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/40 border-opacity-60">
                  <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-1">
                    <FaInfoCircle />
                    Spiritual Significance
                  </h4>
                  <p className="text-xs text-gray-700">{festival.significance}</p>
                </div>

                {/* Special Programs */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-1">
                    <FaBookOpen />
                    Special Programs
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {festival.specialPrograms.split(',').map((program, idx) => (
                      <div
                        key={idx}
                        className="bg-orange-100/20 px-2 py-1 rounded text-xs text-gray-700 text-center"
                      >
                        {program}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 bg-primary text-primary font-semibold py-2 px-4 rounded-lg text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaBookOpen />
                    Learn More
                  </motion.button>
                  <motion.button
                    className="flex-1 border border-primary text-primary font-semibold py-2 px-4 rounded-lg text-sm hover:bg-primary hover:text-primary/80 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaBell />
                    Get Notified
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Festival Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Join Our Festivals?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaUsers />, title: 'Community Unity', desc: 'Connect with fellow devotees' },
              { icon: <FaTheaterMasks />, title: 'Cultural Heritage', desc: 'Experience authentic traditions' },
              { icon: <FaPray />, title: 'Spiritual Growth', desc: 'Deepen your devotion' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 text-primary group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {item.icon}
                </div>
                <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-xl hover:shadow-primary/50 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart />
            Join Our Festival Community
            <FaArrowRight />
          </motion.button>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 mt-6">
            <div className="flex items-center space-x-2">
              <IoCalendar className="text-primary" />
              <span>Year-Round Celebrations</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-primary" />
              <span>Community Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Sacred Traditions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
