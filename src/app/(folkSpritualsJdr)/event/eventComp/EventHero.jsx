"use client";

import { motion } from "framer-motion";
import { IoCalendar } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function EventHero({ event }) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-primary">


            {/* Content */}
            <div className="relative z-10 max-w-4xl text-center px-4">

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold gradient-text leading-tight"
                >
                    {event.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-gray-700 text-lg md:text-xl"
                >
                    Experience devotion, community & celebration
                </motion.p>

                {/* Date + Time + Venue */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-gray-700"
                >
                    <div className="flex items-center gap-2">
                        <IoCalendar className="text-primary" />
                        <span>{event.date} | {event.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        <span>{event.venue}</span>
                    </div>
                </motion.div>

                {/* Price Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 inline-block bg-white/70 backdrop-blur-md border border-primary/30 px-6 py-2 rounded-full shadow-md"
                >
          <span className="text-primary font-semibold">
            ₹{event.price} Only
          </span>
                </motion.div>

                {/* CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 ml-4 px-4 py-2 cursor-pointer bg-primary text-white font-bold rounded-full shadow-xl hover:shadow-primary/40 transition-all duration-300"
                    onClick={() => {
                        document.getElementById("register")?.scrollIntoView({
                            behavior: "smooth",
                        });
                    }}
                >
                    Register Now
                </motion.button>

                {/* Extra Trust Line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 text-sm text-gray-600"
                >
                    Organized by FOLK Spirituals Jodhpur
                </motion.p>
            </div>
        </section>
    );
}