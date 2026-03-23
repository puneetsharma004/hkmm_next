"use client";

import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import { events } from "@/data/events";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email("Enter a valid email address"),
    college: z.string().min(2, "College name is required"),
    city: z.string().min(2, "City is required"),
});

export default function RegisterPage() {
    const { slug } = useParams();
    const event = events[slug?.toLowerCase()];
    const price = event?.price ?? 50;

    const [loading, setLoading] = useState(false);

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
                    await axios.post("/api/verify-payment", response);
                    await axios.post("/api/register", {
                        ...formData,
                        gender: "Male",
                        slug,
                        paymentId: response.razorpay_payment_id,
                    });
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
        { name: "city",    placeholder: "City",            type: "text" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-gradient">
            <div className="max-w-md w-full">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold gradient-text">
                        {event?.title ?? "Register for Event"}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm">
                        {event?.date} &nbsp;·&nbsp; {event?.venue}
                    </p>
                </div>

                {/* Boys-only notice */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
                    <p>
                        This event is currently open for <strong>male students only.</strong>{" "}
                        We hope to welcome everyone in future events.
                    </p>
                </div>

                {/* Form card */}
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

                    {/* Gender — static, read-only */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500">
                        <span>Male <span className="text-xs text-gray-400">(only male registrations accepted)</span></span>
                    </div>

                    {/* Price summary */}
                    <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                        <span className="text-gray-600">Registration fee</span>
                        <span className="font-bold text-primary text-lg">₹{price}</span>
                    </div>

                    {/* Submit */}
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
    );
}