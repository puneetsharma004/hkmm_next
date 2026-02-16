"use client";

import { motion } from "framer-motion";
import { FaHome, FaEnvelopeOpen, FaUndo } from "react-icons/fa";
import Link from "next/link";

export default function UnsubscribedPage() {
    return (
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Soft background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50" />

            {/* Glow orbs */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/30 to-orange-400/30 rounded-full opacity-40 blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-gray-400/20 to-slate-400/20 rounded-full opacity-30 blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-6 text-gray-600"
                >
                    <FaEnvelopeOpen className="text-6xl" />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold gradient-text mb-6"
                >
                    Successfully Unsubscribed
                </motion.h1>

                {/* Sub text */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.35 }}
                    className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10"
                >
                    You will no longer receive emails about darshan updates,
                    celebrations, or temple events.
                    We’re grateful for the time you spent with our community.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg"
                    >
                        <FaHome />
                        Back to Home
                    </Link>

                    <Link
                        href="/subscribe"
                        className="px-6 py-3 rounded-xl bg-white border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow"
                    >
                        <FaUndo />
                        Subscribe Again
                    </Link>
                </motion.div>

                {/* Bottom reassurance */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    Changed your mind? You’re always welcome back anytime 🙏
                </motion.p>
            </div>
        </section>
    );
}
