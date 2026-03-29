"use client";

import { motion } from 'framer-motion';
import {
  FaDoorOpen,
  FaHotel,
  FaTheaterMasks,
  FaPrayingHands,
  FaCompass,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaArrowRight,
  FaUsers,

} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VisitorInfoCallToAction() {
  const quickActions = [

    {
      title: 'Book Accommodation',
      description: 'Reserve your temple guest room',
      icon: <FaHotel />,
      color: 'from-green-500 to-teal-600',
      action: 'Book Now',
      link: '#accommodation'
    },
    {
      title: 'Join Events',
      description: 'Participate in upcoming programs',
      icon: <FaTheaterMasks />,
      color: 'from-purple-500 to-pink-600',
      action: 'View Events',
      link: '/events'
    },
    {
      title: 'Support Temple',
      description: 'Contribute to our spiritual mission',
      icon: <FaPrayingHands />,
      color: 'from-orange-500 to-red-600',
      action: 'Donate',
      link: '/donations'
    }
  ];
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Ready to Visit Us?
          </h2>

          <p className="text-xl md:text-2xl text-gray-700  mb-8 leading-relaxed max-w-4xl mx-auto">
            Experience divine peace and spiritual joy at the Hare Krishna Marwar Mandir.
            Your journey to Krishna consciousness begins here.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary Visit Button */}
            <motion.button
              className="group relative overflow-hidden px-12 py-4 bg-primary text-white font-bold rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 text-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3 ">
                <FaDoorOpen />
                <span>Visit Temple Today</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight />
                </motion.span>
              </span>
            </motion.button>

            {/* Get Directions */}
            <motion.button
              className="group border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary cursor-pointer transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCompass className="text-xl" />
              <span>Get Directions</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 rounded-2xl p-6 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group text-center shadow-xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {action.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                {action.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
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

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-primary mb-2">Visit Us</h4>
            <p className="text-gray-600 text-sm">
              Chopasani, Near Vastra Mantralay, <br />Jodhpur, RJ PIN: 342024,<br /> Nearest Landmark: Vastra Mantralay
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaPhone />
            </div>
            <h4 className="font-bold text-primary mb-2">Call Us</h4>
            <p className="text-gray-600 text-sm">
              Visitor Helpline: +91 91161 39371<br />
              Temple Office: +91 91161 39371
              <br />
              WhatsApp: +91 91161 39371

            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaClock />
            </div>
            <h4 className="font-bold text-primary mb-2">Temple Hours</h4>
            <p className="text-gray-600 text-sm">
              Morning: 5:00 AM - 12:00 PM<br />
              Evening: 4:00 PM - 9:00 PM<br />
              Open Daily (All Year Round)
            </p>
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm shadow-lg"
        >
          <p className="text-gray-700 italic text-lg mb-4 max-w-2xl mx-auto">
            "The temple doors are always open for sincere souls seeking Krishna's love and peace."
          </p>
          <p className="text-primary font-semibold text-xl flex items-center justify-center gap-2">
            Hare Krishna! We look forward to welcoming you
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 ">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-primary" />
              <span>Welcoming Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPrayingHands className="text-primary" />
              <span>Spiritual Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Divine Atmosphere</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
