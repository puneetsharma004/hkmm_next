"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
                    <h1 className="text-4xl md:text-5xl py-2 font-bold gradient-text mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-gray-600">
                        Your trust matters to us. Here’s how Govardhan Dham handles your
                        information.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Last updated: February 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-primary/20 p-8 md:p-12 space-y-8 text-gray-700 leading-relaxed"
                >
                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            What Information We Collect
                        </h2>
                        <p>
                            When you donate, register, or contact Govardhan Dham, we may
                            collect details such as your name, email, phone number, and
                            address. We may also automatically receive technical data like IP
                            address, browser type, and device information.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Consent
                        </h2>
                        <p>
                            By providing personal information for a transaction or inquiry,
                            you consent to its use for that purpose. For marketing or updates,
                            we request your permission and you may withdraw it anytime.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Communication
                        </h2>
                        <p>
                            With your approval, we may send festival updates, darshan timing
                            alerts, donation initiatives, or volunteer opportunities via
                            Email, SMS, WhatsApp, or other channels.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Payments
                        </h2>
                        <p>
                            Online payments are processed securely via certified payment
                            partners. Card data is encrypted under PCI-DSS standards and is
                            not stored on our servers after the transaction is completed.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Third-Party Services
                        </h2>
                        <p>
                            Some services may be provided by trusted partners. They will only
                            access information necessary to perform their work and operate
                            under their own privacy obligations.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Security
                        </h2>
                        <p>
                            We follow industry best practices to protect your data from loss,
                            misuse, unauthorized access, disclosure, or alteration.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Cookies
                        </h2>
                        <p>
                            Cookies help us maintain sessions and improve user experience.
                            They are not used to personally identify you across other
                            websites.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Age of Consent
                        </h2>
                        <p>
                            By using this website, you confirm you are of legal age or have
                            guardian permission.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-xl text-primary mb-2">
                            Changes to This Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time. Continued
                            use of the site after updates means you accept the changes.
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
                    For questions or data requests, contact us at{" "}
                    <span className="text-primary font-medium">
            info@govardhandham.org
          </span>
                </motion.div>
            </div>
        </section>
    );
}
