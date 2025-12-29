"use client";

import { motion } from 'framer-motion';
import { 
  FaHotel, 
  FaBed, 
  FaHome, 
  FaStar, 
  FaPhone, 
  FaInfoCircle, 
  FaClock, 
  FaCheck, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaRupeeSign,
  FaShieldAlt,
  FaWifi,
  FaCar,
  FaUtensils,
  FaSwimmer,
  FaSpa,
  FaConciergeBell
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
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Accommodation Options
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
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
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Temple Guest Accommodation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {templeAccommodation.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 rounded-2xl p-8 border border-saffron/60 dark:border-saffron/50 border-opacity-80 dark:border-opacity-100 backdrop-blur-xl hover:border-opacity-90 dark:hover:border-opacity-70 transition-all duration-300 group shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 text-saffron flex justify-center items-center">{room.icon}</div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{room.type}</h4>
                  <div className="text-lg font-bold text-saffron flex items-center justify-center gap-2">
                    {room.description}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 mt-2">
                    <FaUsers />
                    {room.capacity}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gold mb-2">Amenities:</h5>
                    <ul className="space-y-1">
                      {room.amenities.map((amenity, amenityIndex) => (
                        <li key={amenityIndex} className="flex items-center space-x-2">
                          <FaCheck className="text-saffron" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                      <div className="text-gray-800 dark:text-white font-semibold">{room.availability}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Booking:</span>
                      <div className="text-gray-800 dark:text-white font-semibold">{room.booking}</div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-saffron-gradient text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300"
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
            className="mt-8 bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-orange-200 dark:border-purple-500 border-opacity-60 dark:border-opacity-30 shadow-lg"
          >
            <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-saffron" />
              Guest Guidelines:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {accommodationGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaInfoCircle className="text-saffron" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{guideline}</span>
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
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaHome className="text-saffron" />
              <span>Temple Stay</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gold" />
              <span>Nearby Options</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>All Budgets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
