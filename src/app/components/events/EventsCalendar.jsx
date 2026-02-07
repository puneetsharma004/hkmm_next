"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
  FaCalendarAlt,
  FaCalendar,
  FaClipboardList,
  FaTheaterMasks,
  FaGift,
  FaMusic,
  FaBook,
  FaUtensils,
  FaHandshake,
  FaClock,
  FaMapMarkerAlt,
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaUserPlus,
  FaStar,
  FaArrowDown
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import VaishnavaCalendar from './VaishnavaCalendar';

export default function EventsCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [events, setEvents] = useState([]);


  const eventTypes = [
    { id: 'all', name: 'All Events', color: 'primary', icon: <FaTheaterMasks /> },
    { id: 'festivals', name: 'Festivals', color: 'primary', icon: <FaGift /> },
    { id: 'kirtans', name: 'Kirtans', color: 'purple-500', icon: <FaMusic /> },
    { id: 'lectures', name: 'Lectures', color: 'blue-500', icon: <FaBook /> },
    { id: 'prasadam', name: 'Prasadam', color: 'green-500', icon: <FaUtensils /> },
    { id: 'seva', name: 'Community Service', color: 'orange-500', icon: <FaHandshake /> }
  ];

  // Fetch events dynamically from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    };

    fetchEvents();
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredEvents = events.filter(event =>
    selectedFilter === 'all' || event.type === selectedFilter
  );

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'gray-500';
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50"></div>


      <div className="relative max-w-6xl mx-auto z-10">

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 group ${event.featured
                ? 'bg-gradient-to-r from-primary/20 to-primary/20 border-2 border-primary border-opacity-80 shadow-primary/30'
                : 'bg-white/10 border border-primary border-opacity-60 hover:border-primary hover:border-opacity-80'
                } backdrop-blur-xl`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 bg-primary text-primary p-3 rounded-xl text-center min-w-[80px] shadow-lg">
                      <div className="font-bold text-lg">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${event.featured ? 'text-gray-800' : 'text-gray-800 group-hover:text-primary'
                          }`}>
                          {event.title}
                        </h3>
                        {event.featured && (
                          <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <FaStar />
                            FEATURED
                          </span>
                        )}
                      </div>

                      <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FaClock />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`w-2 h-2 rounded-full bg-${getEventTypeColor(event.type)}`}></span>
                          <span className="capitalize">{event.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye />
                      View Details
                    </motion.button>

                    {event.registration && (
                      <motion.button
                        className="px-4 py-2 bg-primary text-primary cursor-pointer border rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaUserPlus />
                        Register Now
                      </motion.button>
                    )}
                  </div>
                </div>
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
              <FaCalendarAlt className="text-primary" />
              <span>Monthly View</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="text-primary" />
              <span>Featured Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-primary" />
              <span>Live Updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
