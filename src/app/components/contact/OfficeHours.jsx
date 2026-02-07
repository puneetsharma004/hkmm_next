"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaClock,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaDollarSign,
  FaCalendarAlt
} from 'react-icons/fa';

export default function OfficeHours() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

      // Office hours: Mon-Sat 9 AM - 6 PM, Sunday 10 AM - 4 PM
      let isOpen = false;
      if (currentDay === 0) { // Sunday
        isOpen = currentHour >= 10 && currentHour < 16;
      } else { // Monday to Saturday
        isOpen = currentHour >= 9 && currentHour < 18;
      }
      setIsOfficeOpen(isOpen);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const officeSchedule = [
    {
      days: 'Monday - Saturday',
      hours: '9:00 AM - 6:00 PM',
      services: ['General Inquiries', 'Donations Processing', 'Event Registration', 'Volunteer Coordination'],
      icon: <FaBuilding />,
      isWeekend: false
    },
    {
      days: 'Sunday',
      hours: '10:00 AM - 4:00 PM',
      services: ['Limited Services', 'Emergency Assistance', 'Basic Inquiries', 'Community Programs'],
      icon: <FaClock />,
      isWeekend: true
    }
  ];

  const getDayName = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  return (
    <section className="relative py-8 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 ">
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
            Office Hours & Availability
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Our administrative team is available to assist you with inquiries, donations, and services
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-12 rounded-2xl p-6 border backdrop-blur-xl shadow-lg ${isOfficeOpen
            ? 'bg-green-100/80 border-green-400 border-opacity-60'
            : 'bg-red-100/80 border-red-400 border-opacity-60'
            }`}
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              {isOfficeOpen ? (
                <FaCheckCircle className="text-green-600 mx-auto" />
              ) : (
                <FaTimesCircle className="text-red-600 mx-auto" />
              )}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Office is currently {isOfficeOpen ? 'OPEN Till 08:30 PM' : 'CLOSED'}
            </h3>
            <p className="text-gray-700 text-lg flex items-center justify-center gap-2">
              <FaCalendarAlt />
              {getDayName(currentTime.getDay())}, {currentTime.toLocaleTimeString('en-IN', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {!isOfficeOpen && (
              <p className="text-yellow-600 mt-2">
                {currentTime.getDay() === 0
                  ? 'Opens tomorrow at 9:00 AM'
                  : currentTime.getHours() < 9
                    ? `Opens today at ${currentTime.getDay() === 0 ? '10:00 AM' : '9:00 AM'}`
                    : 'Opens tomorrow at 9:00 AM'
                }
              </p>
            )}
          </div>
        </motion.div>

        {/* Office Schedule */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {officeSchedule.map((schedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 border backdrop-blur-xl transition-all duration-300 group shadow-xl border-primary `}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{schedule.days}</h3>
                <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                  <FaClock />
                  {schedule.hours}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-4">Available Services:</h4>
                <ul className="space-y-2">
                  {schedule.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center space-x-2">
                      <FaInfoCircle className="text-primary" />
                      <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
