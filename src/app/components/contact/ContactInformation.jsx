
"use client";
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaDirections,
  FaBuilding,
  FaMapPin,
  FaInfoCircle,
  FaHandsHelping,
  FaNewspaper
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdGpsFixed } from "react-icons/md";

export default function ContactInformation() {
  const contactDetails = [
    {
      category: 'Temple Address',
      icon: <FaMapMarkerAlt />,
      color: 'from-blue-500 to-cyan-600',
      details: [
        { label: 'Full Address', value: 'Chopasani, Near Vastra Mantralay, Jodhpur, RJ', icon: <FaBuilding /> },
        { label: 'Nearest Landmark', value: 'Vastra Mantralay', icon: <FaMapPin /> },
        { label: 'Pin Code', value: '342024', icon: <FaMapMarkerAlt /> },
        { label: 'GPS Coordinates', value: '26.2863° N, 73.0392° E', icon: <MdGpsFixed /> }
      ]
    },
    {
      category: 'Phone Numbers',
      icon: <FaPhone />,
      color: 'from-green-500 to-teal-600',
      details: [
        { label: 'General Inquiries', value: '+91 91161 39371', icon: <FaInfoCircle /> },
        { label: 'Visitor Assistance', value: '+91 91161 39371', icon: <FaPhone /> },
        { label: 'Donations & Seva', value: '+91 91161 39371', icon: <FaHandsHelping /> },
        { label: 'Emergency Contact', value: '+91 91161 39371', icon: <FaPhone /> }
      ]
    },
    {
      category: 'Email Addresses',
      icon: <FaEnvelope />,
      color: 'from-purple-500 to-pink-600',
      details: [
        { label: 'General Information', value: 'nljd@hkmjodhpur.org', icon: <FaInfoCircle /> },
        { label: 'Donations & Seva', value: 'nljd@hkmjodhpur.org', icon: <FaHandsHelping /> },
        { label: 'Volunteer Opportunities', value: 'nljd@hkmjodhpur.org', icon: <FaHandsHelping /> },
        { label: 'Media & Press', value: 'nljd@hkmjodhpur.org', icon: <FaNewspaper /> }
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
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Multiple ways to reach us for all your spiritual and temple-related needs
          </p>
        </motion.div>

        {/* Contact Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactDetails.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-2xl p-8 border border-primary border-opacity-60 backdrop-blur-xl hover:border-primary hover:border-opacity-80 hover:shadow-primary/20 transition-all duration-300 group shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {section.category}
                </h3>
              </div>

              <div className="space-y-4">
                {section.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-primary/40 border-opacity-60 pl-4 hover:border-primary hover:border-opacity-80 transition-all duration-300"
                  >
                    <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <span className="text-primary">{detail.icon}</span>
                      {detail.label}
                    </div>
                    <div className="text-gray-800 font-semibold leading-relaxed">
                      {detail.value}
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
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-primary" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-primary" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Personal Care</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
