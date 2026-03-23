import { supabase } from "@/lib/supabase";
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { events } from "@/data/events";

export default async function VerifyPage({ params }) {
    const { slug, paymentId } = await params;
    const event = events[slug?.toLowerCase()];

    const { data: registration, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("payment_id", paymentId)
        .single();

    const isValid = !!registration && !error;

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
            <div className="max-w-sm w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 p-8 text-center">

                {isValid ? (
                    <>
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-green-500 text-4xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 mb-1">Valid Registration</h1>
                        <p className="text-gray-500 text-sm mb-5">Payment verified ✓</p>

                        <div className="bg-orange-50 border border-amber-200 rounded-2xl p-4 text-left space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <FaUser className="text-primary shrink-0" />
                                <span className="font-semibold text-gray-800">{registration.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendarAlt className="text-primary shrink-0" />
                                <span>{event?.date} · {event?.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaMapMarkerAlt className="text-primary shrink-0" />
                                <span>{event?.venue}</span>
                            </div>
                        </div>

                        <div className="text-xs text-gray-400 space-y-1">
                            <p>College: {registration.college}</p>
                            <p>City: {registration.city}</p>
                            <p className="font-mono">ID: {registration.payment_id?.slice(0, 20)}...</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <FaTimesCircle className="text-red-500 text-4xl" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 mb-1">Invalid QR</h1>
                        <p className="text-gray-500 text-sm">
                            This registration could not be verified. Please contact the organizer.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}