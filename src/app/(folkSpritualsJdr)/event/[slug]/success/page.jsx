"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
    FaCheckCircle, FaCalendarAlt,
    FaMapMarkerAlt, FaInstagram,
    FaWhatsapp, FaDownload, FaIdCard
} from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { events } from "@/data/events";

export default function SuccessPage() {
    const { slug } = useParams();
    const event = events[slug?.toLowerCase()];

    const [name, setName] = useState("");
    const [paymentId, setPaymentId] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setName(sessionStorage.getItem("reg_name") || "");
        setPaymentId(sessionStorage.getItem("reg_paymentId") || "");
        setEmail(sessionStorage.getItem("reg_email") || "");
    }, []);

    // This is the URL the QR code will point to — a verification page
    const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/event/${slug}/verify/${paymentId}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">

            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-md w-full space-y-4">

                {/* Success icon */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="flex justify-center"
                >
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </div>
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-green-400"
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Main card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-6"
                >
                    {/* Greeting */}
                    <div className="text-center mb-5">
                        <p className="text-gray-500 text-sm mb-1">Registration Confirmed 🎉</p>
                        {name && (
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome, {name}!
                            </h1>
                        )}
                        <p className="text-gray-400 text-xs mt-1">
                            Payment ID: {paymentId}
                        </p>
                    </div>

                    {/* Event details */}
                    {event && (
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 space-y-2">
                            <p className="font-bold text-primary text-center">{event.title}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-primary shrink-0" />
                                <span>{event.date} · {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaMapMarkerAlt className="text-primary shrink-0" />
                                <span>{event.venue}</span>
                            </div>
                        </div>
                    )}

                    {/* QR Code ticket */}
                    {paymentId && (
                        <div className="flex flex-col items-center mb-5">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <FaIdCard className="text-primary" />
                                <span className="font-medium">Your Entry Pass</span>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-inner border border-gray-100">
                                <QRCodeSVG
                                    value={verifyUrl}
                                    size={160}
                                    fgColor="#AF1E2E"
                                    bgColor="#ffffff"
                                    level="H"
                                    includeMargin={false}
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-center">
                                Show this QR at the venue for entry
                            </p>
                        </div>
                    )}

                    {/* WhatsApp */}
                    {event?.whatsappGroup && (
                        <motion.a
                            href={event.whatsappGroup}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold rounded-2xl shadow-lg shadow-green-200 transition-all duration-300 mb-2"
                        >
                            <FaWhatsapp className="text-2xl" />
                            Join WhatsApp Group
                        </motion.a>
                    )}
                    <p className="text-center text-xs text-gray-400 mb-4">
                        Get updates, schedule & reminders on WhatsApp
                    </p>

                    {/* Instagram */}
                    {event?.instagram && (
                        <motion.a
                            href={event.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-center gap-2 w-full py-3 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold rounded-2xl transition-all duration-300 text-sm"
                        >
                            <FaInstagram />
                            Follow @folkspirituals_jodhpur
                        </motion.a>
                    )}
                </motion.div>

                <p className="text-center text-xs text-gray-400">
                    Organized by <span className="text-primary font-medium">FOLK Spirituals Jodhpur</span>
                </p>
            </div>
        </div>
    );
}