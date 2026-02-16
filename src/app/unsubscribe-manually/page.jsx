"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaEnvelopeOpen, FaUndo, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UnsubscribeManuallyPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUnsubscribe = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/newsletter/unsubscribe/manual", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success("You have been unsubscribed. Sorry to see you go");
                setEmail("");
            } else {
                toast.error("This email is not subscribed with us.");
            }
        } catch (err) {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
            {/* background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">

                {/* heading */}
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                    Unsubscribe from Emails
                </h1>

                <p className="text-gray-700 mb-10">
                    Enter your email address and we will remove you from our updates.
                </p>

                {/* form card */}
                <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl border border-primary/30 p-6 max-w-md mx-auto">
                    <div className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                        />

                        <button
                            onClick={handleUnsubscribe}
                            disabled={loading}
                            className="px-6 py-3 cursor-pointer rounded-lg bg-primary text-white font-medium hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaUndo />
                                    Unsubscribe
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* bottom links */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-white border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 shadow"
                    >
                        <FaHome />
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
