"use client";

import { motion } from 'framer-motion';
import {
  FaBed,
  FaHome,
  FaInfoCircle,
  FaCheck,
  FaMapMarkerAlt,
  FaUsers,
  FaShieldAlt,
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Accommodation() {
  const templeAccommodation = [
    {
      type: 'Guest Rooms',
      capacity: '2-4 people per room',
      description: 'Separate Rooms inside the Temple premises for Families/Individuals',
      amenities: ['Attached bathroom', 'AC/Fan options', 'Basic furniture', 'Clean bedding'],
      availability: 'Subject to availability',
      booking: 'Advance booking required',
      icon: <FaHome />
    },
    {
      type: 'Dormitory',
      capacity: '8-12 people',
      description: 'Bunk Beds Best for Single/Group of Young Individuals, Students',
      amenities: ['Shared bathrooms', 'Lockers provided', 'Common area', 'Basic facilities'],
      availability: 'Usually available',
      booking: 'Walk-in or advance booking',
      icon: <FaBed />
    }
  ];

  const accommodationGuidelines = [
    'Check-in: 12:00 PM | Check-out: 11:00 AM',
    'Valid ID proof required for all guests',
    'No smoking or alcohol in temple premises',
    'Maintain silence after 10:00 PM',
    'Participate in morning aarti (optional but encouraged)',
    'Meals available at temple kitchen (donation basis)'
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
            Accommodation Options
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Stay close to the divine with our temple guest facilities or nearby comfortable hotels
          </p>
        </motion.div>

        {/* Temple Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Temple Guest Accommodation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {templeAccommodation.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/20 to-primary/20 rounded-2xl p-8 border border-primary/60 border-opacity-80 backdrop-blur-xl hover:border-opacity-90 transition-all duration-300 group shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 text-primary flex justify-center items-center">{room.icon}</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{room.type}</h4>
                  <div className="text-lg font-bold text-primary flex items-center justify-center gap-2">
                    {room.description}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-2 mt-2">
                    <FaUsers />
                    {room.capacity}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-primary mb-2">Amenities:</h5>
                    <ul className="space-y-1">
                      {room.amenities.map((amenity, amenityIndex) => (
                        <li key={amenityIndex} className="flex items-center space-x-2">
                          <FaCheck className="text-primary" />
                          <span className="text-gray-700 text-sm">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Availability:</span>
                      <div className="text-gray-800 font-semibold">{room.availability}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Booking:</span>
                      <div className="text-gray-800 font-semibold">{room.booking}</div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-primary cursor-pointer text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 bg-white/10 rounded-xl p-6 border border-primary border-opacity-60 shadow-lg"
          >
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-primary" />
              Guest Guidelines:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {accommodationGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaInfoCircle className="text-primary" />
                  <span className="text-gray-700 text-sm">{guideline}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>



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
              <FaHome className="text-primary" />
              <span>Temple Stay</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-primary" />
              <span>Nearby Options</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>All Budgets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
