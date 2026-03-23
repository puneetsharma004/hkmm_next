"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50" />

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-600">
                        Please read these terms carefully before using Govardhan Dham
                        services.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Last updated: February 2026
                    </p>
                </motion.div>

                {/* Legal Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed"
                >
                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Acceptance of Terms
                        </h2>
                        <p>
                            By accessing or using the Govardhan Dham website, services,
                            donations, event registrations, or communications, you agree to
                            be bound by these Terms. If you disagree, please discontinue use
                            of the website.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Use of Website
                        </h2>
                        <p>
                            You agree not to misuse the platform, attempt unauthorized
                            access, distribute harmful software, or engage in unlawful
                            activity.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Donations & Payments
                        </h2>
                        <p>
                            All donations are voluntary and final unless a technical failure
                            occurs. Refunds for failed transactions are processed after
                            reconciliation within standard banking timelines.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Intellectual Property
                        </h2>
                        <p>
                            All text, images, logos, and materials belong to Govardhan Dham.
                            Reproduction or redistribution without permission is prohibited.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Communications
                        </h2>
                        <p>
                            By subscribing, you agree to receive emails or messages regarding
                            darshan timings, festivals, events, and temple initiatives. You
                            may opt out anytime.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Limitation of Liability
                        </h2>
                        <p>
                            Govardhan Dham is not liable for interruptions, inaccuracies, or
                            damages arising from use of the website or services.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Changes to Terms
                        </h2>
                        <p>
                            We may update these terms periodically. Continued use of the
                            website indicates acceptance of the revised terms.
                        </p>
                    </div>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-center text-gray-600"
                >
                    Questions? Contact us at{" "}
                    <span className="text-primary font-medium">
            info@govardhandham.org
          </span>
                </motion.div>
            </div>
        </section>
    );
}
