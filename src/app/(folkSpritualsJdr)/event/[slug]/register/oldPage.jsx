"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { events } from "@/data/events";

const messages = [
    "Setting up your entry pass...",
    "Adding you to the WhatsApp group...",
    "Almost done, get ready",
];

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email("Enter a valid email address"),
    college: z.string().min(2, "College name is required"),
    city: z.string().min(2, "City is required"),
});

export default function RegisterPage() {
    const params = useParams();
    const slug = params?.slug?.toLowerCase();
    const event = events[slug];
    const price = event?.price ?? 50;

    const [loading, setLoading] = useState(false);
    const [redirecting, setRedirecting] = useState(false); // ← new

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (formData) => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/create-order", { amount: price });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "FOLK Spirituals",
                description: `Registration — ${event?.title ?? "Event"}`,
                order_id: data.id,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                handler: async function (response) {
                    // Show redirect loader immediately
                    setRedirecting(true);

                    await axios.post("/api/verify-payment", response);
                    await axios.post("/api/register", {
                        ...formData,
                        gender: "Male",
                        slug,
                        eventTitle: event?.title,
                        amount: price,
                        paymentId: response.razorpay_payment_id,
                    });

                    sessionStorage.setItem("reg_name", formData.name);
                    sessionStorage.setItem("reg_paymentId", response.razorpay_payment_id);
                    sessionStorage.setItem("reg_email", formData.email);

                    window.location.href = `/event/${slug}/success`;
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", () => {
                alert("Payment failed. Please try again.");
                setLoading(false);
            });
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: "name",    placeholder: "Full Name",       type: "text" },
        { name: "phone",   placeholder: "Mobile Number",   type: "tel" },
        { name: "email",   placeholder: "Email Address",   type: "email" },
        { name: "college", placeholder: "College / University", type: "text" },
        { name: "city",    placeholder: "Where do you stay in Jodhpur?",            type: "text" },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 1800); // change text every 1.8s
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* ── Redirect loading overlay ── */}
            {redirecting && (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                >
                    {/* Icon with glow + ripple */}
                    <div className="relative">
                        {/* Glow pulse (softer + smaller) */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-green-300 blur-lg"
                            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.15, 0.25] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Ripple rings (reduced size + smoother) */}
                        <motion.div
                            className="absolute inset-0 rounded-full border border-green-400"
                            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-green-300"
                            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                            transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.6,
                            }}
                        />

                        {/* Check icon (slightly smoother entry) */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 90,   // softer
                                damping: 14,
                            }}
                            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center relative z-10"
                        >
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </motion.div>
                    </div>

                    {/* Text Section */}
                    <div className="text-center h-[50px]">
                        <p className="text-xl font-bold text-gray-800">
                            Payment Successful!
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.4 }}
                                className="text-gray-500 text-sm mt-1"
                            >
                                {messages[index]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>
            )}
            {/* ── Main form ── */}
            <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-gradient">
                <div className="max-w-md w-full">

                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold gradient-text">
                            {event?.title ?? "Register for Event"}
                        </h2>
                        <p className="text-gray-600 mt-1 text-sm">
                            {event?.date} &nbsp;·&nbsp; {event?.venue}
                        </p>
                    </div>

                    {/* Notice */}
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
                        <p>
                            For this event, registrations are currently limited to <strong>male students only</strong>
                            due to late evening timings and safety considerations.
                            <br /><br />
                            We truly value participation from everyone — female students are warmly invited to join our
                            upcoming event on <strong>27th March</strong>.
                            <br /><br />
                            You can also join our dedicated girls WhatsApp group here:{" "}
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium underline hover:text-amber-900"
                            >
                                Join Group
                            </a>
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 space-y-4"
                    >
                        {fields.map(({ name, placeholder, type }) => (
                            <div key={name}>
                                <input
                                    {...register(name)}
                                    type={type}
                                    placeholder={placeholder}
                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all
                                        ${errors[name]
                                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                                        : "border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    }`}
                                />
                                {errors[name] && (
                                    <p className="text-red-500 text-xs mt-1 pl-1">
                                        {errors[name].message}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
                            <span>Male <span className="text-xs text-gray-400">(only male registrations accepted)</span></span>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                            <span className="text-gray-600">Registration fee</span>
                            <span className="font-bold text-primary text-lg">₹{price}</span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Opening payment..." : `Pay ₹${price} & Register`}
                        </button>

                        <p className="text-center text-xs text-gray-400">
                            Secure payment via Razorpay · Instant confirmation
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}