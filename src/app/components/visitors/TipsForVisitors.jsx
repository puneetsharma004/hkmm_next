"use client";

import { motion } from 'framer-motion';
import {
  FaLightbulb,
  FaEdit,
  FaBullseye,
  FaThermometerHalf,
  FaSun,
  FaUmbrella,
  FaMapMarkerAlt,
  FaClock,
  FaCamera,
  FaFirstAid,
  FaWheelchair,
  FaUsers,
  FaInfoCircle,
  FaRoute,
  FaCar,
  FaEye,
  FaHandsHelping,
  FaHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdElderly } from "react-icons/md";

export default function TipsForVisitors() {
  const seasonalTips = [
    {
      season: 'Winter (Nov-Feb)',
      temperature: '10°C - 25°C',
      recommendation: 'Best time to visit',
      tips: ['Carry light woolens for early morning and evening', 'Perfect weather for sightseeing', 'Festival season - book accommodation early'],
      icon: '❄️',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      season: 'Summer (Mar-Jun)',
      temperature: '25°C - 45°C',
      recommendation: 'Visit early morning/evening',
      tips: ['Carry water bottle and sun protection', 'Avoid midday visits', 'Light colored cotton clothing recommended'],
      icon: <FaSun />,
      color: 'from-orange-500 to-red-600'
    },
    {
      season: 'Monsoon (Jul-Oct)',
      temperature: '20°C - 35°C',
      recommendation: 'Carry umbrella',
      tips: ['Check weather before visiting', 'Waterproof your belongings', 'Enjoy the cooler weather'],
      icon: <FaUmbrella />,
      color: 'from-green-500 to-teal-600'
    }
  ];

  const specialNeedsTips = [
    {
      category: 'Elderly Visitors',
      icon: <MdElderly />,
      tips: [
        'Reserved seating available in prayer halls',
        'Wheelchairs can be arranged on request',
        'Volunteers available to assist with mobility',
        'Priority prasadam service provided',
        'Rest areas available throughout the temple'
      ]
    },
    {
      category: 'Families with Children',
      icon: <FaUsers />,
      tips: [
        'Baby changing facilities in restrooms',
        'High chairs available in dining area',
        'Kid-friendly programs on Sundays',
        'Story telling sessions during festivals',
        'Safe play area in temple courtyard'
      ]
    },
    {
      category: 'Differently-Abled Visitors',
      icon: <FaWheelchair />,
      tips: [
        'Wheelchair accessible ramps and pathways',
        'Accessible restrooms available',
        'Sign language interpreter on request',
        'Braille materials for visually impaired',
        'Dedicated parking spaces near entrance'
      ]
    }
  ];

  const generalTips = [
    {
      category: 'Photography',
      tips: [
        'Best lighting during primaryen hours (sunrise/sunset)',
        'Ask permission before photographing people',
        'No flash during aarti ceremonies',
        'Respect "no photography" zones',
        'Commercial shoots require prior permission'
      ],
      icon: <FaCamera />
    },
    {
      category: 'Cultural Experience',
      tips: [
        'Participate in morning aarti for authentic experience',
        'Try temple prasadam - it\'s blessed food',
        'Listen to spiritual discourses on Sundays',
        'Join community activities and festivals',
        'Learn basic Sanskrit mantras from volunteers'
      ],
      icon: <FaHeart />
    },
    {
      category: 'Health & Safety',
      tips: [
        'Stay hydrated, especially in summer',
        'Wear comfortable walking shoes',
        'Keep emergency contacts handy',
        'Inform medical conditions to volunteers',
        'Follow COVID guidelines if applicable'
      ],
      icon: <FaFirstAid />
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Special Needs Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Special Assistance</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {specialNeedsTips.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-primary/10 rounded-xl p-6 border border-primary/40 border-opacity-60 shadow-lg"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 text-primary flex justify-center">{category.icon}</div>
                  <h4 className="font-bold text-primary">{category.category}</h4>
                </div>

                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <FaHandsHelping className="text-primary text-sm mt-1" />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* General Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {generalTips.map((tipCategory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-xl p-6 border border-primary border-opacity-60 backdrop-blur-xl shadow-xl"
            >
              <div className="text-center mb-4">
                <div className="text-2xl mb-3 text-primary flex justify-center ">{tipCategory.icon}</div>
                <h4 className="font-bold text-gray-800">{tipCategory.category}</h4>
              </div>

              <ul className="space-y-2">
                {tipCategory.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <FaInfoCircle className="text-primary text-sm mt-1" />
                    <span className="text-gray-600 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaRoute className="text-primary" />
              <span>Local Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-primary" />
              <span>Visitor Tips</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Best Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
