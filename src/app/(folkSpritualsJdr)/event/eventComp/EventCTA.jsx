"use client";

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function EventCTA({ event }) {
    const benefits = [
        "Entry to full event",
        "Bhajan & Kirtan experience",
        "Spiritual sessions",
        "Delicious Prasadam (Free Veg Food)",
        "Fun activities & prizes",
        "Community networking",
    ];

    return (
        <section
            id="register"
            className="relative py-20 px-4 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 overflow-hidden section"
        >

            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-400/30 rounded-full blur-3xl opacity-30"></div>
            </div>

            <div className="relative max-w-4xl mx-auto text-center z-10">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold gradient-text mb-6"
                >
                    Reserve Your Spot Now
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-700 mb-10"
                >
                    Limited seats available — don’t miss this spiritual experience ✨
                </motion.p>

                {/* Pricing Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-md border border-primary/30 rounded-2xl shadow-xl p-8"
                >
                    {/* Price */}
                    <h3 className="text-5xl font-bold text-primary mb-4">
                        ₹{event.price}
                    </h3>
                    <p className="text-gray-600 mb-6">One-time entry fee</p>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-2 gap-3 mb-8 text-left">
                        {benefits.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-gray-700"
                            >
                                <FaCheckCircle className="text-primary" />
                                <span className="text-sm">{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 text-lg"
                        onClick={() => {
                            alert("Next step: Open form + payment gateway");
                        }}
                    >
                        Register & Pay ₹{event.price}
                    </motion.button>

                    {/* Trust Note */}
                    <p className="mt-4 text-sm text-gray-600">
                        Secure payment • Instant confirmation
                    </p>
                </motion.div>
            </div>
        </section>
    );
}