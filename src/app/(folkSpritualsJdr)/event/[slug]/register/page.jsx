"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        college: "",
        gender: "",
        city: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        try {
            // 1. Create order
            const { data } = await axios.post("/api/create-order", {
                amount: 50,
            });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.amount,
                currency: "INR",
                name: "FOLK Spirituals",
                description: "Event Registration",
                order_id: data.id,

                handler: async function (response) {
                    // 2. Verify payment
                    await axios.post("/api/verify-payment", response);

                    // 3. Save user
                    await axios.post("/api/register", {
                        ...form,
                        paymentId: response.razorpay_payment_id,
                    });

                    // 4. Redirect
                    window.location.href = "/event/success";
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-gradient">
            <div className="max-w-md w-full bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold mb-4 gradient-text">
                    Register for Event
                </h2>

                {/* Inputs */}
                {["name", "phone", "email", "college", "city"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        placeholder={field}
                        onChange={handleChange}
                        className="w-full mb-3 p-2 border rounded"
                    />
                ))}

                {/* Gender */}
                <select
                    name="gender"
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                {/* Button */}
                <button
                    onClick={handlePayment}
                    className="w-full bg-primary text-white py-3 rounded"
                >
                    Pay ₹50 & Register
                </button>
            </div>
        </div>
    );
}