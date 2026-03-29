"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GiByzantinTemple } from "react-icons/gi";
import ContributeSection from '../common/ContributeSection';
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Image from 'next/image';

export default function EventsAndDarshan() {
  const [upcomingEvents, setupComingEvents] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Fetch upcomingEvents dynamically from Supabase
  useEffect(() => {
    const fetchupComingEvents = async () => {
      const { data, error } = await supabase
        .from('upcomingEvents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching upcomingEvents:', error);
      } else {
        setupComingEvents(data || []);
      }
    };

    fetchupComingEvents();
  }, []);

  const darshan = [
    { time: '04:30 AM', name: 'Mangala Aarti' },
    { time: '12:00 PM', name: 'Raj Bhog Aarti' },
    { time: '08:00 PM', name: 'Sandhya Aarti' }
  ];

  return (
    <>
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-primary">

        <div className="relative max-w-6xl mx-auto z-10">
          {/* upcomingEvents Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb- lg:mb-16"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text p-2 mb-2">
                Programs
              </h3>
              <p className="text-gray-700 text-lg">Join us in divine celebrations</p>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {upcomingEvents.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white/10 rounded-2xl overflow-hidden shadow-2xl border border-primary border-opacity-60 backdrop-blur-xl group hover:border-primary hover:border-opacity-80 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                >
                  {/* Event Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={ev.image}
                      alt={ev.title}
                      width={100}
                      height={100}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h4 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">
                      {ev.title}
                    </h4>
                    <p className="text-justify text-gray-600 leading-relaxed">{ev.description}</p>

                    {/* where we have to navigate if clicked on learn more */}

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm font-semibold">{ev.location}</span>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-primary transition-colors duration-300 font-medium text-sm"
                        href='/events'
                      >
                        Learn More →
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* About Us Section */}
          <motion.div
            className="mx-auto px-4 py-6 md:px-6 mt-8 rounded-lg bg-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              About us
            </h2>

            {/* Subheading */}
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mt-2">
              Hare Krishna Marwar Mandir, Jodhpur
            </h3>

            {/* Content */}
            <div className="my-4 pr-2">
              {/* First paragraph - Always visible */}
              <p className="text-gray-700 leading-relaxed border-t border-gray-200 pt-3 mb-1 text-justify">
                Hare Krishna Marwar Mandir is a spiritual organization devoted to uplifting human life by offering opportunities for true happiness, inner peace, good health, and all noble qualities through the practice of God Consciousness.
              </p>

              {/* Second paragraph - Expandable on mobile, always visible on desktop */}
              <div className={`md:block ${isExpanded ? "block" : "hidden"}`}>
                <AnimatePresence>
                  {(isExpanded || isDesktop) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-700 leading-relaxed border-t border-gray-200 pt-1 text-justify">
                        Registered as a trust and guided by the teachings of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, the revered Founder-Acharya of the worldwide Hare Krishna Movement, the Mandir follows his vision of spreading spiritual knowledge, culture, and devotion in society. Inspired by Srila Prabhupada's mission, the devotees at Hare Krishna Marwar Mandir conduct all activities in harmony with the Bhagavad Gita, Vedic wisdom, and Krishna consciousness, fostering spiritual growth for individuals and the community alike.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Read More button - only on mobile */}
              <div className="md:hidden mt-3 flex justify-center">
                <button
                  onClick={() => setIsAboutExpanded(!isAboutExpanded)}
                  className="flex items-center gap-2 text-primary hover:text-primary/50 font-semibold transition-colors duration-300 outline-none"
                >
                  {isAboutExpanded ? (
                    <>
                      Read Less
                      <FaChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Read More
                      <FaChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div className="flex flex-col lg:flex-row mt-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image Container - Takes 1/3 width on large screens */}
            <div className="w-full lg:w-1/3">
              <div className="relative w-full h-64 lg:h-full">
                <img
                  src="/images/srila-prabhupada-hkm.webp"
                  srcSet="/images/srila-prabhupada-hkm.webp 750w, 
                          /images/srila-prabhupada-hkm.webp 1080w"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  alt="Srila Prabhupada"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content Container - Takes 2/3 width on large screens */}
            <div className="w-full lg:w-2/3 ">
              <div className="p-6 lg:p-8 lg:pr-12">
                {/* Dedication Label */}
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                  Humble dedication
                </div>

                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mt-2">
                  His Divine Grace Srila Prabhupada
                </h3>

                {/* Scrollable Content */}
                <div className="my-4 pr-2">
                  <div className="text-gray-700 leading-relaxed border-t border-gray-200 pt-4">
                    {/* Always visible first paragraph */}
                    <p className="text-justify">
                      His Divine Grace Srila Prabhupada is the revered Acharya and Diksha Guru of the Hare Krishna Movement. With unwavering dedication, he sought to enlighten minds, impart spiritual knowledge, and establish Krishna Consciousness across the globe.
                    </p>

                    {/* Expandable content on mobile, always visible on desktop */}
                    <div className="md:block">
                      <AnimatePresence>
                        {(isExpanded || isDesktop) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-justify mt-4">
                              Srila Prabhupada's life serves as a timeless inspiration for anyone aspiring to bring meaningful transformation through devotion, discipline, and service. At the age of 70, he journeyed to New York with the sole purpose of fulfilling his guru's wish to spread the teachings of Lord Krishna worldwide. From a small office, he initiated a spiritual renaissance that grew into the global phenomenon now known as the Hare Krishna Movement, touching millions of hearts and lives.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Read More button - only on mobile */}
                    <div className="md:hidden mt-4 flex justify-center">
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-6 py-2.5 border-2 border-primary text-primary 
                            font-semibold rounded-md hover:bg-primary hover:text-white 
                            transition-all duration-300 mb-4 flex items-center gap-2 outline-none"
                      >
                        {isExpanded ? (
                          <>
                            Read Less
                            <FaChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Read More
                            <FaChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Darshan Timings Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <div className="text-center my-12">
              <h3 className="text-3xl md:text-4xl font-bold gradient-text p-3 mb-2">
                Darshan Timings
              </h3>
              <p className="text-gray-700 text-lg">Divine moments await you</p>
            </div>

            {/* Darshan Schedule */}
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {darshan.map((aarti, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.015 }}
                    className="
                    flex items-center justify-between
                    p-5 md:p-6
                    rounded-xl
                    bg-white/70
                    backdrop-blur-md
                    border border-black/5
                    shadow-sm hover:shadow-md
                    transition-all duration-300
                    group
                  "
                  >
                    {/* Left */}
                    <div className="flex flex-col">
                      <span className="
                      text-base md:text-lg font-semibold
                      text-gray-900
                      group-hover:text-primary
                      transition-colors
                    ">
                        {aarti.name}
                      </span>

                      <span className="text-xs md:text-sm text-gray-600 mt-1">
                        Daily Temple Service
                      </span>
                    </div>

                    {/* Right */}
                    <div className="text-right">
                      <span className="
                      text-xl md:text-2xl font-bold
                      text-primary
                      transition-colors
                    ">
                        {aarti.time}
                      </span>

                      <span className="block text-[11px] text-gray-500 mt-1 tracking-wide">
                        IST
                      </span>
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
                className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/40 border-opacity-60 text-center shadow-lg"
              >
                <p className="text-gray-800 mb-2">
                  <span className="text-primary font-semibold flex items-center gap-1 justify-center"><GiByzantinTemple /> Temple Opens:</span> 08:30 AM - 08:30 PM (Daily)
                </p>
                <p className="text-gray-700 text-sm">
                  Visitors are welcome during all aarti timings. Please maintain silence during prayers.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <ContributeSection />
    </>

  );
}
