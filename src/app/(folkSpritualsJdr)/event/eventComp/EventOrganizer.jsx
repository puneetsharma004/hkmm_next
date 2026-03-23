"use client";

import { motion } from "framer-motion";
import { FaUsers, FaUniversity, FaLeaf, FaInstagram } from "react-icons/fa";

export default function EventOrganizer({ event }) {
    const stats = [
        {
            icon: <FaUniversity />,
            title: "25+ Universities",
            desc: "Active student community",
        },
        {
            icon: <FaUsers />,
            title: "1000+ Students",
            desc: "Connected across Jodhpur",
        },
        {
            icon: <FaLeaf />,
            title: "Spiritual Retreats",
            desc: "Peaceful & transformative experiences",
        },
    ];

    return (
        <section className="relative py-20 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 overflow-hidden section">

            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-6xl mx-auto z-10 text-center">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold gradient-text mb-6"
                >
                    Organized by FOLK Spirituals Jodhpur
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 max-w-2xl mx-auto mb-10"
                >
                    A nonprofit community dedicated to helping students find purpose,
                    peace, and connection through spiritual practices, cultural events,
                    and meaningful experiences.
                </motion.p>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {stats.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/70 backdrop-blur-md border border-primary/30 rounded-xl p-6 shadow-md hover:shadow-primary/20 transition-all"
                        >
                            <div className="text-3xl text-primary mb-3 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="font-bold text-primary">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Instagram CTA */}
                <motion.a
                    href={event.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-white rounded-full font-semibold shadow-lg hover:shadow-primary/40 transition-all"
                >
                    <FaInstagram />
                    Visit Instagram Page
                </motion.a>

                {/* Trust Line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 text-sm text-gray-600"
                >
                    Trusted by students across Jodhpur 🙏
                </motion.p>
            </div>
        </section>
    );
}