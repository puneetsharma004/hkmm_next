"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

import { motion } from 'framer-motion';
import {
  FaMobileAlt,
  FaEdit,
  FaPray,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaArrowRight,
  FaExclamationCircle,
  FaUserPlus,
  FaWhatsapp
} from 'react-icons/fa';
import { MdAddCall } from "react-icons/md";
import { PiHandsPrayingFill } from 'react-icons/pi';

export default function EventsCallToAction() {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);


  const quickActions = [
    {
      title: 'Join Virtual Darshan',
      description: 'Experience divine presence online',
      icon: <FaMobileAlt />,
      color: 'from-purple-500 to-indigo-600',
      link: '/virtual-darshan',
      urgent: false
    },
    {
      title: 'Register for Events',
      description: 'Book your spot in upcoming programs',
      icon: <FaEdit />,
      color: 'from-blue-500 to-cyan-600',
      link: '#newsletter',
      urgent: false
    },
    {
      title: 'Support Temple',
      description: 'Contribute to our spiritual mission',
      icon: <FaPray />,
      color: 'from-orange-500 to-red-600',
      link: '/donations',
      urgent: false
    }
  ];

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed");
        return;
      }
      toast.success(data.message);
      setSubscribed(true);
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
      setSubscribed(false)
    }
  };



  return (
    <section className="relative py-20 px-4 overflow-hidden bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>


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
            Begin Your Spiritual Journey
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            Join thousands of devotees in experiencing Krishna&#39;s divine love through our darshan, events, and community programs
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary CTA */}
            <motion.a
              href="tel:+919116139371"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-primary text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-3">
                <MdAddCall className="text-2xl" />
                <span className="text-lg">Plan Your Visit</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight />
                </motion.span>
              </div>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#newsletter"
              className="group border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-primary hover:text-primary/50 transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-xl" />
              <span>Get Event Updates</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`relative rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 group shadow-lg ${action.urgent
                ? 'bg-linear-to-br from-primary/20 to-primary/20 border-primary border-opacity-80 shadow-primary/30'
                : 'bg-white/10 border-primary border-opacity-60 hover:border-opacity-80'
                }`}
            >
              {action.urgent && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaExclamationCircle />
                  URGENT
                </motion.div>
              )}

              <div className={`w-16 h-16 bg-linear-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {action.icon}
              </div>

              <h3 className="font-bold text-gray-800 text-lg mb-2 text-center group-hover:text-primary transition-colors duration-300">
                {action.title}
              </h3>

              <p className="text-gray-600 text-sm text-center group-hover:text-gray-700 transition-colors duration-300">
                {action.description}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          id="newsletter"
          className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 backdrop-blur-sm mb-12 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Connected with Krishna</h3>
            <p className="text-gray-700">
              Subscribe to receive updates about upcoming events, festivals, and spiritual programs
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-primary border-opacity-60 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-primary focus:border-opacity-80 transition-all duration-300"
              />
              <motion.button
                  onClick={handleSubmit}
                  disabled={loading || subscribed}
                className="px-6 py-3 bg-primary text-white border outline-none cursor-pointer font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUserPlus />
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              We respect your privacy.{" "}
              <Link
                  href="/unsubscribe-manually"
                  className="text-primary font-medium hover:underline cursor-pointer"
              >
                Unsubscribe
              </Link>{" "}
              at any time.
            </p>

          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-primary mb-2">Visit Us</h4>
            <p className="text-gray-600 text-sm">
              Chopasani, Near Vastra Mantralay, <br /> Jodhpur, RJ PIN: 342024,<br /> Nearest Landmark: Vastra Mantralay
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaPhone />
            </div>
            <h4 className="font-bold text-primary mb-2">Call Us</h4>
            <p className="text-gray-600 text-sm">
              Temple: +91 91161 39371<br />
              Office: +91 91161 39371<br />
              <span className="flex items-center justify-center gap-1">
                <FaWhatsapp className="text-green-500" />
                WhatsApp: +91 91161 39371
              </span>
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-3 text-primary flex justify-center items-center">
              <FaClock />
            </div>
            <h4 className="font-bold text-primary mb-2">Temple Hours</h4>
            <p className="text-gray-600 text-sm">
              Morning: 4:30 AM - 12:00 PM<br />
              Evening: 4:00 PM - 8:30 PM<br />
              Closed: 12:00 PM - 4:00 PM
            </p>
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-primary/10 rounded-2xl p-8 border border-primary/40 border-opacity-60 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 italic text-lg mb-4">
              &#34;Wherever you are, whatever you do, remember Krishna and His divine love&#34;
            </p>
            <div className="flex items-center justify-center space-x-4">
              <PiHandsPrayingFill className="text-2xl text-primary" />
              <p className="text-primary font-semibold text-xl">
                Hare Krishna!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
