"use client";

import { motion } from "framer-motion";
import { FaMusic, FaPray, FaUtensils, FaGift } from "react-icons/fa";

export default function EventDetails({ event }) {
    const highlights = [
        { icon: <FaMusic />, text: "Bhajan & Kirtan" },
        { icon: <FaPray />, text: "Spiritual Talks & Abhishekam" },
        { icon: <FaUtensils />, text: "Delicious Prasadam (Free Veg Food)" },
        { icon: <FaGift />, text: "Fun Activities & Exciting Prizes" },
    ];

    return (
        <section className="relative py-20 px-4 bg-secondary-gradient overflow-hidden section">

            {/* Soft Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-6xl mx-auto z-10">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                        About the Event
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                        {event.description}
                    </p>
                </motion.div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* Left: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-primary mb-4">
                            Why You Should Join
                        </h3>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Celebrate the divine occasion of Ram Navami with a vibrant
                            spiritual gathering filled with devotion, music, and community
                            bonding. This event is designed especially for students and
                            young minds seeking peace, joy, and deeper connection.
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Experience a unique blend of bhakti, fun, and meaningful
                            interactions — all in a serene retreat environment at Garh
                            Govind Resort, Jodhpur.
                        </p>
                    </motion.div>

                    {/* Right: Highlights */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {highlights.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/70 backdrop-blur-md border border-primary/30 rounded-xl p-4 shadow-md text-center hover:shadow-primary/20 transition-all"
                            >
                                <div className="text-3xl text-primary mb-2 flex justify-center">
                                    {item.icon}
                                </div>
                                <p className="text-gray-700 text-sm font-medium">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}