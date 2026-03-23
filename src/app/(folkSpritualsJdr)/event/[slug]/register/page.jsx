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
import Image from "next/image";

import { FaSpinner, FaCloudUploadAlt } from "react-icons/fa";

const messages = [
    "Verifying payment screenshot...",
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
    const [redirecting, setRedirecting] = useState(false);
    const [screenshot, setScreenshot] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    // Handle Image Upload and convert to Base64
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB");
                e.target.value = "";
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (formData) => {
        if (!screenshot) {
            alert("Please upload the payment screenshot to proceed.");
            return;
        }

        setLoading(true);
        setRedirecting(true); // Show loader while AI processes image

        try {
            const response = await axios.post("/api/register", {
                ...formData,
                gender: "Male",
                slug,
                eventTitle: event?.title,
                amount: price,
                screenshotBase64: screenshot, // Send screenshot to backend
            });

            if (response.data.success) {
                sessionStorage.setItem("reg_name", formData.name);
                sessionStorage.setItem("reg_paymentId", response.data.paymentId);
                sessionStorage.setItem("reg_email", formData.email);

                window.location.href = `/event/${slug}/success`;
            } else {
                setRedirecting(false);
                alert(response.data.error || "Payment verification failed.");
            }
        } catch (err) {
            console.error(err);
            setRedirecting(false);
            alert(err.response?.data?.error || "Something went wrong. Please try again.");
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
        }, 1800);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Keep your existing redirecting overlay here */}
            {redirecting && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-6"
                    >
                        {/* Text Section */}
                        <div className="text-center h-[50px]">
                            <p className="text-xl font-bold text-gray-800">
                                Checking Payment status with our servers...
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

                    {/* Notice */}
                    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 text-sm text-amber-800">
                        <p>
                            For this event, registrations are currently limited to <strong> male students only </strong>
                            due to late evening timings and safety considerations.
                            <br /><br />
                            We truly value participation from everyone — female students are warmly invited to join our
                            upcoming event on <strong> 27th March </strong>.
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
                        {/* Static QR Code Section */}
                        <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Scan & Pay ₹{price}</p>
                            {/* Make sure you have your UPI QR in the public folder */}
                            <Image src="/50qr.png" alt="UPI QR Code" width={150} height={150} className="rounded-lg shadow-sm p-2" />
                            <p className="text-xs text-gray-500 mt-2">UPI ID: 8696878228@upi</p>
                        </div>

                        {/* Input Fields */}
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

                        {/* Screenshot Upload Field */}
                        {/* --- Payment Screenshot Upload Section --- */}
                        <div className="flex flex-col gap-1.5 mb-6">
                            <label className="text-sm font-bold text-gray-800 flex items-center gap-1">
                                Payment Screenshot <span className="text-red-500">*</span>
                            </label>
                            <p className="text-xs text-gray-500">
                                Please upload an image clearly showing the 12-digit UTR number.
                            </p>

                            <div className="relative mt-1 overflow-hidden rounded-xl outline-none border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm outline-none text-gray-600 file:mr-4 file:py-3 file:px-5 file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary hover:file:text-gray-400 file:transition-all file:cursor-pointer cursor-pointer p-1.5"
                                />
                            </div>
                        </div>

                        {/* --- Submit Button --- */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-75 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin text-lg" />
                                    <span>Verifying Screenshot...</span>
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-xl group-hover:scale-110 transition-transform duration-300" />
                                    <span>Verify & Register</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}