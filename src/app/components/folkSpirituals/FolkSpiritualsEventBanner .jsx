// src/app/components/home/FolkSpiritualsEventBanner.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { events } from "@/data/events";

export default function FolkSpiritualsEventBanner() {
    const router = useRouter();

    // Grab the first event — update this key if you add more events later
    const event = events["ram-navami-2026"];

    if (!event) return null;

    return (
        <section className="relative py-12 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">

            {/* Background glows */}
            <div className="absolute top-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white/70 backdrop-blur-md border border-primary/20 rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
                >
                    {/* Left: text content */}
                    <div className="flex-1 text-center md:text-left">

                        {/* Label */}
                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                            Upcoming Event · FOLK Spirituals Jodhpur
                        </span>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-3 leading-tight">
                            {event.title}
                        </h2>

                        {/* Meta info */}
                        <div className="flex flex-col sm:flex-row items-center md:items-start gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1.5">
                                <FaCalendarAlt className="text-primary shrink-0" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <IoTimeOutline className="text-primary shrink-0" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-primary shrink-0" />
                                <span>{event.venue}</span>
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm">
                            {event.description}
                        </p>
                    </div>

                    {/* Right: price + CTA */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 mb-0.5">Entry fee</p>
                            <p className="text-4xl font-bold text-primary">₹{event.price}</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/event/ram-navami-2026`)}
                            className="flex items-center gap-2 cursor-pointer bg-primary outline-none text-white font-bold px-7 py-3 rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 text-sm"
                        >
                            Register Now
                            <FaArrowRight />
                        </motion.button>

                        <p className="text-xs text-gray-400">
                            Secure payment · Instant confirmation
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}