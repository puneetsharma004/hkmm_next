// success page with QR

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";
import Image from "next/image";
import {
    FaCheckCircle, FaLeaf, FaWhatsapp,
    FaInstagram, FaShoppingCart, FaBox,
    FaEnvelope
} from "react-icons/fa";
import { supabase } from "@/lib/supabase";

const rupees = (paise) => `₹${(paise / 100).toFixed(0)}`;

export default function OrderSuccessPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        supabase
            .from("store_orders")
            .select("*")
            .eq("id", id)
            .single()
            .then(({ data }) => {
                if (data) setOrder(data);
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-gray-500">Order not found.</p>
                <Link href="/store" className="text-primary underline text-sm">Back to Store</Link>
            </div>
        );
    }

    const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/store/order/${id}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-10 px-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto space-y-5">

                {/* ── Success card ───────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-6 text-center"
                >
                    {/* Check icon with rings */}
                    <div className="relative w-24 h-24 mx-auto mb-5">
                        <motion.div
                            className="absolute inset-0 rounded-full border border-green-400"
                            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border border-green-300"
                            animate={{ scale: [1, 1.9], opacity: [0.3, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 90, damping: 14 }}
                            className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center relative z-10"
                        >
                            <FaCheckCircle className="text-green-500 text-5xl" />
                        </motion.div>
                    </div>

                    <p className="text-gray-500 text-sm mb-1">Order Confirmed</p>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        Hare Krishna, {order.buyer_name?.split(" ")[0]}!
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Order <span className="font-mono font-semibold text-primary">{order.order_number}</span>
                    </p>
                </motion.div>

                {/* ── Order details card ─────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-6"
                >
                    <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>

                    {/* Items */}
                    <div className="space-y-3 mb-4">
                        {order.items?.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-orange-50 shrink-0">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FaLeaf className="text-primary/30 text-sm" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                                    <p className="text-xs text-gray-400">×{item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold text-primary shrink-0">{rupees(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-3 space-y-1">
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Subtotal</span><span>{rupees(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>Shipping</span>
                            <span>{order.shipping > 0 ? rupees(order.shipping) : "Free"}</span>
                        </div>
                        <div className="flex justify-between font-bold text-primary">
                            <span>Total</span><span>{rupees(order.total)}</span>
                        </div>
                    </div>

                    {/* Shipping address */}
                    {order.shipping_address && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Ships to</p>
                            <p className="text-sm text-gray-700">
                                {order.shipping_address.line1}{order.shipping_address.line2 ? `, ${order.shipping_address.line2}` : ""},{" "}
                                {order.shipping_address.city}, {order.shipping_address.state} — {order.shipping_address.pincode}
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* ── QR order ticket ────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 p-6 flex flex-col items-center"
                >
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <FaBox className="text-primary" />
                        <span className="font-medium">Order QR</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl shadow-inner border border-gray-100">
                        <QRCodeSVG
                            value={verifyUrl}
                            size={140}
                            fgColor="#AF1E2E"
                            bgColor="#ffffff"
                            level="H"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">Reference for order tracking</p>
                    <p className="text-xs text-primary font-mono mt-1">{order.payment_id?.slice(0, 24)}...</p>
                </motion.div>

                {/* ── Email confirmation note ────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3"
                >
                    <FaEnvelope className="text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700">
                        A confirmation email has been sent to <strong>{order.buyer_email}</strong> with your order details.
                        Your items will be dispatched within 2–3 business days.
                    </p>
                </motion.div>

                {/* ── CTAs ───────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="space-y-3"
                >
                    <a
                        href={`https://wa.me/919116139371?text=Hare Krishna! My order number is ${order.order_number}. I have a query.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#20c05c] text-white font-bold rounded-2xl shadow-lg shadow-green-200 transition-all duration-300"
                    >
                        <FaWhatsapp className="text-2xl" />
                        Track on WhatsApp
                    </a>

                    <Link href="/store">
                        <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 outline-none cursor-pointer">
                            <FaShoppingCart />
                            Continue Shopping
                        </button>
                    </Link>
                </motion.div>

                <p className="text-center text-xs text-gray-400 pb-4">
                    Hare Krishna 🙏 Thank you for supporting Govardhan Dham
                </p>
            </div>
        </div>
    );
}