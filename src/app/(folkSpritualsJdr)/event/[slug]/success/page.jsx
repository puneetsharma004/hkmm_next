"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { events } from "@/data/events";

export default function SuccessPage() {
    const { slug } = useParams();
    const event = events[slug?.toLowerCase()];
    const [show, setShow] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setShow(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background glows */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-md w-full">

                {/* Success icon */}
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 120,   // smoother
                        damping: 18,      // less bounce
                        mass: 0.8,
                        delay: 0.1
                    }}
                    className="flex justify-center mb-6"
                >
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </div>

                        {/* Ripple rings */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-green-400"
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{
                                duration: 1.8,           // slower = smoother
                                ease: "easeOut",
                                repeat: Infinity,
                                repeatDelay: 0.2
                            }}
                        />

                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-green-300"
                            initial={{ scale: 0.8, opacity: 0.4 }}
                            animate={{ scale: 2.6, opacity: 0 }}
                            transition={{
                                duration: 2,
                                ease: "easeOut",
                                repeat: Infinity,
                                delay: 0.6,
                                repeatDelay: 0.2
                            }}
                        />
                    </div>
                </motion.div>

                {/* Main card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-8"
                >
                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                            You're Registered!
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Payment successful · See you at the event
                        </p>
                    </div>

                    {/* Event details pill */}
                    {event && (
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 space-y-3">
                            <p className="font-semibold text-primary text-center text-base">
                                {event.title}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-primary shrink-0" />
                                <span>{event.date} &nbsp;|&nbsp; {event.time}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaMapMarkerAlt className="text-primary shrink-0" />
                                <span>{event.venue}</span>
                            </div>
                        </div>
                    )}

                    {/* WhatsApp CTA — primary action */}
                    {event?.whatsappGroup && (
                        <motion.a
                            href={event.whatsappGroup}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold rounded-2xl shadow-lg shadow-green-200 transition-all duration-300 text-base mb-3"
                        >
                            <FaWhatsapp className="text-2xl" />
                            Join WhatsApp Group
                        </motion.a>
                    )}

                    <p className="text-center text-xs text-gray-400 mb-5">
                        Join the group for event updates, schedule & reminders
                    </p>

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">also follow us</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Instagram */}
                    {event?.instagram && (
                        <motion.a
                            href={event.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold rounded-2xl transition-all duration-300 text-sm"
                        >
                            <FaInstagram className="text-lg" />
                            @folkspirituals_jodhpur
                        </motion.a>
                    )}
                </motion.div>

                {/* Bottom note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-xs text-gray-500 mt-5"
                >
                    Organized by <span className="text-primary font-medium">FOLK Spirituals Jodhpur</span>
                </motion.p>
            </div>
        </div>
    );
}