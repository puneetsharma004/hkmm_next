// cart review + address + pay

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeft, FaLeaf, FaTrash, FaSpinner, FaLock } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const rupees = (paise) => `₹${(paise / 100).toFixed(0)}`;

const schema = z.object({
    name:    z.string().min(2, "Name is required"),
    email:   z.string().email("Enter a valid email"),
    phone:   z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
    line1:   z.string().min(5, "Address is required"),
    line2:   z.string().optional(),
    city:    z.string().min(2, "City is required"),
    state:   z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, updateQty, removeItem, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

    // Redirect if cart empty
    useEffect(() => {
        if (items.length === 0) router.push("/store");
    }, [items]);

    const shipping = totalPrice < 50000 ? 6000 : 0;
    const grandTotal = totalPrice + shipping;

    const onSubmit = async (formData) => {
        if (!window.Razorpay) {
            toast.error("Payment gateway not loaded. Please refresh.");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Razorpay order
            const orderRes = await fetch("/api/store/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }),
            });
            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                toast.error(orderData.error || "Failed to create order.");
                setLoading(false);
                return;
            }

            // 2. Open Razorpay
            const options = {
                key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount:      orderData.amount,
                currency:    "INR",
                name:        "Govardhan Dham Store",
                description: `Order — ${items.length} item(s)`,
                order_id:    orderData.id,
                prefill: {
                    name:    formData.name,
                    email:   formData.email,
                    contact: formData.phone,
                },
                handler: async (response) => {
                    // 3. Verify + save order
                    const saveRes = await fetch("/api/store/save-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ...response,
                            buyerName:    formData.name,
                            buyerEmail:   formData.email,
                            buyerPhone:   formData.phone,
                            shippingAddress: {
                                line1:   formData.line1,
                                line2:   formData.line2 || "",
                                city:    formData.city,
                                state:   formData.state,
                                pincode: formData.pincode,
                            },
                            items:         orderData.validatedItems,
                            subtotal:      orderData.subtotal,
                            shipping:      orderData.shipping,
                            total:         orderData.total,
                        }),
                    });

                    const saveData = await saveRes.json();

                    if (saveData.success) {
                        clearCart();
                        router.push(`/store/order/${saveData.orderId}`);
                    } else {
                        toast.error(saveData.error || "Order save failed. Please contact support.");
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: () => setLoading(false),
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", () => {
                toast.error("Payment failed. Please try again.");
                setLoading(false);
            });
            rzp.open();

        } catch (err) {
            console.error(err);
            toast.error("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    const inputClass = (hasError) =>
        `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
            hasError
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20"
        }`;

    return (
        <>
            <Toaster position="top-center" />
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">

                {/* Header */}
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link href="/store" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
                        <FaArrowLeft className="text-xs" />
                        Continue shopping
                    </Link>
                </div>

                <div className="max-w-5xl mx-auto px-4 pb-20">
                    <h1 className="text-2xl font-bold gradient-text mb-8">Checkout</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-5 gap-8">

                            {/* ── Left: Form ───────────────────────────── */}
                            <div className="md:col-span-3 space-y-6">

                                {/* Contact */}
                                <div className="bg-white/70 backdrop-blur border border-primary/15 rounded-2xl p-6">
                                    <h2 className="font-bold text-gray-800 mb-4">Contact Information</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <input {...register("name")} placeholder="Full Name" className={inputClass(errors.name)} />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <input {...register("email")} type="email" placeholder="Email Address" className={inputClass(errors.email)} />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <input {...register("phone")} type="tel" placeholder="Mobile Number" className={inputClass(errors.phone)} />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping address */}
                                <div className="bg-white/70 backdrop-blur border border-primary/15 rounded-2xl p-6">
                                    <h2 className="font-bold text-gray-800 mb-4">Shipping Address</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <input {...register("line1")} placeholder="Address Line 1 (House no., Street)" className={inputClass(errors.line1)} />
                                            {errors.line1 && <p className="text-red-500 text-xs mt-1">{errors.line1.message}</p>}
                                        </div>
                                        <input {...register("line2")} placeholder="Address Line 2 (Optional — Colony, Landmark)" className={inputClass(false)} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <input {...register("city")} placeholder="City" className={inputClass(errors.city)} />
                                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                                            </div>
                                            <div>
                                                <input {...register("state")} placeholder="State" className={inputClass(errors.state)} />
                                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <input {...register("pincode")} placeholder="Pincode" maxLength={6} className={inputClass(errors.pincode)} />
                                            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Right: Order summary ──────────────────── */}
                            <div className="md:col-span-2">
                                <div className="bg-white/70 backdrop-blur border border-primary/15 rounded-2xl p-6 sticky top-24">
                                    <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>

                                    {/* Items list */}
                                    <div className="space-y-3 mb-4">
                                        {items.map(item => (
                                            <div key={item.id} className="flex items-start gap-3">
                                                {/* Thumbnail */}
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-orange-50 shrink-0 border border-primary/10">
                                                    {item.image ? (
                                                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <FaLeaf className="text-primary/30" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                                                    {/* Qty controls */}
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} className="w-5 h-5 text-gray-500 hover:text-primary font-bold outline-none cursor-pointer">−</button>
                                                        <span className="text-xs">{item.quantity}</span>
                                                        <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} className="w-5 h-5 text-gray-500 hover:text-primary font-bold outline-none cursor-pointer">+</button>
                                                        <button type="button" onClick={() => removeItem(item.id)} className="ml-auto text-gray-300 hover:text-red-400 transition-colors outline-none cursor-pointer">
                                                            <FaTrash className="text-xs" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-semibold text-primary shrink-0">{rupees(item.price * item.quantity)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-primary/10 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal</span>
                                            <span>{rupees(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Shipping</span>
                                            <span>{shipping > 0 ? rupees(shipping) : <span className="text-green-600 font-medium">Free</span>}</span>
                                        </div>
                                        {shipping > 0 && (
                                            <p className="text-xs text-gray-400">Free shipping on orders above ₹500</p>
                                        )}
                                        <div className="flex justify-between font-bold text-lg text-primary border-t border-primary/10 pt-3">
                                            <span>Total</span>
                                            <span>{rupees(grandTotal)}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-5 w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed outline-none cursor-pointer"
                                    >
                                        {loading ? (
                                            <><FaSpinner className="animate-spin" /> Processing...</>
                                        ) : (
                                            <><FaLock className="text-sm" /> Pay {rupees(grandTotal)}</>
                                        )}
                                    </button>

                                    <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-400">
                                        <IoShieldCheckmarkSharp className="text-green-500" />
                                        Secured by Razorpay
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}