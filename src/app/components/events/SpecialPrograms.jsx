"use client";

import { motion } from 'framer-motion';
import {
  FaBook,
  FaTheaterMasks,
  FaUsers,
  FaClock,
  FaUserTie,
  FaChartBar,
  FaCalendarAlt,
  FaUserGraduate,
  FaInfoCircle,
  FaStar,
  FaQuoteLeft,
  FaUserCheck,
  FaPlayCircle,
  FaQuoteRight
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import Image from 'next/image';

export default function SpecialPrograms() {
  const programs = [
    {
      category: 'Spiritual Classes',
      icon: <FaBook />,
      color: 'from-blue-500 to-indigo-600',
      programs: [
        {
          name: 'Bhagavad Gita Study',
          schedule: 'Every Sunday, 09:00 AM',
          duration: '1 hours',
          description: 'Deep dive into Krishnas teachings with experienced instructors',
          instructor: 'Jaggnath prabhu',
          level: 'All Levels',
          registration: true
        },
        {
          name: 'Skills Development Sessions',
          schedule: 'Every Sunday, 05:00 PM',
          duration: '1 hours',
          description: 'Enhance your spiritual skills and practical applications of teachings',
          instructor: 'Jaggnath prabhu',
          level: 'Beginner to Advanced',
          registration: true
        }
      ]
    },
    {
      category: 'Youth Programs',
      icon: <FaUsers />,
      color: 'from-orange-500 to-red-600',
      programs: [
        {
          name: 'Secrets of Success',
          schedule: 'Sundays, 6:00 PM',
          duration: '2 hours',
          description: 'Empowering youth with spiritual values and life skills',
          instructor: 'Jaggnath Prabhu',
          level: 'Ages 16-28',
          registration: true
        },
      ]
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

          <h2 className="text-3xl md:text-4xl font-bold gradient-text py-2 mb-4">
            Special Programs & Workshops
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Enhance your spiritual journey through our comprehensive learning programs and cultural workshops
          </p>
        </motion.div>

        {/* Programs by Category */}
        <div className="space-y-12">
          {programs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white text-xl shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 ">{category.category}</h3>
              </div>

              {/* Programs Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {category.programs.map((program, programIndex) => (
                  <motion.div
                    key={programIndex}
                    initial={{ opacity: 0, x: programIndex % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: programIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="bg-white/10 rounded-2xl p-6 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                        {program.name}
                      </h4>
                      {program.registration && (
                        <span className="bg-primary text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <FaUserGraduate />
                          REGISTER
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaCalendarAlt className="text-primary" />
                        <span>{program.schedule}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaClock className="text-primary" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaUserTie className="text-primary" />
                        <span>{program.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <FaChartBar className="text-primary" />
                        <span>{program.level}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {program.description}
                    </p>

                    <div className="flex space-x-3">
                      {program.registration ? (
                        <>
                          <motion.button
                            className="flex-1 bg-primary text-primary border font-semibold py-2 px-4 rounded-lg text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaUserGraduate />
                            Register Now
                          </motion.button>
                          <motion.button
                            className="px-4 py-2 border border-primary text-primary rounded-lg text-sm hover:bg-primary hover:text-primary/50 transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaInfoCircle />
                            Info
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <FaPlayCircle />
                          Join Anytime
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


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
              <FaBook className="text-primary" />
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-primary" />
              <span>Small Groups</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>All Levels Welcome</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
